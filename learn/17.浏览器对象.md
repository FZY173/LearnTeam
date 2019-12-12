# 浏览器对象

## 学习要点（关键字）
window、document、navigator、location、history、File、FormData、Blob

## 了解web API
https://developer.mozilla.org/zh-CN/docs/Web/API

### 一、浏览器环境概述
#### 1、script的integrity属性
使用该属性可以防止攻击者篡改外部脚本（xss），写入该外部脚本的 Hash 签名，用来验证脚本的一致性。
```
<script src="/assets/application.js"
  integrity="sha256-TvVUHzSfftWg1rcfL6TIJ0XKEGrgLyEq6lEpcmrG9qs=">
</script>
```
#### 2、script异步加载
* async
功能：async属性的作用是，使用另一个进程下载脚本，下载时不会阻塞渲染。
注意：一旦采用这个属性，就无法保证脚本的执行顺序。哪个脚本先下载结束，就先执行那个脚本。
* defer
功能：浏览器下载脚本文件的时候，不会阻塞页面渲染。
注意：下载的脚本文件在DOMContentLoaded事件触发前执行（即刚刚读取完</html>标签），而且可以保证执行顺序就是它们在页面上出现的顺序。
#### 3、动态加载
即可以动态生成，生成后再插入页面，从而实现脚本的动态加载。
```
['a.js', 'b.js'].forEach(function(src) {
  var script = document.createElement('script');
  script.src = src;
  document.head.appendChild(script);
});

```
缺点：无法保证顺序，谁先下载完成谁先执行。
解决办法：

#### 4、重流和重绘的优化
* 读取 DOM 或者写入 DOM，尽量写在一起，不要混杂。不要读取一个 DOM 节点，然后立刻写入，接着再读取一个 DOM 节点。
* 缓存 DOM 信息。
* 不要一项一项地改变样式，而是使用 CSS class 一次性改变样式。
* 使用documentFragment操作 DOM
* 动画使用absolute定位或fixed定位，这样可以减少对其他元素的影响。
* 只在必要时才显示隐藏元素。
* 使用window.requestAnimationFrame()，因为它可以把代码推迟到下一次重流时执行，而不是立即要求页面重流。
* 使用虚拟 DOM（virtual DOM）库。
### 二、window对象
#### 1、对象属性
* window.name
表示当前浏览器窗口的名字。这个属性主要配合超链接和表单的target属性使用。
* window.closed，window.opener
window.closed属性返回一个布尔值，表示窗口是否关闭。window.opener属性表示打开当前窗口的父窗口。如果当前窗口没有父窗口（即直接在地址栏输入打开），则返回null。
* window.self，window.window 
两个属性都指向窗口本身。这两个属性只读。
* window.frames，window.length
window.frames属性返回一个类似数组的对象，成员为页面内所有框架窗口。window.length属性返回当前网页包含的框架总数。如果当前网页不包含frame和iframe元素，那么window.length就返回0。
* window.frameElement
window.frameElement属性主要用于当前窗口嵌在另一个网页的情况，返回当前窗口所在的那个元素节点。如果当前窗口是顶层窗口，或者所嵌入的那个网页不是同源的，该属性返回null。
* window.top，window.parent
window.top属性指向最顶层窗口，window.parent属性指向父窗口。
* window.status
用于读写浏览器状态栏的文本。

#### 2、位置大小属性
* window.screenX，window.screenY
返回浏览器窗口左上角相对于当前屏幕左上角的水平距离和垂直距离（单位像素）。两个属性制度。
* window.innerHeight，window.innerWidth
返回网页在当前窗口中可见部分的高度和宽度。
* window.outerHeight，window.outerWidth
返回浏览器窗口的高度和宽度，包括浏览器菜单和边框（单位像素）。这两个属性只读。
* window.scrollX，window.scrollY
window.scrollX属性返回页面的水平滚动距离，window.scrollY属性返回页面的垂直滚动距离，单位都为像素。这两个属性只读。
* window.pageXOffset，window.pageYOffset
上面两个属性的别名。

#### 3、组件属性
* window.locationbar：地址栏对象
* window.menubar：菜单栏对象
* window.scrollbars：窗口的滚动条对象
* window.toolbar：工具栏对象
* window.statusbar：状态栏对象
* window.personalbar：用户安装的个人工具栏对象

