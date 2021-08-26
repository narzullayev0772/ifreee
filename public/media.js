
function audioMessageCreate(){
    let audiowrap  = document.createElement('div')
    audiowrap.className ="audio"
    let load  = document.createElement('div')
    load.className = "load"
    let controller  = document.createElement('div')
    controller.className ="controller";
    controller.id = "controller";
    let play = document.createElement('i');
    play.className =  "fas fa-play";
    play.id = "play"
    let down = document.createElement('i');
    down.className = "fas fa-arrow-down absolute"
    down.id= "down"
    controller.append(play,down)
    load.append(controller);
    let info  = document.createElement('div')
    info.className = "info"
    let audioName = document.createElement('p')
    audioName.className = "audioName"
    let artistName = document.createElement('p')
    artistName.className = "artist size"
    artistName.id = 'artist'
    let range = document.createElement('input');
    range.type ="range"
    range.className = "none";
    range.id = 'range',
    range.value = "0"
    let time  = document.createElement('div');
    time.className = "time"
    let currentTime = document.createElement('p');
    currentTime.className = 'size';
    let duration = document.createElement('p');
    duration.className = "size";
    duration.id = "time"
    let size = document.createElement('p');
    size.className = "size";
    size.id = 'size'
    time.append(currentTime,duration,size)
    info.append(audioName,artistName,range,time)
    audiowrap.append(load,info)
    
}










let inputFile = document.getElementById('file');


var socket = io()

let music = document.createElement('audio');
music.setAttribute('id','player');
music.setAttribute('controls','');
music.setAttribute('preload','metadata');

inputFile.addEventListener('change', (input)=> {
let file = input.target.files[0];
let blob = new Blob([file],{type:'audio/*'});
let src = URL.createObjectURL(blob)
socket.emit('media',{source:src})
})




socket.on('media',media=>{
    music.src = media.source
    console.log(media.source);
    let audio =  document.createElement('audio');
    audio.src = media.source;
    audio.setAttribute('controls',"")
    let el = document.querySelector('.body')
    el.appendChild(audio)
})

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
