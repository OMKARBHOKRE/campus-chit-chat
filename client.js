
const socket =io('http://localhost:8000');

const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const naam = prompt("enter name to join ");
if(naam==''){
  alert("please enter a valid name");
}
function appendMessage(name,text,side ) {
    //   Simple solution for small apps 
    const msgHTML = `
      <div class="msg ${side}-msg">
           <div class="msg-bubble">
          <div class="msg-info">
            <div class="msg-info-name">${name}</div>
            <div class="msg-info-time">${formatDate(new Date())}</div>
          </div>  
          <div class="msg-text">${text}</div>
        </div>
      </div>
    `;  
    msgerChat.insertAdjacentHTML( 'beforeend',msgHTML);
    msgerChat.scrollTop += 500;
  }
  msgerForm.addEventListener("submit", event => {
    event.preventDefault();
  
    const msgText = msgerInput.value;
    if (!msgText) return;
  
    appendMessage('you', msgText, "right");
    socket.emit('send',msgText);
    msgerInput.value = "";
  
    
  });

socket.emit('new user joined ',naam)

socket.on('user joined',naam=>{
    appendMessage( '', naam +' joined the chat' ,'left');
})
socket.on('receive' ,data=>{
    appendMessage(`${data.name}`,`${data.message}`,'left')
})
socket.on('left' ,naam=>{
    appendMessage('', naam+ ' left the chat','left')
})

function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

