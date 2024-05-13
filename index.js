
// Constants and Variable
let snakeVelocity = {x: 0, y: 0};
let board = document.getElementById('board');
const buttonControl = document.querySelectorAll(".controls i");
const foodSound = new Audio('snake-hissing-6092.mp3');
const gameOverSound = new Audio('mixkit-cinematic-impact-waves-781.wav');
const gameOverSound2 = new Audio('AGFAT7X-8-bit-game-lose.mp3');
const moveSound = new Audio('Snake Game - Theme Song.mp3');
const currScore = document.getElementById("score");
const foodItemsArray = ["🐁","🍇","🍉","🍈","🍓","🍍","🍌","🥝","🍏","🍎","🍔","🍅","🥚",];
let randomFoodIndex = Math.floor(Math.random()*foodItemsArray.length);;
const diffLevel = document.getElementById("set-difficulty");
const hiiScoreDisplay = document.getElementById("highest-score");
let hiiScoreVal = 0;
let score=0
let speed = 13;
let lastPaintTime = 0;
let snakeArr = [{x: 10, y: 12}];
let food = {x: 13, y:4};
speed = speed * (JSON.parse(diffLevel.value));

// functions are here 
function main(currentTime){
    window.requestAnimationFrame(main);
    if((currentTime-lastPaintTime)/1000 < 1/speed){
        return ;
    }
    lastPaintTime=currentTime;
    speed = (JSON.parse(diffLevel.value));
    gameEngine();
}

function isCollide(saanp){
    if(snakeArr[0].x>=31 || snakeArr[0].x<0 || snakeArr[0].y>=31 || snakeArr[0].y<0){
        gameOverSound.play();
        return true;
    }
    for(let i=1;i<snakeArr.length;++i){
        if(snakeArr[0].x===snakeArr[i].x && snakeArr[0].y===snakeArr[i].y){
            gameOverSound2.play();
                return true;
        }
    }
    return false;
}

function gameEngine (){
  
    if(isCollide(snakeArr)){
        moveSound.pause();
        snakeVelocity={x:0, y:0};
        // window.location=window.location;
        alert("GAME OVER");
        // moveSound.play();
        snakeArr = [{x: 10, y: 12}];
        food = {x: 13, y:4};
        score = 0;
    }

   
    if(snakeArr[0].x === food.x && snakeArr[0].y===food.y){
        ++score;
        if(score>hiiScoreVal){
            hiiScoreVal=score;
            localStorage.setItem("hiScore",JSON.stringify(hiiScoreVal));
            hiiScoreDisplay.innerHTML = "Hi-Score: " + localStorage.getItem("hiScore");
        }
        currScore.innerHTML = 'Score: '+score;
        foodSound.play();
        snakeArr.unshift({x: snakeArr[0].x + snakeVelocity.x, y:snakeArr[0].y + snakeVelocity.y})
        let a=1,b=30;
        randomFoodIndex = Math.floor(Math.random()*foodItemsArray.length);
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }
    //*****************IMPORTANT SECTION****************
    for(let i=snakeArr.length-2; i>=0; --i){
        snakeArr[i+1]={...snakeArr[i]};
    }
        snakeArr[0].x += snakeVelocity.x;
        snakeArr[0].y += snakeVelocity.y;


    board.innerHTML = "";
  
    snakeArr.forEach((e,index)=>{
        var snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    
    var foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
    // selecting food from food array
    foodElement.innerHTML = foodItemsArray[randomFoodIndex];
}

// Main logic || how the snake is moving main 
hiiScoreVal = localStorage.getItem("hiScore");
if(hiiScoreVal===null){
    hiiScoreVal=0;
    localStorage.setItem("hiScore",JSON.stringify(hiiScoreVal));
}else{
    hiiScoreVal = JSON.parse(hiiScoreVal);
    hiiScoreDisplay.innerHTML = "Hii-Score: " + hiiScoreVal;
}

// changing direction ************************

const changeDirection=(e)=>{
    switch (e.key) {
        case "ArrowUp":
            if(snakeVelocity.x!=1 && snakeVelocity.y!=0 && snakeArr.length!=1)break;
            snakeVelocity.x = 0;
            snakeVelocity.y = -1;
            break;
        case "ArrowDown":
            if(snakeVelocity.x!=-1 && snakeVelocity.y!=0 && snakeArr.length!=1)break;
            snakeVelocity.x = 0;
            snakeVelocity.y = 1;
            break;
        case "ArrowLeft":
            if(snakeVelocity.x!=0 && snakeVelocity.y!=1 && snakeArr.length!=1)break;
            snakeVelocity.x = -1;
            snakeVelocity.y = 0;
            break;
        case "ArrowRight":
            if(snakeVelocity.x!=0 && snakeVelocity.y!=-1 && snakeArr.length!=1)break;
            snakeVelocity.x = 1;
            snakeVelocity.y = 0;
            break;
        default:
            break;
    }
}
//fOR mobile users

buttonControl.forEach(key =>{
    key.addEventListener("click",()=>changeDirection({key: key.dataset.key}));
})

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
  
    if(e.key === "ArrowUp" || e.key==="ArrowDown" || e.key==="ArrowLeft" || e.key==="ArrowRight"){
        setInterval(() => {
            moveSound.play();
        }, 10);
    }
    changeDirection(e);
})
