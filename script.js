const cells = document.querySelectorAll('.tic-tac span');
const player1Icon = document.querySelector('#p1');
const player2Icon = document.querySelector('#p2');
const indicator = document.querySelector('.indicator');
const counters = document.querySelectorAll('.counter');
const restart = document.querySelector('.restart-btn');
const playerName = document.querySelectorAll('.player-name > span');
const instructor = document.querySelector('.instructor');
let playing, activePlayer, row0, row1,row2,objectMap, anaList,countHover, analistMap;
       
class state{
        constructor(row0, row1, row2){
          this.anArr = [[...row0],[...row1],[...row2]];
        }
}

function init(){
    cells.forEach(cell => cell.innerHTML = '')
    counters.forEach(cell => cell.innerHTML=' ');
    playing = true;
    indicator.innerHTML = '';
    activePlayer = 1;
    player2Icon.classList.remove('ion-ios-flame');
    player1Icon.classList.remove('ion-ios-flame-outline');
    player1Icon.classList.add('ion-ios-flame');
    playerName[0].focus();
    row0 = [];
    row1 = [];
    row2 = [];
    analistMap ?   analistMap.clear() :  analistMap = new Map();
    }

function restarted(){
    instructor.style.display = 'none';
        init();
} 

function checkWinner(){
if(((row0[0] === row0[1])&&(row0[1] === row0[2]) && row0[1] !== undefined && row0[1] !== ' '  ) ||((row1[0] === row1[1])&&(row1[1] === row1[2]) && row1[1] !== undefined && row1[1] !== ' ' ) ||((row2[0] === row2[1])&&(row2[1] === row2[2]) && row2[1] !== undefined && row2[1] !== ' ' ) || ((row0[0] === row1[0])&&(row1[0] === row2[0]) && row1[0] !== undefined && row1[0] !== ' ' )|| ((row0[1] === row1[1])&&(row1[1] === row2[1]) && row1[1] !== undefined && row1[1] !== ' ' )|| ((row0[2] === row1[2])&&(row1[2] === row2[2]) && row1[2] !== undefined && row1[2] !== ' ' ) || ((row0[0] === row1[1])&&(row1[1] === row2[2]) && row1[1] !== undefined && row1[1] !== ' '  )||((row2[0] === row1[1]  )&&(row1[1] === row0[2]) && row1[1] !== undefined && row1[1] !== ' '   ))  
 {
    if(activePlayer === 1)
    {
        indicator.style.color ='#ee520a'
     }else
    {
    indicator.style.color ='#0a9aee'
    }
    indicator.textContent = `${([...playerName].find(name => name.id == activePlayer )).textContent} wins🎉🎉`;
    playing = false;
    counters.forEach(counter => counter.addEventListener('click', anaList));
    instructor.style.display = 'block';
    instructor.style.transform = 'scale(1)';
}else
 {
    activePlayer === 1 ? activePlayer = 2: activePlayer = 1;
    instructor.style.transform = 'scale(0)';
    indicator.textContent = ' ';
    instructor.style.display = 'block';
    }   
}
anaList = function(e){
    instructor.style.display = 'none';
    const statArr =  analistMap.get(parseFloat(e.target.id)).anArr;
    for(i = 0 ; i < 3 ; i++){
    cells.forEach(cell => {
    cell.textContent = statArr[cell.dataset.row][cell.dataset.column];
        });
    }
}

function handleCellClick(e){
        if(this.innerHTML === '' && playing){
     activePlayer === 1 ? this.textContent= 'X': this.textContent = 'O';
      const colNum = parseFloat(this.dataset.column);
      const rowNum = parseFloat(this.dataset.row);
      if(rowNum === 0){
          row0[colNum] = this.textContent;
          }else if( rowNum === 1){
        row1[colNum] = this.textContent;
      }else{
        row2[colNum] = this.textContent;
      }
        counters.forEach(counter =>{
        if(`p${activePlayer}` === counter.id){
            counter.innerHTML += `<div id = '${analistMap.size + 1}' >${parseFloat(rowNum) + 1} X ${parseFloat(colNum) + 1}</div>`
        }  
     });
     eval('var state'+ rowNum + colNum + " = new state(row0,row1,row2)");
      if(activePlayer === 1){
      player2Icon.classList.remove('ion-ios-flame-outline');
      player1Icon.classList.add('ion-ios-flame-outline') ;       
    }else{
        player1Icon.classList.remove('ion-ios-flame-outline') ;       
        player2Icon.classList.add('ion-ios-flame-outline') ;       
    }
      player1Icon.classList.toggle('ion-ios-flame');
      player2Icon.classList.toggle('ion-ios-flame'); 
       analistMap.set(analistMap.size + 1,eval('state'+ rowNum + colNum));
  }
  checkWinner();
 }
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restart.addEventListener('click', restarted);
   