#### 布局方式
* 表格布局
表格中同一行的单元格行高总是一致的，所以“表格布局”可以避免“浮动布局”时出现的“底部对不齐”情况。但现在很少用，也不推荐使用
示例代码
```
<table>
    <tr>
        <td>
            <!--左侧栏内容-->
        </td>

        <td>
            <!--右侧栏内容-->
        </td>
    </tr>
</table>
```
* float布局
浮动元素是脱离文档流的，但不脱离文本流
示例代码
```
<style type="text/css">
        .wrap1{max-width: 1000px;}
        div{
              min-height: 200px;
          }
          .left{
              float: left;
              width: 300px;
              background: red;
         }
         .right{
             float: right;
             width: 300px;
             background: blue;
         }
         .center{
             background: pink;
         }

     </style>
     <div class="wrap1">
         <div class="left">left</div>
         <div class="right">right</div>
         <div class="center">浮动布局</div>   <!-- 这里不能与上面的右浮动互换位置，否则会被块元素挤下一行-->
     </div>
```
* 浮动元素导致的问题
会使父级元素高度塌陷
示例代码
```
<!DOCTYPE html>
 2 <html lang="en">
 3 <head>
 4     <meta charset="UTF-8">
 5     <title>CSS 布局</title>
 6 </head>
 7 <style>
 8 *{
 9     margin: 0;
10     padding: 0;
11 }
12 .container{
13     width: 200px;
14     background-color:red;
15 }
16
17 .left{
18     background-color: yellow;
19     float: left;    /*float会将行元素转变成块元素display:inline-block;*/
20     height: 50px;
21     width:50px;
22 }
23 .right{
24     background-color: yellow;
25     float: right;    /*float会将行元素转变成块元素display:inline-block;*/
26     height: 50px;
27     width:50px;
28 }
29 </style>
30 <body>
31     <div class="container">
32         <span class="left">left</span>
33         <span>center</span>
34         <span class="right">right</span>
35     </div>
36     <div class="container" style="height: 200px;background: blue">
37     </div>
38 </body>
39 </html>
```
原因分析
子元素默认会撑开父级元素的宽高，但是子元素设置了浮动之后，就不会撑开父元素了，从而导致了父级元素高度塌陷。
解决方法
1. 父元素设置 overflow: auto 或者 overflow: hidden
2. 给父元素加一个 after 伪类（清除浮动）
```
.container::after{
        content:'';
        clear:both;
        display:block;
        visibility:hidden;
        height:0;
    }
```

* 定位
定位允许您从正常的文档流布局中取出元素，并使它们具有不同的行为，例如放在另一个元素的上面，或者始终保持在浏览器视窗内的同一位置
1. 静态定位
```
<p class="positioned"> hello world </p>
<style>
  .positioned {
    position: static;
    background: yellow;
   }
</style>
```
静态定位是默认行为
2. 相对定位
相对定位是我们将要看的第一个位置类型。 它与静态定位非常相似，占据在正常的文档流中，除了你仍然可以修改它的最终位置，包括让它与页面上的其他元素重叠
`position:relative`
可以通过left、right、top、bottom来改变它相对自身的位置
3. 绝对定位
`position:absolute`
如果所有的父元素都没有显式地定义position属性，那么所有的父元素默认情况下position属性都是static。结果，绝对定位元素会被包含在初始块容器中。这个初始块容器有着和浏览器视口一样的尺寸，并且<html>元素也被包含在这个容器里面。简单来说，绝对定位元素会被放在<html>元素的外面，并且根据浏览器视口来定位。
4. 固定定位
这与绝对定位的工作方式完全相同，只有一个主要区别：绝对定位固定元素是相对于 <html> 元素或其最近的定位祖先，而固定定位固定元素则是相对于浏览器视口本身。 这意味着您可以创建固定的有用的UI项目，如持久导航菜单
5. position: sticky
position: sticky，是一个比其他属性要新一些的属性。这基本上是相对位置和固定位置之间的混合，其允许定位的元件像它被相对定位一样动作，直到其滚动到某一阈值点（例如，从视口顶部10像素），之后它变得固定
[详细了解定位](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/CSS_layout/%E5%AE%9A%E4%BD%8D)
* flex布局
采用Flex布局的元素，称为Flex容器（flex container），简称“容器”。它的所有子元素自动成为容器成员，成为flex项目（flex item），简称“项目”。
块级元素
```
.box{
    display:flex;
}
```
行内元素
```
.box{
    display:inline-flex;
}
```
webkit内核的浏览器，必需加上-webkit前缀
```
.box{
    display:-webkit-flex;
    display:flex;
}
```
设为flex布局以后，子元素的float、clear和vertical-align属性将失效

