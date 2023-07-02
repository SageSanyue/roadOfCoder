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
任意值是TypeScript针对编程时类型不明确的变量所使用的一种数据类型，它常用于以下三种情况。  
· 当变量的值会动态变化时，比如来自用户的输入或第三方代码库，任意值类型可以让这些变量跳过编译阶段的类型检查。  
```
let x: any = 1; // 数字类型
x = "I am a string"; // 字符串类型
x = false; // 布尔类型
```  
· 在改写现有代码时，任意值允许在编译时可选择地包含或移除类型检查。  
```
let x: any = 4; 
x.ifItExits(); // 正确，ifItExits方法在运行时可能存在，但是这里并不检查
x.toFixed(); // 正确
```  
· 在定义存储各种类型数据的数组时。  
```
let arrayList: any[] = [1, false, "fine"];
arrayList[1] = 100;
```

#### null和undefined  
在默认情况下，null和undefined是其他类型的子类型，可以赋值给其他类型，如数字类型等，此时赋值后的类型会变成null或undefined，致力于类型校验的TypeScript设计者们显然不希望这种类型变化给开发者带来额外的困扰。在TypeScript中启用 严格的空校验(--strictNullChecks)特性，就可以使得null和undefined只能被赋值给void或本身对应的类型。  
```
// 启用--strictNullChecks
let x: number;
x = 1; // 运行正确
x = undefined; // 运行错误
x = null; // 运行错误
```  
上面例子中变量x只能是数字类型。如果一个类型可能出现null或者undefined，可以用 | 来支持多种类型。  
```
// 启用--strictNullChecks
let x: number;
let y: number | undefined;
let z: number | null | undefined;

x = 1; // 运行正确
y = 1; // 运行正确
z = 1; // 运行正确

x = undefined; // 运行错误
y = undefined; // 运行正确
z = undefined; // 运行正确

x = null; // 运行错误
y = null; // 运行错误
z = null; // 运行正确

x = y; // 运行错误
x = z; // 运行错误
y = x; // 运行正确
y = z; // 运行错误
z = x; // 运行正确
z = y; // 运行正确
```  
上例中变量y允许被赋予数字类型或undefined类型的数据值，而变量z还额外支持null。TypeScript官方建议在编码时，都启用--strictNullChecks特性，这样有利于编写更健壮的代码。  

#### void类型-  
在TypeScript中，使用void表示没有任何类型。例如，当一个函数没有返回值时，意味着返回值类型是void。  
```
function hello(): void {
    alert('hello Angular!');
}
```  
对于可忽略返回值的回调函数来说，使用void类型会比任意值类型更安全一些。  
```
function func(foo: () => void) {
    let f = foo(); // 使用函数foo的返回值  
    f.doSth(); // 报错，void类型不存在doSth()方法，此时换成任意值类型则不报错
}
```  

#### never类型-  
never类型是其他类型(包括null和undefined)的子类型，代表从不会出现的值。这意味着声明为never类型的变量只能被never类型所赋值，在函数中它通常表现为抛出异常或无法执行到终止点(例如无限循环)。  
```
let x: never;
let y: number;

// 运行错误，数字类型不能转换为never类型
x = 123;

// 运行正确，never类型可以赋值给never类型
x = (() => { throw new Error('exception occur') })()

// 运行正确，never类型可以赋值给数字类型
y = (() => { throw new Error('exception occur') })()

// 返回值为never的函数可以是抛出异常的情况
function error(message: string): never {
    throw new Error(message);
}

// 返回值为never的函数可以是无法被执行到终止点的情况
function loop(): never {
    while(true) {
    }
}
```  

