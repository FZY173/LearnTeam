# Class和原型链

## 学习要点（关键字）
ES5原型链、class静态属性/方法、私有属性/方法、继承、es6 module、动态/静态import、单例模式

### 1.ES5原型链
####  (1)原型
执行代码`var o = new Object()`，此时o对象内部会存储一个指针，指向了Object.prototype，当访问o的属性和方法时，o会查看自身有没有该属性或方法，如果没有的话就沿着内部存储的指针找到Object.prototype对象，然后查看Object.prototype对象是否有对应名称的方法或属性，如果有就调用Object.prototype的方法或属性。我们把这个指针叫做o对象的原型，你可以把它看做是Java类继承中的super关键字。
- ES3规范中定义了Object.prototype.isPrototypeOf()方法，该方法可以判断某个对象是不是另一个对象的原型。Object.prototype.isPrototypeOf(o)返回true值可以确定Object.prototype就是o对象的原型。在ES3规范中，不能直接读取o对象的原型，也就是o对象的原型看不见摸不着的。
- ES5.1规范定义了Object.getPrototypeOf()方法，通过该方法可以获取对象的原型。我们可以通过`Object.getPrototypeOf(o) === Object.prototype`再次验证Object.prototype就是o对象的原型。
- ES6规范更加直接，为对象添加了一个__proto__属性，通过这个属性就可以获得对象的原型，所以在支持__proto__的浏览器中，`o.__proto__ === Object.prototype`也会返回true。

####  (2)原型链
每个对象都可以有一个原型_proto_，这个原型还可以有它自己的原型，以此类推，形成一个原型链。查找特定属性的时候，我们先去这个对象里去找，如果没有的话就去它的原型对象里面去，如果还是没有的话再去向原型对象的原型对象里去寻找...... 这个操作被委托在整个原型链上，这个就是我们说的原型链了。
- 如果一层层地上溯，所有对象的原型最终都可以上溯到Object.prototype，即Object构造函数的prototype属性。也就是说，所有对象都继承了Object.prototype的属性。这就是所有对象都有valueOf和toString方法的原因，因为这是从Object.prototype继承的。
- Object.prototype的原型是null。null没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是null。

#### (3)ES5实现继承
- ES5.1规范中新增了Object.create()方法，该方法会传入一个对象，然后会返回一个对象，返回的对象的原型指向传入的对象，比如执行代码var output = Object.create(input)，相当于执行代码output.__proto__ = input;，output的原型是input。
- 而且ES5.1中新增了Object.keys()方法用以获取对象自身的属性数组，我们可以用该方法简化继承父类静态属性和方法的过程。


```javascript
//父类ClassA
function ClassA(name, age) {
    this.name = name;
    this.age = age;
}
ClassA.prototype.sayName = function() {
    console.log(this.name);
};

ClassA.prototype.sayAge = function() {
    console.log(this.age);
};

ClassA.staticValue = "static value";

ClassA.getStaticValue = function() {
    return ClassA.staticValue;
};

ClassA.setStaticValue = function(value) {
    ClassA.staticValue = value;
};
```
```javascript
//继承类
function extendsClass(Child, Father) {
    //继承父类prototype中定义的实例属性和方法
    Child.prototype = Object.create(Father.prototype);
    Child.prototype.constructor = Child;

    //继承父类的静态属性和方法
    Object.keys(Father).forEach(function(key) {
        Child[key] = Father[key];
    });
}
```
```javascript
//子类ClassB
function ClassB(name, age, job) {
    ClassA.apply(this, [name, age]);
    this.job = job;
}

extendsClass(ClassB, ClassA);

ClassB.prototype.sayJob = function() {
    console.log(this.job);
};
```

***
### 2.class静态属性和方法
- 注意class关键字只是原型的语法糖，JavaScript继承仍然是基于原型实现的。
- 静态属性的理解
  - 静态的是指向类自身，而不是指向实例对象，主要是归属不同，这是静态属性的核心。
  - 静态属性是class类自身的属性,相对的实例属性是指类的实例的属性，调用时使用 new Foo().'属性名'
  - 定义静态属性
`object.a = a`
- 静态方法的理解
  - 使用
在方法名前加static
  - 为什么要使用静态方法
阻止方法被实例继承，类的内部相当于实例的原型，所有在类中直接定义的方法相当于在原型上定义方法，都会被类的实例继承，但是使用static静态方法定义的不会被实例继承，而且可以被实例直接应用Foo.classMethod()，此时写成new Foo.classMethod()会提示不存在此方法

  - 静态方法中this指向
this指向类而不是类的实例
- ES6中引入了class关键字，可以用class直接定义类，通过extends关键字实现类的继承，还可以通过static关键字定义类的静态方法。
```javascript
class ClassA{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    sayName(){
        console.log(this.name);
    }

    sayAge(){
        console.log(this.age);
    }

    static getStaticValue(){
        return ClassA.staticValue;
    }

    static setStaticValue(value){
        ClassA.staticValue = value;
    }
}
class ClassB extends ClassA{
    constructor(name, age, job){
        super(name, age);
        this.job = job;
    }

    sayJob(){
        console.log(this.job);
    }
}
```

