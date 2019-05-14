class River {
    constructor() {
        this.container = new Container(); //Create container for line
        this.line = new Graphics();//Create new line
        this.line.beginFill(0x0F13EE);//Start fill and set blue color to the next drawings
        this.line.drawRect(0, 0, width, height/10);//Draw the rectangle
        this.line.endFill();//End fill
        this.container.addChild(this.line);//Add line to container
        this.elements = [];//Create massif for balks
        this.moveDirection = Math.random() < 0.5 ? -1 : 1;//Random move direction
        this.speed = randomInt(0.8,1.2);

        window.setInterval(function() {
            setTimeout(() => 
            {
                this.element = new Sprite(resources["images/wood.png"].texture);//Bind image to balk
                this.element.scale.set(width*0.00018, height*0.00042);//Zoom balk to our game field
                this.element.moveDirection = this.moveDirection;//Write move direction for balk
                this.element.speed = this.speed;
                this.element.type = 'wood';
                if (this.moveDirection == -1)//Move to the left
                {
                    this.element.position.set(this.container.width, 0);//Locate balk in container
                } else  //Move to the right
                {
                    this.element.position.set(-this.element.width, 0);//Locate balk in container
                }
                if (testFreeSpace(this.elements, this.element)
                ) {
                    this.elements.push(this.element);//Add balk in massif for this container
                    this.container.addChild(this.element);//Add car in this container
                }
            }, randomInt(1000, 3000)); //Create balk with random time 1-3 s
            }.bind(this), randomInt(3000, 4500));//Start create balk with random time 3-4.5s

    }

    animate() {
        this.elements.forEach(function(elem, index, array)//for each balk in massif
        {
            elem.position.x += elem.moveDirection*config.speedBalks*elem.speed;//move balk
            if (elem.position.x < -elem.width*2.4 || elem.position.x > width+elem.width)//Border life of balks
            {
                elem.destroy();//Delete balk from container
                array.splice(index, 1);//Delete balk from massif
                //console.log('balk destroy in direction ' + elem.moveDirection);//Logging
            }
        }.bind(this));
    }
}