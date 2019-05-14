class Grass {
    constructor() {
        this.container = new Container(); //Create container for line
        this.line = new Graphics();//Create new line
        this.line.beginFill(0x4FEE0F);//Start fill and set green color to the next drawings
        this.line.drawRect(0, 0, width, height / 10);//Draw the rectangle
        this.line.endFill();//End fill
        this.container.addChild(this.line);//Add line to container
        this.woods = randomInt(config.treeMin, config.treeMax);
        this.elements = [];//Create massif for trees
        (function() {
            do {
                let pos = randomInt(0, width * .9);
                this.element = new Sprite(resources["images/tree.png"].texture);//Bind image to tree
                this.element.position.set(pos, 0);//Locate tree in container
                this.element.scale.set(width * 0.0007, height * 0.0009);//Zoom tree to our game field
                this.element.type = 'tree';
                if (testFreeSpace(this.elements, this.element)
                ) {
                    this.elements.push(this.element);//Add tree in massif for this container
                    this.container.addChild(this.element);//Add tree in this container
                }
            } while (this.elements.length < this.woods);
        }.bind(this))();
    }

    animate() {
    }
}