/*************************************************
-My FIRST game- Analog Crossy Road - FreeBSDwinXp-
*************************************************/

let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Graphics = PIXI.Graphics,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    width = config.width, // Global width game field
    height = config.height,// Global height game field
    lines = [];

    

//Create a Pixi Application
let app = new Application({ 
    width: width, 
    height: height,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
  }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

PIXI.loader
  .add("images/car_left.png")
  .add("images/car_right.png")
  .add("images/cat.png")
  //.add("images/tree.png")
  //.add("images/wood.png")
  .load(setup);

let cat;

function setup() {

  //Create the `cat` sprite 
  

  let linePosY = 0;
  config.relief.forEach(function(typeRelief, index) {
    let line;
    switch (typeRelief) {
      case "traffic":
        line = new traffic();
        break;
      case "river":
        line = new river();
        break;
      case "grass":
        line = new grass();
        break;
    }
    line.container.y = linePosY;
    lines.push(line);
    app.stage.addChild(line.container);
    linePosY += height/10;

  }

  )
  
  /*cat = new Sprite(resources["images/cat.png"].texture);
  cat.position.set(width/2, height/10*9);
  cat.scale.set(0.08, 0.07);
  app.stage.addChild(cat);*/
  
  
  fps60();
  //app.renderer.render(app.stage);
  //app.render(stage);
}

function fps60() {
  

  
  requestAnimationFrame (fps60);
  //cat.x += 5;
  lines.forEach((item) => 
  {
    item.animate();
  });
  //app.renderer.render(app.stage);
}

//The `randomInt` helper function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}