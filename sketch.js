var myData;
var img;
var flag;
var name;
var earth;

function preload() {
    myData = loadJSON('assets/peopleinspace.json');
    earth = loadImage('assets/earth.png');
  }

var balls = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
  background(0, 46, 84);
}

function launch(){
  var number = round(random(0, 6));
  var astro = myData.people[number];
  img = loadImage(astro.biophoto);
  name = astro.name;
  flag = loadImage(astro.countryflag);

  var x = mouseX;
  var y = mouseY;
  var d = dist(x, y, windowWidth/6, windowHeight/2);
  var l = img;
  var f = flag;

  var newBall = new Ball(x, y, d, l, f, name);
  balls.push(newBall);

}


function draw() {

	background(0, 46, 84);

  imageMode(CENTER);
  image(earth, windowWidth/6, windowHeight/2, 400, 400);
  textAlign(CENTER);
  textFont('Montserrat');
  textStyle(BOLD);
  fill(255);
  text("Click everywhere to send some astronaut into space",  windowWidth/2, windowHeight/2);

	for(var j = 0; j < balls.length; j++) {
		balls[j].move();
		balls[j].display();
	}
}

function Ball(_x, _y, _diameter, _label, _flag, _name) {
	// Properties defined by constructor
	this.size = _diameter;
	this.x = _x;
	this.y = _y;
  this.label = _label;
  this.flag = _flag;
  this.name = _name;

	// Hardcoded properties
	this.color = 'red';
	this.speed = this.size/100 + 3;

	this.yDir = random(-1, 1);
	this.xDir = random(-1, 1);
	// Methods
	this.move = function() {

		this.x += this.speed * this.xDir;
		this.y += this.speed * this.yDir;


    if (this.y + 60 >= height|| this.y - 80 <= 0) {
			// if 1, set to -1, if -1, set to 1
			this.yDir *= -1;
		}

		if (this.x + 100 >= width || this.x - 90 <= 0) {
			this.xDir *= -1;
		}



	}

	this.display = function() {
    imageMode(CENTER);
    image(this.label, this.x, this.y, 300, 300);
    image(this.flag, this.x, this.y - 2.5, 20, 10);
    textAlign(CENTER);
    textFont('Montserrat');
    textStyle(BOLD);
    fill(255);
    text(this.name, this.x, this.y + 25);

	}
}

function mouseClicked() {
	launch();
}
