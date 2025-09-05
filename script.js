let Gameseq=[];
let Userseq=[];
let btns=["yellow","green","red","purple"];
let started=false;
let level=0;
let h2=document.querySelector("h2");
let highScore = localStorage.getItem("highScore") || 0;

 
document.addEventListener("keypress" , function( ){
    if(started === false){
        console.log("Game Started");
        started=true;

        levelup();
    }
});

function gameflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
   
}
function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },250);
   
}
function levelup(){
    Userseq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let randomidx=Math.floor(Math.random() * 3);
    let randcolor=btns[randomidx];
    let randbtn=document.querySelector(`.${randcolor}`);
    
    Gameseq.push(randcolor);
    console.log(Gameseq);
    gameflash(randbtn);
  

    // console.log(randomidx);
    // console.log(randcolor);
    // console.log(randbtn);
    // Gameseq.push(randcolor);
    // console.log(Gameseq);
    // gameflash(randbtn);
}
function checkAns(idx){

    if(Userseq[idx] === Gameseq[idx]){
        if(Userseq.length === Gameseq.length){
       
           setTimeout(levelup,1000);
        }
    }else{
       h2.innerHTML=`Game Over,Your score is <b>${level}</b>. <br> press any key to restart Game.`;
    //    let highestscore=0;
       if(level > highScore){
        highscore=level;
        localStorage.setItem("highScore",highScore);
        document.getElementById("high-score").innerText=highScore;
        alert(`New High Score: ${highScore}`);

       }
      
       
       document.querySelector("body").style.backgroundColor="red";
       setTimeout(function(){
        document.querySelector("body").style.backgroundColor="white";
       },250);
      reset();
    }
}


function btnPress(){
//  console.log(this);
 let btn=this;
 userflash(btn);
 usercolor=btn.getAttribute("id");
 Userseq.push(usercolor);

 checkAns(Userseq.length-1);
}

let allbtns=document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    Gameseq=[];
    Userseq=[];
    level=0;
    
}
