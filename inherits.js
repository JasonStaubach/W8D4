Function.prototype.inherits = function(SuperClass) {
    function Surrogate () {}
    Surrogate.prototype = SuperClass.prototype;
    this.prototype = new Surrogate();
    this.prototype.constructor = this;
}

function MovingObject (size) {
    this.size = size;
    
}
MovingObject.prototype.moving = function () {
    console.log("moving");
}

function Ship (name, size) {
    this.name = name;
    MovingObject.call(this, size);
    // super(size);
    // function fly () => {
    //     console.log("I am flyin!");
    // }
}
Ship.inherits(MovingObject);

function Asteroid () {}
Asteroid.inherits(MovingObject);


const shippy = new Ship("shippy", 20);
// const joe = new MovingObject(20);
// console.log(shippy.name);
console.log(shippy.moving());
console.log(shippy.size);