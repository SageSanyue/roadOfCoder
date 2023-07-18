# 前端性能优化  

## 浏览器  

### 超长列表DOM数过多问题  

#### IntersectionObserver监听元素进入离开指定可视区域  

## Weppack相关  
通常我们还会为延迟加载的路由添加“魔法注释”(webpackChunkName)来自定义包名，在打包时，该路由组件会被单独打包出来。

作用就是webpack在打包的时候，对异步引入的库代码（lodash）进行代码分割时（需要配置webpack的SplitChunkPlugin插件），为分割后的代码块取得名字。  

参考：  
1[路由懒加载+webpackChunkName](http://www.zhangqilong.cn/pages/dfab28/#如何命名chunk的名称)