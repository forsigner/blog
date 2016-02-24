---
title: JavaScript 编码风格指南
date: 2013-09-01
tags: [JavaScript]
categories: 前端
---

程序语言的编码风格指南对于一个长期维护的软件而言是非常重要的。本指南是基于“Java语言编码规范”（Code Conventions fo the Java Programming Language）和Crockford的（JavaScript）规范，同时结合了我个人的经验和喜好做了一些改动。

<!-- more -->

## 1.缩进

每一行的层级由四个空格组成，避免使用制表符（Tab）进行缩进。

``` js
// 好的写法
if (true) {
    doSomething();
}
```

## 2.行的长度

每行长度不应该超过80个字符。如果一行多余80个字符，应当在一个运算符（逗号，加号等）后换行。下一行应当增加两极缩进（8个字符）；


``` js
// 好的写法
doSomething(argument1, argument2, argument3, argument4,
        argument5);

// 不好的写法：第二行只有四个空格的缩进
doSomething(argument1, argument2, argument3, argument4,
    argument5);

// 不好的写法：在运算符之前换行
doSomething(argument1, argument2, argument3, argument4
             ,argument5);
```


## 3.原始值

字符串应当始终使用单引号(避免使用双引号)且保持一行。避免在字符串中使用斜线另起一行。

``` js
// 好的写法
var name = 'Nicholas';

// 不好的写法： 双引号
var name = "Nicholas";

// 不好的写法：字符串结束之前换行
var longString = 'Here is the story, of a man \
named Brady.';
```

数字应当使用十进制整数，科学计数法表示整数，十六进制整数，或者十进制浮点小数，小数点前后应当至少保留一位数字。避免使用八进制直接量。

``` js
// 好的写法
var count = 10;

// 好的写法
var price = 10.0;
var price = 10.00;

// 好的写法
var num = 0xA2;

// 好的写法
var num = 1e23;

// 不好的写法：十进制数字以小数点结尾
var price = 10.;

// 不好的写法：十进制数字以小数点开头
var price = .1;

// 不好的写法：八进制（base 8）写法已废弃
var num = 010;
```

特殊值null除了下述情况下应当避免使用。

* 用来初始化一个变量，这个变量可能被赋值为一个对象。
* 用来和一个已经初始化的变量比较，这个变量可以是也可以不是一个变量。
* 当函数的参数期望是对象时，被用作参数传入。
* 当函数的返回值期望是对象时，被用作返回值传出。

例如：

``` js
// 好的写法
var person = null;

// 好的写法
function getPersion();
if (persion != null) {
    doSomething();
}

// 不好的写法：和一个未被初始化的变量比较
var persion;
if (persion != null) {
    doSomething();
}

// 不好的写法：
function doSomething(arg1, arg2, arg3, arg4) {
    if (arg4 != null) {
        doSomething(Else);
    }
}
```

避免使用特殊值 undefined。判断一个变量是否定义应当使用typeof操作符。

``` js
// 好的写法
if (typeof variable == 'undefined') {
    // do something
}

// 不好的写法：使用了undefined直接量
if (variable == undefined) {
    // do something;
}
```

## 4.运算符间距

二元运算符前后必须使用一个空格来保持表达式的整洁。操作符包括赋值运算符和逻辑运算符。

``` js
// 好的写法
var found = (values[i] === item);

// 好的写法
if (found && (count > 10)) {
    doSomething();
}

// 好的写法
for (i = 0; i < count; i++) {
    process(i);
}

// 不好的写法：丢失空格
var found = (values[i]===item);

// 不好的写法：丢失空格
if (found&&(count>10)) {
    doSomething();
}

// 不好的写法：丢失空格
for (i=0; i<count; i++) {
    process(i);
}
```

## 5.括号间距

当使用括号时，紧接左括号之后和紧接右括号之前不应该有空格。

``` js
// 好的写法
var found = (values[i] === item);

// 好的写法
if (found && (count > 10)) {
    doSomething();
}

// 好的写法
for (i= 0; i < count; i++) {
    process(i);
}

// 不好的写法：左括号之后有额外的空格
var found = ( values[i] === item);

// 不好的写法：右括号之后有额外的空格
if (found && (count > 10) ) {
    doSomething();
}
// 不好的写法：参数两边有额外的空格
for (i= 0; i < count; i++) {
    process( i );
}
```

## 6.对象直接量

