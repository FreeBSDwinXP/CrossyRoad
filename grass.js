class Grass {
    constructor() {
        this.container = new Container(); //Create container for line
        this.lawn = new Graphics();//Create new line
        this.lawn.beginFill(0x4FEE0F);//Start fill and set green color to the next drawings
        this.lawn.drawRect(0, 0, width, height / 10);//Draw the rectangle
        this.lawn.endFill();//End fill
        this.container.addChild(this.lawn);//Add line to container
        this.woods = randomInt(config.treeMin, config.treeMax);
        this.trees = [];//Create massif for trees
        (function() {
            do {
                let pos = randomInt(0, width * .9);
                this.tree = new Sprite(resources["images/tree.png"].texture);//Bind image to tree
                this.tree.position.set(pos, 0);//Locate tree in container
                this.tree.scale.set(width * 0.0007, height * 0.0009);//Zoom tree to our game field
                if (testFreeSpace(this.trees, this.tree)
                ) {
                    this.trees.push(this.tree);//Add tree in massif for this container
                    this.container.addChild(this.tree);//Add tree in this container
                }
            } while (this.trees.length < this.woods);
        }.bind(this))();
    }

    animate() {
    }
}