#### 4、全局对象属性
* window.document：指向document对象。
* window.location：指向Location对象，用于获取当前窗口的 URL 信息。它等同于document.location属性。
* window.navigator：指向Navigator对象，用于获取环境信息。
* window.history：指向History对象，表示浏览器的浏览历史。
* window.localStorage：指向本地储存的 localStorage 数据。
* window.sessionStorage：指向本地储存的 sessionStorage 数据。
* window.console：指向console对象，用于操作控制台，。
* window.screen：指向Screen对象，表示屏幕信息。
* window.isSecureContext返回一个布尔值，表示当前窗口是否处在加密环境。如果是 HTTPS 协议，就是true，否则就是false。

#### 5、对象的方法
* window.alert()
弹出的对话框，只有一个“确定”按钮，往往用来通知用户某些信息。参数只能是字符串，没法使用 CSS 样式，但是可以用\n指定换行。
* window.prompt()
弹出的对话框，提示文字的下方，还有一个输入框，要求用户输入信息，并有“确定”和“取消”两个按钮。它往往用来获取用户输入的数据。返回值有两种情况，可能是字符串（有可能是空字符串,没有输入信息，直接点击“确定”），也有可能是null(用户点击了“取消”（或者按了 ESC 按钮）)。具体分成三种情况。
* window.confirm()
除了提示信息之外，只有“确定”和“取消”两个按钮，往往用来征询用户是否同意。confirm方法返回一个布尔值，如果用户点击“确定”，返回true；如果用户点击“取消”，则返回false。
* window.open()
 用于新建另一个浏览器窗口，类似于浏览器菜单的新建窗口选项。它会返回新窗口的引用，如果无法新建窗口，则返回null。
* window.close()
window.close方法用于关闭当前窗口，一般只用来关闭window.open方法新建的窗口。
* window.stop()
等同于单击浏览器的停止按钮，会停止加载图像、视频等正在或等待加载的对象。
* window.moveTo()
用于移动浏览器窗口到指定位置。它接受两个参数，分别是窗口左上角距离屏幕左上角的水平距离和垂直距离，单位为像素。
* window.moveBy()
将窗口移动到一个相对位置。它接受两个参数，分别是窗口左上角向右移动的水平距离和向下移动的垂直距离，单位为像素。
* window.resizeTo()，window.resizeBy()
window.resizeTo()方法用于缩放窗口到指定大小。它接受两个参数，第一个是缩放后的窗口宽度（outerWidth属性，包含滚动条、标题栏等等），第二个是缩放后的窗口高度（outerHeight属性）。
window.resizeBy()方法用于缩放窗口。它与window.resizeTo()的区别是，它按照相对的量缩放，window.resizeTo()需要给出缩放后的绝对大小。
* window.scrollTo()，window.scroll()，window.scrollBy()
window.scrollTo方法用于将文档滚动到指定位置。它接受两个参数，表示滚动后位于窗口左上角的页面坐标。
window.scrollBy()方法用于将网页滚动指定距离（单位像素）。它接受两个参数：水平向右滚动的像素，垂直向下滚动的像素。

```
window.scrollBy(0, window.innerHeight)
```

上面代码用于将网页向下滚动一屏。
如果不是要滚动整个文档，而是要滚动某个元素，可以使用下面三个属性和方法。
Element.scrollTop
Element.scrollLeft
Element.scrollIntoView()
* window.print()
跳出打印对话框，与用户点击菜单里面的“打印”命令效果相同。
* window.focus(),window.blur() 
激活窗口，使其获得焦点，出现在其他窗口的前面。window.blur()方法将焦点从窗口移除。

```
var popup = window.open('popup.html', 'Popup Window');
if ((popup !== null) && !popup.closed) {
  popup.focus();
}
```

* window.getSelection()
返回一个Selection对象，表示用户现在选中的文本。使用Selection对象的toString方法可以得到选中的文本。
* window.getComputedStyle()，window.matchMedia()
受一个元素节点作为参数，返回一个包含该元素的最终样式信息的对象。
* window.requestAnimationFrame()
方法跟setTimeout类似，都是推迟某个函数的执行。不同之处在于，setTimeout必须指定推迟的时间，window.requestAnimationFrame()则是推迟到浏览器下一次重流时执行，执行完才会进行下一次重绘。重绘通常是 16ms 执行一次，不过浏览器会自动调节这个速率，比如网页切换到后台 Tab 页时，requestAnimationFrame()会暂停执行。
如果某个函数会改变网页的布局，一般就放在window.requestAnimationFrame()里面执行，这样可以节省系统资源，使得网页效果更加平滑。因为慢速设备会用较慢的速率重流和重绘，而速度更快的设备会有更快的速率。
该方法接受一个回调函数作为参数。
window.requestAnimationFrame()的返回值是一个整数，这个整数可以传入window.cancelAnimationFrame()，用来取消回调函数的执行。
* window.requestIdleCallback()
跟setTimeout类似，也是将某个函数推迟执行，但是它保证将回调函数推迟到系统资源空闲时执行。也就是说，如果某个任务不是很关键，就可以使用window.requestIdleCallback()将其推迟执行，以保证网页性能。

