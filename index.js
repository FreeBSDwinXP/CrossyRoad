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
  lines = [],
  cat;



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
  .add("images/tree.png")
  .add("images/wood.png")
  .load(setup);

function setup() {

  let linePosY = 0;
  config.relief.forEach(function (typeRelief, index) {
    let line;
    switch (typeRelief) {
      case "traffic":
        line = new Traffic();
        break;
      case "river":
        line = new River();
        break;
      case "grass":
        line = new Grass();
        if (index == 9) {
          line.trees.forEach(elem => elem.destroy());
          line.trees.length = 0;
        }
        break;
    }
    line.container.y = linePosY;
    lines.push(line);
    app.stage.addChild(line.container);
    linePosY += height / 10;
  });
  cat = new Cat();
  fps60();
}

function fps60() {
  requestAnimationFrame(fps60);
  cat.animate();
  lines.forEach((item) => {
    item.animate();
  });
}

//The `randomInt` helper function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Test new element for overlapped with existing
function testFreeSpace(massif, newSprite) {
  if (massif.every(ArrTest, newSprite)) {
    return true;
  }
  function ArrTest (oldSprite) {
  return newSprite.x < oldSprite.x-oldSprite.width*1.1 || newSprite.x > oldSprite.x+oldSprite.width*1.1
  }
}