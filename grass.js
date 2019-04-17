class grass {
    constructor() {
        this.container = new Container(); //Create container for line
        this.lawn = new Graphics();//Create new line
        this.lawn.beginFill(0x4FEE0F);//Start fill and set green color to the next drawings
        this.lawn.drawRect(0, 0, width, height/10);//Draw the rectangle
        this.lawn.endFill();//End fill
        this.container.addChild(this.lawn);//Add line to container
        //grass.position.set(0, 0)
        //app.stage.addChild(grass);
        
        

    }

    animate() {
        
    }
}