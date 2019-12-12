### 浏览器份额变化
近年来浏览器有很多，但主流的有五大浏览器，分别是IE，Firefox,Chrom,opera,safari.之前一直是IE独大，之后
出现chrome的地位逐渐上升，目前chrome已经成为浏览器的大哥。

### 浏览器的兼容性
所谓的浏览器兼容性问题，是指因为不同的浏览器对同一段代码有不同的解析
，造成页面显示效果不统一的情况。在大多数情况下，我们的需求是，无论用户用什么浏览器来查看我们的网站或者登陆我们的系统，都应该是统一的显示效果。所以浏览器的兼容
性问题是前端开发人员经常会碰到和必须要解决的问题。

**常见浏览器兼容性问题**
[常出现的情况及解决方法](https://blog.csdn.net/qq_34200964/article/details/81023497)

### 渲染引擎
解析DOM文档和CSS规则并将内容排版到浏览器中显示有样式的界面，也有人称之为排版引擎，
我们常说的浏览器内核主要指的就是渲染引擎

### js引擎
S引擎负责解析Javascript语言，执行javascript语言来实现网页的动态效果

### V8引擎
V8引擎是一个JavaScript引擎实现，最初由一些语言方面专家设计，后被谷歌收购，随后谷歌对其进行了开源。
V8使用C++开发，在运行JavaScript之前，相比其它的JavaScript的引擎转换成字节码或解释执行，V8将其编译成原生机器码（IA-32, x86-64, ARM, or MIPS CPUs），并且使用了如内联缓存（inline caching）等方法来提高性能
V8支持众多操作系统，如windows、linux、android等，也支持其他硬件架构，如IA32,X64,ARM等，具有很好的可移植和跨平台特性。

### 浏览器的内核
1.IE浏览器内核：Trident内核，也是俗称的IE内核  
2.Chrome浏览器内核：统称为Chromium内核或Chrome内核，以前是Webkit内核，现在是Blink内核；  
3.Firefox浏览器内核：Gecko内核，俗称Firefox内核；  
4.Safari浏览器内核：Webkit内核；  
5.Opera浏览器内核：最初是自己的Presto内核，后来是Webkit，现在是Blink内核；  
6.360浏览器、猎豹浏览器内核：IE+Chrome双内核；  
7.搜狗、遨游、QQ浏览器内核：Trident（兼容模式）+Webkit（高速模式）；  
8.百度浏览器、世界之窗内核：IE内核；  
9.2345浏览器内核：以前是IE内核，现在也是IE+Chrome双内核；  

### 浏览器兼容性
由于内核的不同导致了浏览器的兼容问题:  
不同浏览器的内核也不尽相同，所以各个浏览器对网页的解析存在一定的差异。最典型的就是ie8、9、10对于css的版本的要求、jquery的要求。  
常见的兼容性问题：  
1.不同浏览器的标签默认的外补丁（margin）和内补丁（padding）不同  
解决方案：css里增加通配符
```
*{margin：0；padding：0}  
```
2.IE6双边距问题；在IE6中设置了float，同时又设置margin，就会出现边距问题  
解决方案：设置
```
display：inline；  
```
3.当标签的高度设置小于10px，在IE6、IE7中会超出自己设置的高度  
解决方案：超出高度的标签设置overflow：hidden，或者设置line-height的值小于你的设置高度  
4.图片默认有间距  
解决方案：使用float为img布局  
5.IE9以下浏览器不能使用opacity  
解决方案：
```
opacity：0.5；filter：alfha（opacity=50）；filter：progid：DXlmageTransform.Microsoft.Alfha(style=0,opacity=50);  
```
6.边距重叠问题；当相邻两个元素都设置了margin边距时，margin将取最大值，舍弃最小值；  
7.cursor：hand显示手型在safari上不支持  
解决方案：统一使用cursor：pointer  
8.两个块级元素，父元素设置了overflow：auto；子元素设置了position：relative；且高度大于父元素，在IE6、IE7会被隐藏而不是溢出；
解决方案：父级元素设置position：relative  
9.const问题
说明：Firefox下，可以使用const关键字来定义常量；IE下，只能使用var关键字来定义常量。
解决方法：统一使用var关键字来定义常量。  
10.event.srcElement问题
问题说明：IE下，event对象有srcElement属性，但是没有target属性；Firefox下，event对象有target属性，但是没有srcElement属性。
解决方法：使用
```
srcObj = event.srcElement?event.srcElement:event.target;  
```
11.事件绑定

```
IE:dom.attachEvent();
其他浏览器：dom.addEventListener();
```
标准浏览器采用事件捕获的方式对应IE的事件冒泡机制（即标准由最外元素至最内元素或者IE由最内元素到最外元素）最后标准方亦觉得IE这方面的比较合理，所以便将事件冒泡纳入了标准，这也是addEventListener第三个参数的由来，而且事件冒泡作为了默认值。    
12.操作tr的html  
在ie9以下，不能操作tr的innerHTML  
13.ajax略有不同  
IE：ActiveXObject  
其他：xmlHttpReuest  
14.对象宽高赋值问题  
问题说明：FireFox中类似obj.style.height = imgObj.height的语句无效。

### CSS中的兼容性  
1.cursor:hand VS cursor:pointer;firefox不支持hand，但ie支持pointer
解决方法: 统一使用pointer      
2.innerText在IE中能正常工作，但在FireFox中却不行.  
需用textContent。  
解决方法:  
```
if(navigator.appName.indexOf("Explorer") > -1){
document.getElementById('element').innerText = "my text";
} else{
document.getElementById('element').textContent = "my text";
}  
```
3.CSS透明  
IE:filter:progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=60)。
FF：opacity:0.6  
4.css中的width和padding  
在IE7和FF中width宽度不包括padding，在Ie6中包括padding.  
5.FF和IEBOX模型解释不一致导致相差2px  
box.style{width:100;border1px;}
ie理解为box.width =100
ff理解为box.width =100 + 1*2 = 102 //加上边框2px
解决方法：
```
div{margin:30px!important;margin:28px;}
```
注意这两个margin的顺序一定不能写反， IE不能识别!important这个属性，但别的浏览器可以识别。所以在IE下其实解释成这样：div{maring:30px;margin:28px}
重复定义的话按照最后一个来执行，所以不可以只写margin:XXpx!important;  
6.IE5 和IE6的BOX解释不一致
IE5下div{width:300px;margin:0 10px 0 10px;}
div 的宽度会被解释为300px-10px(右填充)-10px(左填充)，最终div的宽度为280px，而在IE6和其他浏览器上宽度则是以 300px+10px(右填充)+10px(左填充)=320px来计算的。这时我们可以做如下修改div{width:300px!important;width /**/:340px;margin:0 10px 0 10px}  
7.ul和ol列表缩进问题
消除ul、ol等列表的缩进时，样式应写成：list-style:none;margin:0px;padding:0px;
经验证，在IE中，设置margin:0px可以去除列表的上下左右缩进、空白以及列表编号或圆点，设置padding对样式没有影响；在 Firefox 中，设置margin:0px仅仅可以去除上下的空白，设置padding:0px后仅仅可以去掉左右缩进，还必须设置list- style:none才能去除列表编号或圆点。也就是说，在IE中仅仅设置margin:0px即可达到最终效果，而在Firefox中必须同时设置margin:0px、 padding:0px以及list-style:none三项才能达到最终效果。  
8.元素水平居中问题

