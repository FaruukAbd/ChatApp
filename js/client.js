const socket = io('http://localhost:8000');


const form=document.getElementById('msg-send');
const messageInput=document.getElementById('msgInp');
const messageContainer=document.querySelector(".container");
var audio=new Audio('ting.mp3');
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position =='left'){
        audio.play();
    }

};
const aaappend=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    // messageElement.classList.add(position);
    messageElement.classList.add('pst');
    messageContainer.append(messageElement);
    if(position =='left'){
        audio.play();
    }

};

const name= prompt("Enter your name to join the chat");
const naam=document.getElementById('item2');
naam.innerText=name;
socket.emit('new-user-joined', name);


socket.on('user-joined',name=>{
    aaappend(`${name} joined the chat`,'right');
    
})
socket.on('recieve',data=>{
    append(`${data.name}:${data.message}`,'left');
    messageContainer.scrollTo(0,90000);

})
socket.on('left',name=>{
    aaappend(`${name} left the chat`,'left');
    messageContainer.scrollTo(0,90000);
})

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    append(`${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';
    // messageContainer.scrollTo(0,document.body.scrollHeight);
    messageContainer.scrollTo(0,90000);

})