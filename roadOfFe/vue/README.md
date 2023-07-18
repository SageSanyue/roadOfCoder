# Vue Road  

## Vue3  

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

参考：  
1[kanyun](https://www.kancloud.cn/hexiumin/vuea/2190212)

