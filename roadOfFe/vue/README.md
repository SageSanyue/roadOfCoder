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

参考：  
1[kanyun](https://www.kancloud.cn/hexiumin/vuea/2190212)

