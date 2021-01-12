# DOM API

## 学习要点（关键字）
### 选择器
- document.querySelector()
方法接受一个 CSS 选择器作为参数，返回匹配该选择器的元素节点。如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回null。只会返回一个对象。
``````
var el1 = document.querySelector('.myclass');
var el2 = document.querySelector('#myParent > [ng-click]');
document.querySelectorAll('div:first-child')
``````

- document.querySelectorAll()
document.querySelectorAll方法与querySelector用法类似，区别是返回一个NodeList对象，包含所有匹配给定选择器的节点。
与css中的选择器一致。不支持伪元素和伪类。如果为*则返回所以的节点。
querySelectorAll的返回结果不是动态集合，不会实时反映元素节点的变化。
``````
var matches = document.querySelectorAll('div.note, div.alert');
``````

- document.getElementsByTagName()
document.getElementsByTagName方法搜索 HTML 标签名，返回的可以是一个合集也可以是单个，找不到则为null。类似数组对象（HTMLCollection实例）通过类似数组对象去获取dom节点。
``````
var paras = document.getElementsByTagName('p');
paras instanceof HTMLCollection // true
``````

- document.getElementsByClassName()
document.getElementsByClassName方法返回一个类似数组的对象（HTMLCollection实例），包括了所有class名字符合指定条件的元素，元素的变化实时反映在返回结果中。
``````
var elements = document.getElementsByClassName('foo bar');
``````

- document.getElementsByName()
document.getElementsByName方法用于选择拥有name属性的 HTML 元素，返回一个类似数组的的对象（NodeList实例），因为name属性相同的元素可能不止一个
``````
var forms = document.getElementsByName('x');
``````

- document.getElementById()
document.getElementById方法返回匹配指定id属性的元素节点。如果没有发现匹配的节点，则返回null。另外，这个方法只能在document对象上使用，不能在其他元素节点上使用。

``````
document.getElementById('myElement')
``````
除此之外的所以dom对象都可以使用其他查询方法。

- document.elementFromPoint()
document.elementFromPoint方法返回位于页面指定位置最上层的元素节点。

- document.elementsFromPoint()
document.elementsFromPoint()返回一个数组，成员是位于指定坐标（相对于视口）的所有元素。

总共有8种选择器。

### 节点
- Document：整个文档树的顶层节点
- DocumentType：doctype标签（比如<!DOCTYPE html>）
- Element：网页的各种HTML标签
- Attribute：网页元素的属性（比如class="right"）
- Text：标签之间或标签包含的文本
- Comment：注释
- DocumentFragment：文档的片段
- 浏览器提供一个原生的节点对象Node，上面这七种节点都继承了Node，因此具有一些共同的属性和方法。
- 标签 html 构成了树结构的根节点（root node）
- 除了根节点，其他节点都有三种层级关系。
父节点关系（parentNode）：直接的那个上级节点
子节点关系（childNodes）：直接的下级节点
同级节点关系（sibling）：拥有同一个父节点的节点


### 属性
- 元素对象有一个attributes属性，返回一个类似数组的动态对象，成员是该元素标签的所有属性节点对象，属性的实时变化都会反映在这个节点对象上。

- 常用的书写方法
- getAttribute()
查找对应输入参数的属性的值，通过key拿值。
``````
// <div id="div1" align="left">
var div = document.getElementById('div1');
div.getAttribute('align') // "left"
``````
- getAttributeNames()
返回对象所有的属性的key值。获取的是一个数组
``````
a.getAttributeNames()
["class"]0: "class"length: 1__proto__: Array(0)
``````
- setAttribute()
方法用于为当前元素节点新增属性。如果同名属性已存在，则相当于编辑已存在的属性。属性值总是字符串，其他类型的值会自动转成字符串。
``````
// <button>Hello World</button>
var b = document.querySelector('button');
b.setAttribute('name', 'myButton');
b.setAttribute('disabled', true);
``````
- hasAttribute()
Element.hasAttribute方法返回一个布尔值，表示当前元素节点是否包含指定属性。需要输入参数。


- hasAttributes()
Element.hasAttributes方法返回一个布尔值，表示当前元素是否有属性，如果没有任何属性，就返回false，否则返回true。

- removeAttribute()
Element.removeAttribute方法移除指定属性。该方法没有返回值。

- dataset 属性
需要在HTML元素上附加数据
```
var n = document.getElementById('mydiv');
n.dataset.foo // bar
n.dataset.foo = 'baz'
n.getAttribute('data-foo');//'baz'
delete document.getElementById('myDiv').dataset.foo;
```

