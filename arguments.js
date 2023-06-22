function sum(...args){
    let result = 0
    for(let i = 0; i < args.length; i++){
        result += args[i]
    }
    return result
}

console.log(sum(1,2));


Function.prototype.myBind2 = function(context, ...callArgs){
    let that = this;
    return function (...moreArgs) {
        return that.apply(context,callArgs.concat(moreArgs));
    }
};



Function.prototype.myBind = function(context){
    let that = this;
    debugger
    let bindArgs = Array.from(arguments).slice(1); 
    return function () {
        let callArgs = Array.from(arguments);

        return that.apply(context, bindArgs.concat(callArgs));
    }
};

class Cat {
    constructor(name) {
      this.name = name;
    }
  
    says(sound, person) {
      console.log(`${this.name} says ${sound} to ${person}!`);
      return true;
    }
  }
  
  class Dog {
    constructor(name) {
      this.name = name;
    }
  }
  
  const markov = new Cat("Markov");
  const pavlov = new Dog("Pavlov");
  
  markov.says("meow", "Ned");
  // Markov says meow to Ned!
  // true
  
  // bind time args are "meow" and "Kush", no call time args
  markov.says.myBind(pavlov, "meow", "Kush")();
  // Pavlov says meow to Kush!
  // true
  
  // no bind time args (other than context), call time args are "meow" and "a tree"
  markov.says.myBind(pavlov)("meow", "a tree");
  // Pavlov says meow to a tree!
  // true
  
  // bind time arg is "meow", call time arg is "Markov"
  markov.says.myBind(pavlov, "meow")("Markov");
  // Pavlov says meow to Markov!
  // true
  
  // no bind time args (other than context), call time args are "meow" and "me"
  const notMarkovSays = markov.says.myBind(pavlov);
  notMarkovSays("meow", "me");
  // Pavlov says meow to me!
  // true

function curriedSum(numArgs){
    const numbers = [];
    return function _curriedSum (num) {
        numbers.push(num)
        if(numArgs === numbers.length){
            return numbers.reduce((acc, num) => acc + num, 0);
        } else {
            // console.log(numbers);
            return _curriedSum;
        }
    }
}

// const threeSum = curriedSum(3);
// threeSum(1)
// threeSum(2)
// console.log(threeSum(3));

Function.prototype.currySplat = function (numArgs, ...bindArgs){
    let numbers = bindArgs;
    return function _curry (...args){
        numbers = numbers.concat(args);

        if (numArgs === numbers.length){
            return numbers.reduce((acc, num) => acc + num, 0);
        } else {
            return _curry;
        }
    }
}


Function.prototype.curry = function (numArgs){
    const numbers = [];
    return function _curry (){
        let array = Array.from(arguments);
        numbers.push.apply(numbers, array);        
        if (numArgs === numbers.length){
            return numbers.reduce((acc, num) => acc + num, 0);
        } else {           
            return _curry;
        }
    }
}
const threeSum = Array.curry(3);
threeSum(1, 2)
console.log(threeSum(5));