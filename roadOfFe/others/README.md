# TypeScript  

## 基础  
在TypeScript中声明变量，需要加上类型声明，如boolean或string等。通过静态类型约束，在编译时执行类型检查，这样可以避免一些类型混用的低级错误。  

### 基本类型(带-为ts特有) 
#### 布尔类型boolean  
布尔类型是最简单的数据类型，只有true和false两种值。  
下面定义了一个布尔类型的变量flag，并赋值为true。由于flag被初始化为布尔类型，如果再赋值为非boolean的其他类型值，编译时会抛出错误。  
```
let flag: boolean = true;
flag = 1; // 报错，不能把数字类型的值赋值给布尔类型的变量
```  

#### 数字类型number  
在TypeScript中，数字都是浮点型。TypeScript同时支持二进制、八进制、十进制和十六进制字面量。  
```
let binaryLiteral: number = 0b1010; // 二进制
let octalLiteral: number = 0o744; // 八进制
let decLiteral: number = 6; // 十进制
let hexLiteral: number = 0xf00d; // 十六进制
```

#### 字符串类型string  
TypeScript支持使用单引号(')或双引号(")来表示字符串类型。除此之外，还支持使用模版字符串反引号(`)来定义多行文本和内嵌表达式。使用 ${ expr } 的形式嵌入变量或表达式，在处理拼接字符串时很有用。  
```
let name: string = "Angular";
let years: number = 5;
let words: string = `你好，今年是 ${ name } 发布 ${ years + 1 } 周年 `;
```  

#### 数组类型array  
TypeScript数组的操作类似于JavaScript数组的操作，TypeScript建议开发者最好只为数组元素赋一种类型的值。TypeScript有两种数组定义方式。  
```
// 定义方式1：在元素后面接上[]
let arr: number[] = [1,2];  
// 定义方式2：使用数组泛型
let arr: Array<number> = [1,2]
```  

#### 元组类型-tuple  
元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同。  
下面定义了一个值分别为字符串和数字类型的元组：
```
let x: [string, number];
x = ['Angular', 25]; // 运行正常
x = [10, 'Angular']; // 报错
console.log(x[0]); // 输出 Angular
```

#### 枚举类型-enum  
枚举是一个可被命名的整型常数的集合，枚举类型为集合成员赋予有意义的名称，增强了可读性。  
```
enum Color {Red, Green, Blue};
let c: Color = Color.Blue;
console.log(c); // 输出 2
```  
枚举默认的下标是0，可以手动修改默认的下标值。例如：  
```
enum Color {Red = 2, Blue, Green = 6};
let c: Color = Color.Blue;
console.log(c); // 输出 3 
```  

#### 任意值类型-any  
#### null和undefined  
#### void类型-  
#### never类型-  

### 声明和结构  
#### let声明  
#### const声明  
#### 解构  

### 函数  
#### 函数定义  
#### 可选参数  
#### 默认参数  
#### 剩余参数  
#### 函数重载  
#### 箭头函数  

### 类  
#### 类的例子  
#### 继承与多态  
#### 修饰符  
#### 参数属性  
#### 静态属性  
#### 抽象类  

### 模块  
#### 概述  
#### 模块导出方式  
#### 模块导入方式  
#### 模块的默认导出  
#### 模块设计原则  

### 接口  
接口是对行为的抽象，具体如何行动需要由类(classes)去实现(implement)。  

作用：  
1.对类的一部分行为进行抽象；  
2.对“对象的形状(shape)”进行描述；  

1.对类的一部分行为进行抽象  
一般来说，一个类只能继承自另一个类。有时候不用类之间可以有一些共有的特性，这时候就可以把特性提取成接口(interfaces)，用implements关键字来实现。  

例如，防盗门是“门”这个类的子类。若防盗门有alarm报警器的功能，则我们给它添加一个报警的方法alarm。若另一个为“车”的类也有报警器功能，则可以把报警器提取出来，作为一个接口，防盗门和车都去实现它：  
```
interface Alarm {
    alert(): void;
}
class Door {}

class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log("Security alert!")
    }
}
class Car implements Alarm {
    alert() {
        console.log("Car alert!")
    }
}
```

#### 接口类型  
接口类型包括属性、函数、可索引(Indexable Type)和类等类型。  

##### 属性类型接口  
```
interface FullName {
    firstName: string;
    lastName: string;
}
function printLabel(name: FullName) {
    console.log(name.firstName + "" + name.lastName)
}
let myObj = { age: 18, firstName: 'Sage', LastName: 'X' };
printLabel(myObj)
```
上例中接口FullName包含两个属性：firstName和lastName，且都为字符串类型。  
接口类型检查器不会去检查属性的顺序，但要确保相应的属性存在并且类型匹配。  

TypeScrip还提供了可选属性，可选属性对可能存在的属性进行预定义，并兼容不传值的情况。带有可选属性的接口与普通接口的定义方式差不多，区别是在定义的可选属性变量名后面加一个'?'符号。  
```
interface FullName {
    firstName: string;
    lastName?: string;
}
function printLabel(name: FullName) {
    console.log(name.firstName + "" + name.lastName)
}
let myName = {firstName: 'Sage'}; // lastName是可选属性可不传
printLabel(myName); // 输出：Sage undefined
```  

##### 函数类型接口  
接口除可以描述带有属性的普通对象外，也能描述函数类型。在定义函数类型接口时，需要明确定义函数的参数列表和返回值类型，且参数列表中的每个参数都要有参数名和类型。  
```
interface encrypt {
    (val: string, salt: string): string
}
```
定义好函数类型接口encrypt之后，接下来将通过一个例子来展示如何使用函数类型接口：  
```
let md5: encrypt;
md5 = function(val:string, salt:string) {
    console.log("origin value:"" + val);
    let encryptValue = doMd5(val, salt); // doMd5只是一个mock方法  
    console.log("encrypt value:" + encryptValue);
    return encryptValue;
}
let pwd = md5("password", "Angular")
```
对于函数类型接口要注意下面两点：  
·函数的参数名：使用时参数个数需要与接口定义的参数个数相同，对应位置变量的数据类型需要保持一致，参数名可以不一样。  
·函数返回值：函数的返回值类型与接口定义的返回值类型要一致。  

##### 可索引类型接口  
可索引类型接口用来描述那些可以通过索引得到的类型，如userArray[1], userObject["name"]等。  
它包含一个索引签名，表示用来索引的类型与返回值类型，即通过特定的索引来得到指定类型的返回值。  
```
interface UserArray {
    [index: number]: string;
}
interface UserObject {
    [index: string]: string;
}
let userArray: UserArray;
let userObject: UserObject;
userArray = ["小李", "小王"];
userObject = {"name": "小李"};

console.log(userArray[0]); // 输出：小李
console.log(userObject["name"]); // 输出：小李
```  
索引签名支持数字和字符串两种数据类型。使用这两种类型的最终返回值可以是一样的，即当使用数字类型来索引时，Javascript最终也会将其转换成字符串类型后再去索引对象。  
如上例中以下两种写法最终结果相同：  
```
console.log(userArray[0]); // 输出：小李
console.log(userArray["0"]); // 输出：小李
```  

##### 类类型接口  
类类型接口用来规范一个类的内容。  
```
interface Animal {
    name: string;
}
class Dog implements Animal {
    name: string;
    constructor(n: string) {}
}
```
可以在接口中描述一个方法，并在类里具体实现它的功能。如下例的setName方法：  
```
interface Animal {
    name: string;
    setName(n: string): void;
}
class Dog implements Animal {
    name: string;
    setName(n: string) {
        this.name = n;
    }
    constructor(n: string) {}
}
```  

#### 接口扩展  
和类一样，接口也可以实现相互扩展，即将成员从一个接口复制到另一个接口里，这样可更灵活地将接口拆分到可复用的模块里。  
```
interface Animal {
    eat(): void;
}
interface Person extends Animal {
    talk(): void;
}
class Programmer {
    coding(): void {
        console.log('I am coding!')
    }
}

class WomanProgrammer extends Programmer implements Person {
    eat() {
        console.log('eat food');
    }
    talk() {
        console.log('person talk')
    }
    coding():void {
        console.log('I am a woman and I love coding')
    }
}

let womanProgrammer = new WomanProgrammer(); // 通过组合集成类实现接口扩展，可更灵活地复用模块
womanProgrammer.coding();
```  

### 装饰器  
从本质上讲，装饰器最大的作用是修改预定好的逻辑，或者给各种结构添加一些元数据。
#### 概述  
#### 方法装饰器  
#### 类装饰器  
#### 参数装饰器  
#### 属性装饰器  
#### 装饰器组合  

### 泛型  





参考：  
1.[TypeScript 入门教程](https://ts.xcatliu.com/basics/type-of-object-interfaces.html)  
2.揭秘Angular(第2版)  
3.迈向Angular2:基于TypeScript的高性能SPA框架  

