//divs for colors in game. order red, green, yellow, blue
const gamebtn = document.querySelectorAll(".gamebtn");
const startbtn = document.querySelector(".startbtn");
const score = document.querySelector(".score");
const gamestatus=document.querySelector(".gamestatus");

const colors = ['red', 'green', 'yellow', 'blue'];

let gamecolors = [];
let playercolors = [];
let playerScore = 0;
let gameover = true;

//cycles through the game's colors
function cycleColors(){
    for(var i = 0; i < gamecolors.length; i++){
      animate(i);
    }
}

//animates the game's colors
function animate(i){
  setTimeout(function(){
    flashButton(gamecolors[i]);
    offButton(gamecolors[i]);
  }, 500 * i);
}

//pushes a new color into gamecolors array
function addColor(){
  var newcolor = pickRandColor();
  gamecolors.push(newcolor);
}


//Initiates start button -- resets game
startbtn.addEventListener('click', function(){
  playerScore = 0;
  score.textContent = playerScore;
  gamestatus.textContent = "Follow along!";
  gameover = false;
  gamecolors = [];
  addColor();
  cycleColors();
});

//When player picks a color, adds it to player colors

//when a player hovers over a button, it grows in size
for(var i = 0; i < gamebtn.length; i++){
  gamebtn[i].addEventListener('mouseenter', function(){
    this.classList.remove('regsize');
    this.classList.add('hoversize');
  });
  gamebtn[i].addEventListener('mouseleave', function(){
    this.classList.remove('hoversize');
    this.classList.add('regsize');
  });

//clicking on colored button
  gamebtn[i].addEventListener('click', function(){
    if(gameover != true){
      //creates array of player moves
      var color = this.id;
      flashButton(color);
      offButton(color);
      playercolors.push(color);
      console.log(gamecolors);
      console.log(playercolors);

      //compares to game colors. adds to score and array if correct, otherwise, tries again
      if(playercolors.length === gamecolors.length){
        if(checkcolors()){
          playerScore++;
          score.textContent = playerScore;
          addColor();
        }
        setTimeout(function(){
          cycleColors();
        }, 1000);
        playercolors = [];
      }
    }
  });
}

//checks if the player's colors and the game's colors match
function checkcolors(){
  for(var i = 0; i < gamecolors.length; i++){
    if(playercolors[i] != gamecolors[i]){
      return false;
    }
  }
  return true;
}


//picks a random color
function pickRandColor(){
  let num = Math.floor(Math.random() * 4);
  return colors[num];
}

//changes display of button to lit mode
function flashButton(color){
  switch (color){
    case 'red':
      gamebtn[0].id = 'litred';
      break;
    case 'green':
      gamebtn[1].id= 'litgreen';
      break;
      case 'yellow':
        gamebtn[2].id = 'lityellow';
        break;
    case 'blue':
      gamebtn[3].id = 'litblue';
      break;
    }
}

//changes display of button back to unlit mode
function offButton(color){
    setTimeout(function(){
      switch (color){
        case 'red':
          gamebtn[0].id = 'red';
          break;
        case 'green':
          gamebtn[1].id = 'green';
          break;
          case 'yellow':
            gamebtn[2].id = 'yellow';
            break;
        case 'blue':
          gamebtn[3].id = 'blue';
          break;
        }
    }, 300);

}
