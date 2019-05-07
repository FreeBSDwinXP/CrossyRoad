class Traffic {
    constructor() {//Create cars and road
        this.container = new Container(); //Create container for line
        this.road = new Graphics();//Create new line
        this.road.beginFill(0x616B5D);//Start fill and set gray color
        this.road.drawRect(0, 0, width, height/10);//Draw the rectangle
        this.road.endFill();//End fill
        this.container.addChild(this.road);//Add line to container
        this.elements = [];//Create massif for cars
        this.moveDirection = Math.random() < 0.5 ? -1 : 1;//Random move direction
        this.speed = randomInt(0.8,1.5);
        
        window.setInterval(function() {
            setTimeout(() => 
            {
                if (this.moveDirection == -1)//Move to the left
                {
                    this.element = new Sprite(resources["images/car_left.png"].texture);//Bind image to car 
                    this.element.position.set(this.container.width, 0);//Locate car in container
                    this.element.scale.set(width*0.0007, height*0.0009);//Zoom car to our game field
                } else  //Move to the right
                {
                    this.element = new Sprite(resources["images/car_right.png"].texture);//Bind image to car
                    this.element.position.set(-this.element.width, 0);//Locate car in container
                    this.element.scale.set(width*0.0007, height*0.00088);//Zoom car to our game field
                }
                this.element.moveDirection = this.moveDirection;//Write move direction for car
                this.element.speed = this.speed;
                this.element.type = 'car';
                if (testFreeSpace(this.elements, this.element)
                ) {
                    this.elements.push(this.element);//Add car in massif for this container
                    this.container.addChild(this.element);//Add car in this container
                }
            }, randomInt(1000, 3000)); //Create car with random time 1-3s
            }.bind(this), randomInt(3000, 4500));//Start create car with random time 3-4.5s
       
    }

    animate()//Moving the cars
    {
        this.elements.forEach(function(elem, index, array)//for each car in massif
        {
            elem.position.x += elem.moveDirection*config.speedCar*elem.speed;//move car
            if (elem.position.x < -elem.width*2.4 || elem.position.x > width+elem.width)//Border life of cars
            {
                elem.destroy();//Delete car from container
                array.splice(index, 1);//Delete car from massif
                //console.log('car destroy in direction ' + elem.moveDirection);//Logging
            }
        }.bind(this));
    }
}