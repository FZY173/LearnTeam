# 解构

## 学习要点（关键字）
数组解构、对象解构、字符串解构、数字和布尔解构、函数解构

###  1.数组解构
通过在数组中的位置进行选取，且可以将其存储在任意变量中，未“显式声明”的元素都会被直接被忽略。
```javascript
Syntax: [arg1, arg2] = [value1, value2]
Syntax: [arg1, , arg3] = [value1, value2, value3]
Syntax: [arg1, arg2, ...resetArgs] = [value1, value2, value3, value4]
```

### 2.对象解构
`Syntax: {arg1, arg2} = {arg1: value1, arg2: value2}`
```javascript
var {foo, bar} = {foo: "aaa", bar: "bbb"};
console.log("foo="+foo+",bar="+bar);  //foo=aaa,bar=bbb
```
对象的解构赋值的内部机制，是先找到同名的内部属性，然后再赋值给对象的变量。真正被赋值的是后者，而不是前者。
```javascript
var {foo: baz} = {foo: "aaa"}; 
baz;  // "aaa"
foo;  // error: foo is not defined
```

### 3.字符串解构
同数组一样，变量位置与字符位置一一对应，未”显示申明“的元素会被直接忽略
```javascript
var [a, b, c, d, e] = 'hello';
a;  // 'h'
e;  // 'o'
```

### 4.数字和布尔解构
只要等于号右边的值不是对象，则优先将其转为对象
```
let {toString: s} = 123;
s === Number.proptotype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString  // true
```

### 5.函数解构
```
function add([x,y]){
    retrun x + y;
}

add([1,2]) // 3
```
函数add的参数实际上不是一个数组，而是通过解构得到的变量x和y。
函数参数的解构依旧可以使用默认值。
```
function move({x = 0, y = 0} = {}){
    retrun [x,y]
}
move({x: 3,y: 8}); // [3,8];
move({x: 3}) // [3,0]
move({}) // [0,0]
move() // [0,0]
```
&emsp;
***
## 解构的用途
### 1.交换变量的值
`[x, y] = [y, x]  //不需要中间变量`
### 2.从函数中返回多个值
```
function test(){
    return ["tom", 25];
}
var [name, age] = test(); 
console.log(name,age); //tom 25
```
### 3.函数参数的定义
```
//有序
function f([x, y, z]) {
console.log("x="+x+",y="+y+",z="+z);
}
f([1, 2, 3]);  //x=1,y=2,z=3
// 无序
function f({x, y, z}) {
console.log("x="+x+",y="+y+",z="+z);
}
f({x:1, z:2, y:3});  //x=1,y=3,z=2
```
### 4.函数参数的默认值：避免了使用“||”操作
```
function move({x = 0, y = 0} = {}){
    retrun [x,y]
}
move({x: 3,y: 8}); // [3,8];
move({x: 3}) // [3,0]
move({}) // [0,0]
move() // [0,0]
```
### 5.提取json数据
```
var jsonData = {
    name: 'tom',
    age: 25,
    data: [100, 99]
};
let {name, age, data} = jsonData;
console.log(name,age,data); //tom 25 [100,99]
```
### 6.遍历map解构
```
var map = new Map() ;
map.set('first', 'hello');
map.set('sec', 'world');

for(let [key, value] of map){
    // 从循环的数值中依次赋值key和value
    console.log(key + "is" + value)
    // first is hello 
    // sec is world 
}
```
### 7.输入模块的指定方法
加载模块时，往往需要指定输入哪些方法，解构赋值使得输入语句非常清晰。
`const { testMethod1, testMethod2 } = require("constants");`
`import { function1, function2 } from 'xxx.js';`
### 8.深层匹配
有时我们需要获取某深层对象中属性，ES6之前我们只能一层层迭代获取，在ES6中可以通过模式匹配进行获取。
###### (1).Object in Object
```
var obj = {
  a: 1,
  b: {
    c: 3
  }
};
// 后去属性a和c的值
let {a, b:{c}} = obj; 
console.log(a); // 1
console.log(b); // Uncaught ReferenceError: b is not defined
console.log(c); // 3

// 可以给c指定别名
let {a, b:{c: t}} = obj;
console.log(a); // 1
console.log(b); // Uncaught ReferenceError: b is not defined
console.log(c); // undefined
console.log(t); // 3
```
###### (2).Array in Object
```
let {a, b: [x, y]} = {a: 1, b: [2, 3]};
console.log(a); // 1
console.log(x); // 2
console.log(y); // 3
```
###### (3).Object in Array
```
let [a, {b, c}] = [1, {b: 2, c: 3}];
console.log(a); // 1
console.log(b); // 2
console.log(c); // 3
```
###### (4).Array in Array
```
let [a, [b, c]] = [1, [2, 3]];
console.log(a); // 1
console.log(b); // 2
console.log(c); // 3
```