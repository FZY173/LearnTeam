# Number

## 学习要点（关键字）


### 1.Number类型
* Number类型表示数字，JavaScript 采用“IEEE 754 标准定义的双精度64位格式”（"double-precision 64-bit format IEEE 754 values"）表示数字。
和其他编程语言不同，JavaScript不区分整数值和浮点数值，所有数字在JavaScript中均用[[浮点数]]表示。
```
var [num1,num2]=[0.1,0.2];
console.log(num1+num2 === 0.3); //false,0.1+0.2=0.30000000000000004;
//所以浮点运算判断相等时，因为计算结果丢失精度的原因，直接比较会不相等，一般可以这么做
// 浮点运算判断相等
var ACCURACY = 1e-5; //定义精度精确到0.00001
var a = 0.1;
var b = 0.2;
var sum = 0.3;
// 判断相差小于精度就认为相等
if (a + b - sum < ACCURACY) {
 console.log('a+b == sum');
}
```

* 可以使用省略 0 表示小数，也可以用指数形式表示数字
```
.9; // 0.9
1E3 // 1000
2e6 // 2000000
0.1e2 // 10
1e-5 // 0.00001
```

* Number数字的不同进制表示方法
  * 二进制：0b或0B
  * 八进制：以0开头，假如后面不是0~7之间的数字，会被转化为10进制
  * 在ECMAScript 5 严格模式下禁止使用八进制语法，会被视为十进制
  * 在ECMAScript 6中使用八进制数字是需要给一个数字添加前缀"0o"
  * 十六进制表示法：以零为开头，后面接一个小写或大写的拉丁文字母X(0x或者是0X)
* 不同进制的转换
主要用到Number的toString()方法或parseInt()方法：
```javascript
// toString转换，输入为Number，返回为String
var n = 120;
n.toString(); // "120"
n.toString(2); // "1111000"
n.toString(8); // "170"
n.toString(16); // "78"
n.toString(20); // "60"
0x11.toString(); // "17"
0b111.toString(); // "7"
0x11.toString(12);// "15"
// parseInt转换，输入为String，返回为Number
parseInt('110'); // 110
parseInt('110', 2); // 6
parseInt('110', 8); // 72
parseInt('110', 16); // 272
parseInt('110', 26); // 702
// toString和parseInt结合使用可以在两两进制之间转换
// 将 a 从36进制转为12进制
var a = 'ra'; // 36进制表示的数
parseInt(a, 36).toString(12); // "960"
```
***
## 2.Number对象
#####  (1)Number对象的属性
 | 属性 | 描述 |
 | --- | --- |
 |Number.MAX_VALUE|可表示的最大值|
 |Number.MIN_VALUE|可表示的最小值|
 |Number.NAN|特指非数字|
 |Number.NEGATIVE_INFINITY|特指“负无穷”,在溢出时返回|
 |Number.POSITIVE_INFINITY|特指“正无穷”;在溢出时返回|
 |Number.EPSILON|表示1和比最接近1且大于1的最小Number之间的差别|
 |Number.MIN_SAFE_INTEGER|JavaScript最小安全整数|
 |Number.MAX_SAFE_INTEGER|JavaScript最大安全整数|
 
##### (2)Number对象的方法
 
| 方法 | 描述 |
| --- | --- |
|Number.parseFloat()	|把字符串参数解析成浮点数，左右等效于一元运算法+|
|Number.parseInt()	|把字符串解析成特定基数对应的整型数字|
|Number.isFinite()	|判断传递的值是否为有限数字|
|Number.isInteger()	|判断传递的值是否为整数|
|Number.isNaN()	|判断传递的值是否为 NaN|
|Number.isSafeInteger()	|判断传递的值是否为安全整数|
## 3.Number类型原型方法

| 方法 | 描述 | 例子 |
| --- | --- | --- |
|toExponential()|	返回一个数字的指数形式的字符串|(100).toExponential();//1e+2
|toFixed()|	返回指定小数位数的表示形式|(100).toFixed(6);//"100.000000"
|toPrecision()|	返回一个指定精度的数字|(-2.34).toFixed(1);  //"-2.3" 

## 4.数学对象Math
Math对象提供了很多数学常数和函数的属性和方法
##### 1.常数

| 属性 | 描述 |
| --- | --- |
|Math.E|	欧拉常数，也是自然对数的底数, 约等于 2.718|
|Math.LN2|	2的自然对数, 约等于0.693|
|Math.LN10|	10的自然对数, 约等于 2.303|
|Math.LOG2E|	以2为底E的对数, 约等于 1.443|
|Math.LOG10E|	以10为底E的对数, 约等于 0.434|
|Math.PI|	圆周率，一个圆的周长和直径之比，约等于 3.14159|
|Math.SQRT2|	2的平方根,约等于 1.414|
##### 2.函数

| 方法 | 描述 |
| --- | --- |
|Math.abs(x)|返回x的绝对值|
|Math.random()|返回0~1之间的伪随机数
|Math.floor(x)|返回x向上取整后的值|
|Math.ceil(x)|返回x向下取整后的值|
|Math.round(x)|返回四舍五入后的整数|
|Math.trunc(x)|返回x的整数部分，去除小数|
|Math.sqrt(x)|返回x的平方根|
|Math.cbrt(x)|返回x的立方根|
|Math.pow(x,y)|返回x的y次幂|
|Math.min(x,y,..,z)|返回x,y,...,z中的较小值|
|Math.max(x,y,...z)|返回x,y,...,z中的较大值|

## 5.NaN
表示一个本来要返回数值的操作数没有返回数值的情况
* onsole.log(typeof NaN); //number
* 任何涉及NaN的操作（如：NaN/10）都会返回NaN
* NaN与任何值都不相等包括NaN本身
