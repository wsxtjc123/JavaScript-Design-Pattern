

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






















