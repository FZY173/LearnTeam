# Date
- date对象用于处理日期和时间
- date对象的初始化语法
`var date = new Date()`

## 1.Date对象方法
| 方法| 描述|
| --- | --- |
|Date()|返回当日的日期和时间|
|getDate()|从 Date 对象返回一个月中的某一天 (1 ~ 31)|
|getDay()|从 Date 对象返回一周中的某一天 (0 ~ 6)，注意是从0开始|
|getMonth()|从 Date 对象返回月份 (0 ~ 11)，注意是从0开始|
|etFullYear()|从 Date 对象以四位数字返回年份|
|getHours()|返回 Date 对象的小时 (0 ~ 23)|
|getMinutes()|返回 Date 对象的分钟 (0 ~ 59)|
|getSeconds()|返回 Date 对象的秒数 (0 ~ 59)|
|getMilliseconds()|返回 Date 对象的毫秒(0 ~ 999)|
|getTime()|返回 1970 年 1 月 1 日至今的毫秒数|
|setDate()|设置 Date 对象中月的某一天 (1 ~ 31)|
|setMonth()	|设置 Date 对象中月份 (0 ~ 11)|
|setFullYear()|	设置 Date 对象中的年份（四位数字）|
|setHours()|	设置 Date 对象中的小时 (0 ~ 23)|
|setMinutes()|	设置 Date 对象中的分钟 (0 ~ 59)|
|setSeconds()|	设置 Date 对象中的秒钟 (0 ~ 59)|
|setMilliseconds()|	设置 Date 对象中的毫秒 (0 ~ 999)|
|toString()|	把 Date 对象转换为字符串|
|toTimeString()|	把 Date 对象的时间部分转换为字符串|
|toDateString()|	把 Date 对象的日期部分转换为字符串|
|toLocaleString()|	根据本地时间格式，把 Date 对象转换为字符串|
|toLocaleTimeString()|	根据本地时间格式，把 Date 对象的时间部分转换为字符串|
|toLocaleDateString()|	根据本地时间格式，把 Date 对象的日期部分转换为字符串|

## 2.Date格式化
将Date类型格式化为"yyyy/MM/dd HH:mm:ss"
```JavaScript
//Date的prototype 属性可以向对象添加属性和方法。   
 Date.prototype.Format = function(fmt){
        var o = {
            "M+": this.getMonth()+1,
            "d+": this.getDate(),
            "H+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "S+": this.getMilliseconds()
        };
        //因为date.getFullYear()出来的结果是number类型的,所以为了让结果变成字符串型，下面有两种方法：
        if(/(y+)/.test(fmt)){
            //第一种：利用字符串连接符“+”给date.getFullYear()+""，加一个空字符串便可以将number类型转换成字符串。
            fmt=fmt.replace(RegExp.$1,(this.getFullYear().toString()).substr(4-RegExp.$1.length));
        }
        for(var k in o){
            if (new RegExp("(" + k +")").test(fmt)){
                //第二种：使用String()类型进行强制数据类型转换String(date.getFullYear())，这种更容易理解。
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(String(o[k]).length)));
            }
        }
        return fmt;
    };
```

