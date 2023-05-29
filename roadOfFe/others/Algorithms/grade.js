/** 敲门谜题：（邮件发送在线IDE调试链接，或源码也可；咱不搞面试造火箭，上岗拧螺丝）

对一群学生的所有数值属性（整形或浮点）求均值。要求：
   1. 属性名随意变化/增减不影响计算。
   2. 属性dict/object任意层级嵌套都可计算（不限于例子的3层）。
   3. 结果数据四舍五入，保留2位小数。

输入：**/
var testListWithNestedDicts = [
    {
        "studentId": 1,
        "age": 7,
        "height": 2,
        "weight": 3,
        "scores": {
            "spanish": 80,
            "mathematics": 90,
            "english": 100,
            "pe": {
                "run": 85,
                "jump": 95
            }
        }
    },
    {
        "studentId": 2,
        "age": 8,
        "height": 4,
        "weight": 6,
        "scores": {
            "spanish": 90,
            "mathematics": 90,
            "english": 80,
            "pe": {
                "run": 90,
                "jump": 90
            }
        }
    },
    {
        "studentId": 3,
        "age": 7,
        "height": 3,
        "weight": 6,
        "scores": {
            "spanish": 86,
            "mathematics": 90,
            "english": 75,
            "pe": {
                "run": 65,
                "jump": 90
            }
        }
    }
]

// 输出：
var output = {
    "age": 7.33,
    "height": 3.0,
    "weight": 5.0,
    "scores": {
        "spanish": 85.33,
        "mathematics": 90.0,
        "english": 85.0,
        "pe": {
            "run": 80.0,
            "jump": 91.67
        }
    }
}

// function deepClone(obj = {}) {
//     if (typeof obj !== 'object' || obj == null) { return obj } // obj为null或非对象非数组，直接返回
//     let result = {}
//     for (let key in obj) {
//         if (obj.hasOwnProperty(key)) {
//             result[key] = deepClone(obj[key])
//         }
//     }
// }



function byKind(array) {
    return array.reduce((acc, data) => {
        // take the values of that item
        Object.entries(data).forEach(([key, value]) => {
            // and map all the values to years
            acc[key] = acc[key] || []
            acc[key].push(value)
        })
        return acc
    }, {})
}

function deepFlatten(arr) {
    flatten = (arr) => [].concat(...arr);
    return flatten(arr.map((x) => (Array.isArray(x) ? deepFlatten(x) : x)));
}

function average(object) {
    const averages = {}
    for (let key in object) {
        console.log('key', key, 'object[key]', object[key])
        averages[key] = object[key].reduce((sum, value) => sum + value) / object[key].length 
    }
    return averages
}
average(byKind(input))





















// let expected = {};
// data.forEach(function(thing) {
//     let parentKeys = Object.keys(thing);  
//     parentKeys.forEach(function(parentKey) {
//         if (!expected.hasOwnProperty(parentKey)) {
//             expected[parentKey] = {};
//         }
//         let expectedParent = expected[parentKey];
//         let parent = thing[parentKey];
//         let childKeys = Object.keys(parent);
//         childKeys.forEach(function(childKey) { 
//             if (!expectedParent.hasOwnProperty(childKey)) {
//                  expectedParent[childKey] = 0;
//             }
//             expectedParent[childKey] += parent[childKey] / parentKeys.length;
//         });
//     });
// });

// console.log(expected);

function average(arr) {
    let element = {}
    arr.forEach((item) => {
        let parentKeys = Object.keys(item)
        console.log('parentKeys', parentKeys)
        parentKeys.forEach((parentKey) => {
            console.log('parentKey', parentKey)
            if (element.hasOwnProperty(parentKey)) { element[parentKey] = {}}
            let elementParent = element[parentKey]
            console.log('elementParent', elementParent)
            let parent = item[parentKey]
            console.log('parent', parent)

            let childKeys = Object.keys(parent)
            console.log('childKeys', childKeys)
            childKeys.forEach((childKey) => {
                if (!elementParent.hasOwnProperty(childKey)) { elementParent[childKey] = 0 }
                console.log('childKey', childKey, 'elementParent[childKey]', elementParent[childKey])
                elementParent[childKey] += parent[childKey] / parentKeys.length
            })
        })
    })
    // arr.map((obj) => {
    //     console.log(obj.studentId)
    //     Object.keys(obj).map(item => {
    //         // console.log(element[item] || (element[item] = []), 1)
    //         if(typeof obj[item] === Number) {
    //             console.log(item, '数字')
    //         } else if
    //     })
    // })

    // let dataobj = {}
    // arr.map((obj) => {
    //   Object.keys(obj).map(item => {
    //     dataobj[item] || (dataobj[item] = [])
    //     if (obj[item] !== undefined && obj[item] !== null && obj[item] !== '' && !isNaN(obj[item])) { // 有值且为数字
    //       dataobj[item].push(+obj[item])
    //     }
    //   })
    // })
    // Object.keys(dataobj).map(item => {
    //   if(dataobj[item] && dataobj[item].length){
    //      dataobj[item] = (dataobj[item].reduce((a, b) => a + b,0) / dataobj[item].length).toFixed(fixed)
    //   }else{
    //    dataobj[item] = ''
    //   }
    // })



    // let output = {}
    // let length = input.length
    // for (let i = 0; i < length; i++) {
    //     let obj = input[i]
    //     for (let score in obj[name]) {}
    // }

    // var avg = []; //声明一个数组来存储平均成绩的结果
    //     for (let name in obj) {
    //         var sum = 0;    //每次外层循环过一次就把sum归零
    //         for (let score in obj[name]) {
    //             sum += obj[name][score];  //obj[name][score]对应的是name这个人的一门课的成绩
    //         }
    //         sum /= 4;
    //         avg.push(sum.toFixed(2));
    //     }
}