# js基础  

## 重要知识点  

### 闭包  

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

