- [Vue Road](#vue-road)
  - [Vue3](#vue3)
    - [API风格](#api风格)
      - [选项式API](#选项式api)
      - [组合式API](#组合式api)
  - [Vue2](#vue2)
    - [Vue2原理](#vue2原理)
      - [Vue2的缺陷是什么？](#vue2的缺陷是什么)
      - [$set()具体使用场景](#set具体使用场景)
      - [$forceUpdate()](#forceupdate)
      - [$nextTick()](#nexttick)
    - [语法](#语法)
      - [v-if和v-show](#v-if和v-show)
        - [对生命周期的影响](#对生命周期的影响)
    - [组件通信](#组件通信)
      - [父子组件通信](#父子组件通信)
        - [给子组件传递多个props达到类似解构赋值的写法](#给子组件传递多个props达到类似解构赋值的写法)
  - [Vue-Router](#vue-router)
    - [路由](#路由)
      - [前端路由与后端路由](#前端路由与后端路由)
        - [前端路由](#前端路由)
        - [后端路由](#后端路由)
        - [SPA单页面利弊](#spa单页面利弊)
        - [MPA多页面利弊](#mpa多页面利弊)
        - [hash模式](#hash模式)
        - [history模式](#history模式)
    - [Vue-Router原理](#vue-router原理)
  - [Vuex](#vuex)
  - [Pinia](#pinia)
  - [Vue2相关](#vue2相关)
    - [SPA](#spa)
      - [SPA优化](#spa优化)
        - [SPA首屏加载优化](#spa首屏加载优化)
    - [MPA](#mpa)
    - [SSR](#ssr)
    - [CSR](#csr)
    - [预渲染Prerender](#预渲染prerender)
      - [服务器端渲染 vs 预渲染 (SSR vs Prerendering)](#服务器端渲染-vs-预渲染-ssr-vs-prerendering)
      - [弊端](#弊端)
    - [PWA](#pwa)

# Vue Road  

## Vue3  

### API风格  

#### 选项式API  
选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。
```HTML
<script>
export default {
  // data() 返回的属性将会成为响应式的状态
  // 并且暴露在 `this` 上
  data() {
    return {
      count: 0
    }
  },

  // methods 是一些用来更改状态与触发更新的函数
  // 它们可以在模板中作为事件处理器绑定
  methods: {
    increment() {
      this.count++
    }
  },

  // 生命周期钩子会在组件生命周期的各个不同阶段被调用
  // 例如这个函数就会在组件挂载完成后被调用
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

#### 组合式API  
通过组合式 API，我们可以使用导入的 API 函数来描述组件逻辑。在单文件组件中，组合式 API 通常会与 `<script setup>` 搭配使用。这个 setup attribute 是一个标识，告诉 Vue 需要在编译时进行一些处理，让我们可以更简洁地使用组合式 API。  

```HTML
<script setup>
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref(0)

// 用来修改状态、触发更新的函数
function increment() {
  count.value++
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```


## Vue2  

### Vue2原理  

#### Vue2的缺陷是什么？  

#### $set()具体使用场景  
使用场景  
当vue的data里边声明或者已经赋值过的对象或者数组（数组里边的值是对象）时，向对象中添加新的属性，如果更新此属性的值，是不会更新视图的。  

使用方法  
调用方法：this.$set( target, key, value )  
target：要更改的数据源(可以是对象或者数组)  
key：要更改的具体数据  
value ：重新赋的值  

`this.$set(this.search, 'costRemarks', [costName])`  

#### $forceUpdate()  

#### $nextTick()

### 语法  

#### v-if和v-show  
v-if: 根据判断条件动态增删DOM元素  
适合在切换不频繁的场景，当为 false 时，可以减少初次渲染时间  

v-show: 根据判断条件动态显示或隐藏元素，通过控制元素的CSS属性display来完成实现效果  
初始渲染代价高，切换代价小，适合需要频繁切换的场景

##### 对生命周期的影响  
v-show:  
当v-show指令附属于普通元素时，指令状态变化不会影响父组件生命周期；  
当v-show附属于组件时，指令状态变化对父组件和自身组件生命周期都无影响，切换时组件始终保持在 mounted 钩子；  

v-if:  
当v-if指令附属于普通元素时，指令状态变化会导致父组件DOM发生变化，父组件将会更新视图，所以会触发父组件beforeUpdate和updated钩子函数；  
当v-if指令附属于组件时，指令状态变化会触发父组件beforeUpdate和updated钩子函数，但是对于本身组件的生命周期的影响是不一样的-  
· v-if从false切换到true时，会触发beforeCreate，created，beforeMount，mounted钩子;  
· v-if从true切换到false时，会触发beforeDestroy和destroyed钩子;  



### 组件通信  

#### 父子组件通信  

##### 给子组件传递多个props达到类似解构赋值的写法  
`<sub :content="content" :a="b" :b="b"></sub>` 可以简写成：  

```
// 父组件文件内  
<sub v-bind="params"></sub>

// 子组件sub文件内
props: ['content', 'a', 'b'] // 可以直接使用对象内部的属性名来接收
```
传入一个对象的所有属性

如果想要将一个对象的所有属性都作为 prop 传入，你可以使用不带参数的 v-bind(取代 v-bind:prop-name)  

```
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```  

```
<blog-post v-bind="post"></blog-post>
<!--与下面的方法等价-->
<blog-post v-bind:id="post.id"  v-bind:title="post.title"></blog-post>
```

https://blog.51cto.com/u_15352995/5295549
https://github.com/heiye-vn/Vue-Notes/blob/master/Vue.js.md#1044-动态传递prop

## Vue-Router  

### 路由  

#### 前端路由与后端路由  
 
##### 前端路由  
前端路由：在SPA应用，大部分页面结构不变，只改变部分内容的使用  
利：不需要每次都从服务器全部获取，快速展现给用户  
弊：使用浏览器的前进、后退键的时候会重新发送请求，没有合理地利用缓存。单页面无法无法在前进、后退的时候记住之前滚动的位置。  

##### 后端路由  
后端路由：通过用户请求的url导航到具体的html页面；每跳转到不同的URL，都是重新访问服务端，然后服务端返回页面。jsp、php、asp等技术实现的用户能通过URL访问的页面，大多是通过后端路由匹配之后再返回给浏览器的。浏览器在地址栏中切换不同的URL时，每次都向后台服务器发出请求，服务器响应请求，在后端路由映射表中查找对应路由的页面和数据，在后台拼接html文件返回给前端，并且每次切换页面时，浏览器都会刷新页面。  

##### SPA单页面利弊  
单页面跳转仅刷新局部资源 ，公共资源(js、css等)仅需加载一次。  
页面跳转时使用js中的append/remove或者show/hide的方式来进行页面内容的更换。数据传递可通过全局变量或者参数传递行相关数据交互。  

##### MPA多页面利弊  
页面经常需要切换，切换效果取决于浏览器和网络情况，对用户体验会有一定负面影响。无法充分利用vue的路由和状态保持，在多个页面之间共享和同步数据状态会成为一个难题。  

##### hash模式  
在HTML5的history模式出现之前，基本都是使用 hash 模式来实现前端路由。 hash值变化不会导致向服务器发送请，hash改变会触发浏览器hashchange事件，浏览器的前进后退也能对其进行控制。  
```JavaScript
// 监听hash变化，点击浏览器的前进后退会触发
window.addEventListener('hashchange', function(event){ 
  let newURL = event.newURL; // hash 改变后的新 url
  let oldURL = event.oldURL; // hash 改变前的旧 url
},false)
```

##### history模式  
在 HTML5之前，浏览器就已经有了history对象。但在早期的history中只能用于多页面的跳转。  
```JavaScript
history.go(-1);       // 后退一页
history.go(2);        // 前进两页
history.forward();     // 前进一页
history.back();      // 后退一页
```  

在 HTML5 的规范中，history新增了以下几个API:
1. history.pushState()         // 添加新的状态到历史状态栈
2. history.replaceState()      // 用新的状态代替当前状态
3. history.state                // 返回当前状态对象  

由于 `history.pushState()` 和 `history.replaceState()` 可以改变url的同时不刷新页面，所以在具备了实现前端路由的能力。  





### Vue-Router原理  


HTML5 history api  


## Vuex  

## Pinia  

## Vue2相关  

### SPA  

#### SPA优化  

##### SPA首屏加载优化  
SPA首屏优化策略：  
我们常用的SPA首屏优化策略是使用 动态加载路由组件。那么即在应用初始，并不加载所有的子路由组件，而是在用户访问时再下载相应的子路由组件。本质上，我们将下载子路由组件的时间均摊到各个子路由组件自身，而不是在首屏集中处理。
以下以 vue-router 为例：  
常用的一种实现是 Vue下的 异步组件 配合webpack的 代码分割 以及babel 转义（syntax-dynamic-import）草案的动态加载语法 import() 来实现动态加载路由组件。import() 默认在内部调用Promise函数，最终返回一个Promise对象，对于不支持Promise的浏览器，需要引入 es6-promise 或 promise-polyfill 或者直接引入 polyfill.io 动态引入polyfill来做兼容。  

```JavaScript
import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)


// 静态加载，不论用户是否访问该页面都在初始化应用时加载
import home from '~/components/home')


// 动态加载方式一，仅在 webpack 请求该模块的 chunk 时才会加载，即只有在用户访问时加载
// 该组件
const app = () => import(/* webpackChunkName: "app" */ '~/components/app')


export default new VueRouter({
  routes: [
    {
      path: '/',
      component: home,
      children: [
        {
          path: '/app',
          component: app
        },
        {
          path: '/info',
          /**
           * 动态加载方式二
           * 1. chunk 命名必须配合 webpack 中 output.chunkFileName: '[name].js' 指
           * 定占位符为 `[name]` 使用
           */
          component: () => import(/* webpackChunkName: "info" */ '~/components/info')
        }
      ]
    }
  ]
})
```  
以上关键点在于使用 import('./module') 代替静态模块加载语法 import module from './module'。  
/* webpackChunkName: "info" */ 注释用于将单个路由下所有组件都打包在同一个异步 chunk 中。即被请求的模块和其应用的所有子模块都会分离到同一个异步 chunk 中。  

```JavaScript
// webpack 相应配置为:
module.exports = {
  // ...
  output: {
    filename; '[name].bundle.js',
+    chunkFileName: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
  // ...
}
```  
以上配置中，output.chunkFilename 用于定义非入口 chunk 的名字。这些文件名在 runtime 时生成，以便于发送 chunks 请求。基于这一点像 [name] 和 [chunkhash] 的占位符需要通过 webpack runtime 将从 chunk id 到占位符的值（该映射即是 [id] 占位符）映射到输出的 bundle 中。当任何 chunk 的占位符的值改变时，都将导致 bundle 失效。output.chunkFilename 的默认值为 [id].js 或根据 output.filename 进行推断（即将其中的 [name] 替换为 [id]，或者直接使用 output.filename 中的 [id] 占位符。）  


### MPA  

### SSR  

### CSR  

### 预渲染Prerender  
SPA预渲染  

#### 服务器端渲染 vs 预渲染 (SSR vs Prerendering)   
如果你调研服务器端渲染 (SSR) 只是用来改善少数营销页面（例如 /, /about, /contact 等）的 SEO，那么你可能需要预渲染。无需使用 web 服务器实时动态编译 HTML，而是使用预渲染方式，在构建时 (build time) 简单地生成针对特定路由的静态 HTML 文件。优点是设置预渲染更简单，并可以将你的前端作为一个完全静态的站点。   

如果你使用 webpack，你可以使用 prerender-spa-plugin 轻松地添加预渲染。它已经被 Vue 应用程序广泛测试 - 事实上，作者是 Vue 核心团队的成员。  

#### 弊端  
Prerender很难覆盖到下面2个场景：  
1. 永远穷尽不了预渲染所有页面，比如博客类网站、租房网站等类似B端发布的网站，在B端操作的过程中会产生新的页面。  
2. 用户相关内容的首屏渲染问题无法解决  
   


### PWA  



参考：  
1[kanyun](https://www.kancloud.cn/hexiumin/vuea/2190212)
2[web前端面试 - 面试官系列](https://vue3js.cn/interview/vue/spa.html#三、实现一个spa)
3[一文读尽前端路由、后端路由、单页面应用、多页面应用](https://segmentfault.com/a/1190000021748190)
4[Vue-cli SEO prerenders using prerender-spa-plugin plug-ins](https://programmer.group/vue-cli-seo-prerenders-using-prerender-spa-plugin-plug-ins.html)