- ES6中不能通过static定义类的静态属性，我们可以直接通过ClassA.staticValue = "static value";定义类的静态属性。

```javascript
ClassA.staticValue = "static value";
```

***
### 3.私有属性和方法
- proposal-class-fields与proposal-private-methods定义了 Class 的私有属性以及私有方法，这 2 个提案已经处于 Stage 3，这就意味着它们已经基本确定下来了，等待被加入到新的 ECMAScript 版本中。最新的 Chrome 已经支持了 Class 私有属性。
- Class 的私有属性语法如下：
```javascript
class Point {
 #x;
 #y;
 constructor(x, y) {
  this.#x = x;
  this.#y = y;
 }
 equals(point) {
  return this.#x === point.#x && this.#y === point.#y;
 }
}
```
- 定义 Class 私有属性
私有属性与公共属性的定义方式几乎是一样的，只是需要在属性名称前面添加#符号;
定义私有属性的时候也可以不用赋值;
- Class 的私有方法语法如下：
```
class Foo {
 constructor() {
  this.#method();
 }
 #method() {
  // ...
 }
}
```


***
### 4.继承
####  (1)原型链继承
- 缺点
 -引用类型的属性被所有实例共享
 -在创建Child实例时，不能向Parent传参
```javascript
 function Parent() {
    this.name = 'jchermy';
}
Parent.prototype.getName =  function() {
    console.log(this.name);
}
function Child() {
}
Child.prototype = new Parent();
var child1 = new Child();
console.log(child1.getName()); //jchermy
```
 当继承属性为引用类型时，属性共享
```javascript
 function Parent() {
    this.names = ["aa", "bb"]; //引用类型值
}
function Child() {
}
Child.prototype = new Parent();

var child1 = new Child();
child1.names.push("cc");
console.log(child1.names); //["aa","bb","cc"]

var child2 = new Child();
console.log(child2.names); //["aa","bb","cc"]

child2.names.push("dd");
console.log(child1.names) //["aa", "bb", "cc", "dd"]
console.log(child2.names);//["aa", "bb", "cc", "dd"]

var p = new Parent();
console.log(p.names); //["aa", "bb"]
```
 
#### (2)构造函数继承
 - 优点
  -避免了引用类型的属性被所有实例共享
  -可以在Child中向Parent传参
 - 缺点
  -方法都在构造函数中定义，每次创建实例都会创建一遍方法
  
```javascript
  function Parent() {
    this.names = ["aa", "bb"];
}
function Child() {
    Parent.call(this);
}
var child1 = new Child();
child1.names.push("cc");
console.log(child1.names);//["aa", "bb", "cc"]

var child2 = new Child();
console.log(child2.names);//["aa", "bb"]

child2.names.push("dd");
console.log(child1.names); //["aa", "bb", "cc"]
console.log(child2.names); //["aa", "bb", "dd"]

var p = new Parent();
p.names; //["aa", "bb"]
```

#### (3)组合继承
组合继承融合原型链继承和构造函数的优点，是JavaScript中最常用的继承模式
  - 缺点
   -会调用两次父构造函数。
   
```javascript
function Parent(name) {
    this.name = name;
    this.colors = ["red", "blue"];
}
Parent.prototype.getName = function() {
    console.log(this.name);
}
function Child(name, age) {
    Parent.call(this, name); 
    this.age = age;
}
Child.prototype = new Parent();
Child.prototype.constructor = Child;

var child1 = new Child("aa", 18);
child1.colors.push("black");

child1.name; //"aa"
child1.age; //18
child1.colors; //["red", "blue","black"]

var child2 = new Child("bb", 20);
child2.name; //"bb"
child2.age; //20
child2.colors; //["red", "blue"]
```
在这个例子中，如果我们打印 child1 对象，我们会发现 Child.prototype 和 child1 都有一个属性为colors，属性值为['red', 'blue']。

#### (4)原型式继承
- 缺点：包含引用类型的属性值始终会共享相应的值，与原型链继承一样

```javascript
function createObj(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

var person = {
    name: 'jchermy',
    friends: ["aa", "bb"]
}

var person1 = createObj(person);
var person2 = createObj(person);

//注意：修改person1.name的值，person2.name的值并未发生改变，
//并不是因为person1和person2有独立的 name 值，而是因为person1.name = 'person1'，给person1添加了 name 值，并非修改了原型上的 name 值。
person1.name = "xiaomi";
console.log(person2.name); //"jchermy"

person2.friends.push("cc");
console.log(person1.friends); //["aa", "bb", "cc"]
```

#### (5)寄生式继承
创建一个仅用于封装继承过程的函数，该函数在内部以某种形式做增强对象，最后返回对象
- 缺点：
-跟借用构造函数模式一样，每次创建对象都会创建一遍方法
-包含引用类型的属性值始终会共享相应的值

