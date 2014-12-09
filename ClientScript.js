if(window.location.hostname === "plug.dj"){
	API.chatLog("Client Support Script + Custom avatar cap - Activated");

	var u = API.getUser().username;
	var currentcap = API.getStaff().length + API.getAmbassadors().length + API.getAdmins().length;
	c('/cap ' + parseInt(currentcap));

	var lockPuff = false;
	var strobeon = false;

	var off;var on;
	if (API.getUser().role == 0){off = 1;on = 0;}
	else{off = 0;on = 1;};

	var messages = [];
	var logcheck = [];

	function c(msg){API.sendChat(msg);};
	function l(msg,state){API.chatLog(msg,state);}

	API.on(API.ADVANCE, JoinLeave);
	API.on(API.USER_JOIN, JoinLeave);
	API.on(API.USER_LEAVE, JoinLeave);

	function JoinLeave(){
		var p = parseInt(API.getStaff().length + API.getAmbassadors().length + API.getAdmins().length + off);
		for (var i = 0; i <= p; i++){
			if (API.getDJ().username == u){
				if (currentcap != p - 1){
					currentcap = p - 1;
					l('Cap set to ' + parseInt(p),false);
					c("/cap " + currentcap);
				}
			}else if (currentcap != p){
				currentcap = p;
				l('Cap set to ' + parseInt(p),false);
				c("/cap " + currentcap);
			}
		};
	};

	function deleteAll(){
		console.log("Starting length: " + messages.length);
		for (var i = 0; i < messages.length; i++){
			API.moderateDeleteChat(messages[i]);
		}
		console.log("Ending length: " + messages.length + ". Going to safety check.");
		for (var i = 0; i < messages.length; i++){
			API.moderateDeleteChat(messages[i]);
			messages.shift();
		}
		console.log("Ending length 2: " + messages.length);
		messages = [];
		console.log("Message log cleared: " + messages.length);
	};

	API.on(API.CHAT, function(data){
		var msg = data.message;
		var msgid = data.cid;
		var user = data.un;
		var userid = data.uid;
		var argument = "[MSG] " + msg + " || User: " + user + " || MsgID: " + msgid + " || UserID: " + userid;
		if (typeof user != "undefined"){
			logcheck.push(argument);
			messages.push(msgid.toString());
		};
		if (user == "CatSnore"){
			var puff = msg.toLowerCase().split(" ");
			var tag = ["beta","beta tester","@beta tester","all","people","everyone","ppl","peeps","guys","guise","bros"];
			switch (puff[0]){

				case "hi":case "hello":case "greetings":case "salutations":
				case "howdy":case "ciao":case "salut":case "hai":case "hey":
				case "hay":case "ohai":case "ohaio":case "ohay":case "ohei":
				case "oheio":case "ohey":case "haider":case "oy":case "ohoy":
				case "hola":case "holla":case "hyao": case "hoy":

					for (var i = 0;i < tag.length; i++){
						if (!lockPuff){
							if (typeof puff[1] != "undefined" && puff[1] == tag[i]
							|| typeof puff[1] == "undefined"){
								c("@THe Puff Heya shmoobey butt");
								lockPuff = true;
								setTimeout(function(){lockPuff = false;},3000);
							}
						}
					}
					break;
			}
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
			case "timeout":
				ct("There's a set timeout before you can post links on chat or Meh after you join");
				break;

			case "woot":
				ct("If you're in this room, you'll most probably like the songs that are played here. Therefore, you'll be clicking Woot for most songs. AutoWoots simply click Woot for you, in case you're busy. If you dislike a song, you can manually Meh it.");
				break;

			case "op":
				ct("OverPlayed list: http://bit.ly/dteoplist");
				break;

			case "rules":
				ct("Rules: http://bit.ly/rulesdte");
				break;

			case "blog":
				ct("Blog: http://blog.plug.dj/");
				break;

			case "ba":
				ct("Brand Ambassadors are people who help moderate the website. Here's more about the BA project: http://blog.plug.dj/brand-ambassadors/");
				break;

			case "admin":
				ct("Admins are the people that work for plug.dj. They have a plug.dj logo next to their names in chat. http://blog.plug.dj/team/");
				break;

			case "xp":
				ct('There is a limit to how much XP you can earn in a single 24-hour period, which starts at midnight GMT. XP and PP are earned on ticks. There are a specific amount of ticks in a 24-hour period and you can earn XP');
				ct('for a certain amount of them, and they do not need to be earned sequentially (you can earn 3 ticks now, 4 ticks later, etc.)');
				break;

			case "pp":
			case "points":
			case "point":
				ct("The website check every minute what you did in the website during that time (such as Wooting, chatting, etc), and then generates a proportional amount of XP and PP for it. XP, however, has a daily cap, so you can't farm it.");
				break;

			case "rank":
			case "ranks":
				ct("Help people out, be active and be online often, and you'll eventually be noticed by our staff. We'll watch you for some time, then decide whether you deserve a rank or not.");
				break;

			case "clearall":
			case "deleteall":
				var r = confirm("Delete entire chat on log?");
				if (r == true) {
					deleteAll();
					l("Running command " + command[0] + ".",true);
				}else{
					l("Command " + command[0] + " denied.",true);
				};
				break;

			case "msgs":
				l("Messages length: " + messages.length, false);
				break;

			case "logcheck":
			case "checklog":
				console.log(logcheck);
				l("Check console for chat log since last clear",false);
				break;

			case "logclear":
			case "clearlog":
				logcheck = [];
				l("Log cleared.",false);
				break;
			
			case "strobe":
				var x = require("dc35f/fefa3/cccff/c230c");
				strobeon = !strobeon;
				if (strobeon){
					x.toggleLights(false);
					x.onFXChange(null,["strobe"]);
					x.strobeSwap();
					l("Strobe lights on!",false);
				}else if (!strobeon){
					x.onFXChange(null,["strobe"]);
					x.toggleLights(true);
					l("Strobe lights off!",false);
				}
				break;

			case "mutes":
				break;

			case "12":
				ct('ᄅ⇂');
				break;

			case "txt":
				if (msgOn){
					msgOn = false;
					l(":heavy_multiplication_x: Warning turned off",false);
				}else if(!msgOn){
					msgOn = true;
					l(":white_check_mark: Warning every " + Limit + "min",false);
					setTimeout(loop,5e4);
				}
				break;

			case "check":
				if (msg1){var n = 0;}
				else if (!msg1){var n = 1;}
				if (msgOn === true){
					l(":anger: " + Potato + " minutes remaining");
					l("Message is: " + mm[n]);
				}else{
					l(":anger: Messages are disabled");
					l("Message is: " + mm[n]);
				}
				break;

			case "send":
				if (msg1){var n = 0;}
				else if (!msg1){var n = 1;}
				message(n);
				break;

			case "thelp":
				l("------=[ TBOT Alpha v1.0 ]=------",true);
				l("/txt || Turns messages on (1 hour interval)",false);
				l("/check || Shows msg and time",false);
				l("/send || Sends the message regardless of interval",false);
				l("/thelp || This message",false);
				l("------=[ TBOT Alpha v1.0 ]=------",true);
				break;

			case "emojis":
				l('~=[,,_,,]:3',false);
				l('¬_¬',false);
				l('ಠ_ಠ',false);
				l('ლ(ಥ益ಥლ',false);
				l('(っ◔‿◔)っ',false);
				l('(╥﹏╥)',false);
				l('(─‿‿─)',false);
				l('(ʃƪ ˘ ³˘)',false);
				l('(ᕗ ಠ益ಠ)ᕗ ︵﻿ ┻━┻',false);
				l('(╯°□°)╯︵ ┻━┻',false);
				l('( ͡° ͜ʖ ͡°)',false);
				l('¯\_(ツ)_/¯',false);
				break;

			//p3
			case "lockskip":case "skip":case "commands":case "nick":case "avail":
			case "afk":case "work":case "sleep":case "join":case "leave":case "whoami":
			case "refresh":case "version":case "mute":case "link":case "unmute":
			case "nextsong":case "automute":case "alertson":case "alertsoff":
			case "getpos":case "ignore":case "whois":case "kick":case "add":
			case "remove":case "lock":case "unlock":case "help":case "me":case "em":
				break;

			default:
				l("Command " + command[0] + " is not a command!",false);
				break;
		};
	});

	var mm = ["[Broadcast] Don't forget to check the OP list! http://bit.ly/dteoplist",
	"[Broadcast] Don't forget to read our rules! https://bit.ly/rulesDTE "];
	var msgOn = false;
	var OneMin = 0;
	var Limit = 60;
	var Potato = Limit - OneMin;
	var msg1 = true;

	aid();
	function aid(){
		l("------=[ TBOT Alpha v1.0 ]=------",true);
		l("/thelp || Commands",false);
		l("------=[ TBOT Alpha v1.0 ]=------",true);
	}

	function message(n){
		c(mm[n]);
		msg1 = !msg1;
	}

	function loop(){
		if (msgOn){
			OneMin++;
			Potato = Limit - OneMin;
			API.chatLog(":anger: " + Potato + " minutes remaining",false);
			if (OneMin >= Limit){
				if (msg1){
					message(0);
				}else if(msg1){
					message(1);
				}
				OneMin = 0;
			}
			setTimeout(loop,5e4);
		}
	}

}else{
	alert("This bot only functions at http://plug.dj/");
};
