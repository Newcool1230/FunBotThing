var raffleS = {usersList:[],isOn:false,time:30};
function c(ms){API.sendChat(ms);}
var rafflePicked;

function raffleEnd(){
	if (raffleS.isOn){
		if (typeof raffleS.usersList[0] == "undefined"){
			c("/me Raffle has ended, but no users joined it! ¯\\_(ツ)_/¯");
			raffleS.usersList = []; /*/ Why'd you clear it if it's empty though :L /*/
		}else{
			if (raffleS.usersList.length == 1){
				c("/me Only " + raffleS.usersList[0] + " joined, raffle was cancelled.");
			}else if (raffleS.usersList.length > 1){
				c("/me In total, " + raffleS.usersList.length + " users joined!");
				rafflePicked = Math.floor(Math.random() * raffleS.usersList.length);
				var pickedName = raffleS.usersList[rafflePicked];
				setTimeout(function(){c("/me Congratulations @" + pickedName + ", you have won! Let @LeDCV or @ColorfulMind know your forum name!");},250);
				raffleS.usersList.splice(rafflePicked,1);
			}
		}
	}
	raffleS.isOn = false;
}

var antispam = false;

var logged = [];
API.on(API.CHAT, function(data){
	var itsMe = false;
	var msg = data.message
	var msgid = data.cid;
	var user = data.un;
	var uid = data.uid;
	var tag = 0;
	if (uid == API.getUser().id){
		logged.unshift(msgid);
	};
	if (uid == 4820534){
		itsMe = true;
	}
	if(data.message.indexOf('!') === 0 || data.message.indexOf('.') === 0){
		var urole = function(){
			for (var i = 0; i < API.getUsers().length; i++){
				if (API.getUsers()[i].username == user){
					return API.getUsers()[i].role;
				}
			}
		}
		console.log("[MsgID] " + msgid + " || [UserID] " + uid + " || [User] " + user + " || [MSG] " + msg);
		var command = msg.substring(1).split(' ');
		if(typeof command[2] != "undefined"){
			for(var i = 2; i < command.length; i++){
				command[1] = command[1] + ' ' + command[i];
			}
		}
		function ct(ms,isMe){var a;if (isMe){a = "/me ";}else{a = "";};API.sendChat(a + "@" + user + " - " + ms);}
		function delFrom(){$.ajax({type: 'DELETE', url: '/_/chat/' + msgid});}
		switch(command[0].toLowerCase()){
			case "raffle":
			case "startraffle":
			case "rafflestart":
				if (urole() >= 4 || itsMe){
					raffleS.usersList = [];
					delFrom();
					raffleS.isOn = true;
					c("/me Raffle was started by " + user + "! Type !join to enter it! You have " + raffleS.time + " seconds");
					var timeTimes1000 = raffleS.time * 1000;
					var raffleTimeout = setTimeout(raffleEnd,timeTimes1000);
				}else{
					delFrom();
					if (!antispam){
						ct("This command is for Host/Co-Hosts and above!",true);
						antispam = true;
						setTimeout(function(){antispam = false;},5000);
					}
				}
				break;

			case "join":
			case "joinraffle":
			case "rafflejoin":
				if (raffleS.isOn){
					var d = new Date();
					var h = d.getUTCHours();
					var m = d.getUTCMinutes();
					var s = d.getUTCSeconds();
					if (h < 10){h = "0" + h;}
					if (m < 10){m = "0" + m;}
					if (s < 10){s = "0" + s;}
					delFrom();
					var locklist = false;
					for (var i = 0; i < raffleS.usersList.length; i++){
						if (raffleS.usersList[i] == user){
							locklist = true;
						}
					}
					if (!locklist){
						raffleS.usersList.push(user);
						addChat("<a style='color:#41b5ff;'><b>" + user + "</b></a> entered the raffle at " + h + ":" + m + ":" + s + " (UTC)","#CCCCCC");
					}else{
						locklist = false;
					}
				}else{
					delFrom();
					if (!antispam){
						ct("Raffle wasn't started!",true);
						antispam = true;
						setTimeout(function(){antispam = false;},5000);
					}
				}
				break;

			case "endraffle":
			case "raffleend":
			case "stopraffle":
			case "rafflestop":
				if (urole() >= 4 || itsMe){
					if (raffleS.isOn){
						delFrom();
						raffleS.isOn = false;
						c("/me Raffle is closed!");
					}else{
						delFrom();
						ct("Raffle is already closed!",true);
					}
				}else{
					delFrom();
					if (!antispam){
						ct("This command is for Host/Co-Hosts and above!",true);
						antispam = true;
						setTimeout(function(){antispam = false;},5000);
					}
				}
				break;

			case "time":
			case "raffletime":
			case "timeraffle":
				if (urole() >= 4 || itsMe){
					delFrom();
					var trimmed = parseInt(command[1].trim());
					if (trimmed > 5){
						if (!raffleS.isOn){
							raffleS.time = command[1];
						}else{
							ct("Raffle has already started! It was set to " + raffleS.time + " seconds",true);
						}
					}else{
						ct("Please insert a number greater than 5 (seconds)",true);
					}
				}else{
					delFrom();
					if (!antispam){
						ct("This command is for Host/Co-Hosts and above!",true);
						antispam = true;
						setTimeout(function(){antispam = false;},5000);
					}
				}
				break;

			case "clear":
				if (urole() >= 4 || itsMe){
					delFrom();
					for (var i = 0; i < logged.length; i++){$.ajax({type: 'DELETE',url: '/_/chat/' + logged[i]});}
					/*/ Just to be sure, let's do it again /*/
					for (var i = 0; i < logged.length; i++){$.ajax({type: 'DELETE',url: '/_/chat/' + logged[i]});}
					logged = [];
				}else{
					delFrom();
					if (!antispam){
						ct("This command is for Host/Co-Hosts and above!",true);
						antispam = true;
						setTimeout(function(){antispam = false;},5000);
					}
				}
				break;

			case "redraw":
				if (urole() >= 4 || itsMe){
					delFrom();
					raffleS.isOn = true;
					raffleEnd();
				}else{
					delFrom();
					if (!antispam){
						ct("This command is for Host/Co-Hosts and above!",true);
						antispam = true;
						setTimeout(function(){antispam = false;},5000);
					}
				}
				break;

			case "slap":
				if (itsMe){
					c("/me *slaps LeDCV*");
				}else{
					delFrom();
				}
				break;

			case "flirt":
				if (urole() >= 4 || itsMe){
					delFrom();
					var allUsers = API.getUsers();
					var ranUser = Math.floor(Math.random() * allUsers.length);
					var flirts = ["Heey @" + allUsers[ranUser].username + ", how you doing? *winks*",
						"Oh, I've always considered @" + allUsers[ranUser].username + " the hottest out of everyone here ;)",
						"So @" + allUsers[ranUser].username + "... Are you busy this weekend? I'd like to get know you better :blush:",
						"I can't hold it back anymore! I LOVE YOU @" + allUsers[ranUser].username + "! Will you marry me?",
						"Hello @" + allUsers[ranUser].username + "... Do you come here often?",
						"WOW! @" + allUsers[ranUser].username + " is SO hot! Dayum!",
						"Hey @" + allUsers[ranUser].username + ", please come here often... I want to stare at you longer <3",
						"@" + allUsers[ranUser].username + " You are my day, you are my night... You are my everything... Please, date me.",
						"@" + allUsers[ranUser].username + " <3 :blush:",
						"@" + allUsers[ranUser].username + " I... I've been too shy to say this but... This is the time... You are the prettiest person I know... Please love me back",
						"@" + allUsers[ranUser].username + " You're cute <3",
						"@" + allUsers[ranUser].username + " You smell differently when you're awake..."];
					var ranFlirt = Math.floor(Math.random() * flirts.length);
					c(flirts[ranFlirt]);
				}else{
					delFrom();
				}
				break;

			case "exe":
				if (urole() >= 0 || itsMe){
					delFrom();
					c("&nbsp;&nbsp;&nbsp;:warning: :warning: .EXE WAS EXECUTED :warning: :warning:");
					setTimeout(function(){c("&nbsp;&nbsp;&nbsp;Banning all users in t-3 seconds. Please stand by.");},250);
					setTimeout(function(){c("http://i.imgur.com/Mc5cCal.gif");},3000);
				}else{
					delFrom();
				}
				break;

			default:
				delFrom();
				break;
		}
	}
});

