# 事件

## 学习要点（关键字）
### event对象
 事件发生以后，会产生一个事件对象，作为参数传给监听函数。浏览器原生提供一个Event对象，所有的事件都是这个对象的实例，或者说继承了Event.prototype对象。
 
```
 event = new Event(type, options); 
```

- Event构造函数 Event构造函数接受两个参数。 
第一个参数type是字符串，表示事件的名称；
第二个参数options是一个对象，表示事件对象的配置。
该对象主要有下面两个属性。
bubbles：布尔值，可选，默认为false，表示事件对象是否冒泡。 cancelable：布尔值，可选，默认为false，表示事件是否可以被取消，即能否用Event.preventDefault()取消这个事件。一旦事件被取消，就好像从来没有发生过，不会触发浏览器对该事件的默认行为。 

```
var ev = new Event( 'look', { 'bubbles': true, 'cancelable': false } );
document.dispatchEvent(ev);
```

- 实例属性 创建的事件对象所具有的属性: 
- Event.bubbles，Event.eventPhase 
Event.bubbles属性返回一个布尔值，表示当前事件是否会冒泡。该属性为只读属性，一般用来了解 Event 实例是否可以冒泡。Event构造函数生成的事件，默认是不冒泡的。 
Event.eventPhase属性返回一个整数常量，表示事件目前所处的阶段。该属性只读。
0，事件目前没有发生。 
1，事件目前处于捕获阶段，即处于从祖先节点向目标节点的传播过程中。
2，事件到达目标节点，即Event.target属性指向的那个节点。 
3，事件处于冒泡阶段，即处于从目标节点向祖先节点的反向传播过程中。


- Event.cancelable，Event.cancelBubble，event.defaultPrevented
1. Event.cancelable属性返回一个布尔值，表示事件是否可以取消。该属性为只读属性，一般用来了解 Event 实例的特性。 当Event.cancelable属性为true时，调用Event.preventDefault()就可以取消这个事件，阻止浏览器对该事件的默认行为。默认的事件都是可以取消的如submit的提交等。 如果事件不能取消，调用Event.preventDefault()会没有任何效果。
2. Event.cancelBubble属性是一个布尔值，如果设为true，相当于执行  Event.stopPropagation()，可以阻止事件的传播。
4. Event.defaultPrevented属性返回一个布尔值，表示该事件是否调用过  Event.preventDefault方法。该属性只读。
5. Event.currentTarget，Event.target 一个是事件的原始触发节点（Event.target），另一个是事件当前正在通过的节点（Event.currentTarget）。前者通常是后者的后代节点。Event.currentTarget属性返回事件当前所在的节点，即事件当前正在通过的节点，也就是当前正在执行的监听函数所在的那个节点。随着事件的传播，这个属性的值会变。
Event.target属性返回原始触发事件的那个节点，即事件最初发生的节点。这个属性不会随着事件的传播而改变。

- Event.type
Event.type属性返回一个字符串，表示事件类型。事件的类型是在生成事件的时候指定的。该属性只读。

- Event.timeStamp
Event.timeStamp属性返回一个毫秒时间戳，表示事件发生的时间。它是相对于网页加载成功开始计算的。

- Event.isTrusted
Event.isTrusted属性返回一个布尔值，表示该事件是否由真实的用户行为产生。比如，用户点击链接会产生一个click事件，该事件是用户产生的；Event构造函数生成的事件，则是脚本产生的。

- Event.detail
Event.detail是鼠标按下的次数（1表示单击，2表示双击，3表示三击）；对于鼠标滚轮事件，Event.detail是滚轮正向滚动的距离，负值就是负向滚动的距离，返回值总是3的倍数。


- Event.preventDefault()
Event.preventDefault方法取消浏览器对当前事件的默认行为。比如点击链接后，浏览器默认会跳转到另一个页面，使用这个方法以后，就不会跳转了；再比如，按一下空格键，页面向下滚动一段距离，使用这个方法以后也不会滚动了。该方法生效的前提是，事件对象的cancelable属性为true，如果为false，调用该方法没有任何效果。

- Event.stopPropagation()
stopPropagation方法阻止事件在 DOM 中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上其他的事件监听函数。