```
FF: margin:0auto;
IE: 父级{ text-align:center;}  
```
9.Div的垂直居中问题
vertical-align:middle; 将行距增加到和整个DIV一样高：line-height:200px;然后插入文字，就垂直居中了。缺点是要控制内容不要换行.  
10.margin加倍的问题  
设置为float的div在ie下设置的margin会加倍。这是一个ie6都存在的bug。解决方案是在这个div里面加上display:inline;  
11.IE与宽度和高度的问题
IE不认得min-这个定义，但实际上它把正常的width和height当作有min的情况来使。这样问题就大了，如果只用宽度和高度，正常的浏览器里这两个值就不会变，如果只用min-width和min-height的话，IE下面根本等于没有设置宽度和高度。    
12.页面的最小宽度
如上一个问题，IE不识别min，要实现最小宽度，可用下面的方法：
```
#container{ min-width: 600px;width:expression(document.body.clientWidth＜ 600? "600px": "auto" );}
```
第一个min-width是正常的；但第2行的width使用了Javascript，这只有IE才认得，这也会让你的HTML文档不太正规。它实际上通过Javascript的判断来实现最小宽度。  
13.DIV浮动IE文本产生3象素的bug
左边对象浮动，右边采用外补丁的左边距来定位，右边对象内的文本会离左边有3px的间距.
```
#box{ float:left; width:800px;} 
#left{ float:left; width:50%;} 
#right{ width:50%;} 
*html #left{ margin-right:-3px; //这句是关键} 
<div id="box">
<div id="left">＜/div>
<div id="right">＜/div>
</div>
```

