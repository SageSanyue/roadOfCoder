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

```
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
```
<ul id="ul1">
    <li>111</li>
    <li>222</li>
    <li>333</li>
    <li>444</li>
</ul>

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
  
```
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

### this  

### call aplay bind  

### 手写bind  
```
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
```
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
```
var object = { 'a': 1 };
var other = { 'a': 1 };
 
_.isEqual(object, other); // => true
 
object === other; // => false
```
手写深度比较：  
```
// 判断是否是对象或数组
function isObject(obj) {
    return typeof obj === 'Object' && obj !== null
}

// 全相等(深度)
function isEqual(obj1, obj2) {
    if(!isObject(obj1) || isObject(obj2)) {
        return obj1 === obj2 // 值类型（注意参与比较的一般不会是函数）
    }
    if(obj1 === obj1){
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
  
### Promise  
#### Promise使用  

#### 手写Promise  
```

```