#### 6、事件
* load 事件和 onload 属性 
load事件发生在文档在浏览器窗口加载完毕时。window.onload属性可以指定这个事件的回调函数。
* error 事件和 onerror 属性
浏览器脚本发生错误时，会触发window对象的error事件。我们可以通过window.onerror属性对该事件指定回调函数。


### 三、Navigator
#### 1、对象的属性
* Navigator.userAgent
返回浏览器的 User Agent 字符串，表示浏览器的厂商和版本信息。

```
var ua = navigator.userAgent.toLowerCase();
if (/mobi/i.test(ua)) {
  // 手机浏览器
} else {
  // 非手机浏览器
}
```

通过userAgent可以大致准确地识别手机浏览器，方法就是测试是否包含mobi字符串。

* Navigator.plugins
返回一个类似数组的对象，成员是 Plugin 实例对象，表示浏览器安装的插件，比如 Flash、ActiveX 等。

* Navigator.platform
返回用户的操作系统信息，比如MacIntel、Win32、Linux x86_64等。
* Navigator.onLine
返回一个布尔值，表示用户当前在线还是离线（浏览器断线）.
用户变成在线会触发online事件，变成离线会触发offline事件，可以通过window.ononline和window.onoffline指定这两个事件的回调函数。

```
window.addEventListener('offline', function(e) { console.log('offline'); });
window.addEventListener('online', function(e) { console.log('online'); });

```

* Navigator.language，Navigator.languages
Navigator.language属性返回一个字符串，表示浏览器的首选语言。该属性只读。Navigator.languages属性返回一个数组，表示用户可以接受的语言。Navigator.language总是这个数组的第一个成员。HTTP 请求头信息的Accept-Language字段，就来自这个数组。
* Navigator.geolocation
Navigator.geolocation属性返回一个 Geolocation 对象，包含用户地理位置的信息。注意，该 API 只有在 HTTPS 协议下可用，否则调用下面方法时会报错。
* Navigator.cookieEnabled
返回一个布尔值，表示浏览器的 Cookie 功能是否打开。

#### 2、对象方法
* Navigator.javaEnabled()
返回一个布尔值，表示浏览器是否能运行 Java Applet 小程序。
* Navigator.sendBeacon()
用于向服务器异步发送数据。

#### 3、Screen 对象
* Screen.height
浏览器窗口所在的屏幕的高度（单位像素）。除非调整显示器的分辨率，否则这个值可以看作常量，不会发生变化。显示器的分辨率与浏览器设置无关，缩放网页并不会改变分辨率。
* Screen.width
浏览器窗口所在的屏幕的宽度（单位像素）。
* Screen.availHeight
浏览器窗口可用的屏幕高度（单位像素）。因为部分空间可能不可用，比如系统的任务栏或者 Mac 系统屏幕底部的 Dock 区，这个属性等于height减去那些被系统组件的高度。
* Screen.availWidth
浏览器窗口可用的屏幕宽度（单位像素）。
* Screen.pixelDepth
整数，表示屏幕的色彩位数，比如24表示屏幕提供24位色彩。
* Screen.colorDepth
Screen.pixelDepth的别名。严格地说，colorDepth 表示应用程序的颜色深度，pixelDepth 表示屏幕的颜色深度，绝大多数情况下，它们都是同一件事。
* Screen.orientation
返回一个对象，表示屏幕的方向。该对象的type属性是一个字符串，表示屏幕的具体方向，landscape-primary表示横放，landscape-secondary表示颠倒的横放，portrait-primary表示竖放，portrait-secondary。

### 四、location
#### 1、属性
* Location.href：整个 URL。
* Location.protocol：当前 URL 的协议，包括冒号（:）。
* Location.host：主机。如果端口不是协议默认的80和433，则还会包括冒号（:）和端口。
* Location.hostname：主机名，不包括端口。
* Location.port：端口号。
* Location.pathname：URL 的路径部分，从根路径/开始。
* Location.search：查询字符串部分，从问号?开始。
* Location.hash：片段字符串部分，从#开始。
* Location.username：域名前面的用户名。
* Location.password：域名前面的密码。
* Location.origin：URL 的协议、主机名和端口。（只有它只读）
跳转新地址