### app与webview
webview 用来展示网页的 view 组件，该组件是你运行自己的浏览器或者在你的线程中展示线上内容的基础。使用 webkit 渲染引擎来展示，并且支持前进后退等基于浏览历史，放大缩小，等更多功能
[android与webview交互](https://blog.csdn.net/carson_ho/article/details/64904691/)
[ios与webview交互](https://nshipster.cn/wkwebkit/)

### electron
Electron是由Github开发，用HTML，CSS和JavaScript来构建跨平台桌面应用程序的一个开源库。 Electron通过将Chromium和Node.js合并到同一个运行时环境中，并将其打包为Mac，Windows和Linux系统下的应用来实现这一目的。

### web1到web3
* Web 1.0 出现于 20 世纪 90 年代和 21 世纪初。当时的互联网是静态、只读的HTML页面。用户之间的互联也相当有限。
* Web2. 0 也被称为读写网络，开始于 2004 年左右，至今也仍然处于Web2. 0 时代。它由社交媒体网站、博客和在线社区组成，终端用户可以在任何时间实时地交互和协作。
* 与Web2. 0 相比，Web3. 0 更难被定义，很大程度上这是因为Web3. 0 时代还处于初级阶段。以太坊作为Web3. 0 的引领者， 2015 年才正式发布。即使是在 2019 年，能有效提高终端用户体验感的技术仍在开发当中
尽管如此，现在已经有一些关键属性被认为是Web3. 0 的特征。例如，Web3. 0 的目标是在无中介的读写网络中提供更好的以用户为中心的体验。技术使得个人在缺省情况下能控制数据隐私和所有权。
Web3.0 引入去中心化互联网，使寻租第三方对用户交互行为和价值转移的控制力减弱。

### HTML5
HTML5 技术结合了 HTML4.01 的相关标准并革新，符合现代网络发展要求，在 2008 年正式发布。HTML5 由不同的技术构成，其在互联网中得到了非常广泛的应用，提供更多增强网络应用的标准机。与传统的技术相比，HTML5 的语法特征更加明显，并且结合了 SVG 的内容。这些内容在网页中使用可以更加便捷地处理多媒体内容，而且 HTML5中还结合了其他元素，对原有的功能进行调整和修改，进行标准化工作。HTML5 在 2012 年已形成了稳定的版本
**HTML5新特性**
1. 语义化标签
2. 增强型表单
3. 视频和音频
4. Canvas绘图
5. SVG绘图
6. 地理定位
7. 拖放API
8. Web Worker
9. Web Storage
10. WebSocket

### ES6
ECMAScript 6(ES6) 目前基本成为业界标准，它的普及速度比 ES5 要快很多，主要原因是现代浏览器对 ES6 的支持相当迅速，尤其是 Chrome 和 Firefox 浏览器，已经支持 ES6 中绝大多数的特性
**ES6新特性**
1. 不一样的变量声明
2. 箭头函数
3. 模板字符串
4. 函数的参数默认值
5. 扩张运算符
6. 解构
7. 类的定义方式
8. set和map
9. 模块
10. promise对象

**ES6的一些知识点**
- let 和 const：提出了局部作用域中的括号作用域的概念，防止变量提升、变量的重复定义等问题。 

- 解构赋值：他是一种针对数组或者对象进行模式匹配，然后对其中的变量进行赋值。 

- Symbol: ES6 引入了一种新的原始数据类型 Symbol ，表示独一无二的值，最大的用法是用来定义对象的唯一属性名。 

- 提供了新的Map 对象、Set 对象 对于对象的扩充.
map对象可以将任何类型的数据作为键值进行存储，可以使用对应提供的原型方法，例如set、get、has等，并且可以进行map对象的合并，但是也必须保证键值得唯一性； 
set对象进行存储时，必须保证唯一，不能重复，这个对象的值与键为同一个。

- es6中的扩展运算符，或叫展开运算符 在对象进行赋值是，可以对数组和可迭代的对象(set、map)进行操作，相当于将内容展开（数组的for循环取出内容），作为参数的调用、数组的拼接时可以使用。

- es6中的函数拓展箭头函数提供了一种更加简洁的函数书写方式 
```
var f = v => v; 
等价于 var f = function(a){ return a; }
f(1);  //1
```
对于箭头函数来说，对应的this指的是所声明的范围，如全局则是指window。不存在有arguments进行参数的获取，可用…rest。不可以使用new 构造函数。返回对象需要用()包裹 有适用的范围，例如需要调用的是内部的变量时，不可以写为箭头函数，写为正常的声明函数的形式，调用全局变量是适用箭头函数
```
Let x =（xx，xx）=>{}

```

- 使用for of进行迭代 可迭代的数据类型 Array String Map Set Dom元素（正在进行中）

- es6中的class类的出现 class 的本质是 function。 它可以看作一个语法糖，让对象原型的写法更加清晰、更像面向对象编程的语法 可以通过extend进行继承；书写构造函数

- ES6 模块 通过模块化的export 与 import进行开发，解决作用的混乱的问题，一个模块下是一个局部作用域，不会去改变全局作用域的东西，一个单独的文件就是一个模块。
每一个模块都是一个单独的作用域, 也就是说, 在该模块内部定义的变量, 无法被其他模块读取, 除非定义为global(浏览器中为window)对象的属性 
可以通过export导出 对象、数组、变量、函数等 再通过import导入需要用到的模块，例如 //模块定义
同as关键字将导入的变量进行名称改写、星号*表示导入所以的暴露的内容 
```
myModule.js const name = 'Byron'; 
function printName(){ 
  console.log(name);
} 
function printFullName(firstName){ 
console.log(firstName + name);
} 
const myModule = { 
     printName: printName, 
     printFullName: printFullName 
};
export myModule; //加载模块 
import myModule, { printFullName } from './myModule.js';
myModule.printName();
printFullName('Michael'); 
```

- ES6 Promise 对象 Promise 是一个对象，从它可以获取异步操作的消息。 
构造promise对象的函数是同步执行的；
```
const p1 = new Promise(
function(resolve,reject){ 
  resolve('success1'); 
  resolve('success2')
});  
```
如果不设置resolve和reject则一直为执行态pending； 构造出 的p1具有两个原型方法.then和.catch分别用于在函数中是 (resolve还是reject)。 在执行回调的方法时为异步方法，当同步执行完成之后才会去执行异步的代码。 Promise的回调函数的执行时微任务优先于宏任务，setTimeout等.

- ES6 Generator 函数 可以通过 yield 关键字，把函数的执行流挂起，为改变执行流程 其中 * 用来表示函数为 Generator 函数，yield 用来定义函数内部的状态。

``` 
function* func(){ 
console.log("one"); 
yield '1'; 
console.log("two"); 
yield '2'; 
console.log("three"); 
return '3'; 
} 
```

* 通过.next 方法进行执行，一个一个的向下搜索直到找到return为结束。 


- ES7 async和await 通过async关键字去修饰函数，会将函数返回为一个promise的对象，return作为返回的resolve的结果;
在函数内部的异步进程前使用await会使这个异步进程现在执行后，才会继续执行后面的进程

### PWA
PWA应用是指那些使用指定技术和标准模式来开发的web应用，这将同时赋予它们web应用和原生应用的特性。
**PWA特性**
* Discoverable, 内容可以通过搜索引擎发现。
* Installable, 可以出现在设备的主屏幕。
* Linkable, 你可以简单地通过一个URL来分享它。
* Network independent, 它可以在离线状态或者是在网速很差的情况下运行。
* Progressive, 它在老版本的浏览器仍旧可以使用，在新版本的浏览器上可以使用全部功能。
* Re-engageable, 无论何时有新的内容它都可以发送通知。
* Responsive, 它在任何具有屏幕和浏览器的设备上可以正常使用——包括手机，平板电脑，笔记本，电视，冰箱，等。
* Safe, 在你和应用之间的连接是安全的，可以阻止第三方访问你的敏感数据。

### webassembly
WebAssembly是一种新的编码方式，可以在现代的网络浏览器中运行 － 它是一种低级的类汇编语言，具有紧凑的二进制格式，可以接近原生的性能运行，并为诸如C / C ++等语言提供一个编译目标，以便它们可以在Web上运行。它也被设计为可以与JavaScript共存，允许两者一起工作。

### PC->移动
互联网时代，我们经历了从PC时代到移动时代的变革，使用移动端产品成为新时代的主旋律。在以网络发展为背景的大时代中，我们关注数据，关注流量，关注每一个用户的注意力，这些都不再是抽象的数据，而是背后一个又一个真实的数字。
移动端方便、碎片化及手机的普及让移动端的发展势头很大。

### 小程序
小程序是一种新的开放能力，开发者可以快速地开发一个小程序。小程序可以在微信内被便捷地获取和传播，同时具有出色的使用体验。

### 未来设备上的浏览器
浏览器这种产品，开始在PC端，是万种“触网”产品的入口，是人们感知程度最低的产品，众所周知，用户感知程度越低的产品，存在度越高，而在以后，浏览器产品也会是这样，也许在目前的移动端纷繁的App面前，浏览器地位有些式微，但在未来，浏览器会以另外一种方式，不知不觉深入到用户的各类行为之中，是大型的系统。

### WEB开发模式的发展
#### 静态
HTML技术，主要是文本和图片（包括gif动态图片）。
特点：简单，只能做信息的展示，无法同用户进行交互。
#### 动态
主要采用CGI/Perl脚本技术，能够实现内容动态，具备了交互性，服务器能够访问文件系统或数据库。
缺点：伸缩性差（为每个请求分配一个新的进程）、安全性差（直接使用系统环境变量和文件系统）、脚本组织混乱并且缺少一种结构化的构造动态应用程序的方式。
#### MVC
MVC即Model、View、Controller即模型、视图、控制器。我在和同行讨论技术，阅读别人的代码时发现，很多程序员倾向于将软件的业务逻辑放在Controller里，将数据库访问操作的代码放在Model里。
#### 前后端分离
前端和后端约定接口之后独立开发，后端提供接口，前端渲染数据。
#### BFF
BFF就是服务器设计 API 时会考虑前端的使用，并在服务端直接进行业务逻辑的处理，又称为用户体验适配器。BFF 只是一种逻辑分层，而非一种技术
