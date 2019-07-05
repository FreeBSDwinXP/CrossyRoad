/*************************************************
-My FIRST game- Analog Crossy Road - FreeBSDwinXp-
*************************************************/
//import modules for my app
import {Cat} from './models/cat.js';
import {Grass} from './models/grass.js';
import {River} from './models/river.js';
import {Traffic} from './models/traffic.js';
import {config} from './config/config.js';
import {hitTestRectangle} from './spec/hitTestRectangle.js';
import * as PIXI from './lib/pixi.min.js';

//Create technical variables
let lines = [],//Storage already created interactive lines of the game
  lifes = config.lifes,//initial numbers of lifes
  createLine = 0,//Counter already created interactive lines of the game
  level = 1,//initial level
  score = 0,//initial score
  message,//game text information
  gamer;//main player



//Create a Pixi Application
export let app = new PIXI.Application({
  width: config.width,
  height: config.height,
  antialias: true,
  transparent: false,
  resolution: 1
});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//Load textures
PIXI.loader
  .add("images/car_left.png")
  .add("images/car_right.png")
  .add("images/cat.png")
  .add("images/tree.png")
  .add("images/wood.png")
  .load(setup);

//Create information layer with text about the game
function infoText() {
  let style = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 16,
    fill: "white",
    stroke: 'blue',
    strokeThickness: 3,
    }),
    author = new PIXI.Text('FreeBSDwinXP', style);
  message = new PIXI.Text(`Level ${level} Lifes ${lifes} Score ${score}`, style);
  message.position.set(5, config.height * 0.94);
  author.style = {fill: "red", fontSize: 13}
  author.position.set(config.width*0.83, config.height * 0.95)
  app.stage.addChild(message, author);
}

//Update game information 
function updateText() {
  message.text = `Level ${level} Lifes ${lifes} Score ${score}`;
}

//Location interactive line
function correctCreation(lin, ind) {
  createLine += 1;
  lin.container.y = config.height / 10 * ind;
}

//Create Grass from the given config
function createGrass() {
  config.relief.forEach(function (typeRelief, index) {
    if (typeRelief == 'grass') {
      let line = new Grass();
      correctCreation(line, index);
      if (index == 9) {
        //cleaning free space for player on the Start 
        line.elements.forEach(elem => elem.destroy());
        line.elements.length = 0;
      }
      lines.push(line);
      app.stage.addChild(line.container);
    }
  });
}

//Create River and Road from the given config
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

//Calculate number Grass lines from the config
function calculateGrass() {
  let gr = 0;
  config.relief.forEach(function (typeRelief) {
    if (typeRelief == 'grass') {
      gr += 1;
    }
  });
  return gr;
}

//Start the game
function setup() {
  while (createLine < config.relief.length - calculateGrass()) {
      createRiverTraffic();
    }
    //Create Grass after River and Road for correct game mechanics
    createGrass();
  gamer = new Cat();
  fps60();
  infoText();
}

//Interaction beetwen game elements
function onHit (elem, massif) {
  massif.forEach((masElem) => {
    if (hitTestRectangle(elem, masElem)) {
      if (masElem.type == 'tree') {
        elem.x = elem.preX;
        elem.y = elem.preY;
      } else if (masElem.type == 'wood') {
        elem.x = elem.x + masElem.moveDirection*config.speedBalks*masElem.speed;
        elem.onWood = true;
      } else if (masElem.type == 'car') {
        lost(elem);
        console.log('cat lost one of his life under the wheels on the road... RIP');
      }
    }
  });
}

//When player lost level
function lost(play) {
  score += config.height - play.y;//Calculate score
  play.position.set(config.width * 0.5, config.height * 0.92);
  lifes -= 1;
  updateText();
}

//When player win level
function win(play) {
  score += config.height - play.y;//Calculate score
  play.position.set(config.width * 0.5, config.height * 0.92);
  lifes += 1;
  level += 1;
  config.speedBalks += 0.3;
  config.speedCar += 0.3;
  console.log(`speedBalks is ${config.speedBalks}, speedCar is ${config.speedCar}`);
  updateText();
}

//Animate game with 60 frames per second 
function fps60() {
  if (lifes <= 0) {//When player lost of the game
    message.text = `Level ${level} Lifes ${lifes} Score ${score}                  YOU Lost`;
    message.style = {fill: "red", fontSize: 22}
  } else {
    requestAnimationFrame(fps60);
    gamer.animate();//Move player
    if (gamer.cat.x < 0 || gamer.cat.x > config.width-gamer.cat.width) {
      lost(gamer.cat);
      console.log('oops you ride away');
    }
    if (gamer.cat.y < config.height/10-gamer.cat.height) {
      win(gamer.cat);
      console.log('Level UP!');
    }
      lines.forEach((item) => {
      onHit(gamer.cat, item.elements);
      //Player lost level when gets caught on the river
      if (hitTestRectangle(item.container, gamer.cat) && item instanceof River) {
        if (!gamer.cat.onWood) {
          lost(gamer.cat);
          console.log('cat can not swim');
        }
      }
      item.animate();//Animate cars and balks
      gamer.cat.onWood = false;//clear variable
    });
  }
}

