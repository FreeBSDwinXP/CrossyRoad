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
  noswim = false,
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

function onHit (elem, massif, type) {
  if (hitTestRectangle(type, elem) && type instanceof River) {

  }
  //console.log(type.line.width, type.line.height);
  
  massif.forEach((masElem) => {
    if (hitTestRectangle(elem, masElem)) {
      if (masElem.type == 'tree') {
        elem.x = elem.preX;
        elem.y = elem.preY;
      } else if (masElem.type == 'wood') {
        elem.x = masElem.x+masElem.width/2-elem.width/2;
        noswim = true;
      } else if (masElem.type == 'car') {
        lost(elem);
        //return;
      }
    } else {
      //
      //console.log('hitCheck else = ', hitCheck);
    }
  }); 
}

function lost(play) {
  play.position.set(width * 0.5, height * 0.905);
  lifes -= 1;
  console.log('-- YOU LOOSER -- and have only     ' + lifes + '    lifes');
}

function fps60() {
  
  requestAnimationFrame(fps60);
  gamer.animate();
  
  lines.forEach((item) => {
    onHit(gamer.cat, item.elements, item.container);
    /*if (hitTestRectangle(item.container, gamer.cat)) {
      if (item instanceof River) {
        console.log('hit on river', item.line);
        ride = false;
      }
      //console.log('hit on ', item.line);
      //console.log('1');
      //line instanceof River
    }*/
    item.animate();
    noswim = false;
    
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