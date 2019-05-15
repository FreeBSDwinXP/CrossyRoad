class Cat
{
    constructor()
    {
        this.cat = new Sprite(resources["images/cat.png"].texture);

        this.cat.position.set(width * 0.5, height * 0.92);
        this.cat.scale.set(width*0.00007, height*0.00009);
        
        this.keyState = {32: false, 37: false, 38: false, 39: false, 40: false};
        this.keyCodes = {37: -1, 38: -1, 39: 1, 40: 1};

        this.directionX = 0;
        this.directionY = 0;
        this.speed = config.speedPlayer;
        this.cat.preX = this.cat.x;
        this.cat.preY = this.cat.y;

        this.fireSpeed = 10;    // Just one Easter Egg
        this.fireCooldown = 0;  // Just one Easter Egg

        this.cat.onWood = false;
        this.cat.onTree = false;
        this.cat.onwoodX;
        this.cat.onwoodY;

        app.stage.addChild(this.cat);

        window.addEventListener('keydown', this.onKeyDown.bind(this)); 
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    animate()
    {
        let nextX = this.cat.position.x + this.directionX * this.speed;
        let nextY = this.cat.position.y + this.directionY * this.speed;

        this.cat.preX = this.cat.x;
        this.cat.preY = this.cat.y;
        
        // Prevent from leaving the screen
        if (nextX > 0 && nextX < width-this.cat.width) {
            this.cat.position.x = nextX;
        }
        if (nextY > 0 && nextY < height-this.cat.height) {
            this.cat.position.y = nextY;
        }
  
        this.updateFire();  // Just one Easter Egg 
    }

    updateFire() // Just one Easter Egg
    {
        if (this.fireCooldown < this.fireSpeed)
            this.fireCooldown++;

        if (this.keyState[32] && this.fireCooldown >= this.fireSpeed)
        {
            let rocket = new Rocket(this.sprite.position.x, this.sprite.position.y);
            this.fireCooldown = 0;
        }
    }

    onKeyDown(key)
    {
        this.keyState[key.keyCode] = true;

        if (key.keyCode == 37 || key.keyCode == 39)  // ArrowLeft = 37; ArrowRight = 39;
            {
            this.directionX = this.keyCodes[key.keyCode];
            //ride = false;  // this used for mooving on woods
            }
        else if (key.keyCode == 38 || key.keyCode == 40) // ArrowUp = 38; ArrowDown = 40;
            this.directionY = this.keyCodes[key.keyCode];
            

    }

    onKeyUp(key)
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