//Stolen from Igor's script <3//
function addChat(text, color, state, size) {
	var chat = $('#chat-messages'),
		a = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28;
	if (color == undefined)
		color = "#9fee00";
	if (state){
		chat.append("<div class='update raffle-update' style='border-left: double 6px " + color + "';'><center><span class='antitroll-text' style='color: " + color + "; " + si + "'>" + text + "<br></span></center></div>");
	}else{
		chat.append("<div class='update raffle-update' style=''><center><span class='antitroll-text' style='color: " + color + "; " + si + "'>" + text + "<br></span></center></div>");
	}
	var si = "";
	if (size){si = "font-size: 11px;";}
	else{si = "";}
	if (a)
		chat.scrollTop(chat[0].scrollHeight);
	if (chat.children().length >= 512)
		chat.children().first().remove();
}

addChat("<img src='https://i.imgur.com/wQjLpaH.gif' style='max-width:400px'></img><br>\
	<a style='color:#ececec;'>Beta Tester's <a style='color:#41b5ff;'><b>raffle</b></a> script initiated!</a><br>\
	<a style='color:#41b5ff;'>(Beta v0.6)</a><br>\
	<a style='color:#41b5ff;'>__________<br>\
	<a style='color:#ececec;'>!<b>raffle</b><br>\
	<a style='color:#c8c8c8;'>Starts the raffle<br>\
	<a style='color:#ececec;'>!<b>endraffle</b><br>\
	<a style='color:#c8c8c8;'>Ends the raffle<br>\
	<a style='color:#ececec;'>!<b>join</b><br>\
	<a style='color:#c8c8c8;'>Joins the raffle<br>\
	<a style='color:#ececec;'>!<b>time</b> + # (in seconds)<br>\
	<a style='color:#c8c8c8;'>Sets raffle's duration (default 30s)<br>\
	<a style='color:#41b5ff;'>¯¯¯¯¯¯¯¯¯¯","#CCCCCC");