设置了flex布局的元素称为容器，容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框 的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。
项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

容器属性
1. flex-derection
row（默认值）：主轴为水平方向，起点在左端
row-reverse:主轴为水平方向，起点在右端
column:主轴为垂直方向，起点在上沿
column-reverse:主轴为垂直方向，起点在下沿
2. flex-wrap
nowrap（默认）：不换行
wrap:换行，第一行在上方
wrap-reverse:换行，在第一行的下方
3. flex-flow
flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认 row nowrap。
4. justify-content属性
justify-content属性定义了项目在主轴上的对齐方式
flex-start（默认值）：左对齐
flex-end：右对齐
center：居中
space-between:两端对齐，项目之间的间隔都相等
space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。
5. align-items
flex-start：交叉轴的起点对齐
flex-end:交叉轴的终点对齐
center：交叉轴的中点对齐
baseline：项目的第一行文字的基线对齐。
stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
6. align-center
flex-start：与交叉轴的起点对齐。
flex-end：与交叉轴的终点对齐。
center：与交叉轴的中点对齐。
space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
stretch（默认值）：轴线占满整个交叉轴。

##### grid布局
网格布局（Grid）是最强大的 CSS 布局方案。
它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。以前，只能通过复杂的 CSS 框架达到的效果，现在浏览器内置了。
设置display：grid|line-grid
通过设置grid-template-columns: 来设置列宽，左边到列的距离
通过设置grid-template-rows: 来设置列宽，上边到行的距离
fr 关键字类似于flex的设置值进行布局。


设置grid-auto-flow：row、column以行为准，以列为准的布局，加上dense 如
row dense 则为 自动补齐。
在子元素设置了grid-row-start，grid-row-end从而得到占用的格子的空间大小。

[网格布局详细介绍](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)

#### 盒子模型
html文档中的每个元素都被描绘成矩形盒子，这些矩形盒子通过一个模型来描述其占用空间，这个模型称为盒模型。盒模型通过四个边界来描述：margin（外边距），border（边框），padding（内边距），content（内容区域）

##### css单位
1. px 绝对单位，页面按精确像素展示
2. em 相对单位，基准点为父节点字体的大小，如果自身定义了font-size按自身来计算（浏览器默认字体是16px），整个页面内1em不是一个固定的值。
3. rem 相对单位，可理解为”root em”, 相对根节点html的字体大小来计算，CSS3新加属性，chrome/firefox/IE9+支持
4. vm viewpoint width，视窗宽度，1vw等于视窗宽度的1%
5. vh viewpoint height，视窗高度，1vh等于视窗高度的1%。
6. vmin vw和vh中较小的那个
7. vmax vw和vh中较大的那个
8.% 百分比
9. in 英寸
10. cm 厘米
11. mm 毫米
12. pt point，大约1/72寸
13. pc:pica，大约6pt，1/6寸
14. ex 取当前作用效果的字体的x的高度，在无法确定x高度的情况下以0.5em计算(IE11及以下均不支持，firefox/chrome/safari/opera/ios safari/android browser4.4+等均需属性加么有前缀)
15. ch 以节点所使用字体中的“0”字符为基准，找不到时为0.5em(ie10+,chrome31+,safair7.1+,opera26+,ios safari 7.1+,android browser4.4+支持)

##### css选择器及优先级
CSS选择器的效率从高到低做了一个排序：
1. id选择器（#myid）
2. 类选择器（.myclassname）
3. 标签选择器（div,h1,p）
4. 相邻选择器（h1+p）
5. 子选择器（ul < li）
6. 后代选择器（li a）
7. 通配符选择器（*）
8. 属性选择器（a[rel="external"]）
9. 伪类选择（a:hover,li:nth-child）

