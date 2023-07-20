# CSS 

## CSS基础  

### 语法  

#### 定位  

##### 绝对定位  
如果用了绝对定位，一般要给参考点设置position: relative;

#### 浮动  

##### 清除浮动  
如果用了浮动，其父元素一般需要清楚浮动  
```
.clearfix {
    display: block;
    content: '',
    clear: both;
}
```

#### BFC  

### 布局  

#### 实例  

##### 两栏布局  
1.实现一个 两栏布局， 右侧固定宽度200px，左侧自适应宽度。  
实现一：float + margin-right  
```
<body >
    <div id="right"></div>   
    <div id="left" ></div>
</body>
```  

```
#right{
    float: right;
    width: 200px;
    background: blue;
}            
#left{
    margin-right: 200px;
    background: red;
}
div{
    height:200px;
}
```  
预览链接：https://codepen.io/SageXXX/pen/JjevaEK  


实现二：创建一个新的BFC(块级格式化上下文)来防止文字环绕的原理  
```
<body>
    <div id="right"></div> 
    <div id="left" ></div>
</body>
```

```
* {
  margin:0; 
  padding: 0;
}
html,body{
  height: 100%; /* 高度百分百显示 */
}
#right {
  width: 200px;
  height: 100%;
  background-color: blue;
  float: right;
}
#left {
  height: 100%;
  overflow:hidden;
  background-color: red;
}
```
预览链接：https://codesandbox.io/s/dazzling-jepsen-2c2rhr?file=/index.html  

##### 三栏布局(圣杯布局)  
构建圣杯布局时，对 HTML 的结构是有一定的要求，即 主内容为先 。早期这样做，是让用户在 Web 页面加载缓慢时，就能先看到主内容。  
```
<!-- HTML -->
<header>
    <!-- 页头 -->
</header>
<main>
    <!-- 页面主体，它包含两个侧边栏和一个主内容列 -->
    <article>
        <!-- 页面主内容列，需要排在 nav 和 aside 前面 -->
    </article>
    <aside>
        <!-- 左侧边导航栏 -->
    </aside>
    <aside>
        <!-- 右侧边内容栏，比如广告栏 -->
    </aside>
</main>
<footer>
    <!-- 页脚 -->
</footer>    
```  

flex布局实现圣杯布局：  
```
<header>
    <nav>
        <ul>
            <li><a href="">home</a></li>
            <!-- 其他导航项 -->
        </ul>
    </nav>
</header>
<main>
    <article>
        <h2>现代 Web 布局技术</h2>
        <p>使用 CSS Flexbox 技术构建圣杯布局（Holy Grail Layout）</p>
    </article>
    <aside>
        <h3>左侧列</h3>
    </aside>
    <aside>
        <h3>右侧列</h3>
    </aside>    
</main>
<footer>
    <ul>
        <li><a href="home">home</a></li>
        <!-- 其他导航项 -->
    </ul>
</footer>
```
CSS:  
```
body {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-height: 100vh;
}
main {
  flex: 1 1 0%;
  min-height: 0;
  display: flex;
  gap: 1px;
}
aside {
  min-width: 220px;
  max-width: 320px;
}
aside:nth-of-type(1) {
  order: -1;
}
article {
  flex: 1 1 0%;
  min-width: 0;
}
header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
}
footer {
  display: flex;
  justify-content: center;
}
```



### 其他  

#### 回流与重绘  
1）Reflow：即回流。一般意味着元素的内容、结构、位置或尺寸发生了变化，需要重新计算样式和渲染树。  

2）Repaint：即重绘。意味着元素发生的改变只是影响了元素的一些外观之类的时候（例如，背景色，边框颜色，文字颜色等），此时只需要应用新样式绘制这个元素就可以了。  

回流的成本开销要高于重绘，而且一个节点的回流往往会导致子节点以及同级节点的回流， 所以尽量避免回流。  


作者：前端南玖
链接：https://juejin.cn/post/7028385332391477255
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## SCSS 

### 语法  

#### mixin  

#### @include xx  


## less  