```
document.location = 'http://www.example.com';
// 等同于
document.location.href = 'http://www.example.com';
```

这个特性常常用于让网页自动滚动到新的锚点。

```
document.location.href = '#top';
// 等同于
document.location.hash = '#top';
```

#### 2、方法
* Location.assign()
接受一个 URL 字符串作为参数，使得浏览器立刻跳转到新的 URL。如果参数不是有效的 URL 字符串，则会报错。
* Location.replace()
接受一个 URL 字符串作为参数，使得浏览器立刻跳转到新的 URL。如果参数不是有效的 URL 字符串，则会报错。
它与assign方法的差异在于，replace会在浏览器的浏览历史History里面删除当前网址，也就是说，一旦使用了该方法，后退按钮就无法回到当前网页了，相当于在浏览历史里面，使用新的 URL 替换了老的 URL。它的一个应用是，当脚本发现当前是移动设备时，就立刻跳转到移动版网页。
* Location.reload()
使得浏览器重新加载当前网址，相当于按下浏览器的刷新按钮。
它接受一个布尔值作为参数。如果参数为true，浏览器将向服务器重新请求这个网页，并且重新加载后，网页将滚动到头部（即scrollTop === 0）。如果参数是false或为空，浏览器将从本地缓存重新加载该网页，并且重新加载后，网页的视口位置是重新加载前的位置。
* Location.toString()
返回整个 URL 字符串，相当于读取Location.href属性。

#### 3、URL编码与解码
* encodeURI()
用于转码整个 URL。它的参数是一个字符串，代表整个 URL。它会将元字符和语义字符之外的字符，都进行转义。
```
encodeURI('http://www.example.com/q=春节')
// "http://www.example.com/q=%E6%98%A5%E8%8A%82"
```
* encodeURIComponent()
用于转码 URL 的组成部分，会转码除了语义字符之外的所有字符，即元字符也会被转码。所以，它不能用于转码整个 URL。它接受一个参数，就是 URL 的片段。
```
encodeURIComponent('春节')
// "%E6%98%A5%E8%8A%82"
encodeURIComponent('http://www.example.com/q=春节')
// "http%3A%2F%2Fwww.example.com%2Fq%3D%E6%98%A5%E8%8A%82"
```
* decodeURI()
用于整个 URL 的解码。它是encodeURI()方法的逆运算。它接受一个参数，就是转码后的 URL。
* decodeURIComponent()
decodeURIComponent()用于URL 片段的解码。它是encodeURIComponent()方法的逆运算。它接受一个参数，就是转码后的 URL 片段。

#### 4、静态方法
* URL.createObjectURL()
用来为上传/下载的文件、流媒体文件生成一个 URL 字符串。这个字符串代表了File对象或Blob对象的 URL。
```
<div id="display"/>
 <input
 type="file"
  id="fileElem"
  multiple
  accept="image/*"
  onchange="handleFiles(this.files)"
  >
</body>
<script>
    var div = document.getElementById('display');

    function handleFiles(files) {
        for (var i = 0; i < files.length; i++) {
            var img = document.createElement('img');
            img.src = window.URL.createObjectURL(files[i]);
            div.appendChild(img);
        }
    }
</script>
```
生成：<img src="blob:http://localhost:63342/2ee74aa7-827a-49c2-99b5-183d6ac5fd4f">
注意，每次使用URL.createObjectURL()方法，都会在内存里面生成一个 URL 实例。如果不再需要该方法生成的 URL 字符串，为了节省内存，可以使用URL.revokeObjectURL()方法释放这个实例。

* URL.revokeObjectURL()
用来释放URL.createObjectURL()方法生成的 URL 实例。它的参数就是URL.createObjectURL()方法返回的 URL 字符串。

#### 5、URLSearchParams 对象
URLSearchParams对象是浏览器的原生对象，用来构造、解析和处理 URL 的查询字符串（即 URL 问号后面的部分）。它本身也是一个构造函数，可以生成实例。参数可以为查询字符串，起首的问号?有没有都行，也可以是对应查询字符串的数组或对象。

```
// 方法一：传入字符串
var params = new URLSearchParams('?foo=1&bar=2');
// 等同于
var params = new URLSearchParams(document.location.search);

// 方法二：传入数组
var params = new URLSearchParams([['foo', 1], ['bar', 2]]);

// 方法三：传入对象
var params = new URLSearchParams({'foo' : 1 , 'bar' : 2});
```

他会对查询字符串自动编码。

