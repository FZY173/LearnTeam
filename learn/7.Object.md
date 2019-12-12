# Object

## 学习要点（关键字）
所有原型方法
***
### 1.操作属性和方法
```
var person = {
  name:"tom",
  age:20
}
/*添加*/
person.gender = "男";
person.print(){
  console.log("name: "+name+",age: "+age+",gender: "+gender);
}
/*删除*/
delete person.name;
delete person.print();
console.log(person.name); undefined
person.print();  //name: undefined,age: 20,gender: 男
/*使用in判断属性和方法是否存在对象中*/
console.log("name" in person);  //true
```
### 2.Object.assign()
通过复制一个或多个对象来创建一个新的对象。实现的是浅拷贝，而不是深拷贝
```
var obj1 = { a:1 };
var obj2 = { b:2,c:3 };
var obj = Object.assign(obj1,obj2);  //{a: 1, b: 2, c: 3}
```
### 3.Object.create()
使用指定的原型对象和属性创建一个新对象。
```
const person = {
  isStuent: false,
  print: function () {
    console.log(`My name is ${this.name}. Am I student? ${this.isStuent}`);
  }
};
const me = Object.create(person);
me.name = "tom"; 
me.isStuent = true; 
me.print(); // expected output: "My name is tom. Am I student? true"
```
### 4.Object.defineProperty()
给对象添加一个属性并指定该属性的配置。
```
Object.defineProperty(Object, 'is', {
  value: function(x, y) {
    if (x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }
    // 针对NaN的情况
    return x !== x && y !== y;
  },
  configurable: true,
  enumerable: false,
  writable: true 
}); 
```
### 5.Object.defineProperties()
给对象添加多个属性并分别指定它们的配置。
```
var obj = {};
Object.defineProperties(obj, {
    'property1': {
        value: true,
        writable: true
    },
    'property2': {
        value: 'Hello',
        writable: false
    }
    // etc. etc.
});
console.log(obj)   // {property1: true, property2: "Hello"}
```
### 6.Object.entries()
返回给定对象自身可枚举属性的 [key, value] 数组。
其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环也枚举原型链中的属性）。
```
const obj = { foo: 'bar', baz: 42 };
console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
 
const simuArray = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.entries(simuArray)); // [ ['0', 'a'], ['1', 'b'], ['2', 'c'] ]
```
### 7.Object.freeze()
冻结对象：其他代码不能删除或更改任何属性。
冻结一个对象，冻结指的是不能向这个对象添加新的属性，不能修改其已有属性的值，不能删除已有属性，以及不能修改该对象已有属性的可枚举性、可配置性、可写性。也就是说，这个对象永远是不可变的。该方法返回被冻结的对象。
### 8.Object.getOwnPropertyDescriptor()
返回对象指定的属性配置。
```
var arr = ['name','age'] ;
arr.forEach(() => console.log(Object.getOwnPropertyDescriptor(self)))
//{value: undefined, writable: false, enumerable: false, configurable: false}
//{value: undefined, writable: false, enumerable: false, configurable: false}
```
### 9.Object.getOwnPropertyNames()
返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名,不包括Symbol值作为名称的属性
```
var obj = { 0: "a", 1: "b", 2: "c"};
Object.getOwnPropertyNames(obj).forEach(function(val) {
  console.log(val);
}); 
var obj = {
    x : 1,
    y : 2
}
Object.defineProperty(obj,'z',{
    enumerable : false
})
console.log(Object.getOwnPropertyNames(obj))  // ["x", "y", "z"] 包含不可枚举属性 
console.log(Object.keys(obj))                 // ["x", "y"]      只包含可枚举属性 
```
### 10.bject.getOwnPropertySymbols()
返回一个数组，它包含了指定对象自身所有的符号属性。
### 11.Object.getPrototypeOf()
返回指定对象的原型对象。
### 12.Object.is()
比较两个值是否相同。所有 NaN 值都相等（这与==和===不同）。
如果下列任何一项成立，则两个值相同：
* 两个值都是 undefined
* 两个值都是 null
* 两个值都是 true 或者都是 false
* 两个值是由相同个数的字符按照相同的顺序组成的字符串
* 两个值指向同一个对象
* 两个值都是数字并且
* 都是正零 +0
* 都是负零 -0
* 都是 NaN
* 都是除零和 NaN 外的其它同一个数字
### 13.Object.isExtensible()
判断对象是否可扩展。
判断对象是否是可扩展的，Object.preventExtensions，Object.seal 或 Object.freeze 方法都可以标记一个对象为不可扩展（non-extensible）
### 14.Object.isFrozen()
判断对象是否已经冻结。
### 15.Object.isSealed()
判断对象是否已经密封。
### 16.Object.keys()
返回一个包含所有给定对象自身可枚举属性名称的数组。
```
let obj = { foo: "bar", baz: 42 },
    keys = Object.keys(obj);
console.log(keys);
// ["foo","baz"] 
```
### 17.Object.preventExtensions()
防止对象的任何扩展。
对象不能再添加新的属性。可修改，删除现有属性，不能添加新属性。
```
var obj = {
    name :'lilei',
    age : 30 ,
    sex : 'male'
}
 
obj = Object.preventExtensions(obj);
console.log(obj);    // {name: "lilei", age: 30, sex: "male"}
obj.name = 'haha';
console.log(obj)     // {name: "haha", age: 30, sex: "male"}
delete obj.sex ;
console.log(obj);    // {name: "haha", age: 30}
obj.address  = 'china';
console.log(obj)     // {name: "haha", age: 30}
```
### 18.Object.seal()
防止其他代码删除对象的属性。
方法可以让一个对象密封，并返回被密封后的对象。密封一个对象会让这个对象变的不能添加新属性，且所有已有属性会变的不可配置。属性不可配置的效果就是属性变的不可删除，以及一个数据属性不能被重新定义成为访问器属性，或者反之。但属性的值仍然可以修改。尝试删除一个密封对象的属性或者将某个密封对象的属性从数据属性转换成访问器属性，结果会静默失败或抛出TypeError 异常. 不会影响从原型链上继承的属性。但 `__proto__ ()`属性的值也会不能修改。
### 19.Object.setPrototypeOf()
设置对象的原型（即内部 [[Prototype]] 属性）。
### 20.Object.values()
返回给定对象自身可枚举值的数组。
```
var an_obj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.values(an_obj)); // ['b', 'c', 'a']
 
var obj = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.values(obj)); // ['a', 'b', 'c']
```
### 21.hasOwnProperty()
判断对象自身属性中是否具有指定的属性。
`obj.hasOwnProperty('name')`