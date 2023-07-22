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

可用于图片懒加载等场景，如设置一个v-lazy自定义指令完成图片懒加载：
```JavaScript
const LazyLoad = {
    // install方法
    install(Vue,options){
    	  // 代替图片的loading图
        let defaultSrc = options.default;
        Vue.directive('lazy',{
            bind(el,binding){
                LazyLoad.init(el,binding.value,defaultSrc);
            },
            inserted(el){
                // 兼容处理
                if('IntersectionObserver' in window){
                    LazyLoad.observe(el);
                }else{
                    LazyLoad.listenerScroll(el);
                }
                
            },
        })
    },
    // 初始化
    init(el,val,def){
        // data-src 储存真实src
        el.setAttribute('data-src',val);
        // 设置src为loading图
        el.setAttribute('src',def);
    },
    // 利用IntersectionObserver监听el
    observe(el){
        let io = new IntersectionObserver(entries => {
            let realSrc = el.dataset.src;
            if(entries[0].isIntersecting){
                if(realSrc){
                    el.src = realSrc;
                    el.removeAttribute('data-src');
                }
            }
        });
        io.observe(el);
    },
    // 监听scroll事件
    listenerScroll(el){
        let handler = LazyLoad.throttle(LazyLoad.load,300);
        LazyLoad.load(el);
        window.addEventListener('scroll',() => {
            handler(el);
        });
    },
    // 加载真实图片
    load(el){
        let windowHeight = document.documentElement.clientHeight
        let elTop = el.getBoundingClientRect().top;
        let elBtm = el.getBoundingClientRect().bottom;
        let realSrc = el.dataset.src;
        if(elTop - windowHeight<0&&elBtm > 0){
            if(realSrc){
                el.src = realSrc;
                el.removeAttribute('data-src');
            }
        }
    },
    // 节流
    throttle(fn,delay){
        let timer; 
        let prevTime;
        return function(...args){
            let currTime = Date.now();
            let context = this;
            if(!prevTime) prevTime = currTime;
            clearTimeout(timer);
            
            if(currTime - prevTime > delay){
                prevTime = currTime;
                fn.apply(context,args);
                clearTimeout(timer);
                return;
            }

            timer = setTimeout(function(){
                prevTime = Date.now();
                timer = null;
                fn.apply(context,args);
            },delay);
        }
    }

}
export default LazyLoad;
```

## Weppack相关  
通常我们还会为延迟加载的路由添加“魔法注释”(webpackChunkName)来自定义包名，在打包时，该路由组件会被单独打包出来。

作用就是webpack在打包的时候，对异步引入的库代码（lodash）进行代码分割时（需要配置webpack的SplitChunkPlugin插件），为分割后的代码块取得名字。  

### Webpack基础  

#### Webpack热更新  
Webpack热更新原理  


 

### Wbpack与Vite  



#### Vite  
vite的特点:  
- 轻量
- 按需打包
- HMR(热渲染依赖)  

Vite 执行vite serve 时，内部直接启动了web Server, 并不会先编译所有的代码文件。


##### 两者对比  
如果应用过于复杂，使用Webpack 的开发过程会出现以下问题：  
Webpack Dev Server 冷启动时间会比较长(webpack dev server 在启动时需要先build一遍)；  
Webpack HMR 热更新的反应速度比较慢；  

- webpack先打包再启动开发服务器，请求服务器时直接给予打包后的结果；Vite直接启动开发服务器，请求哪个模块再对哪个模块进行实时编译，故开发热更新速度极快；  
- 由于现代浏览器本身就支持ES Modules，会主动发起请求去获取所需文件。Vite利用这点，将开发环境下的模块文件作为浏览器要执行的文件，而不是像webpack先打包文件再交给浏览器执行；
- 在HRM方面，当某个模块内容改变时，Vite让浏览器去重新请求该模块即可，而不是像webpack重新将该模块的所有依赖重新编译； 
- 当需要打包到生产环境时，Vite使用传统的rollup进行打包，所以，Vite的优势是体现在开发阶段，另外，由于Vite使用的是ES Module，所以代码中不可以使用CommonJs；  


参考：  
1 [路由懒加载+webpackChunkName](http://www.zhangqilong.cn/pages/dfab28/#如何命名chunk的名称) 
2 [看云](https://static.kancloud.cn/vvmily_king/vvmily/2765290) 
3 [浅谈Vite原理](https://juejin.cn/post/6923417451333959694)  
4 [web前端面试](https://vue3js.cn/interview/webpack/HMR.html)
5 [介绍下webpack热更新原理](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/118)  
6 [45道Promise面试题](https://juejin.cn/post/6844904077537574919)  
7 [web前端面试 - 面试官系列](https://vue3js.cn/interview/vue/directive.html#三、应用场景)
