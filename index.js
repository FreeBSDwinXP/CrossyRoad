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
  lifes = config.lifes,
  createLine = 0,
  speedBalks = config.speedBalks,
  speedCar = config.speedCar,
  level = 1,
  score = 0,
  gamer;



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


  



function infoText() {
  let style = new TextStyle({
    fontFamily: "Arial",
    fontSize: 20,
    fill: "white",
    stroke: '#ff3300',
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: "#000000",
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    }),
    message = new Text(`Level ${level} Lifes ${lifes} Score ${score}`, style);
    message.position.set(10, 10);
    app.stage.addChild(message);
}

function correctCreation(lin, ind) {
  createLine += 1;
  lin.container.y = height / 10 * ind;
}

function createGrass() {
  config.relief.forEach(function (typeRelief, index) {
    if (typeRelief == 'grass') {
      let line = new Grass();
      correctCreation(line, index);
      if (index == 9) {
        line.elements.forEach(elem => elem.destroy());
        line.elements.length = 0;
      }
      lines.push(line);
      app.stage.addChild(line.container);
    }
  });
}

function createRiverTraffic () {
  config.relief.forEach(function (typeRelief, index) {
    if (typeRelief != "grass") {
      let line;
      switch (typeRelief) {
        case "traffic":
          line = new Traffic();
          break;
        case "river":
          line = new River();
          break;
      }
      correctCreation(line, index);
      lines.push(line);
      app.stage.addChild(line.container);
    } else {
    }
  });
}

function calculateGrass() {
  let gr = 0;
  config.relief.forEach(function (typeRelief) {
    if (typeRelief == 'grass') {
      gr += 1;
    }
  });
  return gr;
}

function setup() {
  while (createLine < config.relief.length - calculateGrass()) {
      createRiverTraffic();
    }
    createGrass();
  gamer = new Cat();
  fps60();
  infoText();
}

function onHit (elem, massif) {
  massif.forEach((masElem) => {
    if (hitTestRectangle(elem, masElem)) {
      if (masElem.type == 'tree') {
        elem.x = elem.preX;
        elem.y = elem.preY;
      } else if (masElem.type == 'wood') {
        elem.x = elem.x + masElem.moveDirection*speedBalks*masElem.speed;
        elem.onWood = true;
      } else if (masElem.type == 'car') {
        lost(elem);
        console.log('cat lost one of his life under the wheels on the road... RIP');
      }
    }
  });
}


function lost(play) {
  play.position.set(width * 0.5, height * 0.92);
  lifes -= 1;
  infoText();
}

function win(play) {
  play.position.set(width * 0.5, height * 0.92);
  lifes += 1;
  level += 1;
  speedBalks += 0.1;
  speedCar += 0.1;
  infoText();
}

function fps60() {
  requestAnimationFrame(fps60);
  gamer.animate();

  if (gamer.cat.x < 0 || gamer.cat.x > width-gamer.cat.width) {
    lost(gamer.cat);
    console.log('oops you ride away');
  }

  if (gamer.cat.y < height/10-gamer.cat.height) {
    win(gamer.cat);
    console.log('win');
    
  }
  
  
  lines.forEach((item) => {
    onHit(gamer.cat, item.elements);
    if (hitTestRectangle(item.container, gamer.cat) && item instanceof River) {
      if (!gamer.cat.onWood) {
        lost(gamer.cat);
        console.log('cat can not swim');
      }
    }
    item.animate();
    gamer.cat.onWood = false;
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

//Test elements on Hit action
function hitTestRectangle(r1, r2) {

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.getGlobalPosition().y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
}