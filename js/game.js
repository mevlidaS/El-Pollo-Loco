let canvas; 
let world;
let keyboard = new Keyboard();


function init(){
   initLevel();
   canvas=document.getElementById('canvas');
   world = new World(canvas, keyboard);
  
   console.log('my character is', world.character);
}

function startGame(){
   init();
   document.getElementById('startScreen').classList.add('d-none');
}

function muteAudio(){
    document.getElementById('iconAudio').classList.add('d-none');
    document.getElementById('noAudio').classList.remove('d-none');
}

function playAudio(){
    document.getElementById('iconAudio').classList.remove('d-none');
    document.getElementById('noAudio').classList.add('d-none');
}

function toggleFullScreen() {
   let fullscreen = document.getElementById("fullScreen");
  
   if (!document.fullscreenElement) {
       if (fullscreen.requestFullscreen) {
           fullscreen.requestFullscreen();
       } else if (fullscreen.mozRequestFullScreen) {
           fullscreen.mozRequestFullScreen();
       } else if (fullscreen.webkitRequestFullscreen) {
           fullscreen.webkitRequestFullscreen();
       } else if (fullscreen.msRequestFullscreen) {
           fullscreen.msRequestFullscreen();
       }
          
   } else {
       if (document.exitFullscreen) {
           document.exitFullscreen();
       } else if (document.mozCancelFullScreen) {
           document.mozCancelFullScreen();
       } else if (document.webkitExitFullscreen) {
           document.webkitExitFullscreen();
       } else if (document.msExitFullscreen) {
           document.msExitFullscreen();
       }
   }
}

  

window.addEventListener("keydown", (event) => {
   if(event.keyCode == 39){
      keyboard.RIGHT = true;
   }
   if(event.keyCode == 37){
      keyboard.LEFT = true;
   }
   if(event.keyCode == 38){
      keyboard.UP = true;
   }
   if(event.keyCode == 40){
      keyboard.DOWN = true;
   }
   if(event.keyCode == 32){
      keyboard.SPACE = true;
   }
});

window.addEventListener("keyup", (event) => {
   if(event.keyCode == 39){
      keyboard.RIGHT = false;
   }
   if(event.keyCode == 37){
      keyboard.LEFT = false;
   }
   if(event.keyCode == 38){
      keyboard.UP = false; 
   }
   if(event.keyCode == 40){
      keyboard.DOWN = false;
   }
   if(event.keyCode == 32){
      keyboard.SPACE = false;
   }
});