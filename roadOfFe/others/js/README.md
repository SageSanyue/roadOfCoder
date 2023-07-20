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
    - [this](#this)
    - [call aplay bind](#call-aplay-bind)
    - [手写bind](#手写bind)
    - [深拷贝](#深拷贝)
    - [深度比较](#深度比较)
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