### 声明和解构  
在TypeScript中，支持var、let和const这样的声明方式。
#### let声明  
使用let与var声明变量的写法类似。  
```
let hello = "Hello Angular";
```  
不同于var，使用let声明的变量只在块级作用域内有效。  
```
function f(input: boolean) {
    let a = 100;
    if(input) {
        let b = a + 1; // 运行正确
        return b
    }
    return b; // 错误，b没有被定义
}
```  
这里定义了两个变量a和b，a的作用域是在f()函数体内，而b的作用域是在if语句块里。块级作用域还有一个问题，就是变量不能在它声明之前被读取或赋值。  
```
a++; // 错误，在声明之前使用是不合法的
let a;
```  
另外，在相同作用域中，let不允许变量被重复声明。而在使用var声明时，不管声明几次，最后都只会得到最近一次声明的那个值。  
```
var x = 2;
console.log(x + 3); // 输出: 5
var x = 3;
console.log(x + 3); // 输出: 6

let y = 2;
let y = 3; // 报错，使用let声明的变量不能在一个作用域内多次声明
```  
此外，还需要注意let声明在下面两种函数入参的对比：  
```
function funA(x) {
    let x = 100; // 报错，x已在函数入参声明
}

// 增加了判断条件组成的新的块级作用域
function funB(condition, x) {
    if(condition) {
        let x = 100; // 运行正常
        return x;
    }
    return x;
}

funB(false, 0) // 返回0
funB(true, 0) // 返回100
```  

#### const声明  
const声明与let声明类似，它与let拥有相同的作用域规则，但const声明的是常量，常量不能被重新赋值，否则将编译错误。但是如果定义的常量是对象，对象里的属性值是可以被重新赋值的。  
```
const NUM_LIVES = 9;
const kitty = {
    name: 'Orange',
    numLives: NUM_LIVES
};

// 错误
kitty = {
    name: 'Niuniu',
    numLives: NUM_LIVES
}

kitty.name = 'Kitty'; // 正确
kitty.numLives--; // 正确
```  

#### 解构  
结构是es6中重要特性，TypeScript在1.5版本后也开始增加对解构的支持。  
所谓解构，就是讲声明的一组变量与相同结构的数组或对象的元素数值一一对应，并对变量相对应的元素进行赋值。解构可以帮助开发者非常容易地实现多返回值的场景，不仅写法简洁也可以增强代码可读性。  
在TypeScript中支持数组解构和对象解构。  
##### 数组解构  
数组解构是最简单的解构类型。  
```
let input = [1, 2];
let [first, second] = input;
console.log('first'); // 相当于input[0]: 1
console.log('second'); // 相当于input[1]: 2
```  
也可作用于已声明的变量：  
```
[first, second] = [second, first]; // 变量交换
```  
或作用于函数参数：
```
function f([first, second] = [number, number]) {
    console.log(first + second)
}
f([1, 2]) // 输出：3
```  
我们还可以再=在数组解构中使用rest参数语法(形式为 "...变量名")创建一个剩余变量列表，三个连续小数点"..."表示展开操作符，用于创建可变长的参数列表，使用起来非常方便。  
```
let [first, ...rest] = [1, 2, 3, 4];
console.log(first); // 输出：1
console.log(rest); // 输出: [2, 3, 4]
```  

##### 对象解构  
一些原本需要多行编写的代码，用对象解构的方式编写一行代码代码就能完成，很简洁、可读性强。  
```
let test = { x: 0, y: 10, width: 15, height:30 };
let {x, y, width, height} = test;
console.log(x, y, width, height) // 输出: 0, 10, 15, 30
```  
解构虽然很方便，但使用时还得多注意，特别是深层嵌套的场景，是比较容易出错的。  

### 函数  
函数用于定义特定的行为。TypeScript在JavaScript函数的基础上添加了更多额外的功能，使函数变得更加易用。  

#### 函数定义  
在TypeScript中支持函数声明和函数表达式的写法。  
```
// 函数声明写法
function maxA(x: number, y: number): number {
    return x > y ? x : y;
}
// 函数表达式写法
let maxB = function(x: number, y: number): number { return x > y ? x : y };
```  
在上例中，参数类型和返回值类型这两部分都是会检查的。在调用时，只做参数类型和个数的匹配，不做参数名的校验。

#### 可选参数  
在JavaScript里，被调函数的每个参数都是可选的；而在TypeScript中，被调函数的每个参数都是必传的，在编译时，会检查函数的每个参数是否传值。简而言之，传递给一个函数的参数个数必须和函数定义时的参数个数一致。  
```
function max(x: number, y: number): number {
    return x > y ? x : y;
}
let result1 = max(2) // 报错
let result2 = max(2, 4, 7) // 报错
let result3 = max(2, 4) // 运行正常
```  
但是经常会遇到根据实际需要来决定是否传入某个参数的情况，TypeScript提供了可选参数语法，即在参数名旁边加上了"?"使其变成可选参数。  
```
function max(x: number, y?: number): number {
    if(y) {
        return x > y ? x : y;
    } else {
        return x;
    }
}
let result1 = max(2); // 运行正常
let result2 = max(2, 4, 7); // 报错
let result3 = max(2, 4); // 运行正常
```  

