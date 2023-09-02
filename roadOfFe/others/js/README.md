- [js基础](#js基础)
  - [重要知识点](#重要知识点)
    - [函数](#函数)
      - [构造函数](#构造函数)
        - [构造函数与箭头函数区别](#构造函数与箭头函数区别)
    - [原型](#原型)
    - [继承](#继承)
      - [原型式继承](#原型式继承)
        - [ES5-Object.create()方法](#es5-objectcreate方法)
    - [闭包](#闭包)
      - [闭包场景](#闭包场景)
    - [柯里化](#柯里化)
    - [this](#this)
    - [call aplay bind](#call-aplay-bind)
    - [手写bind](#手写bind)
    - [深拷贝](#深拷贝)
    - [深度比较](#深度比较)
    - [event loop](#event-loop)
      - [案例分析](#案例分析)
    - [Promise](#promise)
      - [Promise使用](#promise使用)
      - [手写Promise](#手写promise)
    - [事件处理](#事件处理)
      - [注册事件处理程序方式](#注册事件处理程序方式)
        - [设置HTML标签属性为事件处理程序](#设置html标签属性为事件处理程序)
        - [DOM0级事件处理程序-设置JavaScript对象属性为事件处理程序](#dom0级事件处理程序-设置javascript对象属性为事件处理程序)
        - [DOM2级事件处理程序](#dom2级事件处理程序)
        - [兼容IE8的attachEvent()](#兼容ie8的attachevent)
      - [事件处理程序调用时的一些问题](#事件处理程序调用时的一些问题)
        - [事件处理程序的参数](#事件处理程序的参数)
        - [事件处理程序的运行环境](#事件处理程序的运行环境)
        - [多个事件处理程序调用规则](#多个事件处理程序调用规则)
  - [H5-Hybrid相关](#h5-hybrid相关)
    - [App和H5通信](#app和h5通信)
      - [App端调用H5端方法](#app端调用h5端方法)
        - [Android调用H5端方法](#android调用h5端方法)
        - [IOS调用H5端的方法](#ios调用h5端的方法)
      - [H5端调用App端方法](#h5端调用app端方法)
        - [H5调用Android端方法](#h5调用android端方法)
        - [H5调用IOS端方法](#h5调用ios端方法)
      - [Android与IOS的双向通讯注意点](#android与ios的双向通讯注意点)
      - [区分环境](#区分环境)

# js基础  

## 重要知识点 

### 函数  

#### 构造函数  

##### 构造函数与箭头函数区别  

可以用new的方式来创建一个箭头函数吗？  
箭头函数不能作为构造函数使用。普通函数可以使用new来生成它的实例，但是箭头函数不可以new生成它的实例，因为箭头函数没有prototype也没有this。  

参考：  
1[前端自我修养进阶](https://smileyqp.github.io/frontend_book/doc/review/3、箭头函数与普通函数的区别是什么？构造函数可以使用new生成实例，那么箭头函数可以吗？为什么？.htm)
2[箭头函数和普通函数有啥区别](https://juejin.cn/post/7091236147103268878)

### 原型   

### 继承  
#### 原型式继承  

##### ES5-Object.create()方法

### 闭包  

```javascript
const arr = []
for(var i = 0; i < 3; i++) {
    arr[i] = function() {
        return i
    }
}
console.log(arr[1]()) // 结果是什么？
```  
以上结果为3，并非预期的1。  

#### 闭包场景  
通过循环给页面上多个dom节点绑定事件
```HTML
<ul id="ul1">
    <li>111</li>
    <li>222</li>
    <li>333</li>
    <li>444</li>
</ul>
```
```javascript
window.onload = function(){
    var ul = document.getElementById("ul1");
    var li = ul.getElementsByTagName('li');
    for(var i=0;i<li.length;i++){
        li[i].onclick = function(){
            alert(i+1);
        }
    }
}
```  

执行结果为点击任意一项均为4。  

要用闭包改为：(加一层闭包，返回一个函数作为响应事件)  

```javascript
window.onload = function(){
    var ul = document.getElementById("ul1");
    var li = ul.getElementsByTagName('li');
    for(var i=0;i<li.length;i++){
        li[i].onclick = function(num) {
          return function() {
            alert(num+1)
          }
        }(i)
    }
}
```
链接为：https://codepen.io/SageXXX/pen/NWEMQQV  
参考阅读：https://zhuanlan.zhihu.com/p/87950150

### 柯里化  
题目1:add(1)(2)(3)怎么实现?  

```JavaScript
function curryFn(fn, ...params) {
    return params.length >= fn.length ? fn(...params) : (...params2)=>curryFn(fn, ...params, ...params2)
}
var add = (z,x,y)=>z+x+y
var addCurryFn = curryFn(add)
addCurryFn(1,2,3)  //6
addCurryFn(1,2)(3)  //6
addCurryFn(1)(2,3)  //6
addCurryFn(1)(2)(3)  //6
```  
问题升级：实现无限调用  
实现一个可以无限调用的函数，且每次调用都能得到最终结果  
支持`addCurry(1)` `addCurry(1)(2)` `addCurry(1)(2)(3,4)` `addCurry(1)(2)(3,4)(5)(6,7)`  
  
```JavaScript
var add = function(...args) {
    var result = args.reduce((acc,cur)=>acc+cur)
    var _add = (...params)=>add(result, ...params)
    _add.toString = ()=>result
    return _add
}
+add(1)(2)      // 3
+add(1)(2)(3)   // 6
+add(1)(2,3)(4) // 10
+add(1)(2,3)    // 6
```  
解析：  
关于Object.prototype.toString()方法：每个对象都有一个 toString() 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。  
我们函数内部总是返回一个新函数，这也是为什么要将toString绑在新函数上的缘故，相当于我们覆盖了原型链上的toString方法，让它来帮我返回值。在调用前添加了+，这样函数执行完毕后，因为+会自动调用我们定义的toString方法，从而返回了我们期望的结果。 


参考：
1[柯里化无限调用](https://www.cnblogs.com/echolun/p/16124496.html)  

题目2：  
```
sum(1, 2, 3).sumOf(); //6
sum(2, 3)(2).sumOf(); //7
sum(1)(2)(3)(4).sumOf(); //10
sum(2)(4, 1)(2).sumOf(); //9  
```  

```JavaScript
function sum(...params1) {
    var callback = (...params2) => {
        return sum(...[...params1, ...params2])
    }
    callback.sumOf = () => {
        return params1.reduce((acc, cur) => acc + cur)
    }
    return callback
}
```

参考：
1[一道有意思的Js 题](https://pluckhuang.com/2020/02/14/一道有意思的js-题，sum1234-sumof/)



### this  

### call aplay bind  

### 手写bind  
```JavaScript
Function.prototype.bind1 = function() {
    const args = Array.prototype.slice.call(arguments)
    const t = args.shift()
    const self = this
    return function() {
        return self.apply(t, args)
    }
}

function fn1(a, b, c) {
    console.log(this)
    return 'this is fn1'
}
fn1() // 打印window
var fn2 = fn1.bind({x: 100}, 10, 20,30)
var res = fn2() // 打印{x: 100}
console.log(res) // 'this is fn1'

var fn3 = fn1.bind1({y:1}, 1,2,3)
var result = fn3() // 打印{y:1}
console.log(result) // 'this is fn1'
```

### 深拷贝  
```JavaScript
/**
 * 深拷贝
 * @param {Object} obj 源对象
 */
function deepClone(obj = {}) {
    if(typeof obj !== 'object' || obj == null) { // 当obj为null或者不为对象或数组时
        return obj
    }
    let result
    if(obj instanceof Array) {
        result = []
    } else {
        result = {}
    }
    for (let key in obj) {
        if(obj.hasOwnProperty(key)) { // 保证key不是原型的属性
            result[key] = deepClone(obj[key]) // 递归
        }
    }
    return result
}
var a = {
    'name': 'sage',
    'subject': {
        'math': 60,
        'English': 70
    },
    'queue': [2,4,1,3,9],
    'hobby': {
        'x': {
            'y': {
                'z': ['abc', 'def']
            }
        }
    }
}
var b = deepClone(a)
console.log(b)
b.hobby.x.y = [1,2,3]
console.log(b)
console.log(a)
```  

### 深度比较  
如lodash的[isEqual](https://www.lodashjs.com/docs/lodash.isEqual)  
例子：  
```JavaScript
var object = { 'a': 1 };
var other = { 'a': 1 };
 
_.isEqual(object, other); // => true
 
object === other; // => false
```
手写深度比较：  
```JavaScript
// 判断是否是对象或数组
function isObject(obj) {
    return typeof obj === 'Object' && obj !== null
}

// 全相等(深度)
function isEqual(obj1, obj2) {
    if(!isObject(obj1) || !isObject(obj2)) {
        return obj1 === obj2 // 值类型（注意参与比较的 一般不会是函数）
    }
    if(obj1 === obj2){
        return true // 兼容(obj1, obj1)
    }
    // 两个都是对象或者数组，而且不相等  
    const obj1Keys = Object.keys(obj1) // 1.先取出obj1和obj2的keys，比较个数
    const obj2Keys = Object.keys(obj2) 
    if(obj1Keys.length !== obj2Keys.length) {
        return false
    }
    // 2.以obj1为基准，和obj2依次递归比较
    for(let key in obj1) {
        // 比较当前key的val-递归
        const res = isEqual(obj1[key], obj2[key])
        if(!res) { return false}
    }
    // 3.全相等
    return true
}
```  

### event loop  

#### 案例分析  

一、Promise结合setTimeout  
题1：  

```JavaScript
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log("timerStart");
    resolve("success");
    console.log("timerEnd");
  }, 0);
  console.log(2);
});
promise.then((res) => {
  console.log(res);
});
console.log(4);
```  
结果：  
```
1
2
4
timerStart
timerEnd
success
```  
解析：  
- 从上至下，先遇到`new Promise`，执行该构造函数中的代码`console.log(1)`  
- 然后碰到了定时器，将这个setTimeout中的函数放到下一个MacroTask的延迟队列中等待执行
- 执行同步代码`console.log(2)`
- 跳出promise函数，遇到`promise.then`，但其状态还是为`pending`，先不执行
- 执行同步代码`console.log(4)`
- 一轮循环过后，进入第二次MacroTask，发现延迟队列中有setTimeout定时器，执行它
- 首先执行`console.log("timerStart")`，然后遇到了`resolve("success")`，将promise的状态改为`resolved`且保存结果并将之前的`promise.then`推入MicroTask队列
- 继续执行同步代码`console.log("timerEnd")`
- 宏任务全部执行完毕，查找MicroTask队列，发现`promise.then`这个微任务，执行它。  



题2：  

```JavaScript
Promise.resolve().then(() => {
    console.log('promise1');
    const timer2 = setTimeout(() => {
      console.log('timer2')
    }, 0)
  });
  const timer1 = setTimeout(() => {
    console.log('timer1')
    Promise.resolve().then(() => {
      console.log('promise2')
    })
  }, 0)
  console.log('start');
```  
结果：  
```
start
promise1
timer1
promise2
timer2
```  
解析：  
- 刚开始整个脚本作为第一次宏任务来执行，从上至下执行
- 遇到`Promise.resolve().then`这个微任务，将then中的内容加入第一次的微任务队列标记为微1
- 遇到定时器timer1，将它加入下一次宏任务的延迟列表，标记为宏1，等待执行(先不管里面是什么内容)
- 执行同步代码`console.log('start')`
- 整个脚本执行完毕，检查第一次的微任务队列(微1)，发现有一个`promise.then`这个微任务需要执行
- 执行打印出微1中同步代码`console.log('timer1')`，然后发现定时器timer2，将它加入宏1的后面，标记为宏2
- 第一次微任务队列(微1)执行完毕，执行后续宏任务(宏1)，首先执行同步代码`console.log('timer1')`
- 然后遇到了promise2这个微任务，将它加入此次循环的微任务队列，标记为微2
- 宏1中没有同步代码可执行了，查找本次循环的微任务队列(微2)，发现了`console.log('promise2')`，执行它
- 第二轮执行完毕，执行宏2`console.log('timer2')`   

题3：  
```JavaScript  
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})
console.log('promise1', promise1)
console.log('promise2', promise2)
setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)
```  
结果：  
```
promise1 Promise {<pending>}
promise2 Promise {<pending>}
VM1455:7 Uncaught (in promise) Error: error!!!
    at <anonymous>:7:9
promise1 Promise {<fulfilled>: 'success'}
promise2 Promise {<rejected>: Error: error!!!
    at <anonymous>:7:9}
// 注意node环境下与上浏览器环境中结果不同(只打印前三行)
```  
解析：  
- 从上至下，先执行第一个`new Promise`中的函数，碰到setTimeout将它加入下一个宏任务列表
- 跳出new Promise，碰到`promise1.then`这个微任务，但其状态还是为pending，这里先不执行
- promise2是一个新的状态为pending的Promise
- 执行同步代码console.log('promise1')，且打印出的promise1的状态为pending
- 执行同步代码console.log('promise2')，且打印出的promise2的状态为pending
- 碰到第二个定时器，将其放入下一个宏任务列表
- 第一轮宏任务执行结束，并且没有微任务需要执行，因此执行第二轮宏任务
- 先执行第一个定时器里的内容，将promise1的状态改为resolved且保存结果并将之前的`promise1.then`推入微任务队列
- 该定时器中没有其它的同步代码可执行，因此执行本轮的微任务队列，也就是`promise1.then`，它抛出了一个错误，且将promise2的状态设置为了rejected
- 第一个定时器执行完毕，开始执行第二个定时器中的内容: 打印出'promise1'，且此时promise1的状态为resolved; 打印出'promise2'，且此时promise2的状态为rejected  

二、Promise规则  
1. Promise的状态一经改变就不能再改变。
2. `.then`和`.catch`都会返回一个新的Promise。
3. catch不管被连接到哪里，都能捕获上层未捕捉过的错误。
4. 在Promise中，返回任意一个非 promise 的值都会被包裹成 promise 对象，例如`return 3`会被包装为`return Promise.resolve(3)`。
5. Promise 的 `.then` 或者 `.catch` 可以被调用多次, 但如果Promise内部的状态一经改变，并且有了一个值，那么后续每次调用`.then`或者`.catch`的时候都会直接拿到该值。
6. `.then` 或者 `.catch` 中 return 一个 `error` 对象并不会抛出错误，所以不会被后续的 `.catch` 捕获。
7. `.then` 或 `.catch` 返回的值不能是 promise 本身，否则会造成死循环。
8. `.then` 或者 `.catch` 的参数期望是函数，传入非函数则会发生值透传。
9. `.then`方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，某些时候你可以认为catch是`.then`第二个参数的简便写法。
10. `.finally`方法也是返回一个Promise，他在Promise结束的时候，无论结果为`resolved`还是`rejected`，都会执行里面的回调函数。  

例题1:  

```JavaScript
const promise = new Promise((resolve, reject) => {
  reject("error");
  resolve("success2");
});
promise
.then(res => {
    console.log("then1: ", res);
  }).then(res => {
    console.log("then2: ", res);
  }).catch(err => {
    console.log("catch: ", err);
  }).then(res => {
    console.log("then3: ", res);
  })
```  
结果：  
```
catch:  error // 3. catch不管被连接到哪里，都能捕获上层未捕捉过的错误。
then3:  undefined  // 2. `.then`和`.catch`都会返回一个新的Promise。且由于这个Promise没有返回值，所以打印出来的是undefined。
```  

例题2：  
```JavaScript
Promise.resolve(1)
  .then(res => {
    console.log(res);
    return 2;
  })
  .catch(err => {
    return 3;
  })
  .then(res => {
    console.log(res);
  })
```  
结果：  
```
1
2  // resolve(1)之后走的是第一个then方法，并没有走catch，所以第二个then中的res得到的实际上是第一个then的返回值2，且return 2会被包装成resolve(2)。
```  
解析：  
Promise可以链式调用，不过promise 每次调用 `.then` 或者 `.catch` 都会返回一个新的 promise，从而实现了链式调用, 它并不像一般我们任务的链式调用一样`return this`。  

例题3：  
```JavaScript
Promise.reject(1)
  .then(res => {
    console.log(res);
    return 2;
  })
  .catch(err => {
    console.log(err);
    return 3
  })
  .then(res => {
    console.log(res);
  })
```  
答案：  
```
1
3 // 第二个then中的res得到的就是catch中的返回值。
```  

例题4：  
```JavaScript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('timer')
    resolve('success')
  }, 1000)
})
const start = Date.now();
promise.then(res => {
  console.log(res, Date.now() - start)
})
promise.then(res => {
  console.log(res, Date.now() - start)
})
```  
结果：  
```
timer
success 1006
success 1007 // 足够快的话可能两个都是1007
// 5. Promise 的 `.then` 或者 `.catch` 可以被调用多次, 但如果Promise内部的状态一经改变，并且有了一个值，那么后续每次调用`.then`或者`.catch`的时候都会直接拿到该值。
```  

例题5：  
```JavaScript
Promise.resolve().then(() => {
  return new Error('error!!!')
}).then(res => {
  console.log("then: ", res)
}).catch(err => {
  console.log("catch: ", err)
})
```  
结果：  
```
then:  Error: error!!!
    at <anonymous>:2:10
```  
解析：  
> 4. 在Promise中，返回任意一个非 promise 的值都会被包裹成 promise 对象，例如`return 3`会被包装为`return Promise.resolve(3)`。
> 6. `.then` 或者 `.catch` 中 return 一个 `error` 对象并不会抛出错误，所以不会被后续的 `.catch` 捕获。
`return new Error('error!!!')`被包装成了`return Promise.resolve(new Error('error!!!'))`  

如果要抛出错误，应该使用下面任意一种方式：  
```JavaScript
return Promise.reject(new Error('error!!!'))
// or
throw new Error('error!!!')
```  

例题6:  
```JavaScript
const promise = Promise.resolve().then(() => {
  return promise;
})
promise.catch(console.err)
```  
结果：  
```
Uncaught SyntaxError: Identifier 'promise' has already been declared
// 7. `.then` 或 `.catch` 返回的值不能是 promise 本身，否则会造成死循环。
```  

例题7：  
```JavaScript
Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .then(console.log)
```  
结果：  
```
1
```  
解析：`8. .then 或者 .catch 的参数期望是函数，传入非函数则会发生值透传。` 第一个then和第二个then中传入的都不是函数(一个是数字类型，一个是对象类型)因此发生了透传，将`resolve(1)`的值直接传到最后一个then里。  

例题8：  
```JavaScript
Promise.reject('err!!!')
  .then((res) => {
    console.log('success', res)
  }, (err) => {
    console.log('error', err)
  }).catch(err => {
    console.log('catch', err)
  })
```  
结果：  
```
error err!!!
```  
解析：`9. .then方法是能接收两个参数的，第一个是处理成功的函数，第二个是处理失败的函数，某些时候你可以认为catch是.then第二个参数的简便写法。`  
进入的是then()中的第二个参数里面，而如果把第二个参数去掉，就进入了catch()中：  

```JavaScript  
Promise.reject('error!!!')
  .then((res) => {
    console.log('success', res)
  }).catch(err => {
    console.log('catch', err)
  })
```  
结果：  
```
catch error!!!
```  
进阶：  
```JavaScript 
Promise.resolve()
  .then(function success (res) {
    throw new Error('error!!!')
  }, function fail1 (err) {
    console.log('fail1', err)
  }).catch(function fail2 (err) {
    console.log('fail2', err)
  })
```  
结果：  
```
fail2 Error: error!!!
    at success (<anonymous>:3:11)
// .then()执行的应该是success()函数，可是success()函数抛出的是一个错误，它会被后面的catch()给捕获到，而不是被fail1函数捕获
```  

三、.finally规则  
1. .finally()方法不管Promise对象最后的状态如何都会执行  
2. .finally()方法的回调函数不接受任何的参数，也就是说你在.finally()函数中是没法知道Promise最终的状态是resolved还是rejected的  
3. 它最终返回的默认会是一个上一次的Promise对象值，不过若抛出的是一个异常则返回异常的Promise对象。  

题1：  
```JavaScript
Promise.resolve('1')
  .then(res => {
    console.log(res)
  })
  .finally(() => {
    console.log('finally')
  })
Promise.resolve('2')
  .finally(() => {
    console.log('finally2')
  	return '我是finally2返回的值'
  })
  .then(res => {
    console.log('finally2后面的then函数', res)
  })
```  
结果：  
```
1
finally2
finally  // 链式调用后面的内容需要等前一个调用执行完才会执行。
finally2后面的then函数 2  // 就算finally2返回了新的值，它后面的then()函数接收到的结果却还是'2'
```  

题2：  
```JavaScript
Promise.resolve('1')
  .finally(() => {
    console.log('finally1')
    throw new Error('我是finally中抛出的异常')
  })
  .then(res => {
    console.log('finally后面的then函数', res)
  })
  .catch(err => {
    console.log('捕获错误', err)
  })
```  
结果：  
```
finally1
捕获错误 Error: 我是finally中抛出的异常
    at <anonymous>:4:11
    at <anonymous>
```  

四、async/awit  
1. 在async函数中抛出了错误，则终止错误结果，不会继续向下执行


例题1：  
```JavaScript
async function async1 () {
  console.log('async1 start');
  await new Promise(resolve => {
    console.log('promise1')
  })
  console.log('async1 success');
  return 'async1 end'
}
console.log('srcipt start')
async1().then(res => console.log(res))
console.log('srcipt end')
```  
结果：  
```
srcipt start
async1 start
promise1
srcipt end 
// 在async1中await后面的Promise是没有返回值的，
// 也就是它的状态始终是pending状态，因此相当于一直在await，await，await却始终没有响应
// 所以在await之后的内容是不会执行的，也包括async1后面的 .then
```  

例题2：  
```JavaScript
async function testSometing() {
  console.log("执行testSometing");
  return "testSometing";
}

async function testAsync() {
  console.log("执行testAsync");
  return Promise.resolve("hello async");
}

async function test() {
  console.log("test start...");
  const v1 = await testSometing();
  console.log(v1);
  const v2 = await testAsync();
  console.log(v2);
  console.log(v1, v2);
}

test();

var promise = new Promise(resolve => {
  console.log("promise start...");
  resolve("promise");
});
promise.then(val => console.log(val));

console.log("test end...");
```  
结果：  
```
test start...
执行testSometing
promise start...
test end...
testSometing
执行testAsync
promise
hello async
testSometing hello async
```  

例题3：  
```JavaScript
async function async1 () {
  await async2();
  console.log('async1');
  return 'async1 success'
}
async function async2 () {
  return new Promise((resolve, reject) => {
    console.log('async2')
    reject('error')
  })
}
async1().then(res => console.log(res))
```  
结果：  
```
async2
Uncaught (in promise) error
```  
解析：await后面跟着的async2是一个状态为rejected的promise，根据规则`1. 在async函数中抛出了错误，则终止错误结果，不会继续向下执行`，打印Uncaught (in promise) error后即结束。  

例题4： 
若要使得错误的地方不影响async函数后续的执行的话，可以使用`try catch`。  

``` JavaScript
async function async1 () {
  try {
    await Promise.reject('error!!!')
  } catch(e) {
    console.log(e)
  }
  console.log('async1');
  return Promise.resolve('async1 success')
}
async1().then(res => console.log(res))
console.log('script start')
```  
结果：  
```
script start
error!!!
async1
async1 success
```  
或者可以直接在`Promise.reject`后面跟着一个`catch()`方法，也能使得错误的地方不影响async函数后续的执行：  
```JavaScript
async function async1 () {
  await Promise.reject('error!!!')
    .catch(e => console.log(e))
  console.log('async1');
  return Promise.resolve('async1 success')
}
async1().then(res => console.log(res))
console.log('script start')
```  

例题5：  
> 2. .finally()方法的回调函数不接受任何的参数，也就是说你在.finally()函数中是没法知道Promise最终的状态是resolved还是rejected的  
> 3. .finally()最终返回的默认会是一个上一次的Promise对象值，不过若抛出的是一个异常则返回异常的Promise对象。
```JavaScript
var p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('resolve3');
    console.log('timer1')
  }, 0)
  resolve('resovle1');
  resolve('resolve2');
}).then(res => {
  console.log(res)
  setTimeout(() => {
    console.log(p1)
  }, 1000)
}).finally(res => {
  console.log('finally', res)
})
```  
结果：  
```
resovle1
finally undefined
timer1
Promise {<fulfilled>: undefined}
```  
分析：  
finally不管Promise的状态是resolved还是rejected都会执行，且它的回调函数是接收不到Promise的结果的，所以finally()中的res是undefined。  
最后一个定时器打印出的p1其实是.finally的返回值，.finally的返回值如果在没有抛出错误的情况下默认会是上一个Promise(.then())的返回值，
但是这个.then()并没有返回值，所以p1打印出来的Promise的值会是undefined。  




参考：[要就来45道Promise面试题](https://juejin.cn/post/6844904077537574919)
  
### Promise  
#### Promise使用  

#### 手写Promise  
```JavaScript

```  

### 事件处理  
JavaScript中的事件处理如何运行？  
事件流就是描述了页面中接受事件的顺序，在浏览器发展的初期，两大浏览器厂商IE和Netscape互掐，他们对事件流的解释出现了两中截然相反的定义。也就是我们所熟悉的：IE的事件冒泡（向上传递），Netscape的事件捕获（向下传递）。  
**事件冒泡**即事件最开始由最具体的元素（文档中嵌套层次最深的那个节点）接收，然后逐级向上传播至最不具体的节点（文档）。  
**事件捕获**即事件最早由不太具体的节点接收，而最具体的节点最后接收到事件。  

#### 注册事件处理程序方式  
注册事件处理程序的方式有4种：  
**方法1：设置HTML标签属性为事件处理程序**  
**方法2：DOM0级事件处理程序-设置JavaScript对象属性为事件处理程序**  
**方法3：DOM2级事件处理程序：addEventListener()**  
**方法4：attachEvent()**  

##### 设置HTML标签属性为事件处理程序  
文档元素的事件处理程序属性，其名字由"on"后面跟着事件名组成，例如：onclick、onmouseover。当然这种形式只能为DOM元素注册事件处理程序。  
```HTML
<div id="div1" onClick="console.log('div1');">
  div1
  <div id="div2" oNClick="console.log('div2');">
    div2
    <div id="div3" onclick="console.log('div3');" onclick="console.log('div3333');">
      div3
    </div>
  </div>
</div>
```  
①因为HTML里面不区分大小写，所以这里事件处理程序属性名大写、小写、大小混写均可，属性值就是相应事件处理程序的JavaScript代码；  
②若给同一元素写多个onclick事件处理属性，浏览器只执行**第一个**onclick里面的代码，后面的会被忽略；  
③这种形式是在事件冒泡过程中注册事件处理程序的；  

##### DOM0级事件处理程序-设置JavaScript对象属性为事件处理程序  
可以通过设置某一事件目标的事件处理程序属性来为其注册相应的事件处理程序。事件处理程序属性名字由“on”后面跟着事件名组成，例如：onclick、onmouseover。  
①因为JavaScript是严格区分大小写的，所以，这种形式下属性名只能按规定小写；  
②若给同一元素对象写多个onclick事件处理属性，后面写的会覆盖前面的（ps：这就是在修改一个对象属性的值，属性的值是唯一确定的）；  
③这种形式也是在事件冒泡过程中注册事件处理程序的；  

```HTML
<!DOCTYPE HTML>
<html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>test</title>
  <body>
    <div id="div1">
      div1
      <div id="div2">
        div2
        <div id="div3">div3</div>
      </div>
    </div>
    <script type="text/javascript">
      var div1 = document.getElementById('div1')
      var div2 = document.getElementById('div2')
      var div3 = document.getElementById('div3')
　　   div1.onclick = function(){ console.log('div1') }
　　   div2.onclick = function(){ console.log('div2') }
　　   div3.onclick = function(){ console.log('div3') }
　　   div1.onclick = function(){ console.log('div11111') }  
      // 若给同一元素对象写多个onclick事件处理属性，后面写的会覆盖前面的（ps：这就是在修改一个对象属性的值，属性的值是唯一确定的）
　　   div1.onClick = function(){ console.log('DIV11111') }     // 因为JavaScript是严格区分大小写的，所以，这种形式下属性名只能按规定小写；
    
      // 可以通过将事件处理程序的值设置为null来删除通过DOM0级方法指定的事件处理程序
    </script>
  </body>
</html>
```  
点击div3打印结果为："div3" "div2" "div11111"  
沙箱：https://codepen.io/SageXXX/pen/xxQzpOb?editors=1111  

##### DOM2级事件处理程序  

前两种方式出现在Web初期，众多浏览器都有实现。而`addEventListener()`方法是**标准事件模型**中定义的。任何能成为事件目标的对象——这些对象包括Window对象、Document对象和所有文档元素等——都定义了一个名`addEventListener()`的方法，使用这个方法可以为事件目标注册事件处理程序。 

`addEventListener()`接受三个参数：  
* 第一个参数是要注册处理程序的事件类型，其值是字符串，但并不包括前缀“on”；  
* 第二个参数是指当指定类型的事件发生时应该调用的函数；  
* 第三个参数是布尔值，其可以忽略（某些旧的浏览器上不能忽略这个参数），默认值为false，这种情况是在事件冒泡过程中注册事件处理程序，当其为true时就是在事件捕获过程中注册事件处理程序。  

①通过addEventListener()方法给同一对象注册多个同类型的事件，并不会发生忽略或覆盖，而是会按顺序依次执行；  
②相对addEventListener()的是removeEventListener()方法，它表示从对象中删除某个事件处理函数。它同样有三个参数，前两个参数自然跟addEventListener()的意义一样，而第三个参数也只需跟相应的addEventListener()的第三个参数保持一致即可，同样可以省略，默认值为false。  

DOM2级事件规定事件包括三个阶段：事件捕获阶段->处于目标阶段->事件冒泡阶段。  
```HTML
<!DOCTYPE HTML>
<html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>test</title>
  <body>
    <div id="div1">
      div1
      <div id="div2">
        div2
        <div id="div3">div3</div>
      </div>
    </div>
    <script type="text/javascript">
      var div1 = document.getElementById('div1')
      var div2 = document.getElementById('div2')
      var div3 = document.getElementById('div3')
　　   div1.addEventListener('click', function(){ console.log('div1-bubble'); }, false);
　　   div2.addEventListener('click', function(){ console.log('div2-bubble'); }, false);
　　   div3.addEventListener('click', function(){ console.log('div3-bubble'); }, false);
　　   div3.addEventListener('click', function(){ console.log('div3-bubble222'); }, false);
　　   div1.addEventListener('click', function(){ console.log('div1-capturing'); }, true);
　　   div2.addEventListener('click', function(){ console.log('div2-capturing'); }, true);
　　   div3.addEventListener('click', function(){ console.log('div3-capturing'); }, true);

      div1.addEventListener('click', div1BubbleFun, false);
      div1.removeEventListener('click', div1BubbleFun, false); // 在删除事件处理的时候，传入的参数一定要跟之前的参数一致，否则删除会失效
      function div1BubbleFun(){ console.log('div1-bubble') }
    </script>
  </body>
</html>
```  
沙箱：https://codepen.io/SageXXX/pen/xxQzPyN?editors=1111

打印结果：  
```
"div1-capturing"
"div2-capturing"
"div3-capturing"
"div3-bubble"
"div3-bubble222"
"div2-bubble"
"div1-bubble"
```

##### 兼容IE8的attachEvent()  
但是，IE8以及其之前版本的浏览器并不支持addEventListener()和removeEventListener()。相应的，IE定义了类似的方法attachEvent()和detachEvent()。  
因为IE8以及其之前版本浏览器也不支持事件捕获只支持事件冒泡，所以attachEvent()并不能注册捕获过程中的事件处理函数。因此attachEvent()和detachEvent()要求只有两个参数：事件类型和事件处理函数。而且，它们的第一个参数使用了带"on"前缀的事件处理程序属性名。  
```JavaScript
var div1 = document.getElementById('div1')
div1.attachEvent('onclick', div1BubbleFun)
function div1BubbleFun(){ console.log('div1-bubble') }

div1.detachEvent('onclick', div1BubbleFun)  // 相应的，从对象上删除事件处理程序函数使用detachEvent()。
```

#### 事件处理程序调用时的一些问题  

##### 事件处理程序的参数  
通常事件对象作为参数传递给事件处理函数，但IE8以及其之前版本的浏览器中全局变量event才是事件对象。所以，我们在写相关代码时应该注意兼容性问题。  
```HTML
<!DOCTYPE HTML>
<html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <title>test</title>
  <body>
    <div id="div1">
      div1
   </div>
    <script type="text/javascript">
      var div1 = document.getElementById('div1')

      if(div1.addEventListener){
          div1.addEventListener('click', div1Fun, false);
      }else if(div1.attachEvent){
          div1.attachEvent('onclick', div1Fun);
      }
      function div1Fun(event){
        event = event || window.event;
        var target = event.target || event.srcElement;
        console.log(event.type);
        console.log(target);
      }
    </script>
  </body>
</html>
```

##### 事件处理程序的运行环境  
事件处理程序的运行环境，也就是在事件处理程序中调用上下文（this值）的指向问题：  
```HTML
<div id="div1" onclick="console.log('html:'); console.log(this);">div1</div>
<!-- 第一种方法(1)事件处理程序中this指向这个元素本身 -->
<script type="text/javascript">
  var div1 = document.getElementById('div1');
  div1.onclick = function(){
    console.log('div1.onclick:')
    console.log(this)            // 第二种方法(2)事件处理程序中this也指向这个元素本身；
  }
  // 存在第二种方法(2)时，它会覆盖第一种方法(1)注册的事件处理程序

  div1.addEventListener('click', function(){
    console.log('div1.addEventListener:')
    console.log(this)           // 第三种方法(3)事件处理程序中this也指向这个元素本身；
  }, false)
  // 第三种方法(3)并不会覆盖第一种(1)或第二种方法(2)注册的事件处理程序

  div1.attachEvent('onclick', function(){
    console.log('div1.attachEvent:')
    console.log(this === window)  // 第四种方法(4)事件处理程序中this指向全局对象Window;
  })
  // 第四种方法(4)也不会覆盖第一种(1)或第二种方法(2)注册的事件处理程序
</script>
```

##### 多个事件处理程序调用规则  
(1)通过HTML属性注册的处理程序和通过设置对象属性的处理程序一直优先调用(即方法1和方法2);  
(2)使用addEventListener()注册的处理程序按照它们的注册顺序依次调用(即方法3);  
(3)使用attachEvent()注册的处理程序可能按照任何顺序调用，所以代码不应该依赖于调用顺序(即方法4);  

参考：https://www.zhihu.com/people/xu-sai-jun-12/posts?page=3

## H5-Hybrid相关  

### App和H5通信
嵌入到App里面的H5页面动态通信  
通信分为H5端调用原生App端方法和原生App端调用H5端方法。App又分为IOS和Android两端，他们之间是有区别的  

#### App端调用H5端方法  
App端调用H5端的方法，调用的必须是绑定到window对象上面的方法。  
把say方法注册到window对象上。  
```Java
window.say = (name) => {
 alert(name)
}
```

##### Android调用H5端方法  
```Java
private void isAutoUser () {
    String username = mSpHelper.getAutoUser();
    
    if (TextUtils.isEmpty(username)) {
        return;
    }

    // 1.Android: loadUrl (Android系统4.4- 支持)
    // 该方法的弊端是无法获取函数返回值；
    // say 方法是H5端挂载在window对象上的方法。
    mWebView.loadUrl("javascript:say('" + username + "')")

    // 2.Android: evaluateJavascript (Android系统4.4+ 支持)
    // 这里着重介绍 evaluateJavascript，这也是目前主流使用的方法。
    // 该方法可以在回调方法中获取函数返回值；
    // say 方法是H5端挂载在window对象上的方法。
    mWebView.evaluateJavascript("javascript:say('" + username + "')", new ValueCallback<String>() {
        @Override
        public void onReceiveValue(String s) {
          //此处为 js 返回的结果
        }
    });
    
    // 下面这两种通信方式用的不多，这里就不着重介绍了。
    
    // 3.Android: loadUrl (Android系统4.4- 支持)
    // 直接打开某网页链接并传递参数，这种也能给H5端传递参数
    // mWebView.loadUrl("file:///android_asset/shop.html?name=" + username);
    
    // 4. Android端还可以通过重写onJsAlert, onJsConfirm, onJsPrompt方法拦截js中调用警告框，输入框，和确认框。
}
```

##### IOS调用H5端的方法  
IOS使用不同的语言有不同的调用方法。  

```Objective-C
// Objective-C
// say 方法是H5端挂载在window对象上的方法
[self.webView evaluateJavaScript:@"say('params')" completionHandler:nil];
```  

```Swift
// Swift
// say 方法是H5端挂载在window对象上的方法
webview.stringByEvaluatingJavaScriptFromString("say('params')")
```

#### H5端调用App端方法  
提供给H5端调用的方法，Android 与 IOS 分别拥有对应的挂载方式。分别对应是:苹果 UIWebview JavaScriptCore 注入、安卓 addJavascriptInterface 注入、苹果 WKWebView scriptMessageHandler 注入。  



##### H5调用Android端方法  
安卓 addJavascriptInterface 注入  
```Java
// 这里的对象名 androidJSBridge 是可以随意更改的，不固定。
addJavascriptInterface(new MyJaveScriptInterface(mContext), "androidJSBridge");

// MyJaveScriptInterface类里面的方法
@JavascriptInterface
public aliPay (String payJson) {
  aliPayHelper.pay(payJson);
  // Android 在暴露给 H5端调用的方法能直接有返回值。
  return 'success';
}
```  
H5调用Android端暴露的方法  
```JavaScript
// 这里的 androidJSBridge 是根据上面注册的名字来的。
// js调用Android Native原生方法传递的参数必须是基本类型的数据，不能是引用数据类型，如果想传递引用类型需要使用JSON.stringify()。
const result = window.androidJSBridge.aliPay('string参数');
console.log(result);
```

##### H5调用IOS端方法  
苹果 WKWebView scriptMessageHandler 注入  
```
#pragma mark -  OC注册供JS调用的方法 register方法
- (void)addScriptFunction {
    self.wkUserContentController = [self.webView configuration].userContentController;

    [self.wkUserContentController addScriptMessageHandler:self name:@"register"];
}

#pragma mark - register方法
- (void)register:(id)body {
     NSDictionary *dict = body;
    [self.userDefaults setObject:[dict objectForKey:@"password"] forKey:[dict objectForKey:@"username"]];
    不能直接返回结果，需要再次调用H5端的方法，告诉H5端注册成功。
    [self.webView evaluateJavaScript:@"registerCallback(true)" completionHandler:nil];
}
```  
ios 在暴露给 web 端调用的方法不能直接有返回值，如果需要有返回值需要再调用 web 端的方法来传递返回值。（也就是需要两步完成）  

H5调用IOS端暴露的方法。  
```JavaScript  
// 与android不同，ios这里的webkit.messageHandlers是固定写法，不能变。
// 不传参数
window.webkit.messageHandlers.register.postMessage(null);
// 传递参数
// 与android不同，ios这里的参数可以是基本类型和引用数据类型。
window.webkit.messageHandlers.register.postMessage(params);
```  

#### Android与IOS的双向通讯注意点  
H5端调用Android端方法使用window.androidJSBridge.方法名(参数)，这里的androidJSBridge名称不固定可自定义。而H5端调用IOS端方法固定写法为window.webkit.messageHandlers.方法名.postMessage(参数)。  

H5端调用Android端方法传递的参数只能是基本数据类型，如果需要传递引用数据类型需要使用JSON.stringfy()处理。而IOS端既可以传递基本数据类型也可以传递引用数据类型。  

H5端调用Android端方法可以直接有返回值。而IOS端不能直接有返回值。  


#### 区分环境  
在H5端调用Android和IOS方法的方式都不同我们应该怎么区分当前是什么环境  

```JavaScript
/**
 * 判断手机系统类型
 * @returns phoneSys
 */
function phoneSystem() {
  var u = navigator.userAgent.toLowerCase();
  let phoneSys = ''
  if (/android|linux/.test(u)) {//安卓手机
    phoneSys = 'android'
  } else if (/iphone|ipad|ipod/.test(u)) {//苹果手机
    phoneSys = 'ios'
  } else if (u.indexOf('windows Phone') > -1) {//winphone手机
    phoneSys = 'other'
  }
  return phoneSys
}

// 调用
// 这里只区分了方法的调用方式，参数的类型和方法的返回值待读者自己处理。
function call(message) {
  let phoneSys = phoneSystem()
  if (typeof window.webkit != "undefined" && phoneSys == 'ios') {
    window.webkit.messageHandlers.call.postMessage(message);
  } else if (typeof jimiJS !== "undefined" && phoneSys == 'android') {
    window.jimiJS.call(message);
  }
}
```

参考：
1[移动端开发必备知识-Hybrid App](https://juejin.cn/post/7062967241268019214)