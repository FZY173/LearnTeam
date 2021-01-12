### JSON
#### 1、JSON 格式
它是一种用于数据交换的文本格式，目的是取代繁琐笨重的 XML 格式。每个 JSON 对象就是一个值，可能是一个数组或对象，也可能是一个原始类型的值。总之，只能是一个值，不能是两个或更多的值。

* 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
* 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和null（不能使用NaN, Infinity, -Infinity和undefined）。
* 字符串必须使用双引号表示，不能使用单引号。
* 对象的键名必须放在双引号里面。
* 数组或对象最后一个成员的后面，不能加逗号。

#### 2、JSON 对象
JSON对象是 JavaScript 的原生对象，用来处理 JSON 格式数据。它有两个静态方法：JSON.stringify()和JSON.parse()。

#### 3、JSON.stringify()
* 用于将一个值转为 JSON 字符串。该字符串符合 JSON 格式，并且可以被JSON.parse方法还原。
* JSON.stringify方法会忽略对象的不可遍历的属性。
```
JSON.stringify('abc') // ""abc""
JSON.stringify(1) // "1"
JSON.stringify(false) // "false"
JSON.stringify([]) // "[]"
JSON.stringify({}) // "{}"

JSON.stringify([1, "false", false])
// '[1,"false",false]'

JSON.stringify({ name: "张三" })
// '{"name":"张三"}'

```

* 如果对象的属性是undefined、函数或 XML 对象，该属性会被JSON.stringify过滤。

```
var obj = {
  a: undefined,
  b: function () {}
};

JSON.stringify(obj) // "{}"
```

* 如果数组的成员是undefined、函数或 XML 对象，则这些值被转成null。
 ```
var arr = [undefined, function () {}];
JSON.stringify(arr) // "[null,null]"
```

* JSON.stringify方法还可以接受一个数组，作为第二个参数，指定需要转成字符串的属性。
```
function f(key, value) {
  if (typeof value === "number") {
    value = 2 * value;
  }
  return value;
}

JSON.stringify({ a: 1, b: 2 }, f)
// '{"a": 2,"b": 4}'

```


#### 4、JSON.parse()
* 用于将 JSON 字符串转换成对应的值。
```
JSON.parse('{}') // {}
JSON.parse('true') // true
JSON.parse('"foo"') // "foo"
JSON.parse('[1, 5, "false"]') // [1, 5, "false"]
JSON.parse('null') // null

var o = JSON.parse('{"name": "张三"}');
o.name // 张三
```

* 为了处理解析错误，可以将JSON.parse方法放在try...catch代码块中。
```
try {
  JSON.parse("'String'");
} catch(e) {
  console.log('parsing error');
}
```
* 可以接受一个处理函数，作为第二个参数，用法与JSON.stringify方法类似。
 ```
 function f(key, value) {
  if (key === 'a') {
    return value + 10;
  }
  return value;
}

JSON.parse('{"a": 1, "b": 2}', f)
// {a: 11, b: 2}
 ```





