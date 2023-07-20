# 前端性能优化  

## 浏览器  

### 加载  

#### defer和async的区别  
```
<script src="#link("xxxx/xx.js")" type="text/javascript" async defer></script>
```

defer 和 async有一个共同点：下载此类脚本都不会阻止页面呈现（异步加载），区别在于：

async 执行与文档顺序无关，先加载哪个就先执行哪个；defer会按照文档中的顺序执行。  

async 脚本加载完成后立即执行，可以在DOM尚未完全下载完成就加载和执行；而defer脚本需要等到文档所有元素解析完成之后才执行。  


两者都是异步去加载外部JS文件，不会阻塞DOM解析。  
async是在外部JS加载完成后，浏览器空闲时，Load事件触发前执行，标记为async的脚本并不保证按照指定他们的先后顺序执行，该属性对于内联脚本无作用(即没有src属性的脚本)。   
DOMContentLoaded和async脚本不会互相等待。DOMContentLoaded可能在async脚本执行之前触发（如果async脚本在页面解析完成后完成加载）
或在async脚本执行之后触发（如果async脚本很快加载完成或在 HTTP 缓存中）。   
应用场景：将独立的第三方脚本集成到页面中时，比如计数器，广告等。  


defer是在JS加载完成后，整个文档解析完成后，触发 DOMContentLoaded 事件前执行。defer可用于对脚本执行顺序有严格要求的情况。  

注意：async和defer属性都仅适用于外部脚本，如果script标签没有src属性，尽管写了async、defer属性也会被忽略。  

在webkit引擎下，建议的方式仍然是把`<script>`写在`<body>`底部，如果需要使用百度谷歌分析等独立库时可以使用async属性，若该`<script>`标签必须写在`<head>`头部内可以使用defer属性。defer 属性在 HTML 解析期间异步下载文件，并且只在 HTML 解析完成后才执行它。对于 defer可以理解是将外链的 js 放在了页面底部。js 的加载不会阻塞页面的渲染和资源的加载。不过 defer 会按照原本的 js 的顺序执行，所以如果前后有依赖关系的 js 可以放心使用。  



参考：
https://juejin.cn/post/7111693402579664932  
https://juejin.cn/post/6844903560879013896
https://www.freecodecamp.org/chinese/news/javascript-performance-async-defer/

### 超长列表DOM数过多问题  

#### IntersectionObserver监听元素进入离开指定可视区域  

## Weppack相关  
通常我们还会为延迟加载的路由添加“魔法注释”(webpackChunkName)来自定义包名，在打包时，该路由组件会被单独打包出来。

作用就是webpack在打包的时候，对异步引入的库代码（lodash）进行代码分割时（需要配置webpack的SplitChunkPlugin插件），为分割后的代码块取得名字。  

参考：  
1[路由懒加载+webpackChunkName](http://www.zhangqilong.cn/pages/dfab28/#如何命名chunk的名称)  

### Wbpack与Vite  

#### Vite  

##### 两者对比  