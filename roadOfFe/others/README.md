# TypeScript  

## 基础  

### 基本类型  
#### 布尔类型  
#### 数字类型  
#### 字符串类型
#### 数组类型  
#### 元组类型  
#### 枚举类型  
#### 任意值类型  
#### null和undefined  
#### void类型  
#### never类型  

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

