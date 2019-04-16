class traffic {
    constructor() {
        this.container = new Container(); //Create container for line
        this.road = new Graphics();//Create new line
        this.road.beginFill(0x616B5D);//Start fill and set gray color
        this.road.drawRect(0, 0, width, height/10);//Draw the rectangle
        this.road.endFill();//End fill
        this.container.addChild(this.road);//Add line to container
        
        this.cars = [];
        this.moveDirection = Math.random() < 0.5 ? -1 : 1;
        if (this.moveDirection == -1)  {
            this.car = new Sprite(resources["images/car_left.png"].texture);
            this.car.position.set(this.container.width, 0);
            this.car.scale.set(width*0.0007, height*0.0009);
            this.container.addChild(this.car);
            this.cars.push(this.car);

        } else {
            this.car = new Sprite(resources["images/car_right.png"].texture);
            this.car.position.set(0/*-this.car.width*/, 0);
            this.car.scale.set(width*0.0007, height*0.00088);
            this.container.addChild(this.car);
            this.cars.push(this.car);
        }

        
    }

    animate()
    {
        console.log(this.cars);
        this.cars.forEach(function(car)
        {
            car.x += 1;
        }.bind(this));
    }
}