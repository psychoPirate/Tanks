var width = 416, height = 416, gLoop;
var ALT = 18, LEFT = 37, RIGHT = 39, UP = 38, DOWN = 40, SPEED = 75, CTRL = 17, keysDown = {};
var debug = 1;

addEventListener("keydown", function (e) { keysDown[e.keyCode] = true; }, false);
addEventListener("keyup", function (e) { delete keysDown[e.keyCode]; }, false);

var gameboard = document.getElementById("gameboard");
ctx = gameboard.getContext('2d');
gameboard.width = width;
gameboard.height = height;

function checkCollission(x1, y1, w1, h1, x2, y2, w2, h2) {
	var left1 = x1, right1=x1+w1, up1= y1, down1=y1+h1;
	var left2 = x2, right2=x2+w2, up2= y2, down2=y2+h2;
	
	
        if (debug){
        	ctx.fillStyle = "blue";
            ctx.fillRect(x2,y2,w2,h2);
            ctx.fillStyle = "red";
            ctx.fillRect(x1,y1,w1,h1);
        }
        
        if(left1 > right2) return 0;
        if(right1 < left2) return 0;
        if(up1 > down2) return 0;
        if(down1 <  up2) return 0;
        
        return 1; //x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > h2;
    }


function handleCollissions() {
	dCollision = "none";
		for (var a = 0; a < i.board.length; a++)
             for (var j = 0; j < i.board.length; j++){
                switch(i.board[a][j]){
                    case 3:
                    		if(checkCollission(p.x+4, p.y+4, 26,26, 32*j, 32*a, 32, 32))
                    		switch (p.direction){
                    		                				                    	            
                    				 
                    		case "DOWN": dCollision = "DOWN"; break;
                    		case "UP": dCollision = "UP"; break;
                    		case "LEFT": dCollision = "LEFT"; break;
                    		case "RIGHT": dCollision = "RIGHT"; break;
                    	      				
                    			                   				
                    			
                    		 
                    		                        		
                    		}break;
                    	
                    	
                    
                     
                    case 2:  break;
                    case 1:  break;
                    case 15:  break;
                 }
                
             } 
			
		console.log(dCollision);		
		return dCollision; 
	}


function inputHandle() {
    
    this.setActive = function (a) {
        this.active = a;
    };
    this.moviment = function () {
        
            if (UP in keysDown && !(LEFT in keysDown) && !(RIGHT in keysDown) && handleCollissions()!="UP") {p.move(0, -1); p.direction = 'UP'; }
            if (DOWN in keysDown && !(LEFT in keysDown) && !(RIGHT in keysDown) && handleCollissions()!="DOWN") { p.move(0, 1); p.direction = 'DOWN'; }
            if (LEFT in keysDown && handleCollissions()!="LEFT") { p.move(-1, 0); p.direction = 'LEFT'; }
            if (RIGHT in keysDown && handleCollissions()!="RIGHT") { p.move(1, 0); p.direction = 'RIGHT'; }
                	
        
    };
 } 



function map(){
    this.width = 13;
    this.height = 13;
    this.image = new Image();
    this.image.src = "images/tiles.png";

    this.bgImage = new Image();
    this.bgImage.src = "images/background.png";
 
    this.board = [  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
                    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
                    [3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3],
                    [3, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 3],
                    [3, 1, 3, 1, 3, 2, 3, 1, 3, 1, 3, 1, 3],
                    [3, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 3],
                    [3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3],
                    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
                    [3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3],
                    [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
                    [3, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 3],
                    [3, 1, 1, 1, 1, 2, 15, 2, 1, 1, 1, 1, 3],
                    [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
                    ];
            

    this.getTile = function (tile) {
        if (tile != 0)
            ctx2.drawImage(this.image, tile*32, 0, 32, 32,  32,  32, 32, 32);
    };

    this.draw = function () {
        //Desenhar background
        
        ctx.drawImage(this.bgImage, 0, 0);
               
        for (var i = 0; i < this.height; i++)
             for (var j = 0; j < this.width; j++){
                //ctx.strokeRect(j*32,i*32,32,32);
                switch(this.board[i][j]){
                    case 3: ctx.drawImage(this.image, 64, 0, 32, 32, j * 32, i * 32, 32, 32); break;
                    case 2: ctx.drawImage(this.image, 32, 0, 32, 32, j * 32, i * 32, 32, 32); break;
                    case 1: ctx.drawImage(this.image, 0, 0, 32, 32, j * 32, i * 32, 32, 32); break;
                    case 15: ctx.drawImage(this.image, 14*32, 0, 32, 32, j * 32, i * 32, 32, 32); break;
                 }
             } 
                    
        };

}


function player(){
	this.blocked = 0;
    this.image = new Image();
    this.image.src = "images/tiles.png";
    this.height = 32;
    this.width = 32;
    this.x = 96;
    this.y = 350;
    this.speed = 0.8;
    this.direction = 'UP';

    this.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };
    this.move = function (x, y) {
        this.x += this.speed * x;
        this.y += this.speed * y;
    };
    this.draw = function () {
        switch (this.direction) {
            case 'UP': ctx.drawImage(this.image, this.width*0, this.height*6, this.width, this.height, this.x, this.y, 32, 32); break;
            case 'DOWN': ctx.drawImage(this.image, this.width * 0, this.height * 7, this.width, this.height, this.x, this.y, 32, 32); break;
            case 'LEFT': ctx.drawImage(this.image, this.width * 0, this.height * 8, this.width, this.height, this.x, this.y, 32, 32); break;
            case 'RIGHT': ctx.drawImage(this.image, this.width * 0, this.height * 9, this.width, this.height, this.x, this.y, 32, 32); break;
        }
    };
    
}

var i = new map();
var p = new player();
var input = new inputHandle();

function render() {
	ctx.clearRect(0, 0, width, height);
	i.draw();
	
	p.draw();
	
	
}

function gameLoop() {
			
    render();
    input.moviment();
    gLoop = setTimeout(gameLoop, 1000 / 50);
      
}
gameLoop();