- Event.stopImmediatePropagation()
Event.stopImmediatePropagation方法阻止同一个事件的其他监听函数被调用，不管监听函数定义在当前节点还是其他节点。也就是说，该方法阻止事件的传播，比Event.stopPropagation()更彻底。
如果同一个节点对于同一个事件指定了多个监听函数，这些函数会根据添加的顺序依次调用。只要其中有一个监听函数调用了Event.stopImmediatePropagation方法，其他的监听函数就不会再执行了。


### 事件监听
- 实现监听函数 浏览器的事件模型，就是通过监听函数（listener）对事件做出反应。
事件发生后，浏览器监听到了这个事件，就会执行对应的监听函数。这是事件驱动编程模式（event-driven）的主要编程方式。 
- 实现监听函数: JavaScript 有三种方法
1. 可以为事件绑定监听函数 HTML 的 on- 属性 : 元素的事件监听属性，都是on加上事件名，比如onload就是on + load，表示load事件的监听代码。 例如经常在页面中的onclick="function()"必须是方法()。 使用这个方法指定的监听代码，只会在冒泡阶段触发。


```
从最里面的事件开始执行 
<div onClick="console.log(2)"> <button onClick="console.log(1)">点击</button> </div> 
```

2. 元素节点的事件属性： 通过获取dom对象设置，这种方法与 HTML 的on-属性的差异是，它的值是函数名（doSomething），而不像后者，必须给出完整的监听代码（doSomething()）。


```
div.onclick = function (event) { console.log('触发事件'); }; 
```


3. 元素节点的对象提供的原型方法添加事件: 所有 DOM 节点实例都有addEventListener方法，用来为该节点定义事件的监听函数。 第三个参数的设置值:true - 事件在捕获阶段执行  false- 默认。事件在冒泡阶段执行


```
dom.addEventListener('load', doSomething, false); 
```


#### 小结: 上面三种方法
1. 第一种“HTML 的 on- 属性”，违反了 HTML 与 JavaScript 代码相分离的原则，将两者写在一起，不利于代码分工，因此不推荐使用。 
2. 第二种“元素节点的事件属性”的缺点在于，同一个事件只能定义一个监听函数，也就是说，如果定义两次onclick属性，后一次定义会覆盖前一次。因此，也不推荐使用。
3. 第三种EventTarget.addEventListener是推荐的指定监听函数的方法。它有如下优点： 同一个事件可以添加多个监听函数。 能够指定在哪个阶段（捕获阶段还是冒泡阶段）触发监听函数。 除了 DOM 节点，其他对象（比如window、XMLHttpRequest等）也有这个接口，它等于是整个 JavaScript 统一的监听函数接口。


### 事件冒泡/事件捕获
- 事件冒泡
  当有事件的触发后，事件将从目标元素向上传播回或起泡回 Document 对象的文档层次，一层一层向上传递，除非遇到阻止事件传递的方法。从最下级向最上级传递。

- 事件捕获
  当有事件的触发后，事件将从Documen对象向下传播到对应的根元素的层次，一层一层向下传递，除非遇到阻止事件传递的方法。从最上级向最下级传递。

