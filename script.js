let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector(".reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let count=0;
let scoreX=0;
let scoreO=0;

let scoreXdisplay=document.querySelector("#score-x");
let scoreOdisplay=document.querySelector("#score-o");
let turnO = true;//playerOdd

const winPattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame=()=>{
    turnO=true;
    count=0;
    enableBoxes();
    for(let box of boxes){//use for after reset the game bgcolor changed
    box.style.backgroundColor="#1e293b";}
    msgContainer.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click",() =>{
        // console.log("box was click");
        if(turnO){
            box.innerText="O";
            box.style.color="red";
            box.style.backgroundColor="#e6fe6f";
            turnO =false;
        }
        else{
            box.innerText="X";
            box.style.color="green";
            box.style.backgroundColor="#8fc691"
            turnO=true;
        }
        box.disabled=true;
        count++;
        checkWinner();
    });
});
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};
const celebration=()=>{
    confetti({
        particleCount:150,
        spread:120,
        origin:{y:0.6}
    });
};
const showWinner=(winner)=>{
    if(winner==="O"){
        scoreO++;
        scoreOdisplay.innerText=scoreO;
    }
    else if(winner==="X"){
        scoreX++;
        scoreXdisplay.innerText=scoreX;
    }
    msg.innerText=`🎉Congratulations ,Winner is ${winner}🎉`;
    msgContainer.classList.remove("hide");    
    disableBoxes();
    celebration();
}
const showDraw=()=>{
    msg.innerText="Game Draw 🤝";
    msgContainer.classList.remove("hide");
    for(let box of boxes){
    box.style.backgroundColor="#1e293b";}
}
const checkWinner= () =>{
    for(let pattern of winPattern){

        let pos1v=boxes[pattern[0]].innerText;
        let pos2v=boxes[pattern[1]].innerText;
        let pos3v=boxes[pattern[2]].innerText;
         
        if(pos1v!= "" && pos2v!="" && pos3v!=""){
            if(pos1v=== pos2v && pos2v===pos3v){
                // console.log("Winner",pos1v);
                showWinner(pos1v);
                return;
            }
        }
     }
     if(count===9){
        showDraw();
     }
};
newGameBtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame);