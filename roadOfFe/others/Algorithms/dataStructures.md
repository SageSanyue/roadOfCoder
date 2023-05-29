#数据结构  

## 数组  

### 二维数组  

### JS数组与计算机语言数组区别(链表与数组辨析)  
“数组”在大多数的计算机语言中，都有一个“存储在连续的内存空间里”这样的必要条件，数组都对应着一段连续的内存。  
如果我们想要在任意位置删除一个元素，那么该位置往后的所有元素，都需要往前挪一个位置；相应地，如果要在任意位置新增一个元素，那么该位置往后的所有元素也都要往后挪一个位置。  

假设数组的长度是 n，那么因增加/删除操作导致需要移动的元素数量，就会随着数组长度 n 的增大而增大，呈一个线性关系。所以说数组增加/删除操作对应的复杂度就是 O(n)。   

JS比较特别，“JS数组未必是真正的数组”。若我们在一个JavaScript数组中只定义了一种类型的元素，比如: `const a = [1,3,2,4,7]` ，它是一个纯数字数组，那么对应的确实是连续内存。  
但如果我们定义了含不同类型元素的JavaScript：`const b = [1, {c: 3}, 'abc', true]`它对应的就是一段非连续的内存。此时，JS 数组不再具有数组的特征，其底层使用哈希映射分配内存空间，是由对象链表来实现的。


## 栈 Stack  

## 队列 Queue  

## 链表 List  

## 树 Tree  

### 二叉树  


#### 二叉树递归遍历  

  


引用参考：  
[1] 修言-[前端算法与数据结构面试：底层逻辑解读与大厂真题训练](https://juejin.cn/book/6844733800300150797?enter_from=course_center&utm_source=course_center)