### 自定义事件
- 添加事件:
1.  target.addEventListener(type, listener,[useCapture]);
- type： 事件名称，大小写敏感。 
- listener： 监听函数。事件发生时，会调用该监听函数。
- addEventListener方法可以为针对当前对象的同一个事件。添加多个不同的监听函数。这些函数按照添加顺序触发，即先添加先触发。如果为同一个事件多次添加同一个监听函数，该函数只会执行一次，多余的添加将自动被去除（不必使用removeEventListener方法手动去除）。 
- useCapture： 布尔值，表示监听函数是否在捕获阶段（capture），默认为false（监听函数只在冒泡阶段被触发）。该参数可选。
2. 第三个参数除了布尔值useCapture，还可以是一个属性配置对象。该对象有以下属性。 
- capture：布尔值，表示该事件是否在捕获阶段触发监听函数。 
- once：布尔值，表示监听函数是否只触发一次，然后就自动移除。 
- passive：布尔值，表示监听函数不会调用事件的preventDefault方法。如果监听函数调用了，浏览器将忽略这个要求，并在监控台输出一行警告。阻止默认事件。 
3. 解除、阻止事件: EventTarget.removeEventListener() removeEventListener方法的参数，与addEventListener方法完全一致。它的第一个参数“事件类型”，大小写敏感。 
4. 触发一个事件EventTarget.dispatchEvent() EventTarget.dispatchEvent方法在当前节点上触发指定事件，从而触发监听函数的执行。该方法返回一个布尔值，只要有一个监听函数调用了Event.preventDefault()，则返回值为false，否则为true。
### 鼠标事件
1. 鼠标事件列举
- click：按下鼠标（通常是按下主按钮）时触发。
- dblclick：在同一个元素上双击鼠标时触发。
- mousedown：按下鼠标键时触发。
- mouseup：释放按下的鼠标键时触发。
- mousemove：当鼠标在一个节点内部移动时触发。当鼠标持续移动时，该事件会连续触发。为了避免性能问题，建议对该事件的监听函数做一些限定，比如限定一段时间内只能运行一次。
- mouseenter：鼠标进入一个节点时触发，进入子节点不会触发这个事件。
- mouseover：鼠标进入一个节点时触发，进入子节点会再一次触发这个事件。
- mouseout：鼠标离开一个节点时触发，离开父节点也会触发这个事件。
- mouseleave：鼠标离开一个节点时触发，离开父节点不会触发这个事件。
- contextmenu：按下鼠标右键时（上下文菜单出现前）触发，或者按下“上下文菜单键”时触发。
- wheel：滚动鼠标的滚轮时触发，该事件继承的是WheelEvent接口。

2. 鼠标事件的执行机制
- click事件指的是，用户在同一个位置先完成mousedown动作，再完成mouseup动作。因此，触发顺序是，mousedown首先触发，mouseup接着触发，click最后触发。
- dblclick事件则会在mousedown、mouseup、click之后触发。

3. MouseEvent


```
var event = new MouseEvent(type, options);
```

- MouseEvent构造函数接受两个参数。第一个参数是字符串，表示事件名称；第二个参数是一个事件配置对象，该参数可选。除了Event接口的实例配置属性，该对象可以配置以下属性，所有属性都是可选的。
1. screenX：数值，鼠标相对于屏幕的水平位置（单位像素），默认值为0，设置该属性不会移动鼠标。
2. screenY：数值，鼠标相对于屏幕的垂直位置（单位像素），其他与screenX相同。
3. clientX：数值，鼠标相对于程序窗口的水平位置（单位像素），默认值为0，设置该属性不会移动鼠标。
4. clientY：数值，鼠标相对于程序窗口的垂直位置（单位像素），其他与clientX相同。
5. ctrlKey：布尔值，是否同时按下了 Ctrl 键，默认值为false。
6. shiftKey：布尔值，是否同时按下了 Shift 键，默认值为false。
7. altKey：布尔值，是否同时按下 Alt 键，默认值为false。
8. metaKey：布尔值，是否同时按下 Meta 键，默认值为false。
9. button：数值，表示按下了哪一个鼠标按键，默认值为0，表示按下主键（通常是鼠标的左键）或者当前事件没有定义这个属性；1表示按下辅助键（通常是鼠标的中间键），2表示按下次要键（通常是鼠标的右键）。
10. buttons：数值，表示按下了鼠标的哪些键，是一个三个比特位的二进制值，默认为0（没有按下任何键）。1（二进制001）表示按下主键（通常是左键），2（二进制010）表示按下次要键（通常是右键），4（二进制100）表示按下辅助键（通常是中间键）。因此，如果返回3（二进制011）就表示同时按下了左键和右键。
11. relatedTarget：节点对象，表示事件的相关节点，默认为null。mouseenter和mouseover事件时，表示鼠标刚刚离开的那个元素节点；mouseout和mouseleave事件时，表示鼠标正在进入的那个元素节点。


4. MouseEvent 接口的实例属性
- MouseEvent.altKey，MouseEvent.ctrlKey，MouseEvent.metaKey，MouseEvent.shiftKey
  MouseEvent.altKey、MouseEvent.ctrlKey、MouseEvent.metaKey、MouseEvent.shiftKey这四个属性都返回一个布尔值，表示事件发生时，是否按下对应的键。它们都是只读属性。
