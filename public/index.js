
const sender = document.getElementById('sender');
const text = document.getElementById('input');
const listMessage = document.getElementById('msg');
const chat = document.querySelector('.container')
const navbar = document.querySelector('.navbar')

var paramsString = location.search;
var searchParams = new URLSearchParams(paramsString);
var names = searchParams.get("name")


let inputFile = document.getElementById('files')
let p = document.createElement('p');
p.className = "user"
p.style.margin = "auto"
p.innerText = "  Hozircha hech qanday xabar yo'q... "


var socket = io();
var form = document.getElementById('form');
// message send emit

text.addEventListener('input',()=>{
  if(text.value){
    document.getElementById('fileWrap').style.display = "none"
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (text.value) {
        document.getElementById('fileWrap').style.display = "flex"
          socket.emit('chat message', {
          message:text.value,
          name:names,
          id:socket.id
        });
        text.value = '';
      }
    });
  }
})


let msgCounter = 0;
socket.on('chat message',(msg)=>{
  msgCounter++;
    let div = document.createElement('div')
    let divWrap = document.createElement('div')
    userText= document.createElement('p')
    userName = document.createElement('p');

    divWrap.id = "msg/"+msgCounter;
div.className = 'user'
userText.className = 'msg-text'
userName.className = 'msg-user'
userText.innerText =msg.message
userName.innerText =msg.name

if(msg.id == socket.id){
  divWrap.className = 'wrapRight'
  userName.style.display ="none"
  div.style.borderBottomRightRadius="0"
  divWrap.addEventListener('click',()=>{
    // divWrap.style.display ="none"
    messageOpt();
  })


}
else{
  divWrap.className = 'wrapleft'
  div.style.backgroundColor ="var(--black)"
  div.style.borderBottomLeftRadius="0"
}
div.appendChild(userName)
div.appendChild(userText)
divWrap.appendChild(div)
listMessage.appendChild(divWrap);

chat.scrollTo( 0, chat.scrollHeight);
hasMessage();
})


function hasMessage(){
  if(listMessage.childElementCount==0){
    listMessage.appendChild(p)
  }
  else{
    p.style.display = "none"
  }
}
hasMessage();

let onlineUsers = document.querySelector('.onlineUsers')
socket.emit('new user',names);
socket.on('userlist',(data)=>{
    onlineUsers.innerHTML = '<p style="color:white">'+data.length+' ta a\'zo '+'</p>'
    data.forEach(user => {
        onlineUsers.innerHTML += `<div class="account"><strong class="username">${user}
        </strong><span class = 'checker'></span></div>`;
    });
})



// media send
inputFile.addEventListener('change', (input)=> {
  let file = input.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function() {
      let typeMedia = reader.result.split(';')[0].split(':')[1].split('/')[0];
      socket.emit('media',{
        id:socket.id,
        name:names,
        url:reader.result
      });
  };
  reader.onerror = function() {
  console.log(reader.error);
  };
  });



socket.on('media',(media)=>{
  let divWrap = document.createElement('div')
  let divUser = document.createElement('div');
  divUser.className = "user"
  divUser.style.padding = "0"
  if(media.id == socket.id){
    divWrap.className = 'wrapRight'
    divWrap.addEventListener('click',()=>{
      messageOpt();
    })

    divUser.style.borderBottomRightRadius="0"
  }
  else{
    divWrap.className = 'wrapleft'
    divUser.style.backgroundColor="var(--black)"
    divUser.style.borderBottomLeftRadius="0"
  }
 let typeMedia = media.url.split(';')[0].split(':')[1].split('/')[0];
  if(typeMedia == 'image' ){
    divUser.innerHTML =
  '<p class ="msg-user absolute">'+media.name+
  '<p class="absolute size">'+Math.floor(media.url.length*3/4096)+' kb</p>'+
  '</p><img class ="image" src="'+media.url+'"/>'
  }
 
//   base64image.forEach(image => {
//     divUser.innerHTML +=
//   '<p class ="msg-user absolute">'+image+
//   '<p class="absolute size">'+Math.floor(image.url.length*3/4096)+' kb</p>'+
//   '</p><img class ="image" src="'+image.url+'"/>'
// });

  p.style.display ="none"
  divWrap.appendChild(divUser);
  listMessage.appendChild(divWrap);
  chat.scrollTo(0,listMessage.scrollHeight)
})






// Message options window
let msgWindow = document.createElement('div');
let msgDelete= document.createElement('div');
function messageOpt(id){
  msgWindow.className  = "msgWindow"
  msgDelete.innerHTML = 'Delete'
  msgWindow.appendChild(msgDelete);
  document.body.appendChild(msgWindow)
}



