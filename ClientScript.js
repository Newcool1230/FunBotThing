if(window.location.hostname === "plug.dj"){
	//This script was made by Beta Tester (https://plug.dj/@/beta-tester)
	//CSS help from Marciano

	var u = API.getUser().username;
	var currentcap = 0;
	for (var i = 0; i < API.getUsers().length; i++){
		if (API.getUsers()[i].role > 0){
			currentcap++;
		}
	}
	c('/cap ' + parseInt(currentcap));

	var lockPuff = false;

	var joinmsg = false;
	var grabmsg = false;
	var mehmsg = false;
	var autolock = false;
	var cap = false;
	var songup = false;
	var autograb = false;

	var off;var on;
	if (API.getUser().role == 0){off = 1;on = 0;}
	else{off = 0;on = 1;};

	var messages = [];
	var logcheck = [];
	var menu = '\
		<section id="xprequel">\
			<div id="xtitle" class="xtxt">BetaBot - Alpha</div>\
		</section>\
		<section id="xmenu">\
			<div id="xjoinmsg" class="xbutton">Join Message</div>\
			<div id="xgrabmsg" class="xbutton">Grab Message</div>\
			<div id="xmehmsg" class="xbutton">Meh Message</div>\
			<div id="xautojoin" class="xbutton">AutoJoin</div>\
			<div id="xautograb" class="xbutton">AutoGrab</div>\
			<div id="xautocap" class="xbutton">AutoCap</div>\
			<div id="xsongup" class="xbutton">Song Updates</div>\
		</section>\
	';

	var style = '\
		<style>\
			#xprequel {\
				position: absolute;\
				top: 53px;\
				padding: 10px;\
				width: 130px;\
				background-color: #272B34;\
				outline: #FFFFFF double;\
				z-index: 10;\
				font-family: "Open Sans", sans-serif;\
			}\
			#xprequel .ativo {color: #42A5DC;}\
			#xmenu {\
				position: absolute;\
				top: 95px;\
				padding: 10px;\
				width: 130px;\
				background-color: #111317;\
				outline: #FFFFFF double;\
				z-index: 10;\
				font-family: "Open Sans", sans-serif;\
			}\
			#xmenu .ativo {color: #42A5DC;}\
			.xtxt: {color: #3366FF; padding: 2px 15px;}\
			.xtxt:hover, #xprequel .ativo:hover {color: #DCDCDC;}\
			.xbutton: {color: #D1D1D1; padding: 2px 15px;}\
			.xbutton:hover, #xmenu .ativo:hover {cursor: pointer; color: #89be6c;}\
		</style>\
	';

	$('#room').append(menu);    //Adicionar o menu ao elemento #room
	$('body').prepend(style);   //Adicionar uma tag de estilos ao corpo da página
	
	$('#xjoinmsg').on('click',	function(){ joinmsg = !joinmsg;	$(this).toggleClass('ativo'); beautify("Join message",joinmsg);});   //Listeners dos botões
	$('#xgrabmsg').on('click',	function(){ grabmsg = !grabmsg;	$(this).toggleClass('ativo'); beautify("Grab message",grabmsg);});
	$('#xmehmsg').on('click',	function(){ mehmsg = !mehmsg;	$(this).toggleClass('ativo'); beautify("Meh message",mehmsg);});
	$('#xautocap').on('click',	function(){ cap = !cap;			$(this).toggleClass('ativo'); beautify("AutoCap",mehmsg);});
	$('#xautograb').on('click',	function(){ autograb = !autograb;$(this).toggleClass('ativo'); beautify("AutoGrab",autograb);});
	$('#xautojoin').on('click',	function(){ autolock = !autolock;$(this).toggleClass('ativo'); beautify("AutoJoin",autolock);});
	$('#xsongup').on('click',	function(){ songup = !songup;	$(this).toggleClass('ativo'); beautify("Song update",songup);});

	function c(msg){API.sendChat(msg);}
	function l(msg,state){API.chatLog(msg,state);}
	function beautify(arg,arg2){
		var a;
		if (arg2){a = "on";}else if(!arg2){a = "off";}
		l(' 🚨 🚨 🚨 🚨 :white_check_mark: ' + arg + ' is now ' + a,false);
	}
	function onify(arg){
		var a;
		if (arg){a = "on"}
		else if(!arg){a = "off"}
		return a
	}

	API.on(API.GRAB_UPDATE, function(obj){
		var media = API.getMedia();
		if (grabmsg){l(" 🚨 🚨 🚨 🚨 🚨 :purple_heart: " + obj.user.username + " (UID " + obj.user.id + ") grabbed",false);};
	});

	API.on(API.VOTE_UPDATE, function(obj){
		if (obj.vote == -1){
			if (mehmsg){l(" 🚨 🚨 🚨 🚨 🚨 :x: " + obj.user.username + " (UID " + obj.user.id + ") meh'ed this",false);};
		}
	});

	API.on(API.ADVANCE, function(){
		if (autograb){
			grab();
		}
	});

	API.on(API.USER_JOIN, ujoined);
	API.on(API.USER_LEAVE, uleft);

	function ujoined(user) {
		if (joinmsg){l(" 🚨 🚨 🚨 🚨 🚨 :door: " + user.username + " (UID " + user.id + ") joined",false);};
		JoinLeave(user);
	};

	function uleft(user){
		if (joinmsg){l(" 🚨 🚨 🚨 🚨 🚨 :door: " + user.username + " (UID " + user.id + ") left",false);};
		JoinLeave(user);
	};

	function JoinLeave(user){
		if (cap){
			if (user.role > 0);{
				var thiscap = 0;
				for (var i = 0; i < API.getUsers().length; i++){
					if (API.getUsers()[i].role > 0){
						thiscap++;
					}
				}
				if (thiscap != currentcap){
					currentcap = thiscap;
					if (currentcap > 10){
						currentcap = 10;
						c('/cap ' + parseInt(currentcap));
						l('Cap set to ' + currentcap);
					}
				}
			}
		}
	}

	API.on(API.ADVANCE, autojoin);

	function autojoin() {
		if (autolock){
			var dj = API.getDJ();
			setTimeout(function(){
				if (API.getWaitListPosition() <= -1 && dj.username != API.getUser().username){
					$('#dj-button').click();
				}
			},300);
		}
	}
	autojoin();

	API.on(API.ADVANCE, mediaupdate);
	function mediaupdate(obj){
		if (songup){
			l(" 🚨 🚨 🚨 🚨 🚨 :green_heart: " + obj.lastPlay.score.positive + " 🚨 🚨 | 🚨 🚨 :purple_heart: " + obj.lastPlay.score.grabs + " 🚨 🚨 | 🚨 🚨 :broken_heart: " + obj.lastPlay.score.negative,false);
			l(" 🚨 🚨 🚨 :musical_note: Now playing: " + obj.media.author + " - " + obj.media.title,false);
			l(" 🚨 🚨 🚨 :musical_note: Current DJ: " + obj.dj.username + " (UID " + obj.dj.id + ")",false);
		}
	}

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
		if (user == "Steven"){
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
								l("Like wtf how'd you get Steven to say hi",true);
								lockPuff = true;
								setTimeout(function(){lockPuff = false;},3000);
							}
						}
					}
					break;
			}
		};
	});

	function getuid(uname,oname){
		var toggle = false;
		for (var i = 0; i < API.getUsers().length; i++){
			if (API.getUsers()[i].username.toLowerCase() == uname){
				l(" 🚨 🚨 🚨 🚨 🚨 :grey_exclamation:" + API.getUsers()[i].username + "'s UID is " + API.getUsers()[i].id,false);
				toggle = true;
			}
		}
		if (!toggle){
			l(" 🚨 🚨 🚨 🚨 🚨 :grey_exclamation: User " + oname + " doesn't exist / not in the room.",false);
		}
	}

	function grab(){
		setTimeout(function(){$("#grab").click();}, 500);
		setTimeout(function(){$($(".grab .menu ul li")[0]).mousedown();}, 500);
	}

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

			case "getid":
			case "getuid":
			case "id":
			case "uid":
				var xname = command[1].substring(1).toString();
				var oname = xname.substring(0,xname.length - 2);
				var uname = oname.toLowerCase();
				console.log(xname + "||" + uname + "||" + oname);
				getuid(uname,oname);
				break;

			case "joinmsg":
			case "jmsg":
				joinmsg = !joinmsg;
				if (joinmsg){
					l(' 🚨 🚨 🚨 🚨 :white_check_mark: Join message on',false);
				}else if (!joinmsg){
					l(' 🚨 🚨 🚨 🚨 :white_check_mark: Join message off',false);
				}
				break;

			case "grabmsg":
			case "gmsg":
				grabmsg = !grabmsg;
				if (grabmsg){
					l(' 🚨 🚨 🚨 🚨 :white_check_mark: Grab message on',false);
				}else if (!grabmsg){
					l(' 🚨 🚨 🚨 🚨 :white_check_mark: Grab message off',false);
				}
				break;
			
			case "mehmsg":
			case "mmsg":
				mehmsg = !mehmsg;
				if (mehmsg){
					l(' 🚨 🚨 🚨 🚨 :white_check_mark: Meh message on',false);
				}else if (!mehmsg){
					l(' 🚨 🚨 🚨 🚨 :white_check_mark: Meh message off',false);
				}
				break;

			case "autojoin":
			case "auto":
				autolock = !autolock;
				if (autolock){
					l(' 🚨 🚨 🚨 🚨 :white_check_mark: Autojoin on',false);
				}else if (!autolock){
					l(' 🚨 🚨 🚨 🚨 :white_check_mark: Autojoin off',false);
				}
				break;

			case "togglecap":
			case "captoggle":
			case "capset":
			case "setcap":
				cap = !cap;
				if (cap){
					l(' 🚨 🚨 🚨 🚨 :white_check_mark: AutoCap on',false);
				}else if (!cap){
					l(' 🚨 🚨 🚨 🚨 :white_check_mark: AutoCap off',false);
				}
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
				ct("Brand Ambassadors are volunteers who help moderate the website and test features. Here's more about the BA project: http://blog.plug.dj/brand-ambassadors/");
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
					l(" 🚨 🚨 🚨 🚨 🚨 [Running command " + command[0] + ".]",true);
				}else{
					l(" 🚨 🚨 🚨 🚨 🚨 [Command " + command[0] + " denied.]",true);
				};
				break;

			case "msgs":
				l(" 🚨 🚨 🚨 🚨 🚨 [Messages length: " + messages.length + "]", false);
				break;

			case "logcheck":
			case "checklog":
				console.log(logcheck);
				l(" 🚨 🚨 🚨 🚨 🚨 [Check console for chat log since last clear]",false);
				break;

			case "logclear":
			case "clearlog":
				logcheck = [];
				l(" 🚨 🚨 🚨 🚨 🚨 [Log cleared.]",false);
				break;

			case "mutes":
				break;

			case "12":
				ct('ᄅ⇂');
				break;

			case "txt":
				if (msgOn){
					msgOn = false;
					l(" 🚨 🚨 🚨 🚨 🚨 [:heavy_multiplication_x: Warning turned off]",false);
				}else if(!msgOn){
					msgOn = true;
					l(" 🚨 🚨 🚨 🚨 🚨 [:white_check_mark: Warning every " + Limit + "min]",false);
					setTimeout(loop,5e4);
				}
				break;

			case "check":
				if (msg1){var n = 0;}
				else if (!msg1){var n = 1;}
				if (msgOn === true){
					l(" 🚨 🚨 🚨 🚨 🚨 [:anger: " + Potato + " minutes remaining]");
					l(" 🚨 🚨 🚨 🚨 🚨 [Message is: " + mm[n] + "]");
				}else{
					l(" 🚨 🚨 🚨 🚨 🚨 [:anger: Messages are disabled]");
					l(" 🚨 🚨 🚨 🚨 🚨 [Message is: " + mm[n] + "]");
				}
				break;

			case "send":
				if (msg1){var n = 0;}
				else if (!msg1){var n = 1;}
				message(n);
				break;

			case "emojis":
				l('~=[,,_,,]:3 🚨 🚨 || 🚨 🚨 ¬_¬ 🚨 🚨 || 🚨 🚨 ಠ_ಠ',false);
				l('ლ(ಥ益ಥლ 🚨 🚨 || 🚨 🚨 (っ◔‿◔)っ 🚨 🚨 || 🚨 🚨 (╥﹏╥)',false);
				l('(─‿‿─) 🚨 || 🚨 (ʃƪ ˘ ³˘) 🚨 || 🚨 ( ͡° ͜ʖ ͡°)',false);
				l('(ᕗ ಠ益ಠ)ᕗ ︵﻿ ┻━┻ 🚨 || 🚨 (╯°□°)╯︵ ┻━┻',false);
				l(' 🚨 🚨 🚨 🚨 ¯\\_(ツ)_/¯',false);
				break;

			//p3
			case "lockskip":case "skip":case "commands":case "nick":case "avail":
			case "afk":case "work":case "sleep":case "join":case "leave":case "whoami":
			case "refresh":case "version":case "mute":case "link":case "unmute":
			case "nextsong":case "automute":case "alertson":case "alertsoff":
			case "getpos":case "ignore":case "whois":case "kick":case "add":
			case "remove":case "lock":case "unlock":case "help":case "me":case "em":
				break;
			
			case "thelp":
				l(" 🚨 ------=[ TBOT Alpha v1.0 ]=------",true);
				l(" 🚨 🚨 🚨 🚨 🚨 /txt || Turns messages on (1 hour interval)",false);
				l(" 🚨 🚨 🚨 🚨 🚨 /check || Shows msg and time",false);
				l(" 🚨 🚨 🚨 🚨 🚨 /send || Sends the message regardless of interval",false);
				l(" 🚨 🚨 🚨 🚨 🚨 /thelp || This message",false);
				l(" 🚨 🚨 🚨 🚨 🚨 Meh message: " + mehmsg + " (/mmsg)",false);
				l(" 🚨 🚨 🚨 🚨 🚨 Grab message: " + grabmsg + " (/gmsg)",false);
				l(" 🚨 🚨 🚨 🚨 🚨 Join message: " + joinmsg + " (/jmsg)",false);
				l(" 🚨 🚨 🚨 🚨 🚨 Auto cap: " + cap + " (/setcap)",false);
				l(" 🚨 🚨 🚨 🚨 🚨 Auto join: " + autolock + " (/autojoin)",false);
				l(" 🚨 ------=[ TBOT Alpha v1.0 ]=------",true);
				break;

			default:
				l(" 🚨 🚨 🚨 🚨 🚨 :exclamation: Command " + command[0] + " is not a command!",false);
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
		l(" 🚨 🚨 🚨 🚨 Beta's Client Support Script - Activated",false);
		l(" 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 🚨 Do /thelp for commands",false);
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
