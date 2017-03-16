

/**
 *模块模式


	 var testModule = (function(){
		var counter = 0;
		return {
			incrementCounter : function(){
				return ++counter;
			},
			resetCounter : function(){
				console.log('counter value prior to reset: ' + counter);
				counter = 0;
			}
		};
	})();
	// 用法：
	// 增加计数器
	testModule.incrementCounter();

	// 检查计数器的值并重置
	testModule.resetCounter();




	// 一个包含命名空间、公有私有变量的Module模式
	var myNamespace = (function(){
		// 私有计数器变量
		var myPrivateVar = 0;
		// 记录所有参数的私有属性
		var myPrivateMethod = function(foo){
			console.log(foo);
		};

		return {
			// 公有变量
			myPublicVar : 'foo',
			// 调用私有变量和方法的公有函数
			myPublicFunction : function(bar){
				// 增加私有计数器的值
				myPrivateVar++;
				// 传入bar调用私有方法
				myPrivateMethod(bar);
			}
		};
	})();






 var basketModule = (function(){
 	// 私有
 	var basket = [];
 	function doSomethingPrivate(){
 		// 函数内容
 	}
 	function doSomethingElsePrivate(){
 		// 函数内容
 	}

 	// 返回一个暴露出的公有对象
 	return {
 		// 添加item到购物车
 		addItem : function(values){
 			basket.push(values);
 		},
 		// 获取购物车里的item数
 		getItemCount : function(){
 			return basket.length;
 		},
 		// 私有函数的公有形式别名
 		doSomething : doSomethingPrivate,
 		// 获取购物车里所有的item的价格总值
 		getTotal : function(){
 			var itemCount = this.getItemCount(),
 				total     = 0;
 			while(itemCount--){
 				total += basket[itemCount].price;	
 			}
 			return total;
 		}
 	};
 })();

 // basketModule返回了一个拥有公共API的对象
 basketModule.addItem({
 	item  : "bread",
 	price : 0.5
 });

 basketModule.addItem({
 	item  : "butter",
 	price : 0.3
 });

// 输出2
console.log(basketModule.getItemCount());

// 输出0.8
console.log(basketModule.getTotal());

// 输出undefined，私有变量basket在有效的命名空间内部
// 无法访问
console.log(basketModule.basket);








// Module模式的变化
// 引入混入，模式的这种变化演示了全局变量（如：jQuery、Underscore）
// 如何作为参数传递给模块的匿名函数。这允许我们引入它们
// 并按照我们所希望地给他们取个本地别名
var myModule = (function($){
	// ...
})(jQuery);





// 下一个变量允许我们申明全局变量
// 而不需要实现它们
// 并可以同样地支持上一个示例中的全局引入概念
var myModule = (function(){
	// 模块对象
	var module = {},
		privateVariable = "Hello World";
	function privateMethod(){
		// ...
	}

	module.publicProrerty = "...";
	module.publicMethod = function(){};
	return module;
})();







// Singleton(单例模式)
// Singleton(单例)模式被熟知的原因是因为它限制了类的实例化次数只能是一次
// Singleton模式，在该实例不存在的情况下，可以通过一个方法创建一个类来实现创建类的新实例
// 我们可以推迟它们的初始化，这通常是因为它们需要一些信息，而这些信息在初始化期间可能无法获得
var mySingleton = (function(){
	// 实例保持Singleton的一个引用
	var instance;

	function init(){
		// Singleton
		// 私有方法和变量
		function privateMethod(){
			console.log("I am private");
		}
		var privateVariable     = "I'm also private",
			privateRandomNumber = Math.random();
		return {
			// 公有方法和函数
			publicMethod : function(){
				console.log("The public can see me");
			},
			publicProperty : "I am also public",
			getRandomNumber : function(){
				return privateRandomNumber;
			}
		};
	}

	return {
		// 获取Singleton的实例，如果存在就返回，不存在就创建新实例
		getInstance : function(){
			if(!instance){
				instance = init();
			}
			return instance;
		}
	};
})();


var myBadSingleton = (function(){
	// 实例保持Singleton的一个引用
	var instance;
	function init(){
		// Singleton
		var privateRandomNumber = Math.random();
		return {
			getRandomNumber : function(){
				return privateRandomNumber;
			}
		};
	}
	return {
		// 每次都创建新实例
		getInstance : function(){
			instance = init();
			return instance;
		}
	};
})();

var singleA = mySingleton.getInstance(),
	singleB = mySingleton.getInstance();
	// 输入true
console.log(singleA.getRandomNumber() === singleB.getRandomNumber());

var badSingleA = myBadSingleton.getInstance(),
	badSingleB = myBadSingleton.getInstance();
	// 输入false
console.log(badSingleA.getRandomNumber() === badSingleB.getRandomNumber());





// 在实践中，当系统中确实需要一个对象来协调其他对象时，Singleton模式是很有用的
// 可以看到在这个上下文中模式的应用
var SingletonTester = (function(){

	// options：包含singleton所需配置信息的对象
	// e.g var options = {name : "test",pointX : 5}
	function Singleton(options){
		// 如果未提供options，则设置为空对象
		options = options || {};

		// 为singleton设置一些属性
		this.name   = "SingletonTester";
		this.pointX = options.pointX || 6;
		this.pointY = options.pointY || 10;
	}

	// 实例的持有者
	var instance;

	// 静态变量和方法的模拟
	var _static = {
		name : "SingletonTester",
		// 获取实例的方法，返回singleton对象的singleton实例
		getInstance : function(options){
			if(instance === undefined){
				instance = new Singleton(options);
			}
			return instance;
		}
	};
	return _static;

})();

var singletonTest = SingletonTester.getInstance({
	pointX : 5
})
// 记录pointX的输出以便验证
// 输出5
console.log(singletonTest.pointX);

总结：Singleton的存在往往表明系统中的模块要么是系统紧密耦合，要么是其逻辑过于分散在代码库的多个部分。
	  由于这一系列的问题：从隐藏的依赖到创建多个实例的难度、底层依赖的难度等等，Singleton的测试会更加困难。
 */