```javascript
function createObj(o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log("hi");
      }
      return clone;
}

var person = {
    name: "jchermy",
    friends: ["aa", "bb"]
};

var person1 = createObj(person);
var person2 = createObj(person);

person1.name = "xiaomi";
console.log(person1.name); //"xiaomi"
console.log(person2.name); //"jchermy"

person1.friends.push("xxx");
console.log(person1.friends); // ["aa", "bb", "xxx"]
console.log(person2.friends); // ["aa", "bb", "xxx"]
```

#### (6)寄生组合式继承
这种方式的高效率体现它只调用了一次 Parent 构造函数，并且因此避免了在 Parent.prototype 上面创建不必要的、多余的属性。与此同时，原型链还能保持不变；因此，还能够正常使用 instanceof 和 isPrototypeOf。寄生组合式继承是引用类型最理想的继承范式。

```javascript
function Parent(name) {
   this.name = name;
   this.colors = ["red", "blue", "green"];
}

Parent.prototype.getName = function () {
    console.log(this.name);
  }

  function Child(name, age) {
      Parent.call(this, name);
      this.age = age;
  }

//关键的三步
  var F = function(){};

  F.prototype = Parent.prototype;

  Child.prototype = new F();


  
  Child.prototype.constructor = Child;

  var child1 = new Child('xiaomi', 18);
  var child2 = new Child2('aa', 24);
  console.log(child1.name); //xiaomi
  console.log(child2.name); //aa

  child1.colors.push("black");
  child1.colors; //["red", "blue", "green", "black"]
  child2.colors; //["red", "blue", "green"];
```

***
###  5.ES6 module
#### (1)模块功能主要由两个命令构成：export 和 import。export命令用于规定模块的对外接口，import命令用于输入其他模块提供的功能。
#### (2)export命令
一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用export关键字输出该变量
export可以输出变量或者函数，例如：
```javascript
输出变量：
export var year = 1958; 
或者写成：
var year = 1958; 
export {year}; （推荐）

输出函数：
export function f() {};
或者写成：
function f() {}
export {f};
```
#### (3)import命令
使用export命令定义了模块的对外接口以后，其他 JS 文件就可以通过import命令加载这个模块
`import {a} from './xxx.js' `
由于import是静态执行，所以不能使用表达式和变量这些只有在运行时才能得到结果的语法结构。
```javascript
// 报错
import { 'f' + 'oo' } from 'my_module';

// 报错
let module = 'my_module';
import { foo } from module;

// 报错
if (x === 1) {
  import { foo } from 'module1';
} else {
  import { foo } from 'module2';
}
```

#### (4)export default命令
从上面的例子来看，使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载，为了方便快捷，就要用到export default命令，为模块指定默认输出，当其他模块加载该模块时，import命令可以为该匿名函数指定任意名字
```javascript
// export-default.js
export default function () {
  console.log('foo');
}

// import-default.js
import customName from './export-default';
customName(); // 'foo'
```
上面代码的import命令，可以用任意名称指向export-default.js输出的方法，这时就不需要知道原模块输出的函数名。需要注意的是，这时import命令后面，不使用大括号。
export default命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此export default命令只能使用一次。
#### (5)module加载实现
传统方法就是浏览器通过<script>标签加载 JavaScript 脚本，默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎遇到<script>标签就会停下来，等到执行完脚本，再继续向下渲染，如果脚本体积很大，下载和执行的时间就会很长，因此造成浏览器堵塞，用户体验差，下面就是两种异步加载的语法：
```javascript
<script src="path/to/myModule.js" defer></script>
<script src="path/to/myModule.js" async></script>
```
- defer与async的区别是：defer要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），才会执行；async一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。一句话，defer是“渲染完再执行”，async是“下载完就执行”。
***
### 6.动态/静态import
静态import在首次加载时候会把全部模块资源都下载下来，但是，我们实际开发时候，有时候需要动态加载，即触发某种情况后，才去加载某些新的模块。
动态import：
#### (1)使用import()
- import()只是长得像函数，实际上是一个单纯的语法；
- import()返回的是一个promise对象
```javascript
import(moduleSpecifier).then((module)={})
import('./module1.js').then((module)={});
module = await import('./module1.js')
moudle1.xxx();
module1.yyy();
```

#### (2)交互中的动态import
静态 import 只能用在 type="mdoule" 的 js 脚本中。而动态 import 却可以用在传统 js 脚本中：
```javascript
<script>
  const main = document.querySelector('main');
  const links = document.querySelectorAll('nav > a');
  for (const link of links) {
    link.addEventListener('click', async (event) => {
    
      	const module = await import(`./${link.dataset.module}.js`);
      	module.loadPageInto(main);
    });
  }
</script>
```
***
### 7.单例模式
#### (1)定义
单例模式也称作为单子模式，单体模式。单例模式的定义是产生一个类的唯一实例，是软件设计中较为简单但是很常用的一种设计模式。
单例模式的核心是确保只有一个实例，并提供全局访问。
#### (2)实现方式

```
class People {
    constructor(name) {
        if (typeof People.instance === 'object') {
            return People.instance;
        }
        People.instance = this;
        this.name = name
        return this;
    }
}
var a = new People('a')
var b = new People('b')
console.log(a===b)  //true
```