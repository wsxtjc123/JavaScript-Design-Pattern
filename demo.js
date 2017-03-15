

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



