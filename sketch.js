
let x, y;
let ast = [];
let timer = 0;
let lose = false;
let ra = 5,rm = 20;
let freq = 8;
let rate = 0.02;
let state = false;
let len = 1440,wid = 600; 
let hp = 100, maxhp = 100;
let deathmatch = false;
let mana = 100, maxmana = 100;
let recharge = 0;
let stat;
let score = 0;
class asteroid {
  constructor(x,y,vx,vy){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }
}
function setup(){
  createCanvas(len,wid);
}
function draw(){
  background(0);
  frameRate(120);
	rect(20,20,maxhp,20);
	rect(20,40,maxmana,20);
	fill('rgb(0,255,0)');
	rect(20,20,hp,20);
	fill(0, 0, 220);
	rect(20,40,mana,20);
	fill(255);
	text((deathmatch ? "single life" : "normal mode"), 20, 10);
	text("score :" + score, 20, 70);
	if(lose){
		text("Press Space to restart", len/2 - 100, wid/2);
		text("Press m for single life mode", len/2 - 100, wid/2 + 50);
		text("Hold the mouse for time dilation", len/2 - 100, wid/2 + 100);
	}
  if(!lose){
		if(mouseIsPressed && mana > 0 && !recharge) mana --;
		if(mana == 0)recharge = 1;
		if(recharge == 1)mana += 0.5;
		if(mana >= maxmana) recharge = 0;
		stat = (mouseIsPressed ? 1 : 0) * (1 - recharge);
    timer ++; score ++;
    if((timer >= freq * (stat ? 0.7 : 1))){
      createAst();
      timer = 0;
    }
    fill(255, 204, 0);
    circle(mouseX,mouseY,rm);
    fill(255);
    for(let i = 0 ; i < ast.length ; i ++){
      let dis = (mouseX - ast[i].x)*(mouseX - ast[i].x) + (mouseY - ast[i].y)*(mouseY - ast[i].y);
      if(dis < ra*ra + rm*rm){
				hp -= 5;
				if(hp <= 0){
					hp = 0;
					lose = true;
				}
      }
      circle(ast[i].x, ast[i].y, ra);
    
      ast[i].x += (stat ? 0.5 : 1)*rate*ast[i].vx;
      ast[i].y += (stat ? 0.5 : 1)*rate*ast[i].vy; 
    }
    ast = ast.filter(aster => (aster.x > 0 && aster.x < len && aster.y > 0 && aster.y < wid));
  }
}
function keyPressed(){
  if(keyCode == 32 && lose){
    lose = false;
    ast = [];
		hp = (deathmatch ? 1 : maxhp);
		mana = maxmana;
		score = 0;
  }
	if(keyCode == 77){
		if(lose) deathmatch = (deathmatch ? false : true);
	}
}
function createAst(){
  let ax,ay;
  let p = floor(random(4));
  if(p == 1){
    ax = 1;
    ay = floor(random(wid - 1));
  }
  else if(p == 2){
    ay = wid - 1;
    ax = floor(random(len - 1));
  }
  else if(p == 3){
    ax = len - 1;
    ay = floor(random(wid - 1));
  }
  else {
    ay = 1;
    ax = floor(random(len - 1));
  }
  
  ast.push(new asteroid(ax,ay,(mouseX - ax),(mouseY - ay)));
}
