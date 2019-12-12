# Error

## 学习要点（关键字）
InternalError、RangeError、ReferenceError、TypeError


#### 1、实例对象
JavaScript 解析或运行时，一旦发生错误，引擎就会抛出一个错误对象。JavaScript 原生提供Error构造函数，所有抛出的错误都是这个构造函数的实例。
```
var err = new Error('出错了');
err
```
rror实例对象必须有message属性，表示出错时的提示信息，没有提到其他属性。大多数 JavaScript 引擎，对Error实例还提供name和stack属性，分别表示错误的名称和错误的堆栈，但它们是非标准的，不是每种实现都有。

#### 2、错误类型
* SyntaxError 对象：解析代码时发生的语法错误。
* ReferenceError 对象 ：引用一个不存在的变量时发生的错误。
* RangeError 对象：个值超出有效范围时发生的错误。主要有几种情况，一是数组长度为负数，二是Number对象的方法参数超出范围，以及函数堆栈超过最大值。
* TypeError 对象：变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用new命令，就会抛出这种错误，因为new命令的参数应该是一个构造函数。
* URIError 对象：URI 相关函数的参数不正确时抛出的错误。
* EvalError 对象：eval函数没有被正确执行时，会抛出EvalError错误。该错误类型已经不再使用了，只是为了保证与以前代码兼容，才继续保留。

#### 3、自定义一个错误
```
function UserError(message) {
  this.message = message || '默认信息';
  this.name = 'UserError';
}

UserError.prototype = new Error();
UserError.prototype.constructor = UserError;
//使用
new UserError('这是自定义的错误！');
```
#### 4、语句
* throw 语句
throw语句的作用是手动中断程序执行，抛出一个错误。
```
if (x <= 0) {
  throw new Error('x 必须为正数');
}
```

* try...catch 结构
一旦发生错误，程序就中止执行了。JavaScript 提供了try...catch结构，允许对错误进行处理，选择是否往下执行。

```
try {
  throw new Error('出错了!');
} catch (e) {
  console.log(e.name + ": " + e.message);
  console.log(e.stack);
}
```

* finally 代码块
try...catch结构允许在最后添加一个finally代码块，表示不管是否出现错误，都必需在最后运行的语句。
```
openFile();

try {
  writeFile(Data);
} catch(e) {
  handleError(e);
} finally {
  closeFile();
}
```

