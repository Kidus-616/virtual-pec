var database;
var dogImage;
var dogSprite;
var foodCount;

function setup() {
  createCanvas(600, 600);
  database = firebase.database();
  dogSprite = createSprite(200, 200, 50, 50);
  dogSprite.addImage(dogImage);
  dogSprite.scale = 0.5;

  var ref = database.ref("food");
  ref.on("value", function (data) {
    foodCount = data.val();
  });
}

function preload() {
  dogImage = loadImage("dog.png");
}

function draw() {
  background("white");
  textSize(30);
  text("FOOD REMAINING: " + foodCount, 200, 50);
  if (keyDown(DOWN_ARROW)) {
    foodDec();
  }
  drawSprites();
}
function foodDec() {
  if (foodCount < 1) {
    foodCount = 0;
  }
  database.ref("/").update({
    food: foodCount - 1,
  });
}
