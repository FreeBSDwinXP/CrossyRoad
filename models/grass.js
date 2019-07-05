import * as PIXI from '../lib/pixi.min.js';
import {config} from '../config/config';
import {randomInt} from '../spec/randomint';
import {testFreeSpace} from '../spec/testFreeSpace';
class Grass {
    constructor() {
        this.container = new PIXI.Container(); //Create container for line
        this.line = new PIXI.Graphics();//Create new line
        this.line.beginFill(0x4FEE0F);//Start fill and set green color to the next drawings
        this.line.drawRect(0, 0, config.width, config.height / 10);//Draw the rectangle
        this.line.endFill();//End fill
        this.container.addChild(this.line);//Add line to container
        this.woods = randomInt(config.treeMin, config.treeMax);
        this.elements = [];//Create massif for trees
        this.alreadyCreate = false;
        
        (function() {
            do {
                let pos = randomInt(0, config.width * 0.9);
                this.element = new PIXI.Sprite(PIXI.loader.resources["images/tree.png"].texture);//Bind image to tree
                this.element.position.set(pos, 0);//Locate tree in container
                this.element.scale.set(config.width * 0.0007, config.height * 0.0009);//Zoom tree to our game field
                this.element.type = 'tree';
                if (testFreeSpace(this.elements, this.element)
                ) {
                    this.elements.push(this.element);//Add tree in massif for this container
                    this.container.addChild(this.element);//Add tree in this container
                }
            } while (this.elements.length < this.woods);
        }.bind(this))();
    }

	//empty technical function to avoid errors
    animate() {
    }
}

export {Grass};