1. altKey属性：Alt 键
2. ctrlKey属性：Ctrl 键
3. metaKey属性：Meta 键（Mac 键盘是一个四瓣的小花，Windows 键盘是 Windows 键）
4. shiftKey属性：Shift 键
- MouseEvent.button，MouseEvent.buttons
  MouseEvent.button属性返回一个数值，表示事件发生时按下了鼠标的哪个键。该属性只读。
1. 0：按下主键（通常是左键），或者该事件没有初始化这个属性（比如mousemove事件）。
2. 1：按下辅助键（通常是中键或者滚轮键）。
3. 2：按下次键（通常是右键）。

- MouseEvent.clientX，MouseEvent.clientY
  MouseEvent.clientX属性返回鼠标位置相对于浏览器窗口左上角的水平坐标（单位像素
  MouseEvent.clientY属性返回垂直坐标。这两个属性都是只读属性。
  
- MouseEvent.movementX，MouseEvent.movementY
  MouseEvent.movementX属性返回当前位置与上一个mousemove事件之间的水平距离（单位像素）。数值上，它等于下面的计算公式。
  MouseEvent.movementY属性返回当前位置与上一个mousemove事件之间的垂直距离（单位像素）。数值上，它等于下面的计算公式。
#### 注意
- mouseout事件和mouseleave事件，都是鼠标离开一个节点时触发。两者的区别是，在父元素内部离开一个子元素时，mouseleave事件不会触发，而mouseout事件会触发。
- mouseover事件和mouseenter事件，都是鼠标进入一个节点时触发。两者的区别是，mouseenter事件只触发一次，而只要鼠标在节点内部移动，mouseover事件会在子节点上触发多次。

### 触摸事件
Touch 代表单个触摸点。触摸点可能是一根手指，也可能是一根触摸笔。

```
var touch = new Touch(touchOptions);
```

- Touch构造函数接受一个配置对象作为参数，它有以下属性。
1. identifier：必需，类型为整数，表示触摸点的唯一 ID。
2. target：必需，类型为元素节点，表示触摸点开始时所在的网页元素。
3. clientX：可选，类型为数值，表示触摸点相对于浏览器窗口左上角的水平距离，默认为0。
4. clientY：可选，类型为数值，表示触摸点相对于浏览器窗口左上角的垂直距离，默认为0。
5. screenX：可选，类型为数值，表示触摸点相对于屏幕左上角的水平距离，默认为0。
6. screenY：可选，类型为数值，表示触摸点相对于屏幕左上角的垂直距离，默认为0。
7. pageX：可选，类型为数值，表示触摸点相对于网页左上角的水平位置（即包括页面的滚动距离），默认为0。
8. pageY：可选，类型为数值，表示触摸点相对于网页左上角的垂直位置（即包括页面的滚动距离），默认为0。
9. radiusX：可选，类型为数值，表示触摸点周围受到影响的椭圆范围的 X 轴半径，默认为0。
10. radiusY：可选：类型为数值，表示触摸点周围受到影响的椭圆范围的 Y 轴半径，默认为0。
11. rotationAngle：可选，类型为数值，表示触摸区域的椭圆的旋转角度，单位为度数，在0到90度之间，默认值为0。
12. force：可选，类型为数值，范围在0到1之间，表示触摸压力。0代表没有压力，1代表硬件所能识别的最大压力，默认为0。
- TouchList接口表示一组触摸点的集合。
1. 它的实例是一个类似数组的对象，成员是Touch的实例对象，表示所有触摸点。用户用三根手指触摸，产生的TouchList实例就会包含三个成员，每根手指的触摸点对应一个Touch实例对象。
2. 它的实例主要通过触摸事件的TouchEvent.touches、TouchEvent.changedTouches、TouchEvent.targetTouches这几个属性获取。
3. 它的实例属性和实例方法只有两个。
   TouchList.length：数值，表示成员数量（即触摸点的数量）。
   TouchList.item()：返回指定位置的成员，它的参数是该成员的位置编号（从零开始）。
  
