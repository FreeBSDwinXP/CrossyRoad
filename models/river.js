import * as PIXI from '../lib/pixi.min.js';
import {config} from '../config/config';
import {randomInt} from '../spec/randomint';
import {testFreeSpace} from '../spec/testFreeSpace';
class River {
    constructor() {
        this.container = new PIXI.Container(); //Create container for line
        this.line = new PIXI.Graphics();//Create new line
        this.line.beginFill(0x0F13EE);//Start fill and set blue color to the next drawings
        this.line.drawRect(0, 0, config.width, config.height/10);//Draw the rectangle
        this.line.endFill();//End fill
        this.container.addChild(this.line);//Add line to container
        this.elements = [];//Create massif for balks
        this.moveDirection = Math.random() < 0.5 ? -1 : 1;//Random move direction
        this.speed = randomInt(0.8,1.2);
        this.alreadyCreate = false;

        window.setInterval(function() {
            setTimeout(() => 
            {
                this.element = new PIXI.Sprite(PIXI.loader.resources["images/wood.png"].texture);//Bind image to balk
                this.element.scale.set(config.width*0.00018, config.height*0.00042);//Zoom balk to our game field
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
            if (elem.position.x < -elem.width*2.4 || elem.position.x > config.width+elem.width)//Border life of balks
            {
                elem.destroy();//Delete balk from container
                array.splice(index, 1);//Delete balk from massif
            }
        }.bind(this));
    }
}

export {River};