var ball = document.getElementById("ball");
var rod1 = document.getElementById("rod1");
var rod2 = document.getElementById("rod2");

const storeName = "PPName";
const storeScore = "PPMaxScore";
const rod1Name = "Rod 1";
const rod2Name = "Rod 2";

let score, maxScore, movement, rod, ballSpeedX=2, ballSpeedY=2;

let gameOn = false;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;


(function(){
    rod = localStorage.getItem(storeName);
    maxScore = localStorage.getItem(storeScore);

    alert(rod+" has max score of "+maxScore);
    resetBoard(rod);
})();

function resetBoard(){
    rod1.style.left = (window.innerWidth - rod1.offsetWidth)/2 + "px";
    rod2.style.left = (window.innerWidth - rod2.offsetWidth)/2 + "px";

    ball.style.left = (windowWidth - ball.offsetWidth)/2 + "px";

    score = 0;
    gameOn = false;
}

function storeWin(rod, score){
    if(score>maxScore){
        maxScore = score;
        localStorage.setItem(storeName,rod);
        localStorage.setItem(storeScore,maxScore);
    }

    clearInterval(movement);
    resetBoard(rod);
    alert(rod+" wins with the score : "+(score*100)+". Max score is : "+maxScore);
}

window.addEventListener("keypress",function(){
    let rodSpeed = 20;
    let rodRect = rod1.getBoundingClientRect();
    if(event.code==="KeyD" && ((rodRect.x+rodRect.width)<this.window.innerWidth)){
        // move to right side
        rod1.style.left = rodRect.x+rodSpeed+"px";
        rod2.style.left = rod1.style.left;
    }
    else if(event.code==="KeyA" && (rodRect.x)>0){
        // move to left side
        rod1.style.left = rodRect.x - rodSpeed + "px";
        rod2.style.left = rod1.style.left;
    }

    if(event.code=="Enter"){
        if(!gameOn){
            // if game is not on
            // get game on
            gameOn = true;
            let ballRect = ball.getBoundingClientRect();
            let ballX = ballRect.x;
            let ballY = ballRect.y;
            let ballDia = ballRect.width;
            let rod1Height = rod1.offsetHeight;
            let rod2Height = rod2.offsetHeight;
            let rod1Width = rod1.offsetWidth;
            let rod2Width = rod2.offsetWidth;

            // every 10 milisec following function will be called
            movement = this.setInterval(function(){

                //move ball
                ballX += ballSpeedX;
                ballY += ballSpeedY;

                rod1X = rod1.getBoundingClientRect().x;
                rod1Y = rod1.getBoundingClientRect().y;

                ball.style.left = ballX+"px";
                ball.style.top = ballY+"px";

                //reverse the ball direction
                if((ballX+ballDia)>windowWidth||(ballX<0)){
                    ballSpeedX = -1*ballSpeedX
                }

                let ballPos = ballX + ballDia/2;

                //collision for rod1
                if(ballY <= rod1Height){
                    ballSpeedY = -1*ballSpeedY;
                    score++;

                    //check if games ends
                    if(ballPos < rod1X || (ballPos > (rod1X+rod1Width))){
                        storeWin(rod2Name,score);
                    }
                    
                }
                else if((ballY + ballDia) >= (windowHeight-rod2Height)){
                    ballSpeedY = -1*ballSpeedY;
                    score++;

                    if((ballPos < rod2X) || (ballPos > (rod2X+rod2Width))){
                        storeWin(rod1Name,score);
                    }
                }

            },10);    // 10 milisec passed as args
        }
    }

});

