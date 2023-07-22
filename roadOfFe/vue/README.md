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

### Vue-Router原理  
HTML5 history api  


## Vuex  

## Pinia  



参考：  
1[kanyun](https://www.kancloud.cn/hexiumin/vuea/2190212)
2[web前端面试 - 面试官系列](https://vue3js.cn/interview/vue/spa.html#三、实现一个spa)

