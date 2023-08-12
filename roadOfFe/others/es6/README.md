- [ES6](#es6)
  - [重要点](#重要点)
    - [作用域](#作用域)
    - [let \& const](#let--const)
    - [Array 新增方法](#array-新增方法)
    - [Class 语法](#class-语法)
    - [Promise](#promise)
      - [约定](#约定)
      - [链式调用](#链式调用)
        - [Catch 的后续链式操作](#catch-的后续链式操作)
        - [错误传递](#错误传递)
      - [组合](#组合)
        - [手写 Promise](#手写-promise)
        - [Promise.allSettled()](#promiseallsettled)
        - [Promise.all()](#promiseall)
        - [Promise.race()](#promiserace)
      - [Promise 相关问题](#promise-相关问题)
        - [手写并发限制同时请求数目的函数](#手写并发限制同时请求数目的函数)
    - [async/await](#asyncawait)

# ES6

## 重要点

### 作用域

### let & const

var 有变量提升，let 和 const 没有；  
let 和 const 有块级作用域，var 没有；

暂时性死区的本质：只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等声明变量的那一行代码出现才可以获取和使用该变量。

### Array 新增方法

### Class 语法

### Promise

Promise 是一个对象，代表了一个异步操作的最终完成或者失败。本质上 Promise 是一个异步函数返回的对象，可以在它上面绑定对调函数，这样在一开始就不用把回调函数作为参数传给这个函数。  
例如，现有一个名为 createAudioFileAsync() 的函数，它接收一些配置和两个回调函数，然后异步地生成音频文件。一个回调函数在文件创建成功时被异步调用，另一个在出现异常时被调用。

```
// 成功的回调函数
function successCallback(result) {
  console.log("音频文件创建成功：" + result);
}

// 失败的回调函数
function failureCallback(error) {
  console.log("音频文件创建失败：" + error);
}

createAudioFileAsync(audioSettings, successCallback, failureCallback);
```

如果函数 createAudioFileAsync() 被重写为返回 Promise 的形式，那么我们可以像下面这样简单地调用它：

```
const promise = createAudioFileAsync(audioSettings);
promise.then(successCallback, failureCallback);
```

或者直接简写为 `createAudioFileAsync(audioSettings).then(successCallback, failureCallback);` 。  
我们把这个称为 异步函数调用，这种形式有若干优点。

#### 约定

不同于“老式”的传入回调，在使用 Promise 时，会有以下约定：

- 在本轮 事件循环 运行完成之前，回调函数是不会被调用的。
- 即使异步操作已经完成（成功或失败），在这之后通过 then() 添加的回调函数也会被调用。
- 通过多次调用 then() 可以添加多个回调函数，它们会按照插入顺序进行执行。

Promise 很棒的一点就是链式调用（chaining）。

#### 链式调用

连续执行两个或者多个异步操作是一个常见的需求，在上一个操作执行成功之后，开始下一个的操作，并带着上一步操作所返回的结果。我们可以通过创造一个 Promise 链来实现这种需求。  
then() 函数会返回一个和原来不同的新的 Promise：

```
const promise = doSomething();
const promise2 = promise.then(successCallback, failureCallback);
```

或者写成`const promise2 = doSomething().then(successCallback, failureCallback);`  
promise2 不仅表示 doSomething() 函数的完成，也代表了你传入的 successCallback 或者 failureCallback 的完成，这两个函数也可以返回一个 Promise 对象，从而形成另一个异步操作，这样的话，在 promise2 上新增的回调函数会排在这个 Promise 对象的后面。  
基本上，每一个 Promise 都代表了链中另一个异步过程的完成。  
在过去，要想做多重的异步操作，会导致经典的回调地狱：

```
doSomething(function (result) {
  doSomethingElse(
    result,
    function (newResult) {
      doThirdThing(
        newResult,
        function (finalResult) {
          console.log("Got the final result: " + finalResult);
        },
        failureCallback,
      );
    },
    failureCallback,
  );
}, failureCallback);
```

现在，我们可以把回调绑定到返回的 Promise 上，形成一个 Promise 链：

```
doSomething()
  .then(function (result) {
    return doSomethingElse(result);
  })
  .then(function (newResult) {
    return doThirdThing(newResult);
  })
  .then(function (finalResult) {
    console.log("Got the final result: " + finalResult);
  })
  .catch(failureCallback);
```

then 里的参数是可选的，catch(failureCallback) 是 then(null, failureCallback) 的缩略形式。如下所示，我们也可以用箭头函数来表示：

```
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => {
    console.log(`Got the final result: ${finalResult}`);
  })
  .catch(failureCallback);
```

一定要有返回值，否则 callback 将无法获取上一个 Promise 的结果。如果使用箭头函数，`() => x` 比 `() => { return x; }` 更简洁一些，但后一种保留 return 的写法才支持使用多个语句。

##### Catch 的后续链式操作

有可能会在一个回调失败之后继续使用链式操作，即使用一个 catch，这对于在链式操作中抛出一个失败之后，再次进行新的操作会很有用。

```
new Promise((resolve, reject) => {
  console.log("初始化");

  resolve();
})
  .then(() => {
    throw new Error("有哪里不对了");

    console.log("执行「这个」");
  })
  .catch(() => {
    console.log("执行「那个」");
  })
  .then(() => {
    console.log("执行「这个」，无论前面发生了什么");
  });
```

输出结果为

```
初始化
执行「那个」
执行「这个」，无论前面发生了什么
```

##### 错误传递

在之前的回调地狱示例中有 3 次 failureCallback 的调用，而在 Promise 链中只有尾部的一次调用。

```
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => console.log(`Got the final result: ${finalResult}`))
  .catch(failureCallback);
```

通常，一遇到异常抛出，浏览器就会顺着 Promise 链寻找下一个 onRejected 失败回调函数或者由 `.catch()` 指定的回调函数。  
在 es6 的 async/await 语法糖中，这种异步代码的对称性得到了极致的体现：

```
async function foo() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch (error) {
    failureCallback(error);
  }
}
```

#### 组合

Promise.all() 和 Promise.race() 是并行运行异步操作的两个组合式工具。  
我们可以发起并行操作，然后等多个操作全部结束后进行下一步操作:

```
Promise.all([func1(), func2(), func3()]).then(([result1, result2, result3]) => {
  /* use result1, result2 and result3 */
});
```

或者可以使用一些高级写法实现时序组合：

```
[func1, func2, func3]
  .reduce((p, f) => p.then(f), Promise.resolve())
  .then((result3) => {
    /* use result3 */
  });
```

通常，我们递归调用一个由异步函数组成的数组时，相当于一个 Promise 链：

```
Promise.resolve().then(func1).then(func2).then(func3);
```

也可以写成可复用的函数形式，这在函数式编程中极为普遍：

```
const applyAsync = (acc, val) => acc.then(val);
const composeAsync =
  (...funcs) =>
  (x) =>
    funcs.reduce(applyAsync, Promise.resolve(x));
```

在 es6 中，时序组合可以通过使用 async/await 而变得更简单：

```
let result;
for (const f of [func1, func2, func3]) {
  result = await f(result);
}
/* use last result (i.e. result3) */
```

##### 手写 Promise

实现一个简易版 Promise

```JavaScript
const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'

function MyPromise(fn) {
  const that = this
  that.state = PENDING
  // value 变量用于保存 resolve 或者 reject 中传入的值
  that.value = null
  // resolvedCallbacks 和 rejectedCallbacks 用于保存 then 中的回调，因为当执行完Promise 时状态可能还是等待中，这时候应该把 then 中的回调保存起来用于状态改变时使用
  that.resolvedCallbacks = []
  that.rejectedCallbacks = []
  // 待完善 resolve 和 reject 函数
  function resolve(value) {
    if (that.state === PENDING) {
      that.state = RESOLVED
      that.value = value
      that.resolvedCallbacks.map(cb => cb(that.value))
    }
  }

  function reject(value) {
    if (that.state === PENDING) {
      that.state = REJECTED
      that.value = value
      that.rejectedCallbacks.map(cb => cb(that.value))
    }
  }
  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const that = this
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
  onRejected =
    typeof onRejected === 'function'
      ? onRejected
      : r => {
          throw r
        }
  if (that.state === PENDING) {
    that.resolvedCallbacks.push(onFulfilled)
    that.rejectedCallbacks.push(onRejected)
  }
  if (that.state === RESOLVED) {
    onFulfilled(that.value)
  }
  if (that.state === REJECTED) {
    onRejected(that.value)
  }
}
```

参考:  
1[前端面试葵花宝典](https://docs.wuwei.fun/JS/promise.html)

##### Promise.allSettled()

##### Promise.all()

##### Promise.race()

#### Promise 相关问题

##### 手写并发限制同时请求数目的函数  
题目：实现前端一个并发请求控制函数  
1. 输入URL数组 和 限制请求数
2. 按照 限制请求数 控制前端同时可以并发请求数量
3. 请求操作直接用 window.fetch
4. 最后根据 URL数组的顺序返回请求结果数组  

```JavaScript 
// 题目样例-zoom
function requestLimit(urlList, limitCount) {
    // TODO
    // let arr = urlList.slice(0, limitCount)
    let promiseArr
    let result = []
    for(let i = 0; i < urlList.length; i++) {
        let promise = new Promise((resolved, rejected) => {
            try {
                fetch(urlList[i])
                resolved
            } catch {
                rejected
            }
        })
        promiseArr.push(promise)
    }
    let newArr
    for(let i = 0; i < promiseArr.length; i++) {
        newArr.push(promiseArr[i])
        if(i % limitCount === 0){
            result.push(Promise.allSettled(newArr))
        }
    }
    // promiseArr.splice(0, 3)
    
    return result
}
    
async function main() {
 // 测试效果
 const urlList = [
   'https://unpkg.com/vue@3.2.31/package.json?v=0',
   'https://unpkg.com/vue@3.2.31/package.json?v=1',
   'https://unpkg.com/vue@3.2.31/package.json?v=2',
   'https://unpkg.com/vue@3.2.31/package.json?v=3',
   'https://unpkg.com/vue@3.2.31/package.json?v=4',
   'https://unpkg.com/vue@3.2.31/package.json?v=5',
   'https://unpkg.com/vue@3.2.31/package.json?v=6',
   'https://unpkg.com/vue@3.2.31/package.json?v=7',
   'https://unpkg.com/vue@3.2.31/package.json?v=8',
 ]
 limitCount = 3;
 const result =  await requestLimit(urlList, limitCount);
}
main();
```

```JavaScript
async function sendRequest(urls, limit , callback) {
  let result = [] // 所有请求最终返回响应的结果集合
  while (urls.length) {
    // limit at a time 例如一次并发3个
    result.push(await Promise.allSettled(urls.splice(0, limit).map(callback)))
  }
  return result
}

var urls = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

sendRequest(urls, 3, fetchFunc).then((res) => {
  console.log('最后结果', res)
})
// 模拟API请求需要时间返回响应
function fetchFunc(url) {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log(`当前发送：${url}`);
            resolve(`响应为：${url}`);
        }, 3000)
    })
}

// 真实的fetch请求可能是这样的  
function fetchFunc(url) {
  return new Promise(function(resolve, reject) {
    fetch(url)
      .then(response => {
        if(response.ok) {
          console.log(response.json())
          resolve(response)
          return response.json()
        }
      })
      .then(data => console.log(data))
      .catch(err => {
        rejected(err)
      })
  })
}
// fetch: 当接收到一个代表错误的HTTP状态码404或500时，从fetch()返回的Promise不会被标记为 eject。它会将Promise状态标记为resolve （但是会将resolve的返回值的ok属性设置为false），仅当网络故障时或请求被阻止时才会标记为 reject。
```  

参考：  
1[What is the best way to limit concurrency when using ES6's Promise.all()?](https://stackoverflow.com/a/58686835)  


### async/await