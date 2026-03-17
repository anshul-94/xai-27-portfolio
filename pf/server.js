import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

// SETUP

const app = express();

app.use(cors());
app.use(express.json());

// GEMINI API

const ai = new GoogleGenAI({

apiKey: "AIzaSyBwY1N51_lVBcLhGGA0WGBWsbMbzVEW8Hc"   // ← paste your Gemini API key here

});

// FRONTEND (PRO UI)

app.get("/", (req, res) => {

res.send(`

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Anshul AI Assistant</title>

<style>
:root{

--bg-main:linear-gradient(135deg,#0f0c29,#1a1a2e,#16213e);

--bg-sidebar:#0f0c29;

--bg-chat:rgba(255,255,255,0.05);

--bg-input:rgba(255,255,255,0.07);

--border:rgba(255,255,255,0.08);

--accent:#00f5a0;

--accent-gradient:linear-gradient(45deg,#00f5a0,#00d9f5);

--text:#ffffff;

--text-light:#9ca3af;

--radius:10px;

}


/* GLOBAL */

body{

margin:0;

height:100vh;

background:var(--bg-main);

font-family:system-ui,-apple-system,Segoe UI;

color:var(--text);

overflow:hidden;

}


.app{

display:flex;

height:100vh;

width:100%;

}


/* SIDEBAR */

.sidebar{

width:260px;

min-width:220px;

background:var(--bg-sidebar);

border-right:1px solid var(--border);

display:flex;

flex-direction:column;

padding:15px;

transition:0.3s;

}


.logo{

font-size:20px;

font-weight:700;

margin-bottom:20px;

background:var(--accent-gradient);

-webkit-background-clip:text;

-webkit-text-fill-color:transparent;

}


.new-chat{

background:transparent;

border:1px solid var(--border);

color:var(--text);

padding:10px;

border-radius:var(--radius);

cursor:pointer;

}

.new-chat:hover{

box-shadow:0 0 10px rgba(0,245,160,0.3);

}


.chat-item{

padding:10px;

border-radius:var(--radius);

color:var(--text-light);

cursor:pointer;

}

.chat-item.active{

background:rgba(0,245,160,0.15);

color:#00f5a0;

}


.user{

margin-top:auto;

padding-top:15px;

border-top:1px solid var(--border);

color:var(--text-light);

}


/* MAIN */

.main{

flex:1;

display:flex;

flex-direction:column;

height:100vh;

}


.header{

padding:15px;

border-bottom:1px solid var(--border);

background:rgba(255,255,255,0.02);

}


/* CHAT BOX */

.chat-box{

flex:1;

padding:25px;

overflow-y:auto;

display:flex;

flex-direction:column;

gap:12px;

}


/* MESSAGE */

.message{

padding:12px 16px;

border-radius:var(--radius);

max-width:70%;

word-wrap:break-word;

animation:fadeUp 0.25s ease;

}


.message.bot{

background:var(--bg-chat);

border:1px solid var(--border);

align-self:flex-start;

}


.message.user{

background:var(--accent-gradient);

color:#000;

align-self:flex-end;

}


/* INPUT AREA */

.input-area{

display:flex;

padding:15px;

border-top:1px solid var(--border);

background:rgba(15,12,41,0.8);

}


.input-area input{

flex:1;

background:var(--bg-input);

border:none;

outline:none;

padding:12px;

border-radius:var(--radius);

color:var(--text);

}


.input-area button{

margin-left:10px;

background:var(--accent-gradient);

border:none;

padding:12px 18px;

border-radius:var(--radius);

cursor:pointer;

color:#000;

font-weight:600;

}


/* SCROLLBAR */

::-webkit-scrollbar{

width:5px;

}

::-webkit-scrollbar-thumb{

background:var(--accent-gradient);

border-radius:10px;

}


/* ANIMATION */

@keyframes fadeUp{

from{

opacity:0;

transform:translateY(10px);

}

to{

opacity:1;

transform:translateY(0);

}

}


/* ======================
TABLET
====================== */

@media(max-width:900px){

.sidebar{

width:200px;

}

.message{

max-width:85%;

}

}


/* ======================
MOBILE
====================== */

@media(max-width:700px){

.sidebar{

display:none;

}

.main{

width:100%;

}

.chat-box{

padding:15px;

}

.header{

text-align:center;

}

}


/* ======================
SMALL MOBILE
====================== */

@media(max-width:480px){

.input-area{

padding:10px;

}

.input-area input{

padding:10px;

font-size:14px;

}

.input-area button{

padding:10px;

font-size:14px;

}

.message{

font-size:14px;

}

}


/* ======================
LARGE SCREEN
====================== */

@media(min-width:1400px){

.chat-box{

padding-left:15%;

padding-right:15%;

}

}


.logo{
margin-bottom:15px;
}

.new-chat{
margin-bottom:15px;
}

.chat-history{
margin-top:2px;
margin-bottom:10px;
}




</style>

</head>
<body>

<div class="app">

    <!-- SIDEBAR -->
    <div class="sidebar">

        <div class="logo">
            Xai'27
        </div>

        <div class="chat-history">
            <div class="chat-item active">
                AI Assistant
            </div>
        </div>
<button class="new-chat" onclick="newChat()">
            + New Chat
        </button>


        <div class="user">
            Anshul
        </div>

    </div>


    <!-- MAIN CHAT -->
    <div class="main">

        <!-- HEADER -->
        <div class="header">
            Xai'27 AI Assistant
        </div>


        <!-- CHAT BOX -->
        <div id="chat-box" class="chat-box">

        <div class="message bot" id="botGreeting"></div>



        
    <script>
        const messages = [
        "How can I assist you today?",
        "What can I help you with?",
        "How may I assist you?",
        "What would you like to do?",
        "How can I help?",
        "Ready to assist you.",
        "What would you like to work on?"
];

const randomMessage = messages[Math.floor(Math.random() * messages.length)];

document.getElementById("botGreeting").innerHTML = randomMessage;
</script>


        </div>


        <!-- INPUT AREA -->
        <div class="input-area">

            <input
                id="input"
                placeholder="Message Xai'27..."
            >

            <button onclick="sendMessage()">
                Send
            </button>

        </div>

    </div>
</div>

function newChat(){

const chatBox = document.getElementById("chat-box");

chatBox.innerHTML = "";

const messages = [

"How can I assist you today?",
"What can I help you with?",
"How may I assist you?",
"What would you like to do?",
"How can I help?",
"Ready to assist you.",
"What would you like to work on?"

];

const randomMessage =
messages[Math.floor(Math.random()*messages.length)];

const div = document.createElement("div");

div.className = "message bot";

div.id = "botGreeting";

div.innerHTML = randomMessage;

chatBox.appendChild(div);

chatBox.scrollTop = 0;

}


<script>

/* ===============================
GREETING MESSAGES
=============================== */

const greetingMessages = [

"How can I assist you today?",
"What can I help you with?",
"How may I assist you?",
"What would you like to do?",
"How can I help?",
"Ready to assist you.",
"What would you like to work on?"

];


/* ===============================
SHOW GREETING FUNCTION
=============================== */

function showGreeting(){

const chatBox =
document.getElementById("chat-box");

const randomMessage =
greetingMessages[
Math.floor(Math.random()*greetingMessages.length)
];

const div =
document.createElement("div");

div.className =
"message bot";

div.id =
"botGreeting";

div.innerHTML =
randomMessage;

chatBox.appendChild(div);

}


/* ===============================
NEW CHAT FUNCTION
=============================== */

function newChat(){

const chatBox =
document.getElementById("chat-box");

chatBox.innerHTML = "";

showGreeting();

chatBox.scrollTop = 0;

}


/* ===============================
ENTER KEY SUPPORT
=============================== */

const input =
document.getElementById("input");

input.addEventListener(
"keypress",
function(e){

if(e.key==="Enter"){

sendMessage();

}

});


/* ===============================
SEND MESSAGE
=============================== */

async function sendMessage(){

const text =
input.value.trim();

if(!text) return;


/* USER MESSAGE */

addMessage(
text,
"user"
);

input.value = "";


/* TYPING */

addMessage(
"Xai'27 is typing...",
"bot",
"typing"
);


try{

const res =
await fetch(
"/chat",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
message:text
})

}
);

const data =
await res.json();

removeTyping();

addMessage(
data.reply,
"bot"
);

}
catch{

removeTyping();

addMessage(
"Server not connected.",
"bot"
);

}

}


/* ===============================
ADD MESSAGE
=============================== */

function addMessage(
text,
type,
id
){

const box =
document.getElementById("chat-box");

const div =
document.createElement("div");

div.className =
"message "+type;

if(id)
div.id=id;

div.innerHTML =
text;

box.appendChild(div);

box.scrollTop =
box.scrollHeight;

}


/* ===============================
REMOVE TYPING
=============================== */

function removeTyping(){

const typing =
document.getElementById("typing");

if(typing)
typing.remove();

}


/* ===============================
AUTO LOAD GREETING
=============================== */

window.onload =
function(){

showGreeting();

};

</script>


</body>
</html>




`);

});

// CHAT API

app.post("/chat", async (req, res) => {

try{

const response = await ai.models.generateContent({

model:"gemini-2.5-flash",

contents:req.body.message

});

res.json({

reply:response.text

});

}catch(err){

res.json({

reply:"Error: "+err.message

});

}

});

// START SERVER

app.listen(3001,()=>{

console.log("AI Agent running at:");
console.log("http://localhost:3001");

});