对象直接量应当使用如下格式。

* 其实左括号应当同表达式保持同一行。
* 每个属性的名值对应当保持一个缩进，第一个属性应当在左括号后另起一行。
* 每个属性的名值对应当使用不用引号的属性名，其后紧跟一个冒号（之前不含空格）,而后是值。
* 倘若属性值是函数类型，函数体应当在属性名之下另起一行，而且其后均应保留一个空行。
* 一组相关的属性前后可以插入空行以提升代码的可读性。
* 结束的右括号应当独占一行。

``` js
// 好的写法
var object = {

    key1: value1,

    key2: function() {
        //做些什么
    },

    key3: value3
};

// 不好的写法：不且当的缩进
var object = {
                key1: value1,
                key2: value2
            }
;

// 不好的写法：函数体周围缺少空行
var object = {

    key1: value1,
    key2: function() {
        //做些什么
    },
    key3: value3
};
```

当对象字面量作为函数参数时，如果值是变量，起始花括号应当同函数名在同一行。

所有其余先前列出的规则同样使用。

``` js
// 好的写法
doSomething({
    key1: value1,
    key2: value2

});

// 不好的写法： 所有代码在一行上
doSomething({ key1: value1, key2: value2 });
```

## 7.注释

频繁地使用注释有助于他人理解你的代码。如下情况应当使用注释。

* 代码晦涩难懂。
* 可能被误认为错误的代码。
* 必要但不明显的针对特定浏览器的代码。
* 对于对象、方法或者属性，生成文档是有必要的（使用且当的文档注释）。

### 7.1 单行注释

单行注释应当来说明一行代码或者一组相关的代码。单行注释可能有三种使用方式。

* 独占一行的注释，用来解释下一行代码。
* 在代码行的尾部注释，用来解释之前的代码。
* 多行，用来注释掉一个代码块。

这里有一些示例代码。

``` js
// 好的写法
if (condition) {

    // 如果代码执行到这里，则表明通过了所有安全性检查
    allowed();
}


// 不好的写法：注释之前没有空行
if (condition) {
    // 如果代码执行到这里，则表明通过了所有安全性检查
    allowed();
}

// 不好的写法：错误的缩进
if (condition) {

// 如果代码执行到这里，则表明通过了所有安全性检查
    allowed();
}

// 不好的写法：这里应当用多行注释
// 接下来的这段代码非常难，那么，让我详细解释一下
// 这段代码的作用是首先判断条件是否为真
// 只有为真时才执行。这里的条件是通过
// 多个函数计算出来的，在整个会话生命期内
// 这个值是可以修改的
if (condition) {
    // 如果代码执行到这里，则表明通过了所有安全性检查
    allowed();
}
```

对于代码尾单行注释的情况，应确保代码尾同注释之间至少一个缩进。

``` js
// 好的写法
var result = something + somethingElse; // somethingElse will never be null

// 不好的写法：代码和注释间没有足够的空格
var result = something + somethingElse;// somethingElse will never be null
```

注释一个代码块时在连续多行使用单行注释是唯一可以接受的情况。多行注释不应当在这种情况下使用。

``` js
// 好的写法
// if (condition) {
//     doSomething();
//     thenDoSomethingElse();
// }
```

### 7.2 多行注释

多行注释应当在代码需要更多文字去解释的时候使用。每个多行注释都至少有如下三行。

1. 首行仅仅包括/*注释开始。该行不应当有其他文字。
2. 接下来的行以*开头并保持左对齐。这些行可以有文字描述。
3. 最后一行以*/开头并同先前行保持对齐。也不应该有其他文字。

多行注释的手行应当保持同它描述代码的相同层次缩进。后续的每行应当有同样层次的缩进并附加一个空格（为了适当保持*字符的对齐）。对每一个多行代码之前应预留一个空格。

``` js
// 好的写法
if (condition) {

    /*
     * 如果代码执行到这里
     * 说明通过了所有的安全检测
     */
    allowed();
}

// 不好的写法：注释之前无空行
if (condition) {
    /*
     * 如果代码执行到这里
     * 说明通过了所有的安全检测
     */
    allowed();
}

// 不好的写法：星号后没有空格
if (condition) {

    /*
     *如果代码执行到这里
     *说明通过了所有的安全检测
     */
    allowed();
}

// 不好的写法：错误的缩进
if (condition) {

/*
 * 如果代码执行到这里
 * 说明通过了所有的安全检测
 */
    allowed();
}

// 不好的写法：代码尾部注释不要用多行注释格式
var result = something + somethingElse; /* somethingElse will never be null */

```

