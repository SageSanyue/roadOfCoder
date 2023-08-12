// Baidu

// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。

var isValid = function (s) {
    const stack = [];
    for (let i = 0; i < s.length; i++) {
        let c = s[i];
        switch (c) {
            case '(':
                stack.push(')');
                break;
            case '[':
                stack.push(']');
                break;
            case '{':
                stack.push('}');
                break;
            default:
                if (c !== stack.pop()) {
                    return false;
                }
        }
    }
    return stack.length === 0;
};
// 简化版本
var isValid = function (s) {
    const stack = [],
        map = {
            "(": ")",
            "{": "}",
            "[": "]"
        };
    for (const x of s) {
        if (x in map) {
            stack.push(x);
            continue;
        };
        if (map[stack.pop()] !== x) return false;
    }
    return !stack.length;
};

// 参考：https://github.com/youngyangyang04/leetcode-master/blob/master/problems/0020.有效的括号.md




function isValid(str) {
    let reg = /(^\(+$\)|(^\{+$\})|(^\[+$\]))/g
    return reg.test(str)
}
// function isValid(str) {
//     let reg = /(^\(?$\)|(^\{?$\})|(^\[?$\]))/g
//     return str.test(reg)
// }
console.log(isValid('({[)})'))

function isValid(str) {
    // for(let i = 0; i < str.length; i++) {
    //     //
    // }
    str.indexOf('(') > -1 && str.lastIndexOf('(') > -1
}

function debounce(fn, wait) {
    let timer
    return function () {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, wait)
    }
}
// 进阶问题：如何让debounce的第一次触发也执行？

// TODO
// 实现instanceof-来判断对象的具体类型
function new_instance_of(leftVaule, rightVaule) {
    if(typeof leftVaule !== 'object' || leftVaule === null) {
        return false
    }
    if(rightVaule === null) {
        return leftVaule === Object.prototype
    }
    let rightProto = rightVaule.prototype; // 取右表达式的 prototype 值
    leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值
    while (true) {
    	if (leftVaule === null) {
            return false;	
        }
        if (leftVaule === rightProto) {
            return true;	
        } 
        leftVaule = leftVaule.__proto__ 
    }
}
// 参考：https://juejin.cn/post/6844903613584654344

// function myInstanceof(target, type) {
//     // if(Object.prototype.__proto__ == null)
//     if () { }
//     if (target.__proto__ === type.prototype) {
//         return true
//     }
//     return false
// }


// Universal Link - iOS manifest 根目录
// Applink 文件 json android
// Intent intent://scheme
// URL Scheme
// url = 'linemusic://www.linemusic.com/a?callback=....'

// window.open(url)
// location.href = url

let aa = {
    age: 1,
    jobs: {
        first: 'FE'
    }
}
let b = { ...aa }
aa.jobs.first = 'native'
console.log(b)

// 答案为'native'-{...aa}为浅拷贝

function deepClone(obj) {
    if (typeof obj != 'object' || obj == null) {
        return obj
    }
    let result = {}
    if (Array.isArray(obj)) {
        result = []
    }
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {  // 容易误写为obj.hasOwnProperty(obj[i])
            result[i] = deepClone(obj[i])
        }
    }
    return result
}

console.log('1');
async function async1() {
    console.log('2');
    new Promise((resolve) => {
        async2();
        resolve()
    }).then(() => { console.log('3'); })
}
async function async2() {
    console.log('123')
    setTimeout(() => {
        console.log('4');
    }, 1000)
}
setTimeout(function () {
    console.log('6');
    new Promise(function (resolve) {
        console.log('8');
        resolve();
    }).then(function () { console.log('9') })
})
async1();
new Promise(function (resolve) {
    console.log('10');
    resolve();
}).then(function () {
    console.log('11');
});
console.log('12');

// 1
// 2
// 123
// 10
// 12
// 3
// 11
// 6
// 8
// 9
// 4


// 微1：3
// 微2: 11

// 宏1: 6
// 8
//     微 9
// 宏2: 4 1s后