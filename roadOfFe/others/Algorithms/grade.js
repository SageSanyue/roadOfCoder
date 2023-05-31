/** 敲门谜题：（邮件发送在线IDE调试链接，或源码也可；咱不搞面试造火箭，上岗拧螺丝）

对一群学生的所有数值属性（整形或浮点）求均值。要求：
   1. 属性名随意变化/增减不影响计算。
   2. 属性dict/object任意层级嵌套都可计算（不限于例子的3层）。
   3. 结果数据四舍五入，保留2位小数。
输入：
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
答案运行在线参见 https://codepen.io/SageXXX/pen/ExdBPNL?editors=1010
*/

function sum(array) {
    return array.reduce((acc, data) => {

        Object.entries(data).forEach(([key, value]) => {
            acc[key] = acc[key] || []
            if (typeof value === 'object') {
                flattenObj(value, key, acc)
            } else if (key !== 'studentId') {
                acc[key].push(value)
            }
        })
        return acc
    }, {})
}

function flattenObj(obj, parentKey, acc) {
    Object.entries(obj).forEach(([key, value]) => {
        if(typeof value === 'object') {
            let newKey = `${parentKey}-${key}`
            acc[newKey] = []
            flattenObj(obj[key], newKey, acc)
        } else {
            let newKey = `${parentKey}-${key}`;
            acc[newKey] = acc[newKey] || []
            acc[newKey].push(value)
        }
    })
}

function average(object) {
    const averages = {}
    for (let key in object) {
        if(object[key].length > 0) {
            averages[key] = (object[key].reduce((sum, value) => sum + value) / object[key].length ).toFixed(2)
        }
    }
    return averages
}

function restoreObj(obj) {
    let temp = Object.assign(obj)
    let node = {}
    Object.entries(temp).forEach(([key, value]) => {
        if (key.includes('-')) {
            var keyArray = key.split('-')
            let putInto = node;

            for (let i = 0; i < keyArray.length; i++) {
                let name = keyArray[i];
                let childValue = (i === keyArray.length - 1) ? value : {};
                putInto[name] = putInto[name] || childValue;
                putInto = putInto[name];
            }
            delete temp[key]
        }
    })
    let result = Object.assign(temp, node)
    return result
}

function answer(input) {
    return restoreObj(average(sum(input)))
}

var result = answer(testListWithNestedDicts)
console.log(result)


/**结果为
var a = {
    'age': "7.33",
    'height': "3.00",
    'scores-english': "85.00",
    'scores-mathematics': "90.00",
    'scores-pe-jump': "91.67",
    'scores-pe-run': "80.00",
    'scores-spanish': "85.33",
    'weight': "5.00"
}
*/

/**测试数据1
 * var testB = [
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
                "run": {
                    "point": 4,
                    "term": 1,
                },
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
                "run": {
                    "point": 3,
                    "term": 2,
                },
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
                "run": {
                    "point": 5,
                    "term": 1,
                },
                "jump": 90
            }
        }
    }
]

var outputB = {
    "age": 7.33,
    "height": 3.0,
    "weight": 5.0,
    "scores": {
        "spanish": 85.33,
        "mathematics": 90.0,
        "english": 85.0,
        "pe": {
            "run": {
                "point": 4,
                "term": 1.33
            },
            "jump": 91.67
        }
    }
}
 */

/**
 * var b = {
    'age': "7.33",
    'height': "3.00",
    'scores-english': "85.00",
    'scores-mathematics': "90.00",
    'scores-pe-jump': "91.67",
    'scores-pe-run-point': "4.00",
    'scores-pe-run-term': "1.33",
    'scores-spanish': "85.33",
    'weight': "5.00",
}
*/

/**测试数据2
var testC = [
    {
        "studentId": 1,
        "age": 7,
        "height": 2,
        "weight": 3,
        "scores": {
            "mathematics": 90,
            "spanish": {
                "origin": 60,
                "present": 80,
                "curture": {
                    "aclass": 60,
                    "bclass": {
                        "senior": 70,
                        "junior": 60,
                        "intermediate": 80
                    }
                }
            },
            "english": 100,
            "pe": {
                "run": {
                    "point": 4,
                    "term": 1,
                },
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
            "mathematics": 90,
            "spanish": {
                "origin": 90,
                "present": 70,
                "curture": {
                    "aclass": 60,
                    "bclass": {
                        "senior": 90,
                        "junior": 90,
                        "intermediate": 70
                    }
                }
            },
            "english": 80,
            "pe": {
                "run": {
                    "point": 3,
                    "term": 2,
                },
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
            "mathematics": 90,
            "spanish": {
                "origin": 80,
                "present": 60,
                "curture": {
                    "aclass": 50,
                    "bclass": {
                        "senior": 40,
                        "junior": 60,
                        "intermediate": 50
                    }
                }
            },
            "english": 75,
            "pe": {
                "run": {
                    "point": 5,
                    "term": 1,
                },
                "jump": 90
            }
        }
    }
]
var outputC = {
    "age": 7.33,
    "height": 3.0,
    "weight": 5.0,
    "scores": {
        "mathematics": 90.0,
        "spanish": {
            "origin": 76.67,
            "present": 70,
            "curture": {
                "aclass": 56.67,
                "bclass": {
                    "senior": 66.67,
                    "junior": 70,
                    "intermediate": 66.67
                }
            }
        },
        "english": 85.0,
        "pe": {
            "run": {
                "point": 4,
                "term": 1.33
            },
            "jump": 91.67
        }
    }
}
*/