### 7.3 注释声明

注释有时候也可以用来给一段代码声明额外的信息。这些声明的格式以单个单词打头并紧跟一个双引号。可使用的声明如下。

#### TODO

说明代码还未完成。应当包含下一步要做的事情。

#### HACK

表明代码实现走了一个捷径。应当包含为何使用hack的原因。这也可能表明该问题可能会有更好的解决办法。

#### XXX

说明代码是有问题的并应当尽快修复。

#### FIXME

说明代码是有问题的并应尽快修复。重要行略次于XXX。

#### REVIEW

说明代码任何可能的改动都需要评审。

这些声明可能在一行或多行注释中使用，并且应当遵循一般注释类型相同的格式规则。

例如：

``` js
// 好的写法
// TODO：我希望找到一种更快捷的方式
doSomething();

// 好的写法
/*
 * HACK：不得不针对IE做的特殊处理。我计划后续有时间时
 * 重写这部分。这些代码可能需要在v1.2版本之前替换掉
 */
if (document.all) {
    doSomething();
}

// 好的写法
// REVIEW：有更好的方法吗？
if (document.all) {
    doSomething();
}


// 不好的写法：注释声明空格不正确
// TODO： 我希望找到一种更快捷的方式
doSomething();

// 不好的写法：代码和注释应当保持同样的缩进
    // REVIEW：有更好的方法吗？
if (document.all) {
    doSomething();
}

```

## 8.声明变量

所有的变量在使用前应当事先定义。变量定义应当放在函数开头，使用一个var表达式每行一个变量。除了首行，所有行都应当多一层缩进以使变量名能够垂直方向对齐。变量定义时应当初始化，并赋值操作符应当保持一直的缩进。初始化的变量应当在未初始化变量之前。

``` js
// 好的写法
var count = 10,
    name = 'Nicholas',
    found = false,
    empty;

// 不好的写法：不恰当的初始化赋值
var count = 10,
   name = 'Nicholas',
   found= false,
   empty;

// 不好的写法：错误缩进
var count = 10,
name = 'Nicholas',
found = false,
empty;

// 不好的写法：多个定于写在一行
var count = 10, name = 'Nicholas',
    found = false, empty;

// 不好的写法：为初始化的变量放在最前边
var empty,
    count = 10,
    name = 'Nicholas',
    found = false;

// 不好的写法：多个var表达式
var empty,
    count = 10;

var name = 'Nicholas',
    found = false;
```

## 9.函数声明

函数应当在使用前提前定义。一个不是作为方法的函数（也就是说没有作为一个对象的属性）应当使用函数定义的格式（不是函数表达式和Function构造格式）。函数名和开始圆括号之间不应当有空格。结束的圆括号和右边的花括号之间应该留一个空格。右侧的花括号应当同function关键字保持同一行。开始和结束括号之间不应该有空格。参数名之间应当在逗号之后保留一个空格。函数体应当保持一级缩进。

``` js
// 好的写法
function doSomething(arg1, arg2) {
    return arg1 + arg2;
}

// 不好的写法：第一行不恰当的空格
function doSomething (arg1, arg2) {
    return arg1 + arg2;
}

// 不好的写法：函数表达式
var doSomething = function(arg1, arg2) {
    return arg1 + arg2;
}

// 不好的写法：右侧花括号不对
function doSomething(arg1, arg2)
{
    return arg1 + arg2;
}

// 错误的写法：使用了Function构造器
var doSomething = new Function('arg1', 'arg2', return arg1 + arg2);
```

其他函数内部定义函数应当在var语句后立即定义。

``` js
// 好的写法
function outer() {

    var count = 10,
        name = 'Nicholas',
        found = false,
        empty;

    function inner() {
        // 代码
    }

    // 调用inner()的代码
}

// 不好的写法：inner函数的定义先于变量
function outer() {

    function inner() {
        // 代码
    }

    var count = 10,
        name = 'Nicholas',
        found = false,
        empty;

    // 调用inner()的代码
}
```
匿名函数可能作为方法赋值给对象，或者作为其他函数的参数。function关键字同开始括号之间不应有空格。

``` js
// 好的写法
object.method = function() {
    // 代码
};

// 不好的写法：不正确的空格
object.method = function () {
    // 代码
};

```