/**
// Observer(观察者模式)
// Observer(观察者)是一种设计模式，其中，一个对象(称为subject)维持一系列依赖于它(观察者)的对象
// 将有关状态的任何变更自动通知给它们。
// 当我们不在希望某个特定的观察者获得其注册目标发出的改变通知时，该目标可以将它从观察者列表中删除
// 
// Subject(目标)
// 维护一系列的观察者，方便添加或删除观察者
// 
// Observer(观察者)
// 为那些在目标状态发生改变时需获得通知的对象提供一个更新的接口
// 
// ConcreteSubject(具体目标)
// 状态发生改变时，向Observer发出通知，存储ConcreteObserver的状态
// 
// ConcreteObserver(具体观察者)
// 存储一个指向ConcreteSubject的引用，实现Observer的更新接口，以使自身状态与目标的状态保持一致



// 我们首先来模拟一个目标可能拥有的一系列依赖Observer：
function ObserverList(){
	// 创建一个存储对象的数组
	this.observerList = [];
}
ObserverList.prototype.Add = function(obj){
	// 添加对象到对象数组中去，并返回更新后的数组长度
	return this.observerList.push(obj);
};
ObserverList.prototype.Empty = function(){
	// 清空存储对象的数组
	this.observerList = [];
}
ObserverList.prototype.Count = function(){
	return this.observerList.length;
};
ObserverList.prototype.Get = function(index){
	// 返回数组中指定索引的对象
	if(index > -1 && index < this.observerList.length){
		return this.observerList[index];
	}
};
ObserverList.prototype.Insert = function(obj,index){
	// 向数组中的头部或者尾部插入对象
	var pointer = -1;
	if(index === 0){
		this.observerList.unshift(obj);
	}else if(index === this.observerList.length){
		this.observerList.push(obj);
	}
	return pointer;
};
ObserverList.prototype.RemoveIndexAt = function(index){
	// 删除数组头尾对象
	if(index === 0){
		this.observerList.shift();
	}else if(index === this.observerList.length - 1){
		this.observerList.pop();
	}
};
ObserverList.prototype.IndexOf = function(obj,startIndex){
	// 从指定索引开始查找相关对象索引，没有就返回-1，有则返回查找到的索引
	var i       = startIndex,
		pointer = -1;
	while(i < this.observerList.length){
		if(this.observerList[i] === obj){
			pointer = i;
			return pointer;
		}
		i++;
	}
	return pointer;
};

// 使用extension扩展对象
function extend(obj,extension){
	for(var key in obj){
		extension[key] = obj[key];
	}
}



// 接下来，我们模拟目标(Subject)和在观察者列表上添加、删除或者通知观察者的能力。
function Subject(){
	this.observers = new ObserverList();
}

Subject.prototype.AddObserver = function(observer){
	this.observers.Add(observer);
};
Subject.prototype.RemoveObserver = function(observer){
	this.observers.RemoveIndexAt(this.observers.IndexOf(observer,0));
};
Subject.prototype.Notify = function(context){
	// 通知
	var observerCount = this.observers.Count();
	for(var i=0;i<observerCount;i++){
		this.observers.Get(i).Update(context);
	}
};

// 然后定义一个框架来创建新的Observer。这里的Update功能将在后面的自定义执行部分进一步介绍
function Observer(){
	this.Update = function(){
		// ...
	};
}
 */




