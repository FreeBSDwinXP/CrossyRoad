class river {
    constructor() {
        this.container = new Container(); //Create container for line
        this.water = new Graphics();//Create new line
        this.water.beginFill(0x0F13EE);//Start fill and set green color to the next drawings
        this.water.drawRect(0, 0, width, height/10);//Draw the rectangle
        this.water.endFill();//End fill
        this.container.addChild(this.water);//Add line to container
        //grass.position.set(0, 0)
        //app.stage.addChild(grass);
        

    }
}