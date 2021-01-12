## http协议
### 概念
超文本传输协议（英文：HyperText Transfer Protocol，缩写：HTTP）是一种用于分布式、协作式和超媒体信息系统的应用层协议。HTTP是万维网的数据通信的基础。
### 发展
* HTTP/0.9
只有一个命令GET
没有HEADER等描述数据的信息
服务器发送完毕，就关闭TCP连接
* HTTP/1.0
增加了很多命令
增加status code和header
多字符集支持、多部分发送、权限、缓存等
* HTTP/1.1
持久连接
pipeline
增加host和其他一些命令
* HTTP2
所有数据以二进制传输
同一个连接里面发送多个请求不再需要按照顺序来
头信息压缩以及推送等提高效率的功能

#### request
##### url
URL是由一串字符组成，这些字符可以是字母，数字和特殊符号。一个URL可以用多种方法来表现,例如：纸上的字迹，或者是用字符集编码的八位字节序列。URL的解释仅取决于所用字符的特性。在大多数URL方案中，都是使用URL不同部分的字符序列来代表因特网协议中所使用的八位字节序列
##### method
* GET
发送请求来获得服务器上的资源，请求体中不会包含请求数据，请求数据放在协议头中。另外get支持快取、缓存
、可保留书签等
* POST
和get一样很常见，向服务器提交资源让服务器处理，比如提交表单、上传文件等，可能导致建立新的资源或者对
原有资源的修改。提交的资源放在请求体中。不支持快取
* HEAD
本质和get一样，但是响应中没有呈现数据，而是http的头信息，主要用来检查资源或超链接的有效性或是否可以可达、检
查网页是否被串改或更新，获取头信息等，特别适用在有限的速度和带宽下
* PUT
和post类似，html表单不支持，发送资源与服务器，并存储在服务器指定位置，要求客户端事先知
道该位置；比如post是在一个集合上（/province），而put是具体某一个资源上（/province/123）。所以put是安全的，
无论请求多少次，都是在123上更改，而post可能请求几次创建了几次资源
* DELLET
请求服务器删除某资源。和put都具有破坏性，可能被防火墙拦截。
* CONNECT
HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。就是把服务器作为跳板，去访问其他网页
然后把数据返回回来，连接成功后，就可以正常的get、post了
* OPTIONS
获取http服务器支持的http请求方法，允许客户端查看服务器的性能
* TRACE
回显服务器收到的请求，主要用于测试或诊断。一般禁用，防止被恶意攻击或盗取信息
##### headers
* content-type
服务端发送的类型
* cookie
客户端暂存服务端的信息
* user-agent
客户端版本号的名字
* referer
告诉服务器我来自于哪里
[header扩展](https://www.jianshu.com/p/60063b692a3f)
##### body
http请求体携带提交的数据，一般在post、put中用到，用来提交需要传回服务器的数据。

#### response
##### status code
100（continue）客户端应继续其请求

101（Switching Protocols）服务器根据客户端的请求切换协议。只能切换到更高级的协议，例如，切换到HTTP的新版本协议

200（ok）请求成功

201（Created）成功请求并创建了新的资源

202（Accepted）已经接受请求，但未处理完成

203（Non-Authoritative Information）请求成功。但返回的meta信息不在原始的服务器，而是一个副本

204（No Content）服务器成功处理，但未返回内容。在未更新网页的情况下，可确保浏览器继续显示当前文档

205（Reset Content）服务器处理成功，用户终端（例如：浏览器）应重置文档视图。可通过此返回码清除浏览器的表单域

301（Moved Permanently）请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替

302（Found）与301类似。但资源只是临时被移动。客户端应继续使用原有URI

304（Not Modified）所请求的资源未修改，服务器返回此状态码时，不会返回任何资源。客户端通常会缓存访问过的资源，通过提供一个头信息指出客户端希望只返回在指定日期之后修改的资源

400（Bad Request）客户端请求的语法错误，服务器无法理解

403（Forbidden）服务器理解请求客户端的请求，但是拒绝执行此请求

404（Not Found）服务器无法根据客户端的请求找到资源（网页）。通过此代码，网站设计人员可设置"您所请求的资源无法找到"的个性页面

500（Internal Server Error）服务器内部错误，无法完成请求

501（Not Implemented）服务器不支持请求的功能，无法完成请求

505（HTTP Version not supported）服务器不支持请求的HTTP协议的版本，无法完成处理

[更多状态码](https://www.runoob.com/http/http-status-codes.html)
##### response headers
* Allow 服务器支持哪些请求方法（如GET、POST等）
* Content-Encoding 文档的编码（Encode）方法。只有在解码之后才可以得到Content-Type头指定的内容类型
* Content-Length 表示内容长度。只有当浏览器使用持久HTTP连接时才需要这个数据
* Last-Modified 文档的最后更新时间
[更多响应头](https://www.runoob.com/http/http-header-fields.html)
##### response body
响应体主要就是服务器返回客户端的信息

##### 在浏览器中发送http请求
**输入网址发生的事情**
1. 浏览器查找域名的IP地址
2. 浏览器与目标服务器建立TCP连接
3. 浏览器通过http协议发送请求
4. 某些服务会做永久重定向响应
5. 浏览器跟踪重定向地址
6. 服务器处理请求
7. 服务器发出一个HTML响应
8. 释放TCP连接
9. 浏览器显示页面
10. 浏览器发送获取嵌入在HTML中的其他内容
[详细了解](https://blog.csdn.net/jiao_0509/article/details/82491299)
##### XMLHttpRequest
XMLHttpRequest 对象用于在后台与服务器交换数据
[使用方法](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)
##### fetch
fetch是一种HTTP数据请求的方式，是XMLHttpRequest的一种替代方案。fetch不是ajax的进一步封装，而是原生js。Fetch函数就是原生js，没有使用XMLHttpRequest对象。
使用事例
```
var req = new Request(URL,
  {
  method: 'GET',
   cache: 'reload'
   }
  );
fetch(req).then(function(response) {
  return response.json();
}).then(function(json) {
  insertPhotos(json);
});
```
[fetch接口](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

##### 在nodejs中接收并处理请求，返回结果
##### 搭建nodejs服务
```
const http=require('http');
const server =http.createServer();

server.listen(3000,()=>{
    console.log('Server is running 3000')
})

server.on('request',(req,res)=>{
    res.end('Hello Nodejs');
})
```
[搭建步骤](https://www.jianshu.com/p/8de5d3d48507)
**request事例代码**
get请求
```var request = require('request');
request('url', function (error, response, body)
{
  if (!error && response.statusCode == 200) {
    console.log(body)
  }
});
```
post请求
```
var request = require('request');
var url="请求url";
var requestData="需要传输的数据";
request({
    url: url,
    method: "POST",
    json: true,
    headers: {
        "content-type": "application/json",
    },
    body: JSON.stringify(requestData)
}, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body) // 请求成功的处理逻辑
    }
});
```
##### 浏览器同源策略
同源定义：如果两个页面的协议，端口（如果有指定）和主机都相同，则两个页面具有相同的源。我们也可以把它称为“协议/主机/端口 tuple”，或简单地叫做“tuple". ("tuple" ，“元”，是指一些事物组合在一起形成一个整体，比如（1，2）叫二元，（1，2，3）叫三元)

同源策略（Same origin policy）是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，则浏览器的正常功能可能都会受到影响。可以说Web是构建在同源策略基础之上的，浏览器只是针对同源策略的一种实现。

同源策略，它是由Netscape提出的一个著名的安全策略。

现在所有支持JavaScript 的浏览器都会使用这个策略。

所谓同源是指，域名，协议，端口相同。

当一个浏览器的两个tab页中分别打开来 百度和谷歌的页面
当浏览器的百度tab页执行一个脚本的时候会检查这个脚本是属于哪个页面的，即检查是否同源，只有和百度同源的脚本才会被执行。

如果非同源，那么在请求数据时，浏览器会在控制台中报一个异常，提示拒绝访问。

同源策略是浏览器的行为，是为了保护本地数据不被JavaScript代码获取回来的数据污染，因此拦截的是客户端发出的请求回来的数据接收，即请求发送了，服务器响应了，但是无法被浏览器接收。

[了解更多](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)

##### 跨越请求
**跨越解决方案**
1. 通过jsonp跨域
2. document.domain + iframe跨域
3. location.hash + iframe
4. window.name + iframe跨域
5. postMessage跨域
6. 跨域资源共享（CORS）
7. nginx代理跨域
8. nodejs中间件代理跨域
9. WebSocket协议跨域


[详细了解](https://www.cnblogs.com/sxgxiaoge/p/9251875.html)

**三种类型**
跨域是浏览器禁止的，服务端并不禁止跨域

1.JSONP，JSONP方式无法发送POST请求，只能通过URL后面带参数实现，而且想要确定JSONP的请求是否失败并不容易，dataType: 'jsonp',配置请求的数据类型为jsonp，模拟src标签的形式就行数据的获取


2.设置CORS头“Access-Control-Allow-Origin”相当于设置报文请求头中的Access-Control-Allow-Origin字段的值 + *

Access-Control-Allow-Origin: <origin>

Access-Control-Allow-Origin: https://developer.mozilla.org
3.基本原理是用服务端代理解决浏览器跨域，proxyTable和nginx，反向代理。proxyTable 使用了 http-proxy-middleware

原理就是将浏览器请求发给自己的服务端然后，由自己的服务端再转发给要跨域的服务端，做一层代理。

nginx是解决生产上的跨域问题，原理是将反向代理的原理就是将前端的请求地址和后端的响应地址用nginx转发到同一个地址下，如5500端口和3000端口都转到3003端口下，
所以解决了浏览器同源限制的问题，就是使用 服务端的代理，将请求进行转发到不同的后端服务下。
