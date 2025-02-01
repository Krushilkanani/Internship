//how javascript code is executed
var n=2;
function square (num){
	var ans = num*num;
	return ans;
}

var square2 = square(n);
var square4 = square(4);

// js has its own call stack ==> (Global execution context) | (Ececution context 1) | (...)

// hoisting in javascript

getName(); //hello world
console.log(x); // undefined

var x=7;

function getName(){
	console.log("hello world");
}

//==============


var x=7;

function getName(){
	console.log("hello world");
}

getName(); //hello world
console.log(x); //7  

// How functions work in javascript

var x=1;
a(); //10
b(); //100
console.log(x); //1
function a(){
	var x = 10;
	console.log(x);
}

function b(){
	var x = 100;
	console.log(x);
}

// lexical scope

function a(){
	var b=10;
	c();
	funciton c(){
		console.log(b);
	}
} 
 
a();

//lexical environment is the local memory along with lexical environment of his parent

//temporal dead zone
// it is the time since when the let variable was hosted and till it was initialized

console.log(a);//error
console.log(b);//no error
let a = 10;
var b = 100;

//closure : function along with its lexical scope bundle forms a closure

function x(){
	var z=10;
	function y(){
		 console.log(z);
	}
	return y;
}

var z = x();
console.log(z);
z();

//--------------

function z() {
	var b=10;
	function x() {
		var a =7;
		function y() {
			console.log(a,b);
		}
		y();
	}
	x();
}
z();

//uses of closure;
/*
-> module of design
-> currying
-> function like once
-> memoize
-> maintaining state in async world
-> setTimeouts
-> and many more.... 
*/

//setTimeout

function x(){
	var i=1;
	setTimeout(function () {
		console.log(i);
	},3000);
	console.log("Hello World");
}

//closure example

function outer(){
	var a=10; //still works with let
	function inner(){
		console.log(a);
	}
	return inner;
}
outer ()(); // var close = outer; close();


//function statement 
function a(){
	console.log("a called..");
}

//funciton expression
var b = function (){
	console.log("b called");
}
b();

//function declaration
//also known as function declaration

//anonymous function
//function(){}

//named function function expression
var c = function xyz(){
	console.log("xyz called");
}
c();

//first class function also known as first class citizens
//ability to use function as values and assign it to function and return as function


//arrow funciton
var arrfun = ()=>{console.log("hello world")};

//callback functions

setTimeout(function() {
	console.log("timer");
},5000);

function x(){
	console.log("x");
}

function y() {
	console.log("y");
}

//asynchronous javaascript
//event loop

//higher order functions
// a function which takes function as an argument or which return a function is known as higher order function

function x(){
	console.log("x");
}
funciton y(x){
	x();
}

const radius = [3,1,2,4];

const calcarea = function (radius){
	const output = [];
	for(let i=0; i< radius.length; i++){
		output.push(Math.PI * radius[i] * radius[i]);
	}
	return output;
}

// map, filter, reduce

const arr = [5,1,3,2,6];

function double (x){
	return x*2;
}

//map
const output = arr.map(double);
const output = arr.map((x) => x*2); //both are same

console.log(output);

function iseven(x){
	return x%2 === 0;
}

//filter
const output = arr.filter(iseven);
const output = arr.filter((x) => x%2 == 0); //both are same

//sum
function findsum(arr){
	let sum = 0;
	for(let i=0; i<arr.length; i++){
		sum = sum + arr[i];
	}
	return sum;
}

//reduce of sum function
const output = arr.reduce(function(acc,curr){
	acc = acc + curr;
	return acc;
},0);

console.log(output);

//find max using reduce
const output = arr.reduce(function(max,curr){
	if(curr > max){
		max = curr;
	}
	return max; 
},0);

//callbacks
//inversion of control

//promises: it is an object that represents eventual completion of async operation

const cart = ["shoes","pants","kurta"];

//not reliable
createOrder(cart, function (orderId){
	proceedToPayment(orderId);
});

const promise = createOrder(cart);

// {data: orderDetails}

promise.then(function (orderId){
	proceedToPayment(orderId);
});

//3 states of promises: reject, fulfilled and pending

//creating new promise

const cart = ["shoes","pant","shirt"];

const promise = createOrder(cart); //orderId

promise.then(function(){
	proceedToPayment(orderId);
})
.catch(function(err){
	console.log(err.message);
});

//producer end 
function createOrder(cart){
	const pr = new promise(function(resolve,reject){
		//create order
		//validate cart
		//orderId
		if(!validateCart(cart)){
			const err = ner Error("cart not valid");
			reject(err);
		}
		//logic for createOrder
		const orderId = "12345";
		if(orderId){
			setTimeout(function (){
				resolve(orderId);
			},5000);
		}
	});
	
	return pr;
}

function validateCart(cart){
	return true;
}

//promise.all([p1,p2,p3])
//it will run after all the promises gets success
//it will throw an error if any one of the promise will get rejected

