- [ES6](#es6)
  - [重要点](#重要点)
    - [作用域](#作用域)
    - [let \& const](#let--const)
    - [Array新增方法](#array新增方法)
    - [Class语法](#class语法)
    - [Promise](#promise)
      - [约定](#约定)
      - [链式调用](#链式调用)
        - [Catch 的后续链式操作](#catch-的后续链式操作)
        - [错误传递](#错误传递)
      - [组合](#组合)
        - [手写Promise](#手写promise)
        - [Promise.allSettled()](#promiseallsettled)
        - [Promise.all()](#promiseall)
        - [Promise.race()](#promiserace)
    - [async/await](#asyncawait)
  
# ES6  

## 重要点  

### 作用域  

### let & const  
var有变量提升，let和const没有；  
let和const有块级作用域，var没有；  

暂时性死区的本质：只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等声明变量的那一行代码出现才可以获取和使用该变量。

### Array新增方法  



### Class语法  

### Promise  
Promise是一个对象，代表了一个异步操作的最终完成或者失败。本质上Promise是一个异步函数返回的对象，可以在它上面绑定对调函数，这样在一开始就不用把回调函数作为参数传给这个函数。  
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
在es6的 async/await 语法糖中，这种异步代码的对称性得到了极致的体现：  
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
在es6中，时序组合可以通过使用 async/await 而变得更简单：  
```
let result;
for (const f of [func1, func2, func3]) {
  result = await f(result);
}
/* use last result (i.e. result3) */
```  

##### 手写Promise  






##### Promise.allSettled()  
##### Promise.all()
##### Promise.race()  

### async/await
