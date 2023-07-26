- [webpack](#webpack)
  - [概述](#概述)
    - [前端工程化](#前端工程化)
    - [前端为什么要进行打包和构建?](#前端为什么要进行打包和构建)
    - [Webpack基础](#webpack基础)
      - [Webpack打包流程](#webpack打包流程)
      - [Webpack loader](#webpack-loader)
        - [如何实现一个loader](#如何实现一个loader)
      - [loader与Plugin区别](#loader与plugin区别)
      - [webpach打包的hash](#webpach打包的hash)
        - [allhash](#allhash)
        - [chunkhash](#chunkhash)
        - [contenthash](#contenthash)

# webpack  

## 概述  
### 前端工程化  

### 前端为什么要进行打包和构建?  
1）打包后可使体积更小（Tree-Shaking、压缩、合并），加载更快；  
2）能编译高级语言或语法（TypeScript、ES6+、SCSS、模块化）；  
3）兼容性和错误检查（Polyfill、postcss、ESLint）  


### Webpack基础  

#### Webpack打包流程  

#### Webpack loader  

##### 如何实现一个loader  



#### loader与Plugin区别  
loader，它是一个转换器，将A文件进行编译成B文件，比如：将A.less转换为A.css，单纯的文件转换过程。  

plugin是一个扩展器，它丰富了webpack本身，针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务。  

#### webpach打包的hash  

##### allhash  
fullhash（webpack4.x版本及之前为 hash，webpack5.x中使用 fullhash 和 hash 均可）  
fullhash是全量的hash，是整个项目级别的。只要项目中有任何一个的文件内容发生变动，打包后所有文件的hash值都会发生改变。  


##### chunkhash  
chunkhash根据不同的入口文件(entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。当某个文件内容发生变动时，再次执行打包，只有该文件以及依赖该文件的文件的打包结果 hash 值会发生改变。  


##### contenthash  
contenthash 是只有当文件自己的内容发生改变时，其打包的 hash 值才会发生变动。  
contenthash在webpack4 之前都只能在css上使用，并不能在js上使用  


hash、chunkhash、contenthash，首先生成效率越来越低，成本越来越高，影响范围越来越小，精度越来越细。hash是一整个项目，一次打包，只有一个hash值，是项目级的。  
chunhash是从入口entry出发，到它的依赖，以及依赖的依赖，依赖的依赖的依赖，等等，一直下去，所打包构成的代码块(模块的集合)叫做一个chunk，也就是说，入口文件和它的依赖的模块构成的一个代码块，被称为一个chunk。  
contenthash是哈希只跟内容有关系，内容不变，哈希值不变。与chunkhash的区别可以举上面contenthash的例子，同时可以说明contenthash跟内容有关，但是chunkhash会考虑很多因素，比如模块路径、模块名称、模块大小、模块id等等。  

 
参考：  
1[webpack 中 loader 和 plugin 的区别是什么](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/308#issuecomment-548634513)  
2[webpack中fullhash、chunkhash和contenthash的区别](https://juejin.cn/post/6971987696029794312)  
3[重学webpack——一文彻底了解hash、chunkhash和contenthash的区别](https://blog.csdn.net/qq_17175013/article/details/119250701)