```
var params = new URLSearchParams({'foo': '你好'});
params.toString() // "foo=%E4%BD%A0%E5%A5%BD"
```

应用例子：
(1)浏览器向服务器发送表单数据时，可以直接使用URLSearchParams实例作为表单数据。

```
const params = new URLSearchParams({foo: 1, bar: 2});
fetch('https://example.com/api', {
  method: 'POST',
  body: params
}).then(...)

```

(2)URLSearchParams实例有遍历器接口，可以用for...of循环遍历.
```
var params = new URLSearchParams({'foo': 1 , 'bar': 2});

for (var p of params) {
  console.log(p[0] + ': ' + p[1]);
}
// foo: 1
// bar: 2
```

### 五、history
#### 1、history
* window.history属性指向 History 对象，它表示当前窗口的浏览历史。
* History 对象保存了当前窗口访问过的所有页面网址。下面代码表示当前窗口一共访问过3个网址
```
window.history.length // 3
```
* 由于安全原因，浏览器不允许脚本读取这些地址，但是允许在地址之间导航。
```
// 后退到前一个网址
history.back()

// 等同于
history.go(-1)
```
#### 2、属性
* History.length：当前窗口访问过的网址数量（包括当前网页）。
* History.state：History 堆栈最上层的状态值（详见下文）

#### 3、方法
* History.back()：移动到上一个网址，等同于点击浏览器的后退键。对于第一个访问的网址，该方法无效果。
* History.forward()：移动到下一个网址，等同于点击浏览器的前进键。对于最后一个访问的网址，该方法无效果。
* History.go()：接受一个整数作为参数，以当前网址为基准，移动到参数指定的网址，比如go(1)相当于forward()，go(-1)相当于back()。如果参数超过实际存在的网址范围，该方法无效果；如果不指定参数，默认参数为0，相当于刷新当前页面。
* History.pushState()：用于在历史中添加一条记录。
```
window.history.pushState(state, title, url)
```
* History.replaceState():History.replaceState()方法用来修改 History 对象的当前记录，其他都与pushState()方法一模一样。
* History.popstate :每当同一个文档的浏览历史（即history对象）出现变化时，就会触发popstate事件.

### 六、File

### 七、FileData
### 八、Blob
#### 1、概念
Blob 对象表示一个二进制文件的数据内容，比如一个图片文件的内容就可以通过 Blob 对象读写。它通常用来读写文件，它的名字是 Binary Large Object （二进制大型对象）的缩写。它与 ArrayBuffer 的区别在于，它用于操作二进制文件，而 ArrayBuffer 用于操作内存。
```
new Blob(array [, options])
生成实例的时候，数据类型指定为text/html:
var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
var myBlob = new Blob(htmlFragment, {type : 'text/html'});
下面是另一个例子，Blob 保存 JSON 数据:
var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
var myBlob = new Blob(htmlFragment, {type : 'text/html'});
```

#### 2、实例属性和实例方法
Blob具有两个实例属性size和type，分别返回数据的大小和类型。

#### 3、获取文件信息
文件选择器<input type="file">用来让用户选取文件。出于安全考虑，浏览器不允许脚本自行设置这个控件的value属性，即文件必须是用户手动选取的，不能是脚本指定的。一旦用户选好了文件，脚本就可以读取这个文件。
文件选择器返回一个 FileList 对象，该对象是一个类似数组的成员，每个成员都是一个 File 实例对象。File 实例对象是一个特殊的 Blob 实例，增加了name和lastModifiedDate属性。
```
function fileinfo(files) {
  for (var i = 0; i < files.length; i++) {
    var f = files[i];
    console.log(
      f.name, // 文件名，不含路径
      f.size, // 文件大小，Blob 实例属性
      f.type, // 文件类型，Blob 实例属性
      f.lastModifiedDate // 文件的最后修改时间
    );
  }
}
```
#### 4、文件下载
AJAX 请求时，如果指定responseType属性为blob，下载下来的就是一个 Blob 对象。
```
function getBlob(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.onload = function () {
    callback(xhr.response);
  }
  xhr.send(null);
}
```
#### 生成 URL
浏览器允许使用URL.createObjectURL()方法，针对 Blob 对象生成一个临时 URL，以便于某些 API 使用。这个 URL 以blob://开头，表明对应一个 Blob 对象，协议头后面是一个识别符，用来唯一对应内存里面的 Blob 对象。
#### 读取文件
取得 Blob 对象以后，可以通过FileReader对象，读取 Blob 对象的内容，即文件内容。



