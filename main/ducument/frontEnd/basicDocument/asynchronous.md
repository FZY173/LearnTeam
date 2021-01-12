# Promise

## 学习要点（关键字）
### 原型方法
- Promise.prototype.then()
   Promise 实例的then方法，用来添加回调函数。
   then方法可以接受两个回调函数，第一个是异步操作成功时（变为fulfilled状态）的回调函数，第二个是异步操作失败（变为rejected）时的回调函数（该参数可以省略）。一旦状态改变，就调用相应的回调函数。
   
- Promise.prototype.catch()
  catch() 方法返回一个Promise，并且处理拒绝的情况。它的行为与调用Promise.prototype.then(undefined, onRejected) 相同。 (事实上, calling obj.catch(onRejected) 内部calls obj.then(undefined, onRejected)).

- Promise.prototype.finally()
  finally() 方法返回一个Promise。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。这为在Promise是否成功完成后都需要执行的代码提供了一种方式。这避免了同样的语句需要在then()和catch()中各写一次的情况。
  
- Promise.prototype.allSettled()
  该Promise.allSettled()方法返回一个promise，该promise在所有给定的promise已被解析或被拒绝后解析，并且每个对象都描述每个promise的结果。
```
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

Promise.allSettled(promises).
  then((results) => results.forEach((result) => console.log(result.status)));

// expected output:
// "fulfilled"
// "rejected"
```
- Promise.all()
  Promise.all(iterable) 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；如果参数中  promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。
```
var promise1 = Promise.resolve(3);
var promise2 = 42;
var promise3 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(function(values) {
  console.log(values);
});
// expected output: Array [3, 42, "foo"]
```
- Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。

```
var promise1 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 500, 'one');
});

var promise2 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 1000, 'two');
});

Promise.race([promise1, promise2]).then(function(value) {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// expected output: "two"
```
### promise链式使用
- 通过链式写法代替回调写法
```
// 传统写法
step1(function (value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        // ...
      });
    });
  });
});

// Promise 的写法
(new Promise(step1))
  .then(step2)
  .then(step3)
  .then(step4);
```

- 一个链式回调的例子
```
function stepOne() {
    console.log('stepOne');
}
function stepTwo() {
    console.log('stepTwo');
}
function stepThree() {
    console.log('stepThree');
}

var control = function (timmer, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            cb();
            resolve();
        }, timmer);
    });
};

                 ****
    Promise.resolve()
    .then(function () {
        return control(3000, stepOne);
    })
    .then(function () {
        return control(2000, stepTwo);
    })
    .then(function () {
        return control(1000, stepThree);
    })
                 ****
```

### Promise的finally和try/catch的finally
- Promise的finally
```
let p =Promise.resolve(1)
let b =Promise.reject('error')
function onFinally(){
console.log('执行')
}
p.finally(onFinally);

p.finally(function() {
   console.log('执行')
});


b.finally(function() {
   console.log('错误')
});
```
- try/catch的finally
```
try {
    tryCode - 尝试执行代码块
}
catch(err) {
    catchCode - 捕获错误的代码块
}
finally {
    finallyCode - 无论 try / catch 结果如何都会执行的代码块
}
```

### 封装方法返回promise
```
1. function result(){
return new Promise(resolve,reject){
   axios.get('/url')
   .then(res=>resolve(res))
   .catch(reject(new Error());)
}
}

2.var promise = new Promise(function (resolve, reject) {
  // ...
  
  if (/* 异步操作成功 */){
    resolve(value);
  } else { /* 异步操作失败 */
    reject(new Error());
  }
});
```
### 用async/await调用
- 用async 会将function做为一个promise对象返回.
  async 函数返回的 Promise 对象，必须等到内部所有的 await 命令的 Promise 对象执行完，才会发生状态改变
```
function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('calling');
  var result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: 'resolved'
}

asyncCall();
```
- 可以将promise的链式写法改为同步的写法。
```
//一个异步操作
function getUserByPromise() {
    fetchUser()
        .then((data) => {
            console.log(data);
        }, (error) => {
            console.log(error);
        })
}
getUserByPromise();


```
- Promise、async的比较
```
//Promise:
function getProcessedData(url) {
  return downloadData(url) // 返回一个 promise 对象
    .catch(e => {
      return downloadFallbackData(url)  // 返回一个 promise 对象
    })
    .then(v => {
      return processDataInWorker(v); // 返回一个 promise 对象
    });
}

getUserByPromise();
//原生generrator 可以改变函数的执行队列
/**
 * Generator 方式
 */
function* fetchUserByGenerator() {
    const user = yield fetchUser();
    return user;
}

const g = fetchUserByGenerator();
const result = g.next().value; 
result.then((v) => {
    console.log(v);
}, (error) => {
    console.log(error);
})


/**
 * async 方式
 */
 async function getUserByAsync(){
     let user = await fetchUser();
     return user;
 }
getUserByAsync()
.then(v => console.log(v));

```
- 正常情况下，await 命令后面跟着的是 Promise ，如果不是的话，也会被转换成一个 立即 resolve 的 Promise,如果后面是一个错误或者Promise.reject。
- 当 async 函数中只要一个 await 出现 reject 状态，则后面的 await 都不会被执行。

### async/await错误处理办法（列举所有方法，找到最优办法）
- 在函数内部捕捉
```
function abc(e){
    return new Promise(function (resolve,reject) {
        setTimeout(function () {
            if(e===1) {
                resolve('success')
            }else {
                reject('error')
            }
        },2000)
    })
}


async function f() {
    let a =await abc(1).then(console.log).catch(console.log)
    let c =await abc(2).catch(console.log)
    let b =await abc(1).then(console.log).catch(console.log)
    console.log('完成')
}
f()

```
- 使用try/catch捕捉
```
function abc(e){
    return new Promise(function (resolve,reject) {
        setTimeout(function () {
            if(e===1) {
                resolve('success')
            }else {
                reject('error')
            }
        },2000)
    })
}


async function f() {
    try{
        await abc(1)
        console.log(1)
    }catch (e) {
        console.log(e)
    }
    try{
        await abc(2)
    }catch (e) {
        console.log(e)
    }

    try{
        await abc(1)
        console.log(3)
    }catch (e) {
        console.log(e)
    }
    console.log('完成')
}
f()

```