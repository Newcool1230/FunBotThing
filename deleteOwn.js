if (API.getUser().role <= 1){
	addChat("<a style='color:#eb9595;'><b>This script only works for Bouncer+.</b></a> Sorry!","#CCCCCC");
}else{

var logged = [];

API.on(API.CHAT, function(data){
	var msg = data.message;
	var msgid = data.cid;
	var user = data.un;
	var userid = data.uid;
	if (userid == API.getUser().id){
		logged.unshift(msgid);
		console.log(msg + " (" + msgid + ")");
	};
});

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

	
		case "del":
			var cmds = command[1].trim();
			$.ajax({
				type: 'DELETE',
				url: '/_/chat/' + logged[cmds]
			});
			console.log(logged[cmds]);
			logged.splice(cmds,1);
			break;

		case "erase":
			$.ajax({
				type: 'DELETE',
				url: '/_/chat/' + command[1]
			});
			break;

		case "cmd":
			addChat("<a style='color:#eb9595;'>__________<br>\
			<a style='color:#ececec;'>/<b>del</b> + #[Array position (if unsure, go with 0)]<br>\
			<a style='color:#c8c8c8;'>Deletes your own messages<br>\
			<a style='color:#ececec;'>/<b>erase</b> + [MSG ID]<br>\
			<a style='color:#c8c8c8;'>Deletes specified message (Except from BAs/Admins)<br>\
			<a style='color:#eb9595;'>¯¯¯¯¯¯¯¯¯¯","#eb9595");
			break;
	}
});

function addChat(text, color, state, size) {
	var chat = $('#chat-messages'),
		a = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28;

	if (color == undefined)
		color = "#9fee00";
		
	if (state){
		chat.append("<div class='update leidscript' style='border-left: double 6px " + color + "';'><center><span class='leidscript-text' style='color: " + color + "; " + si + "'>" + text + "<br></span></center></div>");
	}else{
		chat.append("<div class='update leidscript' style=''><center><span class='leidscript-text' style='color: " + color + "; " + si + "'>" + text + "<br></span></center></div>");
	}

	if (size){
		var si = "font-size: 11px;";
	}else{
		var si = "";
	}

	if (a)
		chat.scrollTop(chat[0].scrollHeight);
	if (chat.children().length >= 512)
		chat.children().first().remove();
}

addChat("<a style='color:#ececec;'>Beta Tester's <a style='color:#42a5dc;'>deleteOwn</a> script initiated!</a><br>\
	<a style='color:#eb9595;'>Beta v0.6</a><br>\
	<a style='color:#ececec;'>Check commands with /cmd</a>","#CCCCCC");
}
