- [CSS](#css)
  - [CSS基础](#css基础)
    - [语法](#语法)
      - [定位](#定位)
        - [绝对定位](#绝对定位)
      - [浮动](#浮动)
        - [清除浮动](#清除浮动)
      - [BFC](#bfc)
    - [布局](#布局)
      - [实例](#实例)
        - [两栏布局](#两栏布局)
        - [双飞翼布局](#双飞翼布局)
        - [三栏布局(圣杯布局)](#三栏布局圣杯布局)
    - [其他](#其他)
      - [回流与重绘](#回流与重绘)
      - [其他问题](#其他问题)
      - [瀑布流是怎么实现的](#瀑布流是怎么实现的)
      - [flex布局有什么问题](#flex布局有什么问题)
        - [0.5px问题](#05px问题)
        - [1px问题](#1px问题)
  - [SCSS](#scss)
    - [语法](#语法-1)
      - [mixin](#mixin)
      - [@include xx](#include-xx)
  - [less](#less)
  - [响应式开发](#响应式开发)
    - [rem](#rem)
      - [rem弹性布局](#rem弹性布局)
      - [postcss-pxtorem插件](#postcss-pxtorem插件)
      - [amfe-flexible](#amfe-flexible)
    - [vm](#vm)
      - [postcss-px-to-viewport](#postcss-px-to-viewport)
  - [常见功能](#常见功能)
    - [CSS画图](#css画图)
      - [CSS实现三角形](#css实现三角形)
    - [窗口大小](#窗口大小)

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

##### 双飞翼布局  
三栏布局中间自适应  
```HTML
<body>
  <div class="box">
    <div class="middle">
      <div class="content">中间</div>
    </div>
    <div class="left">左边</div>
    <div class="right">右边</div>
  </div>
</body>
```  

```CSS  
div {
  height: 100vh;
  background-color: gray;
}
.middle {
  float: left;
  width: 100%;
}
.middle .content {
  margin: 0 200px 0 150px;
  background-color: yellow;
}
.left {
  float: left;
  width: 150px;
  margin-left: -100%;
}
.right {
  float: left;
  width: 200px;
  margin-left: -200px;
}
```   

预览链接：https://codesandbox.io/s/trusting-easley-hhtmjd?file=/index.html  


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

#### 其他问题  

#### 瀑布流是怎么实现的  

参考：  
[瀑布流的三种实现方案及优缺点](https://juejin.cn/post/7014650146000470053)  
[实现瀑布流布局的三种方式](https://juejin.cn/post/7066680292299243557)  
[手把手带你撸瀑布流布局的5种实现方式](https://zhuanlan.zhihu.com/p/75106288)

#### flex布局有什么问题  


##### 0.5px问题  

参考：  
1[CSS3实现0.5px边框](https://sonya1.github.io/2018/06/12/CSS3实现0.5px边框.html)  
2[手机上如何实现细/1px/0.5px边框](https://zhuanlan.zhihu.com/p/340711204)  
3[CSS border less than 1px [duplicate]](https://stackoverflow.com/questions/13891177/css-border-less-than-1px)  
4[](https://codepen.io/benknight/pen/QWvBqd)


##### 1px问题  
1px问题在Retina 高清屏上才会出现，由于高清屏用多个物理像素显示一个css像素，比如iphone6，由于dpr为2，所以1css像素会用2个物理像素显示，所以看起来1px的线条会特别宽。  

1 物理像素线（也就是普通屏幕下 1px ，高清屏幕下 0.5px 的情况）采用 transform 属性 scale 实现  

```CSS
.mod_grid {
    position: relative;
    &::after {
        // 实现1物理像素的下边框线
        content: '';
        position: absolute;
        z-index: 1;
        pointer-events: none;
        background-color: #ddd;
        height: 1px;
        left: 0;
        right: 0;
        top: 0;
        @media only screen and (-webkit-min-device-pixel-ratio: 2) {
            -webkit-transform: scaleY(0.5);
            -webkit-transform-origin: 50% 0%;
        }
    }
    ...
}
```


解决1px问题的方案有很多，有背景图、阴影、缩放等等，笔者在这里只介绍笔者曾经使用过得方案，就是缩放。原理就是边框固定，把元素整体先放大然后再缩小。  

```CSS
.ele {
    position: relative;
    width: 100px;
    height: 80px;
    &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        border: 1px solid red;
        width: 200%;
        height: 200%;
        transform: scale(0.5);
        transform-origin: left top;
    }
}  
```

## SCSS 

### 语法  

#### mixin  

#### @include xx  


## less  

## 响应式开发  

### rem  

#### rem弹性布局  
rem 弹性布局的核心在于根据视窗大小变化动态改变根元素的字体大小  
给根元素的字体大小设置随着视窗变化而变化的 vw 单位，这样就可以实现动态改变其大小  
其他元素的文本字号大小、布局高宽、间距、留白都使用 rem 单位  
限制根元素字体大小的最大最小值，配合 body 加上最大宽度和最小宽度，实现布局宽度的最大最小限制  

```SCSS
// rem 单位换算：定为 75px 只是方便运算，750px-75px、640-64px、1080px-108px，如此类推
$vw_fontsize: 75; // iPhone 6尺寸的根元素大小基准值
@function rem($px) {
     @return ($px / $vw_fontsize ) * 1rem;
}
// 根元素大小使用 vw 单位
$vw_design: 750;
html {
    font-size: ($vw_fontsize / ($vw_design / 2)) * 100vw; 
    // 同时，通过Media Queries 限制根元素最大最小值
    @media screen and (max-width: 320px) {
        font-size: 64px;
    }
    @media screen and (min-width: 540px) {
        font-size: 108px;
    }
}
// body 也增加最大最小宽度限制，避免默认100%宽度的 block 元素跟随 body 而过大过小
body {
    max-width: 540px;
    min-width: 320px;
}
```  

#### postcss-pxtorem插件  
https://github.com/cuth/postcss-pxtorem  

#### amfe-flexible  

### vm  

#### postcss-px-to-viewport  

## 常见功能  

### CSS画图  

#### CSS实现三角形  
利用border实现三角形图案：  
div盒子t3的宽高均为0，border设置为粗细某数值、颜色透明，需要哪个朝向的三角就设置哪个方向的border颜色。  

``` CSS
.t3{
  width: 0;
  height: 0;
  border: 23px solid transparent;
  border-left-color: #ff0400;
}
```
[预览](http://js.jirengu.com/tujosaguno/1/edit?html,output)

### 窗口大小  
窗口大小常见API  
```
screen.width 获取屏幕的宽度 跟浏览器无关
screen.height 获取屏幕的高度 跟浏览器无关
screen.availWidth 获取屏幕有效宽度 如果任务栏设置在左右两侧的话，去除任务栏宽度
screen.availHeight 获取屏幕有效高度 去除任务栏高度

window.outerWidth 获取浏览器宽度 包括浏览器所有包括侧边栏、窗口镶边和调正窗口大小的边框。
window.outerHeight 获取浏览器高度 包括浏览器所有包括侧边栏、窗口镶边和调正窗口大小的边框。
window.innerWidth：获取浏览器视觉视口宽度（包括滚动条）。
window.innerHeight：获取浏览器视觉视口高度（包括滚动条）。
document.documentElement.clientWidth：获取浏览器布局视口宽度。不包括滚动条。
document.documentElement.clientHeight：获取浏览器布局视口高度。不包括滚动条。

dom.clientWidth：获取元素的宽度 包括内容和内边距
dom.clientHeight：获取元素的高度 包括内容和内边距
dom.offsetWidth：获取元素的宽度 包括内容、内边距、滚动条、边框。
dom.offsetHeight：获取元素的高度 包括内容、内边距、滚动条、边框。
dom.scrollWidth：获取元素内容实际的宽度 包括内边距。
dom.scrollHeight：获取元素内容实际的高度 包括内边距。

dom.clientTop：获取元素上边框高度
dom.clientLeft：获取元素左边框宽度
dom.offsetTop：获取元素距离页面顶部高度
dom.offsetLeft：获取元素距离页面左边的宽度
dom.scrollTop：获取元素滚动条在垂直方向上滚动的距离
dom.scrollLeft：获取元素滚动条在水平方向上滚动的距离
```

参考：  
1[移动端H5网页开发常见问题汇总](https://juejin.cn/post/7055599228478816270)  
2[讲一讲css布局中的双栏布局和三栏布局](https://zhuanlan.zhihu.com/p/106079715)