/**
 * Publish/Subscribe实现
 * 发布/订阅模式


// 申明一个topic/event通道
var pubsub = {};

(function(q){

	var topics = {},
		subUid = -1;

	// 发布或者广播事件，包含特定的topic名称和参数（比如传递的数据）
	q.publish = function(topic,args){
		// 如果需要发布的主题/事件尚未注册，直接返回
		if(!topics[topic]){
			return false;
		}
		var subscribers = topics[topic],
			len 		= subscribers ? subscribers.length : 0;
		while(len--){
			subscribers[len].func(topic,args);
		}
	};

	// 通过特定的名称和回调函数订阅事件，topic/event触发时执行事件
	q.subscribe = function(topic,func){
		// 如果这个事件列表之前还没有创建就先创建一个事件列表
		if(!topics[topic]){
			topics[topic] = [];
		}
		// token标记采用闭包缓存私有变量subUid的值来实现，所有函数的索引不会相同，不管是不是同一事件的
		var token = (++subUid).toString();
		topics[topic].push({
			token : token,
			func  : func
		});
		return token;
	};

	// 基于订阅上的标记的引用，通过特定topic取消订阅
	q.unsubscribe = function(token){
		for(var m in topics){
			if(topics[m]){
				for(var i = 0;i<topics[m].length;i++){
					if(topics[m][i].token === token){
						topics[m].splice(i,1);
						return token;
					}
				}
			}
		}
		return this;
	};

})(pubsub);



// 用简单的消息处理程序使用上述实现
// 简单的消息记录器记录所有通过订阅者模式接收到的主题(topic)和数据
var messageLogger = function(topics,data){
	console.log("Logging: " + topics + " : " + data);
};

// 监听者监听订阅的topic，一旦该topic广播一个通知，订阅者就调用回调函数
var subscription = pubsub.subscribe("inbox/newMessage",messageLogger);

// 发布者负责发布程序感兴趣的topic或通知，例如：
pubsub.publish("inbox/newMessage","hello world!");

// 或者
pubsub.publish("inbox/newMessage",["test","a","b"]);

// 如果订阅者不想被通知了，也可以取消订阅
// 一旦取消订阅，下面的代码执行后不会记录消息，因为订阅者不再进行监听了。
pubsub.unsubscribe(subscription);
pubsub.publish("inbox/newMessage","Are you still here?");

*/




