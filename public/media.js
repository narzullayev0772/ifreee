let icon  = document.getElementById('play')
let down = document.getElementById('down')
let artist = document.getElementById('artist')
let music = document.createElement('audio');
let range = document.getElementById('range');
let duration = document.getElementById('time');

let inputFile = document.getElementById('file');


var socket = io()

music.setAttribute('id','player');
music.setAttribute('controls','');
music.setAttribute('preload','metadata');

inputFile.addEventListener('change', (input)=> {
let file = input.target.files[0];
let reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = function() {
    // socket.emit('audio',{url:reader.result})
    // socket.on('media',media=>{
    //     music.src = media.url
    // })
    let typeMedia = reader.result.split(';')[0].split(':')[1].split('/')[0];
    console.log(typeMedia);
    music.src = reader.result
};
reader.onerror = function() {
console.log(reader.error);
};
})
// setInterval(() => {
//     duration.innerHTML = music.duration;
// }, 1);




duration.innerHTML = music.duration;

icon.addEventListener('click',()=>{
    if(icon.className=="fas fa-play"){
        icon.className = "fas fa-pause"
        down.className = "fas fa-times"
        range.className =""
        artist.innerHTML =""
        music.play()
    }
    else{
        icon.className = "fas fa-play"
        range.className ="none"
        artist.innerHTML ="Artist Name"
        music.pause();
    }
})
down.addEventListener('click',()=>{
    if(down.className=="fas fa-arrow-down absolute"){
        down.className = "	fas fa-times"
    }
    else{
        icon.className = "fas fa-play"
        down.className = "fas fa-arrow-down absolute"
        range.className ="none"
        artist.innerHTML ="Artist Name"
        music.pause();
    }
})


range.addEventListener('input',()=>{
    
    music.currentTime = range.value*music.duration/100;
})