##### 移动端与pc端的区别
* PC考虑的是浏览器的兼容性，而移动端开发考虑的更多的是手机兼容性，因为目前不管是android手机还是ios手机，一般浏览器使用的都是webkit内核，所以说做移动端开发，更多考虑的应该是手机分辨率的适配，和不同操作系统的略微差异化。
* 在部分事件的处理上，移动端多出来的事件是触屏事件，而缺少的是hover事件。 另外包括移动端弹出的手机键盘的处理，这样的问题在PC端都是遇不到的。
* 在动画处理上，PC端由于要考虑IE的兼容性，所以通常使用JS做动画的通用性会更好一些，但是CSS3做了很大的牺牲， 而在手机端，如果要做一些动画、特效等，第一选择肯定是CSS3， 既简单、效率又高
* 移动端，完善的传感器是PC端设备望尘莫及的，压力、方向、重力、GPS、NFC、指纹识别、3Dtouch、陀螺仪等等
* PC端设备的使用场景多为在家或者学校公司等一些固定的场景，所以其使用时间偏向于持续化，在一个特定的时间段内持续使用，而移动端设备不受局限，随时随地想用就用，所以他的使用时间更加灵活，时间更加碎片化，所以在操作上更偏向于短时间内可完成的

#####css动画
* css3@keyframes规则
@keyframes 规则用于创建动画。在 @keyframes 中规定某项 CSS 样式，就能创建由当前样式逐渐改为新样式的动画效果。
```
.wrap{
     display: flex;
 }
   .inner{
       width: 100px;
       height: 100px;
       background-color: #0bb8cc;
      animation: myanm 5s;
   }
   @-webkit-keyframes myanm {
       from {background-color: #0cd1e8}
       to {background-color: red}
   } myanm {

   }
```

[@keyframe详情](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations)

##### 背景图及对其方式
在网页开发中我们经常需要对图片进行分割来使用，而不是分别提供单独的图片来调用，常见的如页面背景，按钮图标等，这样做的好处就是减少请求次数，节省时间和带宽。
例如
```
div{

background-image: url("x.png");

background-repeat: no-repeat;

background-position: 0px -100px;

}
```
* 对其方式
对齐方式有5个值top、botton、lef、right、center，分别对应顶部对齐，底部对齐，左对齐，右对齐，居中对齐（对齐就是容器的某一边跟图片的对应边重叠）

  容器的左上角为坐标原点，向右为正向X轴，向左为反向X轴，向下为正向Y轴，向上为反向Y轴，而所谓的像素值就是图片原点和容器坐标原点的坐标差，分别对应background-position中的第一个和第二个参数，这个坐标差的计算就需要我们根据图片和容器的大小来对图片做相应的移动。

##### 字体样式
* font-size
指定字体大小，常用单位有em和px
* font-family
1. 常用的中文字体有微软雅黑和宋体，英文字体有Arial
2. 可以同时指定多个字体，使用英文的逗号分隔，浏览器会按顺序查找，找不到就找下一个，全部没找到就使用系统默认的
3. 字体用中文表示 则需要用双引号或者单引号分隔，英文字体一般不需要用引号，但是如果 有特殊字符的（如空格，反斜杠，#，$等）也需要使用引号
* font-weight
字体粗细（bold相等于设置该属性的值为700，normal相等于设置该属性值为400–>不用单位，建议使用数字因为解析会更快）
* font-style
normal（一般用于让斜体不倾斜，em标签有加重强调的语义 但是字体会倾斜，可以为em 标签设置 font-style 属性值为 normal 取消其倾斜的效果）
* color
1. 预定义的颜色如green，red等
2. 十六进制，顺序是红绿蓝，十六进制是最常用的颜色表示方式
* #ff0000 表示红色，等同于#f00（缩写，必须是两两相同的才可以进行缩写）；#00f表示蓝色；#0f0表示绿色；#fff表示白色（所有的颜色都满格），#000000即#000表示黑色（所有的颜色都没有）
3. RGB代码：rgb(255,255,255)表示白色
* text-decoration
文本修饰：text-decoration：none、underlined（比较常用，用于添加下划线和取消下划线）
* line-hight
行间距，一般情况下，行间距只需要比字体大小大7或8个像素就可以了
* text-align
文本内容的水平对齐方式
* text-indent
段落首行缩进，单位使用em，1em就是一个字，所以该样式值为2em 表示 段落首行缩进两个字符