#### 默认参数  
TypeScript还支持初始化默认参数，若函数的某个参数设置了默认值，当该函数被调用时，若没有给这个参数传值或者传的值为undefined，这个参数的值就是设置的默认值。  
```
function max(x: number, y = 4):number {
    return x > y ? x : y;
}
let result1 = max(2); // 运行正常
let result2 = max(2, undefined); // 运行正常
let result3 = max(2, 4, 7); // 报错
let result4 = max(2, 4); // 运行正常
```  
带默认值的参数不必放在必选参数后面，但如果带默认值的参数放到了必选参数前面，用户必须显式地传入undefined。  
```
function max(x = 2, y: number): number {
    return x > y ? x : y;
}
let result1 = max(2); // 报错
let result2 = max(undefined, 4); // 运行正常
let result3 = max(2, 4, 7); // 报错
let result4 = max(2, 4); // 运行正常
```

#### 剩余参数  
上面介绍了函数中的必选参数、默认参数及可选参数，他们的共同点是只能表示某一个参数。当需要同时操作多个参数，或者并不知道会有多少个参数传递进来时，就需要用到TypeScript里的剩余参数了。在TypeScript里，所有的可选参数都可以放到一个变量里。  
```
function sum(x: number, ...restOfNumber: number[]): number {
    let result = x;
    for(let i = 0; i < restOfNumber.length; i++) {
        result += restOfNumber[i]
    }
    return result
}
let result = sum(1, 2, 3, 4, 5);
console.log(result); // 输出：15
```  
需要注意的是，剩余参数可以理解为个数不限的可选参数，即剩余参数包含的参数个数可以w为零到多个。  

#### 函数重载  
函数重载通过为同一个函数提供多个函数类型定义来达到实现多种功能的目的。TypeScript支持函数重载。  
```
function css(config: {});
function css(config: string, value: string);
function css(config: any, value?: any) {
    if (typeof config === 'string') {
        // ...
    } else if (typeof config === 'object') {
        // ...
    }
}
```  
在上面的例子中，css函数有三个重载函数，编译器会根据参数类型来判断该调用哪个函数。TypeScript的函数重载通过查找重载列表来实现匹配，根据定义的优先顺序来依次匹配，所以在实现重载函数时，建议把最精确的定义放在最前面。  

#### 箭头函数  
JavaScript的this是一个重要概念。  
```
let gift = {
    gifts: ["teddy bear", "spiderman", "kitty cat", "tang duck", "jerry", "book"],
    giftPicker: function() {
        return function() {
            let pickedNumber = Math.floor(Math.random() * 6);
            return this.gifts[pickedNumber];
        }
    }
}
let pickGift = gift.giftPicker();
console.log('you get a :', pickGift())
```  
运行程序，发现并不能输出预期的结果，而是抛出以下错误：  
`Uncaught TypeError: Cannot read property '5' of undefined(...) `  
这是因为giftPicker()函数里的this被设置成了window而不是gift对象。因为这里没有对this进行动态绑定，因此this就指向了window对象。  
TypeScript提供的箭头函数(=>)很好地解决了这个问题，它在函数创建时就绑定了this，而不是在函数调用时。  
```
let gift = {
    gifts: ["teddy bear", "spiderman", "kitty cat", "tang duck", "jerry", "book"],
    giftPicker: function() {
        return ()=> {
            let pickedNumber = Math.floor(Math.random() * 6);
            return this.gifts[pickedNumber];
        }
    }
}
let pickGift = gift.giftPicker();
console.log('you get a :', pickGift())
```  

### 类  
传统的JavaScript程序使用函数和基于原型(Prototype)的继承来创建可重用的“类”，这对于习惯了面向对象编程的开发者来说并不友好。好在TypeScript支持使用基于类的面向对象编程。  