立即被调用的函数应当在函数调用的外层用圆括号包裹。

``` js
// 好的写法
var value = (function() {

    // 函数体
    return {
        message: 'Hi'
    }
}());

// 不好的写法：函数调用外层没有用圆括号包裹
var value = function() {

    // 函数体
    return {
        message: 'Hi'
    }
}();

// 不好的写法：圆括号的位置不当
var value = (function() {

    // 函数体
    return {
        message: 'Hi'
    }
})();
```
## 10.命名

变量和函数在命名时应当小心。命名应仅限与数字字母字符，某些情况也可以使用下划线。最好不要在任何命名中使用美元（$）或反斜杠（\）。

变量命名应当采用驼峰命名格式，首字母小写，每个单词首字母大写。变量名的第一个单词应是一个名词（而非动词），以避免同函数混淆。不要在变量命名中使用下划线。

``` js
// 好的写法
var accountNumber = '8401-1';

// 不好的写法：大些字母开头
var AccountNumber = '8401-1';

// 不好的写法：使用下划线
var account_number = '8401-1';
```

函数命名也应当采用驼峰命名格式。函数名的第一个单词应当是动词（而非名词）来避免同变量混淆。函数名中最好不要使用下划线。

``` js
// 好的写法
function doSomething() {
    // 代码
}

// 不好的写法：大些字母开头
function DoSomething() {
    // 代码
}

// 不好的写法：名词开头
function car() {
    // 代码
}

// 不好的写法：使用下划线
function do_something() {
    // 代码
}
```

构造函数——通过new运算符创建新对象的函数——也应当以驼峰格式命名并且首字母大写。构造函数名称应一非动词开头，因为new代表这创建一个对象实例的操作。

``` js
// 好的写法
function MyObject() {
    // 代码
}

// 不好的写法：小字母开头
function myObject() {
    // 代码
}

// 不好的写法：使用下划线
function My_Object() {
    // 代码
}

// 不好的写法：动词开头
function My_Object() {
    // 代码
}
```

常量（值不会被改变的变量）的命名应当是所有字母大写，不同单词之间用单个下划线隔开。

``` js
// 好的写法
var TOTAL_COUNT = 10;

// 不好的写法：驼峰形式
var totalCount = 10;

// 不好的写法：混合形式
var total_COUNT= 10;
```

对象的属性同变量的同命名规则相同。对象的方法同函数的命名规则相同。如果属性或方法是私有的，应当在之前加一个下划线。

``` js
// 好的写法
var object = {
    _count: 10,

    _getCount: function() {
        return this._count;
    }
};
```

## 11.严格模式

严格模式应当仅限在函数内部使用，千万不要在全局使用。

``` js
// 不好的写法：全局使用严格模式
'use strict';

function doSomething() {
    // 代码
}

// 好的写法
function doSomething() {
    'use strict';

    // 代码

}
```

如果你期望在多个函数中使用严格模式而不需要多次声明“use
strict”，可以使用立刻被调用的函数。

``` js
// 好的写法
(function() {
    'use strict';

    function doSomething() {
        // 代码
    }

    function doSomethingElse() {
        // 代码
    }
}());
```

## 12.赋值

当给变量赋值时，如果右侧是含有比较语句的表达式，需要用括号包裹。

``` js
// 好的写法
var flag = (i < count);

// 不好的写法：遗漏括号
var flag = i < count;
```

## 13.等号运算符

使用===（严格相等）和！==（严格不相等）代替==（相等）和！=（不等）来避免弱类型转换错误。

``` js
// 好的写法
var same =(a === b);

// 不好的写法：使用==
var same =(a == b);
```

## 14.三元操作符

三元运算应当仅仅用在条件赋值语句中，而不要作为if语句的替代品。

``` js
// 好的方法
var value = condition ? value1 : value2;

// 不好的方法
var condition ? doSomething() : doSomethingElse();
```


## 15.语句
### 15.1 简单语句

每一行最多只包含一条语句。所有简单语句都应该以分号（;）结束。

``` js
// 好的写法
count++;
a = b;

// 好的写法
count++; a = b;
```

### 15.2 返回语句

返回语句当返回一个值的时候不应该使用圆括号包裹，除非在某些情况下这么做可以让返回值更容易理解。例如：

``` js
return;
return collection.size();
return (size > 0 ? size : defaultSize);
```