/**
 * Prototype原型模式
 * 在ECMAScript5标准中定义，真正的原型继承要求使用Object.create
 * Object.create创建一个对象，拥有指定原型和可选的属性
 * 
	var myCar = {
		name : "Ford Escort",
		drive : function(){
			console.log("Weeee.I'm driving");
		},
		panic : function(){
			console.log("Wait.How do you stop this thing?");
		}
	};

	// 使用Object.create实例化一个新的Car
	var yourCar = Object.create(myCar);

	// 现在可以看到一个对象是另外一个对象的原型
	console.log(yourCar.__proto__ === myCar);






	// Object.create还允许我们使用第二个提供的参数来初始化对象属性，例如：
	var vehicle = {
		getModel : function(){
			console.log("The model of this vehicle is.." + this.model);
		}
	};
	var car = Object.create(vehicle,{
		"id" : {
			value : My_GLOBAL.nextId(),
			// writable:false, configurable:false 默认值
			enumerable : true
		},
		"model" : {
			value : "Ford",
			enumerable : true
		}
	});
	// 在这里可以使用对象直面量在Object.create的第二个参数上初始化属性



 */



/**
 * Command(命令)模式
 * Command模式旨在将方法调用、请求或操作封装到单一对象中
 * 从而根据我们不同的请求进行参数化和传递可供执行的方法调用
 * 这种模式将调用操作对象与知道如何实现该操作的的对象解耦

var CarManage = (function (){
	var CarManage = {

		// 请求信息
		requestInfo : function(model,id){
			return "The information for" + model + "with ID" + id + "is foobar";
		},

		// 订购汽车
		buyVehicle : function(model,id){
			return "You have successfully purchased Item" + id + ",a" + model;
		},

		// 组织一个view
		arrangeViewing : function(model,id){
			return "You have successfully booked a viewing of " + model + "(" + id + ")";
		},

		// 我们为CarManage.execute方法添加一个定义
		execute : function(name){
			return CarManage[name] && CarManage[name].apply(CarManage,[].slice.call(arguments,1));
		}
	};
	return CarManage;
})();

console.log(CarManage.execute("arrangeViewing","Ferrari","14523"));
console.log(CarManage.execute("buyVehicle","Ford Escort","453543"));










 * 在这个例子里命令的执行者menuItemBlod和具体实现者commands[‘blod’]两者分开
 * 这样如果要修改具体实现，仅需要修改commands.blod即可，另外在Cmd中定义了
 * track数组，用来存储操作，便于撤销，和保存操作。如果要添加一个新的菜单选项，
 * 那么，只要在commands中定义实现代码，然后创建Cmd对象，并在定义菜单项是
 * 传递此命令对象即可。注：以上代码仅为说明问题而临时想的，可能会有一些不完善的
 * 地方。
	var commands={
		blod:function(){},
		font_family;function(){},
		font_color:function(){},
		code:function(){}
		//等等
	};//命令集合

	var Cmd=(function(){
		var track=[];
		return function(cmds,type){
			this.command=cmds[type];
			this.exec=function(){
				var that=this;
				track.push(that.command);
				this.command();
			};
			this.undo=function(){
				var handle=track.pop();
				//do something;
			};
		}
	})();

	var blodCmd=new Cmd(commands,'blod');//定义一个命令

	var menuItemBlod=new menuItem('blod',blodCmd);//一个菜单选项

 */




/**
 * Facade(外观)模式
 * Facade模式为更大的代码提供了一个方便的高层次接口
 * 能够隐藏其底层的真实复杂性
	
	 var module = (function(){
		var _private = {
			i : 5,
			get : function(){
				console.log("current value: " + this.i);
			},
			set : function(val){
				this.i = val;
			},
			run : function(){
				console.log("running");
			},
			jump : function(){
				console.log("jumping");
			}
		};
		return {
			facade : function(args){
				_private.set(args.val);
				_private.get();
				if(args.run){
					_private.run();
				}
			}
		};
	})();


	// 输出："running",10
	module.facade({
		run : true,
		val : 10
	});
 */