#### 类的例子  
```
class Car {
    engine: string;
    constructor(engine: string) {
        this.engine = engine;
    }
    drive(distanceInMeters: number = 0) {
        console.log(`A car runs ${ distanceInMeters }m powered by` + this.engine)
    }
}
```  
上面声明了一个汽车类Car，这个类有三个类成员：类属性engine、构造函数、drive()方法， 其中类属性engine可通过this.engine访问。下面实例化一个Car的新对象，并执行构造函数初始化。  
`let car = new Car("petrol")`  
调用成员方法并输出结果：  
`car.drive(100) // 输出： A car runs 100m powered by petrol`  

#### 继承与多态  
封装、继承、多态是面向对象的三大特性。在上例中把汽车的行为写到一个类中，即所谓的封装。在TypeScript中，使用extends关键字即可方便地实现继承。  
```
// 继承前文的Car类
class MotoCar extends Car {
    constructor(engine: string) { super(engine); }
}
class Jeep extends Car {
    constructor(engine: string) { super(engine); }
    drive(distanceInMeters: number = 100) {
        console.log('Jeep...');
        return super.drive(distanceInMeters);
    }
}
let tesla = new MotoCar('electricity');
let landRover: Car = new Jeep('petrol'); // 实现多态

tesla.drive(); // 调用父类的drive()方法
landRover.dvive(200); // 调用子类的drive()方法
```  
从上例可看出，MotoCar和Jeep是基类Car的子类，通过extends来继承父类，子类可以访问父类的属性和方法，也可以重写父类的方法。Jeep的drive()方法重写了Car的drive()方法，这样drive()方法在不同的类中就具有不同的功能，这就是多态。  
即使landRover被声明为Car类型，它也依然是子类Jeep，landRover.drive(200)调用的是Jeep里的重写方法。派生类构造函数必须调用super()，它会执行基类的构造方法。  

#### 修饰符  
在类中的修饰符可分为 公共(public)、私有(private)、受保护(protected) 三种类型。  
##### public修饰符  
在TypeScript里每个成员默认为public，可以被自由地访问。我们可以显式地给Car类里定义的成员加上public修饰符。  
```
class Car {
    public engine: string;
    public constructor(engine: string) {
        this.engine = engine;
    }
    public drive(distanceInMeters: number = 0) {
        console.log(`A car runs ${ distanceInMeters }m powered by` + this.engine)
    }
}
```  

##### private修饰符  
当类成员被标记为private时，就不能在类的外部访问它了。  
```
class Car {
    private engine: string;
    constructor(engine: string) {
        this.engine = engine;
    }
}
new Car("petrol").engine; // 报错： engine属性是私有的，只能在类内部访问
```  
ES6并没有提供对私有属性的语法支持，但可以通过闭包来实现私有属性。  

##### protected修饰符  
protected修饰符与private修饰符的行为很相似，但有一点不同，protected成员在派生类中仍然可以访问。  
```
class Car {
    protected engine: string;
    constructor(engine: string) {
        this.engine = engine;
    }
    drive(distanceInMeters: number = 0) {
        console.log(`A car runs ${ distanceInMeters }m powered by` + this.engine)
    }
}
class MotoCar extends Car {
    constructor(engine: string) { super(engine); }
    drive(distanceInMeters: number = 50) {
        super.drive(distanceInMeters);
    }
}
let tesla = new MotorCar("electricity");
// 运行正常，输出：A car runs 50m powered by electricity
console.log(tesla.drive());
// 报错
console.log(tesla.engine);
```  
由于engine被声明为protected，所以不能在外部访问它，但仍可以通过它的继承类MotoCar来访问。  

#### 参数属性  
参数属性是通过给构造函数添加一个访问限定符(public、protected、private)来声明的。参数属性可以方便地让我们在一个地方定义并初始化类成员。使用参数属性对上述Car类进行改造：  
```
class Car {
    constructor(protected engine: string) {}
    drive(distanceInMeters: number = 0) {
        console.log(`A car runs ${ distanceInMeters }m powered by` + this.engine)
    }
}
```  
在构造函数里通过protected engine: string 来创建和初始化engine成员属性，从而把声明和赋值合并到一处。  

