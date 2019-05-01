class River {
    constructor() {
        this.container = new Container(); //Create container for line
        this.water = new Graphics();//Create new line
        this.water.beginFill(0x0F13EE);//Start fill and set blue color to the next drawings
        this.water.drawRect(0, 0, width, height/10);//Draw the rectangle
        this.water.endFill();//End fill
        this.container.addChild(this.water);//Add line to container
        this.balks = [];//Create massif for balks
        this.moveDirection = Math.random() < 0.5 ? -1 : 1;//Random move direction
        this.speed = randomInt(0.8,1.2);

        window.setInterval(function() {
            setTimeout(() => 
            {
                this.balk = new Sprite(resources["images/wood.png"].texture);//Bind image to balk
                this.balk.scale.set(width*0.00018, height*0.00042);//Zoom balk to our game field
                this.balk.moveDirection = this.moveDirection;//Write move direction for balk
                this.balk.speed = this.speed;
                if (this.moveDirection == -1)//Move to the left
                {
                    this.balk.position.set(this.container.width, 0);//Locate balk in container
                } else  //Move to the right
                {
                    this.balk.position.set(-this.balk.width, 0);//Locate balk in container
                }
                if (testFreeSpace(this.balks, this.balk)
                ) {
                    this.balks.push(this.balk);//Add balk in massif for this container
                    this.container.addChild(this.balk);//Add car in this container
                }
            }, randomInt(1000, 3000)); //Create balk with random time 1-3 s
            }.bind(this), randomInt(3000, 4500));//Start create balk with random time 3-4.5s

    }

    animate() {
        this.balks.forEach(function(element, index, array)//for each balk in massif
        {
            element.position.x += element.moveDirection*config.speedBalks*element.speed;//move balk
            if (element.position.x < -element.width*2.4 || element.position.x > width+element.width)//Border life of balks
            {
                element.destroy();//Delete balk from container
                array.splice(index, 1);//Delete balk from massif
                console.log('balk destroy in direction ' + element.moveDirection);//Logging
            }
        }.bind(this));
    }
}