//promise.allSettled([p1,p2,p3]
//it will work same for success 
//but if any one promise get rejected then it will wait for all other promise to settle 

//promise.race([p1,p2,p3,])
// as soon as any promise is settled it will result of theat promise
//it will return result of first settled promise and will not wait for other promise

//promise.any([p1,p2,p3])
//it is same like promise.any but for success result
//it will wait till it get its first successful result
//it will ignore all rejected result and wait for the successful result
// if every promise get rejected then returned result will be aggregriate result of all promise like [err1,err2,err3]

//promise.all

const p1 = new Promise((resolve, reject) => {
	setTimeout(()=> resolve("P1 success"),3000);
})

const p2 = new Promise((resolve, reject) => {
	//setTimeout(()=> resolve("P2 success"),1000);
	setTimeout(()=> reject("P2 Fail"),1000);
})

const p3 = new Promise((resolve, reject) => {
	setTimeout(()=> resolve("P3 success"),2000);
})

Promise.all([p1,p2,p3])
.then((res) => {
	console.log(res);
})
.catch((err) => {
	console.error(err);
});

//promise.allSettled

Promise.allSettled([p1,p2,p3])
.then((res) => {
	console.log(res);
})
.catch((err) => {
	console.error(err);
}); 

//promise.race

Promise.race([p1,p2,p3])
.then((res) => {
	console.log(res);
})
.catch((err) => {
	console.error(err);
}); 

//promise.any

promise.any([p1,p2,p3])
.then((res) => {
	console.log(res);
})
.catch((err) => {
	console.error(err);
	//for aggregriate errors
	//console.log(err.errors);
});

//async
//async function always return a promise
//if we return a value then iti will warp inside a promise and return by itself

const p = new Promise((resolve,reject)=> {
	resolve("Promise resolve value");
});

async funciton getData(){
	//return "Hello world";
	return p;
}

const dataPromise = getData();
 
dataPromise.then((res)=>console.log(res));

//using await with async
// async and await are used to handle promises
//await can only be used insisde a async Function

async function handlePromise(){
	//JS engine was waiting for promise to get resolved
	const val = await p;
	console.log(val);
}

//error handling in async await
// we have try catch to solve error in async await

try{
	const data = await fetch(API_URL);
	const jsonValue = await data.json();
	console.log(jsonValue) ;
} catch(err){
	console.log(err);
}

//old method
handlePromise().catch((err) => {
	console.log(err);
});

//this keyword in javascript

//this in global space will be different be it windows, global object depending on where we run
//this inside a function is undefined in strict mode

function x(){
	console.log(x);
}

x(); //undefined
windows.x(); //window

//function in a object is called as method of that object

const obj = {
	a:10,
	x: function(){
		console.log(this);
	}
};

obj.x(); //{a:10, x:f}

//call apply bind method (sharing method)

const student = {
	name: "Kruhsil",
	printName: function(){
		console.log(this.name);
	}
}

const student2 = {
	name: "Kanani",
}


student.printName.call(student2); //value of this is student2

const obj2 = {
	a:10,
	x: () => {
		console.log(this);//it behaves like enclosing lexical context i.e. window
	},
};

const obj3 = {
	a:30,
	x: function (){
		const y = ()=>{
			console.log(this);
		};
		y();
	}
};
obj3.x(); //{a:30, x:f()}

//call apply bind

let name = {
	firstName: "Krushil",
	lastName: "Kanani",
	//printFullName : function(){
	//	console.log(`${this.firstName} ${this.lastName}`);
	//}
}

let printFullName = function(hometown, state){
		console.log(`${this.firstName} ${this.lastName} from ${hometown}, ${state}`);
	}

name.printFullName();

let name2 = {
	firstName: "Sachin",
	lastName: "Tendulkar",
}

//function borrowing

//name.printFullName.call(name2);
printFullName.call(name2,"Surat","gujarat"); 

//apply method: we will pass second argument as array list
printFullName.apply(name2, ["Surat","gujarat"]); 

//bind: this will give the copy of the same method which we can use later
let printMyName = printFullName.bind(name2,"Surat","gujarat"); 
console.log(printMyName);
printMyName();

//function currying: presetting the value of arguments in bind method

//by using bind method
let multiply = function(x,y){
	console.log(x*y);
}

let multiplybyTwo = multiply.bind(this,2);

multiplybyTwo(5); //10  

//by closure

let multiply = function(x){
	return function (y){
		console.log(x*y);
	}
}

//event bubbling capturing

//addEventListener("clicked",()=>{},bool)
//if bool is true then it will do capturing
//if bool is false then it will do bubbling
// by default it is set to bubbling
//stopPropagation is used to stop propogaion

//event delegation

//prototype and prototypal inheritance

let arr = ["krushil","kanani"];
let obj  = {
	name:"krushil",
	city:"surat",
	getIntro: function(){
		console.log(`${this.name} from ${this.city}`);
	}
}

 

