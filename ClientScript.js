if(window.location.hostname === "plug.dj"){
	//This script was made by Beta Tester (https://plug.dj/@/beta-tester)
	//Initial CSS help from Marciano

	var u = API.getUser().username;

	var off;var on;
	if (API.getUser().role == 0){off = 1;on = 0;}
	else{off = 0;on = 1;};

	var messages = [];
	var logcheck = [];

	var menu = '\
		<section id="xprequel">\
			<div id="xtitle" class="xtxt">BetaBot - Alpha</div>\
		</section>\
		<section id="xmain">\
			<div id="xjoinmsg" class="xbutton">Join Message</div>\
			<div id="xgrabmsg" class="xbutton">Grab Message</div>\
			<div id="xmehmsg" class="xbutton">Meh Message</div>\
			<div id="xsongup" class="xbutton">Song Updates</div>\
			<div id="xautowoot" class="xbutton">AutoWoot</div>\
			<div id="xautojoin" class="xbutton">AutoJoin</div>\
			<div id="xautograb" class="xbutton">AutoGrab</div>\
			<div id="xautocap" class="xbutton">AutoCap</div>\
			<div id="xafk" class="xbutton">AFK</div>\
			<div id="xpuff" class="xbutton">THe Puff</div>\
		</section>\
		<section id="xmod">\
			<div id="xtimeskip" class="xbutton">8min warning</div>\
			<div id="xdel" class="xbutton">Delete All Chat</div>\
			<div id="xmuter" class="xbutton">Alt Muter</div>\
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
			#xmain {\
				position: absolute;\
				top: 95px;\
				padding: 10px;\
				width: 130px;\
				background-color: #111317;\
				outline: #FFFFFF double;\
				z-index: 10;\
				font-family: "Open Sans", sans-serif;\
			}\
			#xmod {\
				position: absolute;\
				top: 320px;\
				padding: 10px;\
				width: 130px;\
				background-color: #111317;\
				outline: #FFFFFF double;\
				z-index: 10;\
				font-family: "Open Sans", sans-serif;\
			}\
			#xmain .ativo {color: #42A5DC;}\
			#xmod .ativo {color: #42A5DC;}\
			.xtxt: {color: #3366FF; padding: 2px 15px;}\
			.xtxt:hover, #xprequel .ativo:hover {color: #DCDCDC;}\
			.xbutton: {color: #D1D1D1; padding: 2px 15px;}\
			.xbutton:hover, #xmain .ativo:hover {cursor: pointer; color: #89be6c;}\
		</style>\
	';

	$('#room').append(menu);
	$('body').prepend(style);
	$('#meh').animate({left:"-1px"});
	$('#woot').animate({left:"1px"});
	$("#room .app-right").animate({width:"399"});
	$('#chat-input-field').animate({width:"360"});
	$("#chat-input").animate({width:"380"});
	$("#grab .top .icon").animate({left:"22"});
	$("#grab .top .label").remove();
	$("#woot .top .icon").animate({left:"22"});
	$("#woot .top .label").remove();
	$("#meh .top .icon").animate({left:"20"});
	$("#meh .top .label").remove();
	$("#playlist-meta").animate({width:"1200"});
	$("#footer-user").animate({left:"1200"});
	$("#footer-user .info .points").animate({left:"235"});
	$("#footer-user .info .meta .bar").animate({width:"123"});
	/** Pirate Mode */
	//$("#chat-input-field").mousemove(function(){$("#chat-input-field").attr({"placeholder":"Ay mate! Press the rat to board this ship!"})});
	//$("#grab .top .label").text("Snag");
	//$("#woot .top .label").text("Yarr!");
	//$("#meh .top .label").text("Nay");
	//$("#dj-button span").text("Walk the Plank");
	/** End of Pirate Mode */

	var autowoot = true;
	var joinmsg = true;
	var grabmsg = true;
	var mehmsg = true;
	var songup = true;
	var lockPuff = false;
	var autolock = false;
	var cap = false;
	var autograb = false;
	var mutedood = false;
	var pufflock = false;
	var afkmsg = false;
	var timeskip = true;

	$('#xautowoot').toggleClass('ativo');
	$('#xjoinmsg').toggleClass('ativo');
	$('#xgrabmsg').toggleClass('ativo');
	$('#xmehmsg').toggleClass('ativo');
	$('#xsongup').toggleClass('ativo');
	$('#xtimeskip').toggleClass('ativo');

	$('#xjoinmsg').on('click',	function(){ joinmsg = !joinmsg;	$(this).toggleClass('ativo');});
	$('#xgrabmsg').on('click',	function(){ grabmsg = !grabmsg;	$(this).toggleClass('ativo');});
	$('#xmehmsg').on('click',	function(){ mehmsg = !mehmsg;	$(this).toggleClass('ativo');});
	$('#xautocap').on('click',	function(){ cap = !cap;			$(this).toggleClass('ativo');});
	$('#xautograb').on('click',	function(){ autograb = !autograb;$(this).toggleClass('ativo');});
	$('#xautojoin').on('click',	function(){ autolock = !autolock;$(this).toggleClass('ativo');});
	$('#xautowoot').on('click',	function(){ autowoot = !autowoot;$(this).toggleClass('ativo');});
	$('#xsongup').on('click',	function(){ songup = !songup;	$(this).toggleClass('ativo');});
	$('#xpuff').on('click',		function(){ pufflock = !pufflock;$(this).toggleClass('ativo');});
	$('#xmuter').on('click',	function(){ mutedood = !mutedood;$(this).toggleClass('ativo');});
	$('#xafk').on('click',		function(){ afkmsg = !afkmsg;	$(this).toggleClass('ativo');});
	$('#xdel').on('click',		function(){
		var r = confirm("Delete entire chat on log?");
		if (r === true) {
			deleteAll();
		}else{
			l("[Command DELETEALL denied]",true);
		};
	});
	$('#xtimeskip').on('click',	function(){ timeskip = !timeskip;$(this).toggleClass('ativo');});

	$("#chat-messages").click(displayid);
	$("#dj-canvas").mousemove(displayid);
	$("#audience-canvas").mousemove(displayid);

	function displayid(){
		$("#Id_display").remove();
		var e = $("#user-rollover .username").text();
		var t;
		var n = API.getUsers();
		for (var i = 0; i < n.length; i++) {
			if (n[i].username == e) {
				t = n[i].id
			}
		}
		var a = "Open Sans";
		if (t == "undefined"){t = "0000000"}
		$('#user-rollover .meta .joined').css({top:"64px"});
		$("#user-rollover .info").append('<div id="Id_display" style="position:absolute; top:-21px; left:108px; color:#808691; font-size: 11px; font-family: ' + a + ', sans-serif;">ID: ' + t + "     </div>");
	}

	function c(msg){API.sendChat(msg);}
	function l(msg,state){API.chatLog(msg,state);}
	function woot(){
		$('#woot').click();
	}

	API.on(API.GRAB_UPDATE, function(obj){
		var media = API.getMedia();
		if (grabmsg){addChat("" + obj.user.username + " (ID " + obj.user.id + ") grabbed","#c5e0ff");};
	});

	var blunq = new Audio();
	blunq.src = "https://cdn.plug.dj/_/static/sfx/badoop.801a12ca13864e90203193b2c83c019c03a447d1.mp3";
	blunq.load();

	var coollock = false;
	tet = ["beta","beta tester"];

	API.on(API.CHAT, function(data){
		var msg = data.message;
		var user = data.un;
		var userid = data.uid;
		var me = API.getUser().username;
		var tst = msg.indexOf('@Beta Tester');
		if (userid != "undefined" && me == "Beta Tester"){
			for (var i = 0; i < tet.length; i++){
				var zz = msg.toLowerCase().indexOf(tet[i]);
				if (zz != -1){
					blunq.play();
				}
			}
			if (tst != -1){
				if (!coollock && afkmsg){
					c('[AFK] @' + user + ' "Beta is busy right now", says Beta, explaining the situation');
					coollock = true;
					setTimeout(function(){coollock = false},60000);
				}
				/*<div class="cm mention is-you" data-cid="3436894-aa52cb9f13">
					<div class="badge-box clickable">
					<i class="bdg bdg-winter08">
					</i>
					</div>
					<div class="msg">
					<div class="from">
					<span class="un clickable">Marciano</span>
					<span class="timestamp" style="display: inline;">02:07</span>
					</div>
					<div class="text cid-3436894-aa52cb9f13">
					<span class="name">@Beta Tester</span> ¯\_(ツ)_/¯ </div>
					</div>
				</div>*/
			}
		}
	});
	
	
	API.on(API.CHAT, function(data) {
		if (data.un == API.getUser().username){
			$('.chat-id-' + data['chatID']).attr('style','background-image:url(https://raw.github.com/Maxorq/LastPlug/c75755255596c8e2f35fc087f6abfc2a6d875adf/img/sparkle.gif);');
		}
		$("#playlist-meta").css({width:"1200"});
	});

	API.on(API.VOTE_UPDATE, function(obj){
		if (obj.vote == -1){
			if (mehmsg){addChat("" + obj.user.username + " (ID " + obj.user.id + ") meh'ed this","#ff8585");};
		}
	});

	API.on(API.ADVANCE, function(){
		if (autograb){
			grab();
		}
		if (autowoot){
			setTimeout(woot,5000);
		}
		if (timeskip){
			if (API.getMedia().duration > 480){
				blunq.play();
				addChat("<b>Song is over 8 minutes</b>","#ff3535",true,true);
			}
		}
	});

	var save;

	API.on(API.USER_JOIN, function(user){
		if (mutedood){
			if (user.level == 1){
				API.moderateMuteUser(user.id,1,API.MUTE.SHORT);
				save = user.id;
			}
		}
	});

	API.on(API.USER_JOIN, ujoined);
	API.on(API.USER_LEAVE, uleft);

	function ujoined(user) {
		if (user.friend){
			var f = "Your friend ";
			var c = "#c5ffcc";
		}else{
			var f = "";
			var c = "#7774ff";
		}
			if (user.level > 1 && joinmsg){addChat(f + user.username + " (ID " + user.id + ") joined",c);};
			if (user.level == 1 && joinmsg){addChat(f + user.username + " (ID " + user.id + ") joined (Lvl 1)","#fef8a0");};
		JoinLeave(user);
	};

	function uleft(user){
		if (user.friend){
			var f = "Your friend ";
			var c = "#c5ffcc";
		}else{
			var f = "";
			var c = "#7774ff";
		}
		if (joinmsg){addChat(f + user.username + " (ID " + user.id + ") left",c);};
		JoinLeave(user);
	};

	c('/cap 10');

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
					if (thiscap <= 10){currentcap = thiscap;}
					else{thiscap = 10;currentcap = thiscap;}
					c('/cap ' + parseInt(currentcap));
					addChat('Cap set to ' + currentcap,"#c5b5ff");
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
			l(":green_heart: " + obj.lastPlay.score.positive + "     |     :purple_heart: " + obj.lastPlay.score.grabs + "     |     :broken_heart: " + obj.lastPlay.score.negative,false);
			addChat("<b>       Now playing:</b> " + obj.media.title + "<br>\
						<b>     Author:</b> " + obj.media.author,"#ececec",true,true);
			addChat("<b>       Current DJ:</b> " + obj.dj.username + " (ID " + obj.dj.id + ")","#ececec",true,true);
		}
	}

	function deleteAll(){
		var user = API.getUser();
		var msgs = document.getElementsByClassName('message');
		var emotes = document.getElementsByClassName('emote');
		var mentions = document.getElementsByClassName('mention');
		//if (user.username == "Beta Tester"){
			for (var i = 0; i < msgs.length; i++) {
				for (var j = 0; j < msgs[i].classList.length; j++) {
					if (msgs[i].classList[j].indexOf('message') == 0) {
						$.ajax({type: 'DELETE', url: '/_/chat/' + msgs[i].getAttribute('data-cid')});
					}
				}
			}
			for (var i = 0; i < emotes.length; i++) {
				for (var j = 0; j < emotes[i].classList.length; j++) {
					if (emotes[i].classList[j].indexOf('emote') == 0) {
						$.ajax({type: 'DELETE', url: '/_/chat/' + emotes[i].getAttribute('data-cid')});
					}
				}
			}
			for (var i = 0; i < mentions.length; i++) {
				for (var j = 0; j < mentions[i].classList.length; j++) {
					if (mentions[i].classList[j].indexOf('mention') == 0) {
						$.ajax({type: 'DELETE', url: '/_/chat/' + mentions[i].getAttribute('data-cid')});
					}
				}
			}
			return l("[Chat cleared]",true);
		//}else{
		//	l("[You are not Beta Tester. Access denied]",true)
		//}
	}

	API.on(API.CHAT, function(data){
		var msg = data.message;
		var msgid = data.cid;
		var user = data.un;
		var userid = data.uid;
		var lelock = false;
		var count = 0;
		var argument = "[MSG] " + msg + " || User: " + user + " || MsgID: " + msgid + " || UserID: " + userid;
		if (typeof user != "undefined"){
			logcheck.push(argument);
			messages.push(msgid.toString());
			//Ghostbusters \/

		};
		if (pufflock){
			if (user == "THe Puff"){
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
									//addChat("Like wtf how'd you get Steven to say hi","#AA3333");
									c("Heya shmoobey butt! - Credits to 'THe Puff' for suggesting a sentence. (C) 2014 All Rights Reserved | Protected by Creative Commons 4.0");
									lockPuff = true;
									setTimeout(function(){lockPuff = false;},3000);
								}
							}
						}
						break;
				}
			};
		}
	});

	function getuid(uname,oname){
		var toggle = false;
		for (var i = 0; i < API.getUsers().length; i++){
			if (API.getUsers()[i].username.toLowerCase() == uname){
				addChat("" + API.getUsers()[i].username + "'s ID is " + API.getUsers()[i].id,"#ececec");
				toggle = true;
			}
		}
		if (!toggle){
			addChat("User " + oname + " doesn't exist / not in the room.","#ececec");
		}
	}

	function grab(){
		setTimeout(function(){$("#grab").click();}, 500);
		setTimeout(function(){$($(".grab .menu ul li")[0]).mousedown();}, 500);
	}

	function lookfor(id){
		$.ajax({
			type: 'GET',
			url: 'https://plug.dj/_/users/' + id
		}).done(function(user) {
			data = user.data[0];
			switch (data.status){
				case 0:var stt = "Available (0)";break;
				case 1:var stt = "Away (1)";break;
				case 2:var stt = "Working (2)";break;
				case 3:var stt = "Gaming (3)";break;
				case 4:var stt = "Offline / Undefined";break;
				default:var stt = "Wot.";
			}
			switch(data.badge){
				case "bt":			var bb = "Beta Tester";break;
				case "ss":			var bb = "Plug SuperStar";break;
				case "og":			var bb = "Original Ganster";break;
				case "ea":			var bb = "Early Adopter";break;
				case "ba":			var bb = "Brand Ambassador";break;
				case "admin":		var bb = "Admin Badge";break;
				case "plot":		var bb = "Translator Badge";break;
				case "winter01":	var bb = "Ski Boot";break;
				case "winter02":	var bb = "Snowman Badge";break;
				case "winter03":	var bb = "Snowflake Badge";break;
				case "winter04":	var bb = "Reindeer Badge";break;
				case "winter05":	var bb = "Penguin Badge";break;
				case "winter06":	var bb = "Tree Badge";break;
				case "winter07":	var bb = "Ski Badge";break;
				case "winter08":	var bb = "Snowboard Badge";break;
				case "winter09":	var bb = "Ice Skating";break;
				case "winter10":	var bb = "Hockey Badge";break;
				case "music01":		var bb = "Record Player";break;
				case "music02":		var bb = "Musical Keyboard";break;
				case "music03":		var bb = "Compact Cassette";break;
				case "music04":		var bb = "Disco Ball";break;
				case "food01":		var bb = "Pizza Badge";break;
				case "food02":		var bb = "Ice Cream Badge";break;
				case "food03":		var bb = "Drink Badge";break;
				case "food04":		var bb = "Donut Badge";break;
				case "food05":		var bb = "Sushi Badge";break;
				case "animals01":	var bb = "Wolf Badge";break;
				case "animals02":	var bb = "Cat Badge";break;
				case "null":		var bb = "No Badge";break;
				default:			var bb = data.badge;
			}
			var jin = data.joined.split('-');
			var lk = jin[2].split(' ');
			var lj = lk[1].split('.');
			switch (jin[1]){
				case "01":	var mnt = "Jan";break;
				case "02":	var mnt = "Feb";break;
				case "03":	var mnt = "Mar";break;
				case "04":	var mnt = "Apr";break;
				case "05":	var mnt = "May";break;
				case "06":	var mnt = "Jun";break;
				case "07":	var mnt = "Jul";break;
				case "08":	var mnt = "Aug";break;
				case "09":	var mnt = "Sep";break;
				case "10":	var mnt = "Oct";break;
				case "11":	var mnt = "Nov";break;
				case "12":	var mnt = "Dec";break;
				default:	var mnt = "???";
			}
			switch (lk[0]){
				case "01":	var day = "st";break;
				case "02":	var day = "nd";break;
				case "03":	var day = "rd";break;
				default:	var day = "th";
			}
			var jnd = mnt + " " + lk[0] + day +  " " + jin[0] + " at " + lj[0];

			if (data.gRole < 3){var g = "Regular (" + data.gRole + ")";};
			if (data.gRole == 3){var g = "Brand Ambassador (" + data.gRole + ")";};
			if (data.gRole > 3){var g = "Admin (" + data.gRole + ")";};

			if (data.username == null){
				addChat("<b>    User has not updated yet!</b>","#CCCCCC");
			}else{
				addChat("<b>    Name:</b> " + data.username + "<br><b>\
				    Blurb:</b> " + data.blurb + "<br><b>\
				    ID:</b> " + data.id + "<br><b>\
				    Level:</b> " + data.level + "<br><b>\
				    Avatar:</b> " + data.avatarID + "<br><b>\
				    Status:</b> " + stt + "<br><b>\
				    Role:</b> " + g + "<br><b>\
				    Joined:</b> " + jnd + "<br><b>\
				    Badge:</b> " + bb, "#CCCCCC");
			}
		});
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
				ct("You must wait 10 minutes before you can post links on chat after you join a room. This is done to prevent spam.");
				break;

			case "nsfw":
				ct('NSFW means Not Safe For Watching (objectionable content) -- nudity, scant clothing (incl. lingerie), blood and or violence (gore), snuff (dying)');
				break;

			case "mutedood":
				mutedood = !mutedood;
				break;

			case "unmutedood":
				API.moderateUnmuteUser(save);
				break;
				
			case "del":
				$.ajax({
					type: 'DELETE',
					url: '/_/chat/' + command[1]
				});
				break;

			case "lookup":
				lookfor(command[1]);
				break;

			case "search":
				var xname = command[1].substring(1).toString();
				var oname = xname.substring(0,xname.length - 2);
				var uname = oname.toLowerCase();
				console.log(xname + "||" + uname + "||" + oname);
				for (var i = 0; i < API.getUsers().length; i++){
					if (oname == API.getUsers()[i].username){
						lookfor(API.getUsers()[i].id);
					}
				}
				break;

			case "cya":
				ct("Cya later! c: Thanks a lot for passing by! o/");
				break;

			case "shrug":
				c(command[1] + " ¯\\_(ツ)_/¯");
				break;

			case "quote":
				c("/me ❝ " + command[1] + " ❞");
				break;

			case "sing":
				c("/me ♪ " + command[1] + " ♫");
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
					addChat('Join message on',"#ececec");
				}else if (!joinmsg){
					addChat('Join message off',"#ececec");
				}
				break;

			case "grabmsg":
			case "gmsg":
				grabmsg = !grabmsg;
				if (grabmsg){
					addChat('Grab message on',"#ececec");
				}else if (!grabmsg){
					addChat('Grab message off',"#ececec");
				}
				break;
			
			case "mehmsg":
			case "mmsg":
				mehmsg = !mehmsg;
				if (mehmsg){
					addChat('Meh message on',"#ececec");
				}else if (!mehmsg){
					addChat('Meh message off',"#ececec");
				}
				break;

			case "autojoin":
			case "auto":
				autolock = !autolock;
				if (autolock){
					addChat('Autojoin on',"#ececec");
				}else if (!autolock){
					addChat('Autojoin off',"#ececec");
				}
				break;

			case "togglecap":
			case "captoggle":
			case "capset":
			case "setcap":
				cap = !cap;
				if (cap){
					addChat('AutoCap on',"#ececec");
				}else if (!cap){
					addChat('AutoCap off',"#ececec");
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
				setTimeout(function(){ct('~for a certain amount of them, and they do not need to be earned sequentially (you can earn 3 ticks now, 4 ticks later, etc.)');},250);
				break;

			case "pp":
			case "points":
			case "point":
				ct("The website check every minute what you did in the website during that time (such as Wooting, chatting, etc), and then generates a proportional amount of XP and PP for it. XP, however, has a daily cap, so you can't farm it.");
				break;

			case "pn":
			case "notes":
				ct("Plug Notes (PNs) are a reward for donating to plug.dj. Everyone gets free 350PNs though, for testing how they work");
				break;

			case "rank":
			case "ranks":
				ct("Help people out, be active and be online often, and you'll eventually be noticed by our staff. We'll watch you for some time, then decide whether you deserve a rank or not.");
				break;

			case "clearall":
			case "deleteall":
				//var r = confirm("Delete entire chat on log?");
				//if (r === true) {
					deleteAll();
				//}else{
				//	l("[Command " + command[0] + " denied]",true);
				//};
				break;

			case "msgs":
				addChat("[Messages length: " + messages.length + "]", "#ececec");
				break;

			case "logcheck":
			case "checklog":
				console.log(logcheck);
				addChat("[Check console for chat log since last clear]","#ececec");
				break;

			case "logclear":
			case "clearlog":
				logcheck = [];
				addChat("[Log cleared.]","#ececec");
				break;

			case "mutes":
				break;

			case "12":
				ct('ᄅ⇂');
				break;

			case "txt":
				if (msgOn){
					msgOn = false;
					addChat("[Warning turned off]","#ececec");
				}else if(!msgOn){
					msgOn = true;
					addChat("[Warning every " + Limit + "min]","#ececec");
					setTimeout(loop,5e4);
				}
				break;

			case "check":
				if (msg1){var n = 0;}
				else if (!msg1){var n = 1;}
				if (msgOn === true){
					addChat("[" + Potato + " minutes remaining]","#ececec");
					addChat("[Message is: " + mm[n] + "]","#ececec");
				}else{
					addChat("[Messages are disabled]","#ececec");
					addChat("[Message is: " + mm[n] + "]","#ececec");
				}
				break;

			case "send":
				if (msg1){var n = 0;}
				else if (!msg1){var n = 1;}
				message(n);
				break;

			case "emojis":
				addChat('~=[,,_,,]:3     ||     ¬_¬     ||     ಠ_ಠ',"#ececec");
				addChat('ლ(ಥ益ಥლ     ||     (っ◔‿◔)っ     ||     (╥﹏╥)',"#ececec");
				addChat('(─‿‿─)   ||   (ʃƪ ˘ ³˘)   ||   ( ͡° ͜ʖ ͡°)',"#ececec");
				addChat('(ᕗ ಠ益ಠ)ᕗ ︵﻿ ┻━┻   ||   (╯°□°)╯︵ ┻━┻',"#ececec");
				addChat('¯\\_(ツ)_/¯',"#ececec");
				break;

			case "readd":
				var ledj = API.getDJ().id;
				API.moderateForceSkip();
				setTimeout(function(){API.moderateAddDJ(ledj);}, 1000);
				setTimeout(function(){API.moderateMoveDJ(ledj,1);}, 2000);
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
				addChat("------=[ TBOT Alpha v1.0 ]=------","#7174ff");
				addChat("/txt || Turns messages on (1 hour interval)","#ececec");
				addChat("/check || Shows msg and time","#ececec");
				addChat("/send || Sends the message regardless of interval","#ececec");
				addChat("/thelp || This message","#ececec");
				addChat("Meh message: " + mehmsg + " (/mmsg)","#ececec");
				addChat("Grab message: " + grabmsg + " (/gmsg)","#ececec");
				addChat("Join message: " + joinmsg + " (/jmsg)","#ececec");
				addChat("Auto cap: " + cap + " (/setcap)","#ececec");
				addChat("Auto join: " + autolock + " (/autojoin)","#ececec");
				addChat("   ------=[ TBOT Alpha v1.0 ]=------","#7174ff");
				break;

			default:
				addChat("Command " + command[0] + " is not a command!","#fea6a6");
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
		addChat("Beta's Client Support Script - Activated","#ececec",true);
		addChat("Do /thelp for commands","#ececec",true);
	}

	function message(n){
		c(mm[n]);
		msg1 = !msg1;
	}

	function loop(){
		if (msgOn){
			OneMin++;
			Potato = Limit - OneMin;
			addChat(Potato + " minutes remaining","#ececec");
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

	function addChat(text, color, state, size) {
		var chat = $('#chat-messages'),
			a = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28;

		if (color == undefined)
			color = "#9fee00";
			
		if (state){
			chat.append("<div class='update antitroll-update' style='border-left: double 6px " + color + "';'><center><span class='antitroll-text' style='color: " + color + "; " + si + "'>" + text + "<br></span></center></div>");
		}else{
			chat.append("<div class='update antitroll-update' style=''><center><span class='antitroll-text' style='color: " + color + "; " + si + "'>" + text + "<br></span></center></div>");
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

}else{
	alert("This bot only functions at http://plug.dj/");
};
