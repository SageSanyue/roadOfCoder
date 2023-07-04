#React学习之路  

## 知识储备  

### 看快速教程  
阮一峰老师的[react教程](https://www.ruanyifeng.com/blog/2015/03/react.html)及其[配套代码](https://github.com/ruanyf/react-demos)  
  
### 细节知识点  
#### JSX  
JSX规则：  
1. ()格式化  
将标签用()包裹起来，与return分开距离也没关系  
```
function HelloMessage() {
    return (
        <div>
          <h1>你好</h1>
          <ul>
            <li><a href="#">内容一</a></li>
            <li><a href="#">内容二</a></li>
          </ul>
        </div>
    )
}
```  

2. return单个标签  
```
function HelloMessage() {
    return (
        <div>
          <h1>你好</h1>
          <ul>
            <li><a href="#">内容一</a></li>
            <li><a href="#">内容二</a></li>
          </ul>
        </div>
        <div>多个根标签不合法会报错</div>
    )
}
```  

3. 容器可使用 div 或 section 或 article 或 Fragment 或 `<></>`  
```
function HelloMessage() {
    return (
        <>
           <div>
             <h1>你好</h1>
             <ul>
               <li><a href="#">内容一</a></li>
               <li><a href="#">内容二</a></li>
             </ul>
           </div>
           <div>这样就不算根标签了</div>
        </>
    )
}
```  

4. html属性名使用驼峰命名法  
```
function HelloMessage() {
    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        console.log('点击事件')
    }
    return (
        // onClick驼峰形式，与html中onclick写法不同
        <div onClick={handleClick}>
          <h1>你好</h1>
          <ul>
            <li><a href="#">内容一</a></li>
            <li><a href="#">内容二</a></li>
          </ul>
        </div>
    )
}
```  

5. className替换class
```
function HelloMessage() {
    return (
        // className，与html中class写法不同
        <div className="container">
          <h1>你好</h1>
          <ul>
            <li><a href="#">内容一</a></li>
            <li><a href="#">内容二</a></li>
          </ul>
        </div>
    )
}
```  

6. 每个标签必须有封闭`/`  
```
function HelloMessage() {
    return (
        <div onClick={handleClick}>
          <h1>你好</h1>
          <ul>
            <li>
              <a href="#">内容一</a>
              { /* 封闭标签 */}
              <img src="" alt="" />
            </li>
            <li><a href="#">内容二</a></li>
          </ul>
        </div>
    )
}
```  

#### 函数组件  
函数组件细节：  
1.函数组件必须返回jsx  
```
import React from 'react';
import ReactDOM from 'react-dom/client';

// 函数组件必须要有返回值jsx/tsx
function HelloMessage() {
    console.log('Hello React!') // 无jsx/tsx返回值会报错
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(<HelloMessage />)
```  


#### 父子组件通讯  


### React生命周期  

### state状态等  


## Demo范例入手 
### ToDoList  

## 参考资料  
