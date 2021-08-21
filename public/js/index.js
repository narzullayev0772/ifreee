
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
}
else{
  divWrap.className = 'wrapleft'
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
        onlineUsers.innerHTML += `<div class="account"><strong>${user}
        </strong><span class = 'checker'></span></div>`;
    });
})