/**
 * Factory(工厂)模式
 * Factory模式是另一种创建型模式，涉及创建对象的概念
 * 其分类不同于其他模式的地方在于它不显式地要求使用一个构造函数
 * 而Factory可以提供一个通用的接口来创建对象
 * 我们可以指定我们所希望创建的工厂对象的类型
	 
	// 下面这个示例构建在之前的代码片段之上，使用Constructor模式逻辑来定义汽车
	// 它展示了如何使用Factory模式来实现vehicle工厂

	// 定义Car构造函数
	function Car(options){
		// 默认值
		this.doors = options.doors || 4;
		this.state = options.state || "brand new";
		this.color = options.color || "silver";
	}

	// 定义Truck构造函数
	function Truck(options){
		this.state = options.state || "used";
		this.wheelSize = options.wheelSize || "large";
		this.color = options.color || "blue";
	}

	// 定义vehicle工厂的大体代码
	function VehicleFactory(){}

	// 定义该工厂factory的原型和试用工具
	// 默认的vehicleClass是Car
	VehicleFactory.prototype.vehicleClass = Car;

	// 创建新Vehicle实例的工厂方法
	VehicleFactory.prototype.createVehicle = function(options){
		if(options.vehicleType === "car"){
			this.vehicleClass = Car;
		}else{
			this.vehicleClass = Truck;
		}
		return new this.vehicleClass(options);
	};

	// 创建生成汽车的工厂实例
	var carFactory = new VehicleFactory();
	var car = carFactory.createVehicle({
		vehicleType : "car",
		color : "yellow",
		doors : 6
	});

	// 测试汽车是由vehicleClass的原型里prototype里的Car创建的
	// 输出：true
	console.log(car instanceof Car);
	console.log(car);





	// 在方案2中，我们把VehicleFactory归入子类来创建一个构建Truck的工厂类
	function TruckFactory(){}
	TruckFactory.prototype = new VehicleFactory();
	// TruckFactory.prototype.vehicleClass = Truck;
	var truckFactory = new TruckFactory();
	var myBigTruck   = truckFactory.createVehicle({
		state : "omg..so bad",
		color : "pick",
		wheelSize : "so big"
	});

	// 确认myBigTruck是由原型Truck创建的
	// 输出：true
	console.log(myBigTruck instanceof Truck);
	console.log(myBigTruck);


	总结：
		1.当对象或组件设置涉及高复杂性
		2.当需要根据所在的不同环境轻松生成对象的不同实例时
		3.当处理很多共享相同属性的小型对象或组件时
		4.在编写只需要满足一个API契约(亦称鸭子类型)的其他对象的实例对象时。对于解耦是很有用的。

		如果应用错误，这种模式会为应用程序带来大量不必要的复杂性。
		除非为常见对象提供一个接口是我们正在编写的库或框架的设计目标，否则我建议坚持使用显示构造函数，以避免不必要的开销。
 */




