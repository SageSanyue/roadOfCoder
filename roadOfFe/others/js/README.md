# js基础  

## 重要知识点  

### 闭包  

### this  

### call aplay bind  

### 手写bind  

### 深拷贝  
```
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