- 触摸事件的种类
1. touchstart：用户开始触摸时触发，它的target属性返回发生触摸的元素节点。
2. touchend：用户不再接触触摸屏时（或者移出屏幕边缘时）触发，它的target属性与touchstart事件一致的，就是开始触摸时所在的元素节点。它的changedTouches属性返回一个TouchList实例，包含所有不再触摸的触摸点（即Touch实例对象）。
3. touchmove：用户移动触摸点时触发，它的target属性与touchstart事件一致。如果触摸的半径、角度、力度发生变化，也会触发该事件。
4. touchcancel：触摸点取消时触发，比如在触摸区域跳出一个模态窗口（modal window）、触摸点离开了文档区域（进入浏览器菜单栏）、用户的触摸点太多，超过了支持的上限（自动取消早先的触摸点）。
##

```
var el = document.getElementsByTagName('canvas')[0];
el.addEventListener('touchstart', handleStart, false);
el.addEventListener('touchmove', handleMove, false);

function handleStart(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;
  for (var i = 0; i < touches.length; i++) {
    console.log(touches[i].pageX, touches[i].pageY);
  }
}

function handleMove(evt) {
  evt.preventDefault();
  var touches = evt.changedTouches;
  for (var i = 0; i < touches.length; i++) {
    var touch = touches[i];
    console.log(touch.pageX, touch.pageY);
  }
}

```
### 键盘事件
- 键盘事件由用户击打键盘触发，主要有keydown、keypress、keyup三个事件，它们都继承了KeyboardEvent接口。
1. keydown：按下键盘时触发。
2. keypress：按下有值的键时触发，即按下 Ctrl、Alt、Shift、Meta 这样无值的键，这个事件不会触发。对于有值的键，按下时先触发keydown事件，再触发这个事件。
3. keyup：松开键盘时触发该事件。

- KeyboardEvent接口用来描述用户与键盘的互动。这个接口继承了Event接口，并且定义了自己的实例属性和实例方法。
  浏览器原生提供KeyboardEvent构造函数，用来新建键盘事件的实例。
  
```
new KeyboardEvent(type, options)
```

- KeyboardEvent构造函数接受两个参数。第一个参数是字符串，表示事件类型；第二个参数是一个事件配置对象，该参数可选。除了Event接口提供的属性，还可以配置以下字段，它们都是可选。

1. key：字符串，当前按下的键，默认为空字符串。
2. code：字符串，表示当前按下的键的字符串形式，默认为空字符串。
3. location：整数，当前按下的键的位置，默认为0。
4. ctrlKey：布尔值，是否按下 Ctrl 键，默认为false。
5. shiftKey：布尔值，是否按下 Shift 键，默认为false。
6. altKey：布尔值，是否按下 Alt 键，默认为false。
7. metaKey：布尔值，是否按下 Meta 键，默认为false。
8. repeat：布尔值，是否重复按键，默认为false。

#### 实例
```
function showChar(e) {
  console.log('ALT: ' + e.altKey);
  console.log('CTRL: ' + e.ctrlKey);
  console.log('Meta: ' + e.metaKey);
  console.log('Shift: ' + e.shiftKey);
}

document.body.addEventListener('keydown', showChar, false);
```

## demo实现
1. 点击button，弹出1，并且判断button是否是box的子元素
2. 点击box，弹出2。
3. 键盘快捷键`ctrl+b`触发自定义事件`keybordB`，监听keybordB事件弹出3

### Demo
```
<div id="box">
  <div>
    <button>按钮</button>
  </div>
</div>
```

### js实现
```
let button = document.getElementsByTagName('button')[0]
let box = document.getElementById('box')
let children = box.getElementsByTagName('*')

//情况1
let f1 = function (e) {
        alert(1);
        for (item of children) {
            if (item.isSameNode(e.target) || item.isEqualNode(e.target) ){
                console.log(e.target.tagName + '是box的子元素')
            }
        }
    }
    button.addEventListener('click', f1, false)

    //情况2
    let f2 = function (e) {
        alert(2);
    }
    box.addEventListener('click', f2, true)

    //情况3
    let event = new Event('keybordB',{ 'bubbles': false, 'cancelable': false })
    let f3 =function(e){
        if(e.ctrlKey && e.key==='b') {
            document.body.dispatchEvent(event);
        }
    }

let f4 =function(e){
       alert(3)
}
document.body.addEventListener('keydown', f3, false);
document.body.addEventListener('keybordB', f4, false);
```