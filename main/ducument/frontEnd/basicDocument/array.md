# Array
## Array 对象方法
- Array.prototype.push()  
  arr.push(element1, ..., elementN)  
  方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。
  
  
- Array.prototype.pop()  
  arr.pop()  
  方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。
  
  
- Array.prototype.concat()  
  array1.concat(array2,array3,...,arrayX)  
  方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。


- Array.prototype.copyWithin()  
  array.copyWithin(target, start, end)  
  方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。
  
  
- Array.prototype.entries()  
  array.entries()  
  方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

- Array.prototype.every()  
  array.every(function(currentValue,index,arr), thisValue)  
  方法使用指定函数检测数组中的所有元素,如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测,如果所有元素都满足条件，则返回 true。  
  
  
- Array.prototype.fill()  
  array.fill(value, start, end)  
  fill() 方法用于将一个固定值替换数组的元素。  


- Array.prototype.filter()   
  array.filter(function(currentValue,index,arr), thisValue)  
  filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。  


- Array.prototype.find()  
  array.find(function(currentValue, index, arr),thisValue)  
  当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。如果没有符合条件的元素返回 undefined。  
  
  
- Array.prototype.findIndex()
  array.findIndex(function(currentValue, index, arr), thisValue)  
  当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。如果没有符合条件的元素返回 -1。  
  
  
- Array.prototype.forEach()  
  array.forEach(function(currentValue, index, arr), thisValue)  
  方法用于调用数组的每个元素，并将元素传递给回调函数  
  
  
- Array.prototype.from()  
  Array.from(object, mapFunction, thisValue)  
  from() 方法用于通过拥有 length 属性的对象或可迭代的对象来返回一个数组。  
  
  
- Array.prototype.includes()  
  arr.includes(searchElement, fromIndex)  
  arr.includes() 方法用于通过拥有 length 属性的对象或可迭代的对象来返回一个数组。  
  
  
- Array.prototype.indexOf()  
  arr.indexOf(searchElement, fromIndex)  
  arr.indexOf() 方方法可返回数组中某个指定的元素位置。返回 item 的第一次出现的位置。开始位置的索引为 0  
  
  
- Array.prototype.isArray()  
  Array.isArray(obj)  
  isArray() 方法用于判断一个对象是否为数组。  
  
  
- Array.prototype.join()  
  array.join(separator)  
  join() 方法用于把数组中的所有元素转换一个字符串。  
  
  
- Array.prototype.keys()  
  array.keys()  
  keys() 方法用于从数组创建一个包含数组键的可迭代对象。  
  
  
- Array.prototype.valueOf()  
  array.valueOf()  
  valueOf() 方法返回 Array 对象的原始值。  
  
  
- Array.prototype.lastIndexOf()  
  array.lastIndexOf(item,start)  
  lastIndexOf() 方法可返回一个指定的元素在数组中最后出现的位置，从该字符串的后面向前查找。如果要检索的元素没有出现，则该方法返回 -1。元素是通过指定的分隔符进行分隔的。  


- Array.prototype.map()  
  array.map(function(currentValue,index,arr), thisValue)  
  map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。  
  
  
- Array.prototype.reduce()  
  array.reduce(function(total, currentValue, currentIndex, arr), initialValue)  
  reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。  


- Array.prototype.reduceRight()  
  array.reduceRight(function(total, currentValue, currentIndex, arr), initialValue)  
  reduceRight() 方法的功能和 reduce() 功能是一样的，不同的是 reduceRight() 从数组的末尾向前将数组中的数组项做累加。  


- Array.prototype.reverse()  
  array.reverse()  
  reverse() 方法用于颠倒数组中元素的顺序。  
  
  
- Array.prototype.shift()  
  array.shift()  
  shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。  
  
- Array.prototype.unshift()  
  array.unshift(item1,item2, ..., itemX)  
  unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。  

- Array.prototype.slice()  
  array.slice(start, end)  
  slice() 方法可从已有的数组中返回选定的元素。  
  
- Array.prototype.splice()  
  array.splice(index,howmany,item1,.....,itemX)  
  splice() 方法用于添加或删除数组中的元素。  
  
  
- Array.prototype.some()  
  array.some(function(currentValue,index,arr),thisValue)  
  some() 方法用于检测数组中的元素是否满足指定条件（函数提供）。如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测。如果没有满足条件的元素，则返回false。如果没有满足条件的元素，则返回false。  
  
  
- Array.prototype.sort()  
  array.sort(sortfunction)   
  sort() 方法用于对数组的元素进行排序。  
  排序顺序可以是字母或数字，并按升序或降序。默认排序顺序为按字母升序。  

- Array.prototype.toString()  
  array.toString()  
  toString() 方法可把数组转换为字符串，并返回结果。  


## 数组属性
- Array() constructor  
  在 JavaScript 中, constructor 属性返回对象的构造函数。  
  
- length   
  array.length  
  length 属性可设置或返回数组中元素的数目。  

- prototype   
  Array.prototype.name=value  
  prototype 属性可以向对象添加属性和方法。  