/**
 * Abstract Factory(抽象工厂)
 

// Klass相当于extend的实现，主要作用是继承父类
var klass = (function () {
    var F = function () {};
    return function (Parent) {
		var Child;
		Child = function () {
		    Child.superproto.constructor.apply(this, arguments);
		};
		F.prototype = Parent.prototype;
		Child.prototype = new F();
		Child.prototype.constructor = Child;
		Child.superproto = Parent.prototype;
		return Child;
    };
})();


// 一般RPG游戏里， 一开始我们都要创建角色，选择职业，战士、法师还是弓箭手
// 都是继承了Character类
var Character = function () {},
	Warrior = klass(Character),
	Mage = klass(Character),
	Archer = klass(Character),
	Player = function () {
	};
	
Character.prototype.level = function () {
};
Character.prototype.gather = function () {
};
Character.prototype.fight = function () {
};
Player.prototype.play = function (role) {
	var character;
	switch (role) {
		case "战士":
			character = new Warrior();
			break;
		case "法师":
			character = new Mage();
			break;
		case "弓箭手":
			character = new Archer();
			break;
		default:
			character = new Warrior();
	}
	character.level();
	character.gather();
	character.fight();
};
var player = new Player();
player.play("法师");

// 这样写的问题在于，如果我们想要再加入一个新职业，比如盗贼，
// 我们不得不找到Player，打开它的代码，给switch增加一个case，
// 另外，如果还有PlayerVIP1,PlayerVIP2,PlayerVIP3...都在自己内部创建角色，
// 那每一处都需要修改，也就是要修改客户端的代码，这听上去就让人觉得不太好，
// 更好的办法是把创建角色的工作交给一个简单工厂来做。

// 这里值得一提的是，在教科书中显然会定义一个CharacterFactory类，
// 但在JS里呢，是定义一个对象好还是一个构造函数好呢，我有点小纠结，感觉没有什么不同
// 书上说有时CharacterFactory类里直接定义静态方法，那么可能更接近对象一些
// 当然构造函数也是对象，给构造函数一个属性方法的话看起来是一样的。


// 简单工厂
var CharacterFactory = {
	createCharacter: function (role) {
		var character;
		switch (role) {
			case "战士":
				character = new Warrior();
				break;
			case "法师":
				character = new Mage();
				break;
			case "弓箭手":
				character = new Archer();
				break;
			default:
				character = new Warrior();
		}
		return character;
	}
};
Player.prototype.play = function (role) {
	var character = CharacterFactory.createCharacter(role);
	character.level();
	character.gather();
	character.fight();
};

// 现在只需要修改工厂对象就可以了，
// 客户端代码保持不变Character.createCharacter()，
// 也不是严格的不变，因为”战士“或”盗贼“的判断还是放在客户端，
// 但是新增盗贼职业不还是要修改switch加一个case吗！这也违背了开闭原则。
// 这时工厂方法（Factory Method）就登场了。




// 工厂方法
// 先定义一个工厂接口，
// 这个接口定义了一个工厂方法来创建某一类型的产品，
// 然后有任意数量的具体工厂来实现这个接口，
// 在各自的工厂方法里创建那个类型产品的具体实例（ TODO:这个优点我还没有太理解 ）。
var WarriorFactory = function() {},
	MageFactory = function() {},
	ArcherFactory = function() {};
WarriorFactory.prototype.createCharacter = function() {
	return new Warrior();
};
MageFactory.prototype.createCharacter = function() {
	return new Mage();
};
ArcherFactory.prototype.createCharacter = function() {
	return new Archer();
};
Player.prototype.play = function(role) {
	var factory, character;
	switch (role) {
		case "战士":
			factory = new WarriorFactory();
			break;
		case "法师":
			factory = new MageFactory();
			break;
		case "弓箭手":
			factory = new ArcherFactory();
			break;
		default :
			factory = new WarriorFactory();
	}
	character = factory.createCharacter();
	character.level();
	character.gather();
	character.fight();
};

// 当我需要增加一个盗贼职业，就增加一个盗贼Factory，让它实现createCharacter方法，
// 这样整个的工厂体系不会有修改的变化，而只是扩展的变化，符合了开闭原则。
// 但是，修改的噩梦落到了客户端上，这是我的一个困惑，感觉没有简化，反而增加了一大堆类和方法，标记一个TODO。


// 当然，可以发挥JS灵活性特点
CharacterFactory = (function() {
	var roles = {
		Warrior: Warrior,
		Mage: Mage,
		Archer: Archer
	};
	return {
		createCharacter: function(role) {
			var Character = roles[role];
			return Character ? new Character() : new Warrior();
		},
		registerCharacter: function(role, Character) {
			var proto = Character.prototype;
			if (proto.level && proto.gather && proto.fight) {
				roles[role] = Character;
			}
		}
	}
})();
Player.prototype.play = function(role) {
	var character = CharacterFactory.createCharacter(role);
	character.level();
	character.gather();
	character.fight();
};
var Assasin = klass(Character);
CharacterFactory.registerCharacter("Assasin", Assasin);
player.play("Assasin");
 
 */