#### 静态属性  
类的静态成员存在于类本身而不是类的实例上，类似于在实例属性上使用“this.”来访问属性，我们使用"类名."来访问静态属性。可以使用static关键字来定义类的静态属性。  
```
class Grid {
    static origin = { x: 0, y: 0 };
    constructor (public scale: number) {}
    calculateDistanceFromOrigin(point: { x: number, y: number }) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
}

let grid1 = new Grid(1.0);
let grid2 = new Grid(5.0);

// 输出：14.142135623730951
console.log(grid1.calculateDistanceFromOrigin({x:10, y:10}));
// 输出：2.8284271247461903
console.log(grid2.calculateDistanceFromOrigin({x:10, y:10}));
```  

#### 抽象类  
TypeScript有抽象类的概念，它是供其他类继承的基类，不能直接被实例化。不同于接口，抽象类必须包含一些抽象方法，同时也可以包含非抽象的成员。abstract关键字用于抽象类和抽象方法。抽象类中的抽象方法不包含具体实现，并且必须在派生类中实现。  
```
abstract class Person {
    abstract speak(): void; // 必须在派生类中实现
    walking(): void {
        console.log("Walking on the road");
    }
}
class Male extends Person {
    speak(): void {
        console.log("How are you");
    }
}

let person: Person; // 创建一个抽象类引用
perosn = new Person(); // 报错：不能创建抽象类实例
person = new Male(); // 创建一个Male实例
person.speak();
person.walking();
```  
在面向对象设计中，接口更注重功能的设计，抽象类更注重结构内容的体现。  

### 模块  
ES6中引入了模块的概念，在TypeScript中也支持模块的使用。  

#### 概述  
模块是自声明的，两个模块之间的关系是通过文件级别上使用import和export来建立的。TypeScript与ES6一样，任何包含顶级import或者export的文件都会被当成一个模块。  
模块在其自身的作用域里执行，而不是在全局作用域里，这意味着定义在一个模块里的变量、函数和类等，在模块外部是不可见的，除非明确地使用export导出它们。类似的，如果想使用其他模块导出变量、函数、类和接口，则必须先通过import导入它们。  
模块使用模块加载器来导入它的依赖，模块加载器在代码运行时会查找并加载模块间的所有依赖。  

#### 模块导出方式  
模块可以通过导出的方式来提供变量、函数、类、类型别名和接口给外部模块调用，导出的方式分为以下三种。  
##### 导出声明  
任何模块都能够通过export关键字导出。  
```
export const COMPANY = "Apple"; // 导出变量
export interface IdentityValidate { // 导出接口
    isAppleStaff(s: string): boolean
}
export class ErpIdentityValidate implements IdentityValidate { // 导出类
    isAppleStaff(erp: string) {
        return erpService.contains(erp); // 判断是否为apple员工
    }
}
```  

##### 导出语句  
当需要对导出的模块进行重命名时，就用到了导出语句。  
```
class ErpIdentityValidate implements IdentityValidate { // 导出类
    isAppleStaff(erp: string) {
        return erpService.contains(erp);
    }
}
export { ErpIdentityValidate };
export { ErpIdentityValidate as AppleIdentityValidate };
```  

##### 模块包装  
有时候我们需要修改和扩展已有的模块，并导出供其他模块调用，这时可以使用模块包装来再次导出。  
```
// 导出原先的验证器，但做了重命名
export { ErpIdentityValidate as RegExpBasedZipCodeValidator } from "./ErpIdentityValidate"
```  
一个模块可以包裹多个模块，并把新的内容以一个新的模块导出。  
```
export * from "./IdentityValidate"
export * from "./ErpIdentityValidate"
```  

#### 模块导入方式  
模块导入与模块导出相对应，可使用import关键字来导入当前模块依赖的外部模块。导入有如下两种方式  
##### 导入一个模块  
```
import { ErpIdentityValidate } from "./ErpIdentityValidate";
let erpValidate = new ErpIdentityValidate();
```  

##### 别名导入  
```
import { ErpIdentityValidate as ERP } from "./ErpIdentityValidate";
let erpValidator = new ERP();
```  
另外，也可对整个模块进行别名导入，将整个模块导入到一个变量中，并通过它来访问模块的导出部分。  
```
import * as validator from "./ErpIdentityValidate";
let myValidate = new validator.ErpIdentityValidate();
```  

