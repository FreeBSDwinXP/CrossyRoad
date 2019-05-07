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
  //hitCheck,
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
          line.elements.forEach(elem => elem.destroy());
          line.elements.length = 0;
        }
        break;
    }
    line.container.y = linePosY;
    lines.push(line);
    app.stage.addChild(line.container);
    linePosY += height / 10;
  });
  gamer = new Cat();
  fps60();
}

function onHit (elem, massif) {
  //let hitCheck = 0;

  if (massif.forEach((masElem) => {
    //console.log('hitCheck Before = ', hitCheck);
    //console.log(elem.x, elem.y, elem.width, elem.height, masElem.type, masElem.x, masElem.getGlobalPosition().x, masElem.getGlobalPosition().y, masElem.width, masElem.height);
    if (hitTestRectangle(elem, masElem)) {
      console.log("hit on ", masElem.type);
      return true;
      
    } else {
      //
      //console.log('hitCheck else = ', hitCheck);
    }
  })) {
    return true;
  } 

  
  //return hitCheck;
}

function fps60() {
  
  requestAnimationFrame(fps60);
  gamer.animate();
  //console.log(gamer.cat.x);
  /*if (hitCheck === 1) {
    console.log('HIT');
  }*/
  lines.forEach((item) => {
    if (onHit(gamer.cat, item.elements)) {
      console.log ('YES');

    }
    
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