import * as PIXI from '../lib/pixi.min.js';
import {config} from '../config/config';
import {app} from '../main';
class Cat //PLAYER
{
    constructor()
    {
        this.cat = new PIXI.Sprite(PIXI.loader.resources["images/cat.png"].texture);//Bind image to cat 
        this.cat.position.set(config.width * 0.5, config.height * 0.92);//Locate cat in game field
        this.cat.scale.set(config.width*0.00007, config.height*0.00009);//Zoom cat to our game field
        this.keyState = {32: false, 37: false, 38: false, 39: false, 40: false};//default boolean value keys of keyboard 
        this.keyCodes = {37: -1, 38: -1, 39: 1, 40: 1};//default direction value keys of keyboard
        this.directionX = 0;//default value pixels of move in X axis
        this.directionY = 0;//default value pixels of move in Y axis
        this.speed = config.speedPlayer;//read the speed value from config file
        this.cat.preX = this.cat.x;//previous coordinate in X axis
        this.cat.preY = this.cat.y;//previous coordinate in Y axis
        app.stage.addChild(this.cat);//Add cat in main container
        // bind event when User pushe and release key in browser
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    animate()//moving the player (cat)
    {
        let nextX = this.cat.position.x + this.directionX * this.speed;//next position in X axis
        let nextY = this.cat.position.y + this.directionY * this.speed;//next position in Y axis

        this.cat.preX = this.cat.x;//previous coordinate in X axis
        this.cat.preY = this.cat.y;//previous coordinate in Y axis
        
        // Prevent from leaving the screen
        if (nextX > 0 && nextX < config.width-this.cat.width) {
            this.cat.position.x = nextX;
        }
        if (nextY > 0 && nextY < config.height-this.cat.height) {
            this.cat.position.y = nextY;
        }
    }

    onKeyDown(key)//when user push the key
    {
        this.keyState[key.keyCode] = true;
        if (key.keyCode == 37 || key.keyCode == 39)  // ArrowLeft = 37; ArrowRight = 39;
            {
            this.directionX = this.keyCodes[key.keyCode];
            }
        else if (key.keyCode == 38 || key.keyCode == 40) // ArrowUp = 38; ArrowDown = 40;
            {
            this.directionY = this.keyCodes[key.keyCode];
            }
    }

    onKeyUp(key)//when user release the key
    {
        this.keyState[key.keyCode] = false;
        if (!this.keyState[37] && this.keyState[39])
            this.directionX = this.keyCodes[39];
        else if (this.keyState[37] && !this.keyState[39])
            this.directionX = this.keyCodes[37];
        else this.directionX = 0;
        if (!this.keyState[38] && this.keyState[40])
            this.directionY = this.keyCodes[40];
        else if (this.keyState[38] && !this.keyState[40])
            this.directionY = this.keyCodes[38];
        else this.directionY = 0;
    }
}

export {Cat};
