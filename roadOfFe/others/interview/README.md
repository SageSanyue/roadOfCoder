# 面试题  

## JS原理类  

### incetanceof  

```JavaScript
function new_instanceof(leftVaule, rightVaule) {
    if(typeof leftVaule !== 'object' && typeof leftVaule !== 'function' || leftVaule === null) {
        return false
    }
    if(rightVaule === null) {
        return leftVaule === Object.prototype
    }
    let right = rightVaule.prototype; // 取右的 prototype 值
    let left = leftVaule.__proto__; // 取左的__proto__值
    while (true) {
    	if (left === null) {
            return false;	
        }
        if (left === right) {
            return true;	
        } 
        left = left.__proto__
    }
}
console.log(new_instanceof(Function, Function)) // Function.__proto__ === Function.prototype
console.log(new_instanceof(Function.prototype, Object)) // Function.prototype.__proto__ === Object.prototype
console.log(new_instanceof(Object, Function)) // Object.__proto__ === Function.prototype
console.log(new_instanceof(Object.prototype, null)) // Object.prototype.__proto__ === null
var a = function people() {}
var b = new a()
console.log(new_instanceof(b, a)) // b.__proto__ === a.prototype
console.log(new_instanceof(a, Function)) // a.__proto__ === Function.prototype
console.log(new_instanceof(a.prototype, Object)) // a.prototype.__proto__ === Object.prototype
console.log(new_instanceof(b, Object))
// 共打印8个true
```  

```JavaScript
// 法2
function myInstanceof (obj, constructor) {
  let proto = Object.getPrototypeOf(obj); // 实例对象的原型
  while (true) {
    if (proto === null) { // 到达尽头
      return false;
    }
    if (proto === constructor.prototype) { // 找到了
      return true;
    }
    proto = Object.getPrototypeOf(proto); // 沿着原型链继续找
  }
}
// 这里的 Object.getPrototypeOf(obj) 可以使用 obj.__proto__ 代替。但是推荐使用 Object.getPrototypeOf(obj)，因为 __proto__ 已经被弃用了。  
// https://developer.aliyun.com/article/936735
```