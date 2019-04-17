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

        window.setInterval(function() {
            setTimeout(() => 
            {
                if (this.moveDirection == -1)  
                {
                    this.car = new Sprite(resources["images/car_left.png"].texture);
                    this.car.position.set(this.container.width, 0);
                    this.car.scale.set(width*0.0007, height*0.0009);
                } else  
                {
                    this.car = new Sprite(resources["images/car_right.png"].texture);
                    this.car.position.set(-this.car.width, 0);
                    this.car.scale.set(width*0.0007, height*0.00088);
                }
                this.cars.push(this.car);
                this.container.addChild(this.car);
            }, randomInt(1000, 3000));
            }.bind(this), randomInt(3000, 6000));
       
    }

    animate()
    {
        this.cars.forEach(function(element, index, array)
        {
            element.position.x += this.moveDirection;
            if (element.position.x < -200-element.width || element.position.x > width+this.car.width)
            {
                element.destroy();
                array.splice(0, 1);
                console.log('car destroy in direction ' + this.moveDirection)

            }
        }.bind(this));
    }
}