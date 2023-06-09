# 网络相关知识点  

## http基础知识  
### http Header

### 常见状态码  
1xx  Informational(信息性状态码) - 接收的请求正在处理
2xx  Success(成功状态码) - 请求正常处理完毕
3xx  Redirection(重定向状态码)
4xx  Client Error(客户端错误状态码)
5xx  Server Error(服务器错误状态码)  

常用状态码
1 | 2 | 3 | 4  
-- | -- | -- | --
服务器上没有请求的资源 | 404 |  Not Found | 表明服务器上无法找到请求的资源。另外也可在服务器端拒绝请求且不想说明理由时用。  
 ~ | 405 | Method Not Allowed |  ~  




### Restful-API  
Restful API是一种新的API设计方法(早已推广使用)  
传统API设计：把每个url当作一个功能  
Restful API设计：把每个url当作一个唯一的资源  
如何设计成一个资源？  
1) 尽量不使用url参数  
传统API设计: /api/list?pageIndex=2  
Restful API设计: /api/list/2  

2) 用method表示操作类型
(传统API设计)如：  
post请求  
post请求  
get请求  
Restful API设计：  
post请求：/api/blog  
patch请求: /api/blog/100  
get请求：/api/blog/100
delete请求：


### http缓存  
描述一下http的缓存机制 
#### cache-control 与 http强制缓存  
#### Etag和Last-Modified http协商缓存

## 网络连接  

### 页面加载形式  

#### 加载过程  
DNS解析：域名->IP地址  
浏览器根据IP地址向服务器发起http请求  
服务器处理http请求并返回给浏览器  

#### 渲染过程  
根据HTML代码生成DOM树  
根据CSS代码生成CSSOM  
将DOM Tree 和 CSSOM 整合形成Render Tree 

根据Render Tree渲染页面  
遇到`<script>`则暂停渲染，优先加载并执行script  
直至渲染完成


### 从输入url到看到页面发生了什么？  
1.输入url  
2.DNS解析  
3.Server处理  
4.浏览器处理

## ajax  
### 手写ajax  
```
const xhr = new XMLHttpRequest()
xhr.open('GET', '/api', true) // true为异步
xhr.onreadystatechange = function () {
    if(xhr.readyState === 4) {
        if(xhr.state === 200) {
            console.log(xhr.responseText)
        }
    }
}
xhr.send()
```

## 网络安全  

### 浏览器的同源策略  
ajax请求时，浏览器要求当前网页和server必须同源(安全)  
同源：协议、域名、端口 3者必须一致

### 跨域  
所有跨域都必须经过server端允许和配合  
未经server端允许就实现跨域，说明浏览器有漏洞，危险信号  

#### jsonp  
`<script>`可绕过
#### CORS  
服务器设置http header 

### XSS攻击  
#### 定义  
#### 防御

### CSRF攻击  
#### 定义  
#### 防御  
抵御CSRF攻击关键在于：在请求中放入攻击者所不能伪造的信息，且该信息不存在于cookie中。  
开发者可在HTTP请求中以参数形式加入一个随机产生的token，并在服务器端建立一个拦截器来验证这个token。若请求中请求中没有token或token内容不正确，则认为可能是CSRF攻击而拒绝。  
token可以在用户登录后于服务端产生并放于session中，然后在每次请求把token从session中拿出，与请求中的token进行对比。