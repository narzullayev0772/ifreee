
const sender = document.getElementById('sender');
const text = document.getElementById('input');
const listMessage = document.getElementById('msg');
const chat = document.querySelector('.container')
const navbar = document.querySelector('.navbar')

var paramsString =location.search;
var searchParams = new URLSearchParams(paramsString);
var names = searchParams.get("name")





var socket = io();
var form = document.getElementById('form');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (text.value) {
    socket.emit('chat message', {
      message:text.value,
      name:names,
      id:socket.id
    });
    text.value = '';
  }
});
socket.on('chat message',(msg)=>{
    let div = document.createElement('div')
    divWrap = document.createElement('div')
    userText= document.createElement('p')
    userName = document.createElement('p');

div.className = 'user'
userText.className = 'msg-text'
userName.className = 'msg-user'
userText.innerText =msg.message
userName.innerText =msg.name

if(msg.id == socket.id){
  divWrap.className = 'wrapRight'
  userName.style.display ="none"
}
else{
  divWrap.className = 'wrapleft'
  div.style.backgroundColor ="var(--black)"
}
div.appendChild(userName)
div.appendChild(userText)
divWrap.appendChild(div)
listMessage.appendChild(divWrap);
chat.scrollTo( 0, chat.scrollHeight);

})





let onlineUsers = document.querySelector('.onlineUsers')
socket.emit('new user',names);
socket.on('userlist',(data)=>{
    onlineUsers.innerHTML = '<p style="color:white">'+data.length+' ta a\'zo '+'</p>'
    data.forEach(user => {
        onlineUsers.innerHTML += `<div class="account"><strong class="username">${user}
        </strong><span class = 'checker'></span></div>`;
    });
})




$(function(){
$('#file').on('change',(e)=>{
    var file = e.originalEvent.target.files[0]
    var reader = new FileReader();
    reader.onload = function (evt){
        socket.emit('user image',  {
          id:socket.id,
          url:evt.target.result,
          name:names
        });
    };
    reader.readAsDataURL(file);
})
})
socket.on('imageSend',(base64image)=>{
  let divWrap = document.createElement('div')
  let divUser = document.createElement('div');
  divUser.className = "user"
  divUser.style.padding = "0"
  if(base64image.id == socket.id){
    divWrap.className = 'wrapRight'
  }
  else{
    divWrap.className = 'wrapleft'
    divUser.style.backgroundColor="var(--black)"
  }
  divUser.innerHTML=
  '<p class ="msg-user absolute">'+base64image.name+
  '<p class ="absolute size">'+Math.floor(base64image.url.length*3/4096)+'kb</p>'+
  '</p><img class ="image" src="'+base64image.url+'"/>'
  divWrap.appendChild(divUser);
  listMessage.appendChild(divWrap)
})

setInterval(() => {
  chat.scrollTo( 0, chat.scrollHeight);
}, 1);

