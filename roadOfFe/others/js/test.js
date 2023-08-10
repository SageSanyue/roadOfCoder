/*
实现前端一个并发请求控制函数
1. 输入URL数组 和 限制请求数
2. 按照 限制请求数 控制前端同时可以并发请求数量
3. 请求操作直接用 window.fetch
4. 最后根据 URL数组的顺序返回请求结果数组
*/
 
function requestLimit(urlList, limitCount) {
    // TODO
    // let arr = urlList.slice(0, limitCount)
    let promiseArr
    let result = []
    for(let i = 0; i < urlList.length; i++) {
        let promise = new Promise((resolved, rejected) => {
            try {
                fetch(urlList[i])
                resolved
            } catch {
                rejected
            }
        })
        promiseArr.push(promise)
    }
    let newArr
    for(let i = 0; i < promiseArr.length; i++) {
        newArr.push(promiseArr[i])
        if(i % limitCount === 0){
            result.push(Promise.allSettled(newArr))
        }
    }
    // promiseArr.splice(0, 3)
    
    return result
}
    
    
   async function main() {
    // 测试效果
    const urlList = [
      'https://unpkg.com/vue@3.2.31/package.json?v=0',
      'https://unpkg.com/vue@3.2.31/package.json?v=1',
      'https://unpkg.com/vue@3.2.31/package.json?v=2',
      'https://unpkg.com/vue@3.2.31/package.json?v=3',
      'https://unpkg.com/vue@3.2.31/package.json?v=4',
      'https://unpkg.com/vue@3.2.31/package.json?v=5',
      'https://unpkg.com/vue@3.2.31/package.json?v=6',
      'https://unpkg.com/vue@3.2.31/package.json?v=7',
      'https://unpkg.com/vue@3.2.31/package.json?v=8',
    ]
    limitCount = 3;
    const result =  await requestLimit(urlList, limitCount);
   }
   main();