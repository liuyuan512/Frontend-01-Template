# 关于JavaScript中的特殊对象

## 1. Proxy Object
	对应于JavaScript中的Object，其中[[]]可以理解为私有属性，使用者访问不到，右侧的为实现方法，使用者可以访问到
	- [[GetPrototypeOf]]	getPrototypeOf
	- [[SetPrototypeOf]]	setPrototypeOf
	- [[IsExtensible]]	isExtensible
	- [[preventExtensions]] preventExtensions
	- [[GetOwnProperty]] getOwnPropertyDescript
	- [[DedineOwnProperty]]	defineProperty
	- [[HasProperty]]	has
	- [[Get]]	get
	- [[Set]]	set
	- [[Delete]]	deleteProperty
	- [[OwnPropertyKeys]]	ownKeys
	- [[Call]] apply
	- [[Construct]] construct

## 2.	Array Exotic Objects
	- length 属性必须为>=0的整数，如果为-0会被设置为+0，如果长度>2的32次方-1.就抛出一个RageError


### 3. Bound Function Exotic Objects
	- [[BoundTargetFunction]]	Callabe Object 这个应该是调用bind的函数对象
	- [[BoundThis]]	Any 这个应该是要绑定的this的值
	- [[BoundArguments]] List of Any   这个应该是向绑定函数对象传入的参数列表

### 4. Built-in Function Objects
	- [[Call]] 对应于函数的call方法，第一个参数为要绑定的this，剩下的是一个参数列表
	- [[Construct]]	对应于使用new 构造的时候的参数
