# webpack  

## 概述  
### 前端工程化  

### 前端为什么要进行打包和构建?  
1）打包后可使体积更小（Tree-Shaking、压缩、合并），加载更快；  
2）能编译高级语言或语法（TypeScript、ES6+、SCSS、模块化）；  
3）兼容性和错误检查（Polyfill、postcss、ESLint）  

#### loader与Plugin区别  
loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。  

plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务。  
 
参考：  
1[webpack 中 loader 和 plugin 的区别是什么](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/308#issuecomment-548634513)  

