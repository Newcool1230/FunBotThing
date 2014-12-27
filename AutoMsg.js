var messageSet = "Message! :o";
var timeSet = 5;
var msgOn = false;
var OneMin = 0;
var Potato = timeSet - OneMin;

API.on(API.CHAT_COMMAND, function(data){
	var msg = data;
	var command = msg.substring(1).split(' ');
	console.log("[COMMAND] - " + msg);
	if(typeof command[2] != "undefined"){
		for(var i = 2; i < command.length; i++){
			command[1] = command[1] + ' ' + command[i];
		};
	};
	if (typeof command[1] == "undefined"){command[1] = "";}
	else{command[1] = command[1] + " ";};
	function ct(msg){API.sendChat(command[1] + msg);};

	switch(command[0].toLowerCase()){
		case "txt":
			if (msgOn === true){
				msgOn = false;
				addChat("Warning turned off","#eaaeae");
			}else if(msgOn === false){
				msgOn = true;
				addChat("Warning every " + timeSet + "min","#eaaeae");
				loop();
			}
			break;

		case "settime":
			timeSet = command[1];
			addChat("Time was set to <b>" + command[1] + "</b> minutes","#CCCCCC");
			clearTimeout(letimeout);
			OneMin = 0;
			Potato = timeSet - OneMin;
			loop();
			break;

		case "setmsg":
			messageSet = command[1];
			addChat("Message was set to <b>" + command[1] + "</b>","#CCCCCC");
			break;

		case "check":
			if (msgOn === true){
				addChat(Potato + " minutes remaining","#CCCCCC");
				addChat("Message is: " + messageSet,"#eaaeae");
			}else{
				addChat("Messages are disabled","#CCCCCC");
				addChat("Message is: " + messageSet,"#eaaeae");
			}
			break;

		case "send":
			c(messageSet);
			break;
		
		case "thelp":
			instructions();
			break;

		default:
			break;
	}
});

function instructions(){
	addChat("<img src='https://i.imgur.com/7Ax7ThH.gif'></img><br>\
	<a style='color:#7174ff;'><b>------=[ AutoMsg Beta v0.5 ]=------</b></a><br>\
	<a style='color:#ffffff;'><b>/txt</b></a><br>\
	<a style='color:#CCCCCC;'>Turns messages on (5 min default)</a><br><br>\
	<a style='color:#ffffff;'><b>/settime</b> + <b><em>TIME (in minutes)</em></b></a><br>\
	<a style='color:#CCCCCC;'>Edits the interval</a><br><br>\
	<a style='color:#ffffff;'><b>/setmsg</b> + <b><em>MESSAGE</em></b></a><br>\
	<a style='color:#CCCCCC;'>Changes the message</a><br><br>\
	<a style='color:#ffffff;'><b>/check</b></a><br>\
	<a style='color:#CCCCCC;'>Shows message and time</a><br><br>\
	<a style='color:#ffffff;'><b>/send</b></a><br>\
	<a style='color:#CCCCCC;'>Sends the message regardless of interval</a><br><br>\
	<a style='color:#ffffff;'><b>/thelp</b></a><br>\
	<a style='color:#CCCCCC;'>This message</a><br>\
	<a style='color:#7174ff;'><b>------=[ AutoMsg Beta v0.5 ]=------</b></a><br>","#CCCCCC");
}
instructions();

function c(msg){
	API.sendChat(msg);
}

var letimeout;
function loop(){
	if (msgOn){
		OneMin = OneMin + 1;
		Potato = timeSet - OneMin;
		addChat(Potato + " minutes remaining","#CCCCCC");
		if (OneMin >= timeSet){
			OneMin = 0;
			c(messageSet);
		}
		letimeout = setTimeout(loop,60000);
	}
}

//Stolen from Igor's script <3//
function addChat(text, color, state, size) {
	var chat = $('#chat-messages'),
		a = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28;

	if (color == undefined)
		color = "#9fee00";
	var si;
	if (size){
		si = "font-size: 11px;";
	}else{
		var si = "";
	}

	if (state){
		chat.append("<div class='update automsg-update' style='border-left: double 6px " + color + "';'><center><span class='antitroll-text' style='color: " + color + "; " + si + "'>" + text + "<br></span></center></div>");
	}else{
		chat.append("<div class='update automsg-update' style=''><center><span class='antitroll-text' style='color: " + color + "; " + si + "'>" + text + "<br></span></center></div>");
	}

	if (a)
		chat.scrollTop(chat[0].scrollHeight);
	if (chat.children().length >= 512)
		chat.children().first().remove();
}