### 15.3 复合语句

复合语句是大括号括起来的语句列表。

* 括起来的语句应当较复合语句多缩进一个层级。
* 开始的大括号应当在复合语句所在行的末尾；结束的大括号应当独占一行且同复合语句的开始保持同样的缩进。
* 当语句是控制结构的一部分时，诸如if或者for语句，所有语句都需要用大括号括起来，也包括单个单词。zh这个约定使得我们更方便地添加语句而不用担心忘记加括号而引起bug。
* 像if一样的语句开始的关键字，其后应该紧跟一个空格，起始大括号应当在空格之后。

### 15.4 if 语句

if语句应当是下面的格式。

``` js
if (condition) {
    statments
}

if (condition) {
    statments
} else {
    statments
}

if (condition) {
    statments
} else if (condition) {
    statments
} else {
    statments
}
```

绝不允许在if语句中省略花括号

``` js
// 好的写法
if (condition) {
    doSomething();
}

// 不好的写法：不且当的空格
if(condition){
    doSomething();
}

// 不好的写法：遗漏花括号
if (condition)
    doSomething();

// 不好的写法：所有代码在一行
if (condition) { doSomething(); }

// 不好的写法：所有代码在一行且没有花括号
if (condition) doSomething();
```
### 15.5 for 语句

for类型的语句应是下面的格式。

``` js
for (initialization; condition; update) {
    statments
}

for (variable in object) {
    statments
}
```

for语句的初始化不应当有变量声明。

``` js
// 好的写法
var i,
    len;

for (i = 0, len = 10; i < len; i++) {
    // 代码
}

// 不好的写法：初始化时候声明变量
for (var i = 0, len = 10; i < len; i++) {
    // 代码
}

// 不好的写法：初始化的时候声明变量
for (var prop in object) {
    // code
}
```
当使用for-in语句时，记得使用hasOwnProperty()进行双重检查来过滤出对象的成员。

### 15.6 while 语句

while类的语句应当是下面的格式。

``` js
while (condition) {
    statments
}
```

### 15.7 do 语句

do类的语句应当是下面格式。

``` js
do {
    statments
} while (condition);
```

### 15.8 switch 语句

switch类的语句应当是下面格式。

``` js
switch (expression) {
    case expression:
        statments

    defaul:
        statments
}
```

switch下的每一个case都应当保持一个缩进。除第一个之外包括default在内的每一个case都应当在之前保持一个空行。每一个语句（除了default）都应当以break、return、throw结尾，或者用一行注释表示跳过。

``` js
// 好的写法
switch (value) {
    case 1:
        /* falls through */

    case 2:
        doSomething();
        break;

    case 3:
        return true;

    defaul:
        throw new Error('This should not happen');
}
```

如果一个switch语句不包含default情况，应应用一行注释代替。

``` js
// 好的写法
switch (value) {
    case 1:
        /* falls through */

    case 2:
        doSomething();
        break;

    case 3:
        return true;

    // 没有default
}
```

### 15.9 ty 语句

try类语句应当格式如下。

``` js
try {
    statments
} catch (variable) {
    statments
}

try {
    statments
} catch (variable) {
    statments
} finally {
    statments
}

```
## 16.留白

在逻辑相关的代码之间添加空行可以提高代码的可读性。

两行空行仅限在如下情况中使用。

* 在不同的源码文件之间。
* 在类和接口定义之间。

单行空行仅限在如下情况中使用。

* 方法之间。
* 方法中局部变量和第一行语句之间。
* 多行或者单行注释之前。
* 方法中逻辑代码块之间以提升代码的可读性。

空格应在如下情况中使用。

* 关键词后跟括号的情况应当用空格隔开。
* 参数列表中逗号之后应当保留一个空格。
* 所有的除了点（.）之外的二元运算符，其操作数都应当用空格隔开。单目运算符的操作数之间不应该用
空白隔开，诸如一元减号，递增（++），递减（--）。

* for语句中的表达方式之间应当用空格号隔开。

## 17.需要避免的

* 切勿使用像String一类的原始包装类型创建新的对象。
* 避免使用eval（）。
* 避免使用with语句。该语句在严格模式中不复存在，可能在未来的ECMAScript标准中也将去除。





数字应当使用十进制整数，科学计数法表示整数，十六进制整数，或者十进制浮点小数，小数点前后应当至少保留一位数字。避免使用八进制直接量。