/**
 * var c = {
    'age': "7.33",
    'height': "3.00",
    'scores-english': "85.00",
    'scores-mathematics': "90.00",
    'scores-pe-jump': "91.67",
    'scores-pe-run-point': "4.00",
    'scores-pe-run-term': "1.33",
    'scores-spanish-curture-aclass': "56.67",
    'scores-spanish-curture-bclass-intermediate': "66.67",
    'scores-spanish-curture-bclass-junior': "70.00",
    'scores-spanish-curture-bclass-senior': "66.67",
    'scores-spanish-origin': "76.67",
    'scores-spanish-present': "70.00",
    'weight': "5.00"
}
*/

/**测试数据3
var testC = [
    {
        "studentId": 1,
        "age": 7,
        "assets": {
            "gold": 9,
            "house": 6,
            "money": {
                "savings": 3000,
                "stock": 500
            },
        },
        "height": 2,
        "weight": 3,
        "scores": {
            "mathematics": 90,
            "spanish": {
                "origin": 60,
                "present": 80,
                "curture": {
                    "aclass": 60,
                    "bclass": {
                        "senior": 70,
                        "junior": 60,
                        "intermediate": 80
                    }
                }
            },
            "english": 100,
            "pe": {
                "run": {
                    "point": 4,
                    "term": 1,
                },
                "jump": 95
            }
        }
    },
    {
        "studentId": 2,
        "age": 8,
        "assets": {
            "gold": 7,
            "house": 7,
            "money": {
                "savings": 2000,
                "stock": 600
            },
        },
        "height": 4,
        "weight": 6,
        "scores": {
            "mathematics": 90,
            "spanish": {
                "origin": 90,
                "present": 70,
                "curture": {
                    "aclass": 60,
                    "bclass": {
                        "senior": 90,
                        "junior": 90,
                        "intermediate": 70
                    }
                }
            },
            "english": 80,
            "pe": {
                "run": {
                    "point": 3,
                    "term": 2,
                },
                "jump": 90
            }
        }
    },
    {
        "studentId": 3,
        "age": 7,
        "assets": {
            "gold": 8,
            "house": 5,
            "money": {
                "savings": 1000,
                "stock": 700
            },
        },
        "height": 3,
        "weight": 6,
        "scores": {
            "mathematics": 90,
            "spanish": {
                "origin": 80,
                "present": 60,
                "curture": {
                    "aclass": 50,
                    "bclass": {
                        "senior": 40,
                        "junior": 60,
                        "intermediate": 50
                    }
                }
            },
            "english": 75,
            "pe": {
                "run": {
                    "point": 5,
                    "term": 1,
                },
                "jump": 90
            }
        }
    }
]
var outputC = {
    "age": 7.33,
    "assets": {
        "gold": 8,
        "house": 6,
        "money": {
            "savings": 2000,
            "stock": 600
        },
    },
    "height": 3.0,
    "weight": 5.0,
    "scores": {
        "mathematics": 90.0,
        "spanish": {
            "origin": 76.67,
            "present": 70,
            "curture": {
                "aclass": 56.67,
                "bclass": {
                    "senior": 66.67,
                    "junior": 70,
                    "intermediate": 66.67
                }
            }
        },
        "english": 85.0,
        "pe": {
            "run": {
                "point": 4,
                "term": 1.33
            },
            "jump": 91.67
        }
    }
}
*/

/**
 * var c = {
    'age': "7.33",
    'height': "3.00",
    'scores-english': "85.00",
    'scores-mathematics': "90.00",
    'scores-pe-jump': "91.67",
    'scores-pe-run-point': "4.00",
    'scores-pe-run-term': "1.33",
    'scores-spanish-curture-aclass': "56.67",
    'scores-spanish-curture-bclass-intermediate': "66.67",
    'scores-spanish-curture-bclass-junior': "70.00",
    'scores-spanish-curture-bclass-senior': "66.67",
    'scores-spanish-origin': "76.67",
    'scores-spanish-present': "70.00",
    'weight': "5.00",
    'assets-house': 6,
    'assets-money-stock': 600,
    'assets-money-savings': 2000,
    'assets-gold': 9,
}
*/



















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