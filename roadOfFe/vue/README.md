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

参考：  
1[kanyun](https://www.kancloud.cn/hexiumin/vuea/2190212)

