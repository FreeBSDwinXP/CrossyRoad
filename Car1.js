
class Car
{
    constructor()
    {
        this.container = new PIXI.Container();  // creating container for lane
        this.lane = new PIXI.Graphics();
        this.lane.beginFill(0x5a6168);  // this lane color asphalt
        this.lane.drawRect(0, 0, width, height/10);  //draw recnangle
        this.lane.endFill();

        this.container.addChild(this.lane);
        this.items = [];
        this.direction = Math.random() < 0.5 ? -1 : 1;
        this.type = "car";

        window.setInterval(function()
        {
            setTimeout(() => 
            {
                if(this.direction > 0)
                {
                    this.car = new PIXI.Sprite(PIXI.loader.resources["images/car_left.png"].texture); //  <= direction <=
                    this.car.scale.set(0.4, 0.4 );
                    this.car.position.set(this.container.width, 0);
                } else {
                    this.car = new PIXI.Sprite(PIXI.loader.resources["images/car_right.png"].texture);  //  => direction =>
                    this.car.scale.set(0.4, 0.4 );
                    this.car.position.set(-width * 0.3, 0);
                }
                
                this.container.addChild(this.car);
                this.items.push(this.car);
            }, randomInt(1, 3) * 1000);
        }.bind(this), randomInt(3000, 6000));
    }

    update()
    {
        this.items.forEach(function(element, index, array) 
        {
            element.position.x -= 0.9 * this.direction;
            if (this.direction > 0)
            {
                if (element.position.x < -width * 0.3) 
                {
                    element.destroy();
                    array.splice(0, 1);
                }
            }else 
            {
                if (element.position.x > renderer.width * 1.3) 
                {
                    element.destroy();
                    array.splice(0, 1);
                }
            }
            
        }.bind(this));
    }
}
