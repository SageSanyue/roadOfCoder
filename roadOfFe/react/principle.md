# React原理  

## DOM diff  
所谓[DOM diff](https://calendar.perfplanet.com/2013/diff/)，在React中： 

```   
组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。  
根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，  
这种算法叫做 DOM diff ，它可以极大提高网页的性能表现。
```  

## 参考文献  
[1] [React 入门实例教程-阮一峰](https://www.ruanyifeng.com/blog/2015/03/react.html)  