#### 模块的默认导出  
模块可以用default关键字实现默认导出的功能，每个模块都可以有一个默认导出。类和函数声明可以直接省略导出名来实现默认导出。默认导出有利于减少调用方调用模块的层数，省去一些冗余的模块前缀书写。  
##### 默认导出类  
```
// ErpIdentityValidate.ts
export default class ErpIdentityValidate implements IdentityValidate {
    isAppleStaff(erp: string) {
        return erpService.contains(erp);
    }
}

// test.ts
import validator from "./ErpIdentityValidate";
let erp = new validator;
```  

##### 默认导出函数  
```
// nameServiceValidate.ts
export default function (s: string) {
    return nameService.contains(s);
}
// test.ts
import validate from "./nameServiceValidate";
let name = "Angular"

// 使用导出函数  
console.log(`"${name}" ${validate(name) ? "matches" : "does not match"}`);
```  

##### 默认导出值  
```
// constantService.ts
export default "Angular";

// test.ts
import name from "./constantService";
console.log(name); // "Angular"
```  

#### 模块设计原则  
在模块设计中，共同遵循一些原则有利于更好地编写和维护项目代码。下面列出几点模块设计的原则。  
##### 尽可能在顶层导出  
顶层导出可以降低调用方使用的难度，过多的"."操作使得开发者要记住过多的细节，所以尽量使用默认导出或者在顶层导出。单个对象(类或函数等)可以采用默认导出的方式：  
```
// ClassTest.ts
export default class ClassTest {
    // ...
}

// FuncTest.ts
export default function FuncTest() {
    // ...
}

// Test.ts
import ClassTest from "./ClassTest";
import FuncTest from "./FuncTest";
let C = new ClassTest();
FuncTest();
```  
但是，如果要返回多个对象，则可以采用在顶层导出的方式，调用时再明确地列出所导入的对象名称即可。  
```
// ModuleTest.ts
export class ClassTest {
    // ...
}
export FuncTest() {
    // ...
}

// Test.ts
import { ClassTest, FuncTest } from "./ModuleTest";
let C = new ClassTest();
Functest();
```  

##### 明确列出导入对象的名称  
在导入时尽可能明确地指定导入对象的名称，这样只要接口不变，调用方式就可以不变，从而降低了导入跟导出模块的耦合度，做到面向接口编程。  
```
import { Class, FuncTest } from "./ModuleTest"
```  

##### 使用命名空间模式导出  
```
// MyLargeModule.ts
export class Dog { /* ... */ }
export class Cat { /* ... */ }
export class Tree { /* ... */ }
export class Flower { /* ... */ }

// Consumer.ts
import * as myLargeModule from "./MyLargeModule";
let x = new MyLargeModule.Dog();
```  

##### 使用模块包装进行扩展  
我们可能经常需要扩展一个模块的功能，推荐方案是不要去改变原来的对象，而是导出一个新的对象来提供新的功能。  
```
// ModuleA.ts
export class ModuleA {
    constructor() { /* ... */ }
    sayHello() {
        // ...
    }
}

// ModuleB.ts
import { ModuleA } from "./ModuleA";
class ModuleB extends ModuleA {
    constructor() { super(); /* ... */ }
    // 添加新的方法
    sayHi() {
        // ...
    }
}
export { ModuleB as ModuleA }

// Test.ts
import { ModuleA } from "./ModuleB";
let C = new ModuleA();
```  

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
装饰器(Decorator)是一种特殊类型的声明，它可以被附加到类声明、方法、属性或参数上。装饰器由@符号紧接一个函数名称表示，形如 @expression，expression求值后必须是一个函数，在函数执行时装饰器的声明方法会被执行。正如名字所示，装饰器是用来给附着的主体进行装饰，添加额外的行为的。  
在TypeScript源码中，可以看到官方提供了如下几种类型的装饰器。  
```
// 方法装饰器
declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;

// 类装饰器
declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;

// 参数装饰器
declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
// 属性装饰器
declare type ParameterDecorator = (target: Object, propertyKey: string | symbol) => void;
``` 
如上，每种装饰器类型传入的参数不大相同。下面将分别介绍
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

