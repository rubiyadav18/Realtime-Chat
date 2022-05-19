const socket = io();
let name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");

do {
  name = prompt("Please  enter your name:");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };
  //Append
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollTopBottom();

  //send to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDev = document.createElement("div");
  let className = type;
  mainDev.classList.add(className, "message");

  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>`;

  mainDev.innerHTML = markup;
  messageArea.appendChild(mainDev);
}

//Recieve the message-
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollTopBottom();
});
function scrollTopBottom() {
  messageArea.scrollTo = messageArea.scrollHeight;
}