### 常用方法（如getElementById、innerHTML等）
- 查询获取节点的方法在上方
- Element.innerHtml、Element.outerHTML
Element.innerHTML属性返回一个字符串，等同于该元素包含的所有 HTML 代码。该属性可读写，常用来设置某个节点的内容。它能改写所有元素节点的内容，包括<HTML>和<body>元素。
如果将innerHTML属性设为空，等于删除所有它包含的所有节点。
两种方法的区别只在于会不会还包括该元素。innerHTML不包括父元素、outerHTml包括。
``````
let a=el.innerHTML = 'abc';
console.log(a) // 'abc'
``````

- ParentNode.firstElementChild
firstElementChild属性返回当前节点的第一个元素子节点。如果没有任何元素子节点，则返回null。

- ParentNode.lastElementChild
lastElementChild属性返回当前节点的最后一个元素子节点，如果不存在任何元素子节点，则返回null。

- ParentNode.append()，ParentNode.prepend()
append方法为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面。
该方法不仅可以添加元素子节点，还可以添加文本子节点。

- Element.remove()
Element.remove方法继承自 ChildNode 接口，用于将当前元素节点从它的父节点移除。

- Element.textContent()
用来修改节点的text文本的值。

- Element.insertAdjacentElement()
Element.insertAdjacentElement方法一共可以接受两个参数，第一个参数是一个字符串，表示插入的位置，第二个参数是将要插入的节点。第一个参数只可以取如下的值。
beforebegin：当前元素之前
afterbegin：当前元素内部的第一个子节点前面
beforeend：当前元素内部的最后一个子节点后面
afterend：当前元素之后

* 注意，beforebegin和afterend这两个值，只在当前节点有父节点时才会生效。如果当前节点是由脚本创建的，没有父节点，那么插入会失败。
``````
var p1 = document.createElement('p')
var p2 = document.createElement('p')
p1.insertAdjacentElement('afterend', p2) // null
``````


### 创建元素
- document.createElement()
document.createElement方法用来生成元素节点，并返回该节点。如果参数里面包含尖括号（即<和>）会报错。配合Element.append 和prepend ()来使用。
``````
var newDiv = document.createElement('div');
``````

### NodeList遍历
- 关于返回的Nodelist
通过带有node的方法的返回，query的查询、都是返回nodelist的类数组，不是动态的查询值，修改dom，不重新获取则不会返回新的。

- NodeList.prototype.keys()
keys()返回键名的遍历器

- NodeList.prototype.values()
返回键值的遍历器

- NodeList.prototype.entries()
entries()返回的遍历器同时包含键名和键值的信息。
```
var children = document.body.childNodes;

for (var key of children.keys()) {
  console.log(key);
}
// 0
// 1
// 2
// ...

for (var value of children.values()) {
  console.log(value);
}
// #text
// <script>
// ...

for (var entry of children.entries()) {
  console.log(entry);
}
// Array [ 0, #text ]
// Array [ 1, <script> ]
// ...
```

### demo
1. 找到box下的所有a节点
2. 遍历a节点，给每个a的href设置成`/abc/${索引}`
3. 给每个a的内容填入一张任意图片，给图片的宽高都设为90，并给图片设置一个名为`img`的样式名
4. 移除最后一个a标签里的图片的`img`样式

```
<div id="box">
  <a href=""></a>
  <a href=""></a>
  <a href=""></a>
  <a href=""></a>
  <a href=""></a>
  <a href=""></a>
</div>

```

#### 1
```
 let box =document.getElementById('box'); //HTMLCollection
 let boxGather = box.getElementsByTagName('a'); //HTMLCollection
 let boxGather2 = box.children; //HTMLCollection
 let boxGather3 = document.querySelectorAll('#box>a'); //NodeList
```
 
#### 2
 ```
  let url='baidu'
 for(item of boxGather2){
     item.setAttribute('href',  `/abc/${url}`)
 }
 ```
 
#### 3
```
 for(item of boxGather2){
     let img =document.createElement('img');  
     img.style.width='90px';
     img.style.height='90px';  
     img.setAttribute('src','http://ww2.sinaimg.cn/large/7c6d81abgw1f2wcq9z3dpj20rs0i2myl.jpg');
     img.setAttribute('img','');
     item.append(img)
 }

 for(item of boxGather2){

     item.innerHTML='<img src="http://ww2.sinaimg.cn/large/7c6d81abgw1f2wcq9z3dpj20rs0i2myl.jpg" img>'
 }
```


#### 4
```
 box.lastElementChild.removeAttribute('img')
 
   
 boxGather2[boxGather2.length-1].removeAttribute('img')
```