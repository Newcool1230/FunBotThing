if(window.location.hostname === "plug.dj"){
	//This script was made by Beta Tester (https://plug.dj/@/beta-tester)
	//Initial CSS help from Marciano
	//Stole AddChat from Igor <3 Thanks a ton
	if (betaWasOn){
		addChat("<img src='https://i.imgur.com/Z7LDEp0.gif'></img><br><a style='color:#FF0000;font-size:15px;'><b>[WARNING]</b></a><a style='font-size:15px;'> You already had BetaBot activated. To update, please refresh and then click bookmark again. Reclicking doesn't work.</a>","#ff7575",true,true);
	}else{

	addChat("<br>Beta's <a style='color:#99ffd7;'><b>Client Support Script</b></a> is now active!<br><a style='color:#ffdd6f; font-size:10px'><em>Beta v0.5.1</em></a>","#ececec",true,true);

	var betaWasOn = true;
	var u = API.getUser().username;

	var off;var on;
	if (API.getUser().role == 0){off = 1;on = 0;}
	else{off = 0;on = 1;};

	var messages = [];
	var logcheck = [];

	var menu = '\
		<section id="xprequel">\
			<div id="xtitle" class="xtxt">&nbsp;</div>\
		</section>\
		<section id="xmain">\
			<div id="xjoinmsg" class="xbutton active">Join Message</div>\
			<div id="xgrabmsg" class="xbutton active">Grab Message</div>\
			<div id="xmehmsg" class="xbutton">Meh Message</div>\
			<div id="xsongup" class="xbutton active">Song Updates</div>\
			<div id="xautowoot" class="xbutton active">AutoWoot</div>\
			<div id="xautojoin" class="xbutton">AutoJoin</div>\
			<div id="xautograb" class="xbutton">AutoGrab</div>\
			<div id="xautocap" class="xbutton">AutoCap</div>\
			<div id="xafk" class="xbutton">AFK</div>\
			<div id="xline" class="xbutton active">Bootleg Inline Imgs</div>\
		</section>\
		<section id="xmod">\
			<div id="xtimeskip" class="xbutton active">8min warning</div>\
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
				background-image:url(https://i.imgur.com/ung12ij.png)\
			}\
			#xprequel .active {color: #42A5DC;}\
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
			#xmain .active {color: #42A5DC;}\
			#xmod .active {color: #42A5DC;}\
			.xtxt: {color: #3366FF; padding: 2px 15px;}\
			.xtxt:hover, #xprequel .active:hover {color: #DCDCDC;}\
			.xbutton: {color: #D1D1D1; padding: 2px 15px;}\
			.xbutton:hover, #xmain .active:hover {cursor: pointer; color: #89be6c;}\
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
	$("#search-input-field").attr({"maxlength":256})
	$(".emoji-trollface").replaceWith("<span style='background: url(https://i.imgur.com/osBR8Jj.png); width: 16px; height: 16px;'></span>");
	$("#dialog-container").css({left:"300px",top:"100px",width:"0px",height:"0px"});
	$("#chat .disconnect").css({left:"-200px",height:"50px",width:"200px",border:"dotted 2px #F00"});
	$("#chat .disconnect span").text("Connection lost");
	$("#chat .disconnect span").css({top:"10px"});
	$("#chat .spinner").hide();
	//if ($("#chat .disconnect span").text() == "Potato"){$("#chat-input-field").hide();}

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
	var inlineOn = true;

	$('#xjoinmsg').on('click',	function(){ joinmsg = !joinmsg;	$(this).toggleClass('active');});
	$('#xgrabmsg').on('click',	function(){ grabmsg = !grabmsg;	$(this).toggleClass('active');});
	$('#xmehmsg').on('click',	function(){ mehmsg = !mehmsg;	$(this).toggleClass('active');});
	$('#xautocap').on('click',	function(){ cap = !cap;			$(this).toggleClass('active');});
	$('#xautograb').on('click',	function(){ autograb = !autograb;$(this).toggleClass('active');});
	$('#xautojoin').on('click',	function(){ autolock = !autolock;$(this).toggleClass('active');});
	$('#xautowoot').on('click',	function(){ autowoot = !autowoot;$(this).toggleClass('active');});
	$('#xsongup').on('click',	function(){ songup = !songup;	$(this).toggleClass('active');});
	$('#xline').on('click',		function(){ inlineOn = !inlineOn;$(this).toggleClass('active');});
	$('#xmuter').on('click',	function(){ mutedood = !mutedood;$(this).toggleClass('active');});
	$('#xafk').on('click',		function(){ afkmsg = !afkmsg;	$(this).toggleClass('active');});
	$('#xdel').on('click',		function(){
		var r = confirm("Delete entire chat on log?");
		if (r === true) {
			deleteAll();
		}else{
			l("[Command DELETEALL denied]",true);
		};
	});
	$('#xtimeskip').on('click',	function(){ timeskip = !timeskip;$(this).toggleClass('active');});

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

	//Percentage on progress bar :D
	function displayLvl(){
		$("#footer-user .percentage").remove();
		var lvl = $("#footer-user .progress").attr('style');
		var lvlPc = lvl.substring(6,lvl.length - 1);
		$("#footer-user .progress").append('<div class="percentage" style="font-size: 10px; position:block; margin-left:50px; margin-top:-1px"><b>' + lvlPc + '</b></div>');
	}
	displayLvl();
	$("#footer-user .bar").mouseenter(function(){
		$("#footer-user .percentage").hide();
	});
	$("#footer-user .bar").mouseleave(function(){
		$("#footer-user .percentage").show();
	});
	API.on(API.ADVANCE,displayLvl);

	function c(msg){API.sendChat(msg);}
	function l(msg,state){API.chatLog(msg,state);}
	function woot(){
		$('#woot').click();
	}

	API.on(API.GRAB_UPDATE, function(obj){
		var media = API.getMedia();
		var d = new Date();
		var h = d.getHours();
		var m = d.getMinutes();
		var s = d.getSeconds();
		if (h < 10){h = "0" + h;}
		if (m < 10){m = "0" + m;}
		if (s < 10){s = "0" + s;}
		if (grabmsg){addChat("" + obj.user.username + " (ID " + obj.user.id + ") grabbed <br><a style='color:#dddddd;font-size:11px;'>[" + h + ":" + m + ":" + s + "]</a>","#c5e0ff");};
	});

	var blunq = new Audio();
	blunq.src = "https://cdn.plug.dj/_/static/sfx/badoop.801a12ca13864e90203193b2c83c019c03a447d1.mp3";
	blunq.load();

	var coollock = false;
	tet = ["beta","beta tester"];

	API.on(API.CHAT, function(data){
		var msg = data.message;
		var msgID = data.cid;
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
			}
		}

			//Bootleg Inline Images//
		if (inlineOn){
		var pn = ['.png','.gif','.jpg','.jpeg']
		for (var i = 0; i < pn.length; i++){
			var ht = msg.indexOf('http');
			var jp = msg.indexOf(pn[i]);
			if (ht != -1 && jp != -1){
				var hts = msg.replace("http","https");
				if (hts.indexOf("httpss") != -1){
					hts = hts.replace("httpss","https");
				}
				jp = jp + 5;
				var picLink = hts.slice(ht,jp);
				$("#chat-messages > .cm[data-cid='" + msgID + "']").append("<center><img style='margin:10px; max-width:335px' src='" + picLink + "'></img></center>");
			}
			var chat = $('#chat-messages');
			if (chat.scrollTop() > chat[0].scrollHeight - chat.height() - 50){
				chat.scrollTop(chat[0].scrollHeight);
			}
		}
		}
	});

	API.on(API.VOTE_UPDATE, function(obj){
		if (obj.vote == -1){
			var d = new Date();
			var h = d.getHours();
			var m = d.getMinutes();
			var s = d.getSeconds();
			if (h < 10){h = "0" + h;}
			if (m < 10){m = "0" + m;}
			if (s < 10){s = "0" + s;}
			if (mehmsg){addChat("" + obj.user.username + " (ID " + obj.user.id + ") meh'ed this <br><a style='color:#dddddd;font-size:11px;'>[" + h + ":" + m + ":" + s + "]</a>","#ff8585");};
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
				addChat("<b>Song is over 8 minutes</b>","#ff3535",true);
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
		var d = new Date();
		var h = d.getHours();
		var m = d.getMinutes();
		var s = d.getSeconds();
		if (h < 10){h = "0" + h;}
		if (m < 10){m = "0" + m;}
		if (s < 10){s = "0" + s;}
		if (user.level > 1 && joinmsg){addChat(f + user.username + " (ID " + user.id + ") joined <br><a style='color:#dddddd;font-size:11px;'>[" + h + ":" + m + ":" + s + "]</a>",c);};
		if (user.level == 1 && joinmsg){addChat(f + user.username + " (ID " + user.id + ") joined (Lvl 1) <br><a style='color:#dddddd;font-size:11px;'>[" + h + ":" + m + ":" + s + "]</a>","#fef8a0");};
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
		var d = new Date();
		var h = d.getHours();
		var m = d.getMinutes();
		var s = d.getSeconds();
		if (h < 10){h = "0" + h;}
		if (m < 10){m = "0" + m;}
		if (s < 10){s = "0" + s;}
		if (joinmsg){addChat(f + user.username + " (ID " + user.id + ") left <br><a style='color:#dddddd;font-size:11px;'>[" + h + ":" + m + ":" + s + "]</a>",c);};
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
					API.djJoin();
				}
			},300);
		}
	}
	autojoin();

	API.on(API.ADVANCE, function(obj){
		if (songup){
			//l(":green_heart: " + obj.lastPlay.score.positive + "&nbsp;&nbsp;|&nbsp;&nbsp;:purple_heart: " + obj.lastPlay.score.grabs + "&nbsp;&nbsp;|&nbsp;&nbsp;:broken_heart: " + obj.lastPlay.score.negative,false);
			addChat("<br><img src='https://i.imgur.com/fhagHZg.png'></img><br>\
					<b><a style='color:#90ad2f;'>" + obj.lastPlay.score.positive + "</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a style='color:#aa74ff;'>" + obj.lastPlay.score.grabs + "</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a style='color:#c42e3b;'>" + obj.lastPlay.score.negative + "</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a style='color:#646b7e;'>" + API.getUsers().length + "</a></b><br>\
					<a style='color:#e6ff99;'><b>Now playing:</b></a> " + obj.media.title + "<br>\
					<a style='color:#e6ff99;'><b>Author:</b></a> " + obj.media.author + "<br>\
					<a style='color:#e6ff99;'><b>Current DJ:</b></a> " + obj.dj.username + " (ID " + obj.dj.id + ")<br>","#ececec",true);
		}
	});

	function deleteAll(){
		var user = API.getUser();
		var msgs = document.getElementsByClassName('message');
		var emotes = document.getElementsByClassName('emote');
		var mentions = document.getElementsByClassName('mention');
		if (user.username == "Beta Tester"){
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
		}else{
			l("[You are not Beta Tester. Access denied]",true)
		}
	}

	var logged = [];
	API.on(API.CHAT, function(data){
		var msg = data.message;
		var msgid = data.cid;
		var user = data.un;
		var userid = data.uid;
		var d = new Date();
		var h = d.getUTCHours();
		var m = d.getUTCMinutes();
		var s = d.getUTCSeconds();
		if (h < 10){h = "0" + h;}
		if (m < 10){m = "0" + m;}
		if (s < 10){s = "0" + s;}
		var argument = "[UTC - " + h + ":" + m + ":" + s + "] [" + msgid + "] [" + userid + "] [" + user + "] - " + msg + "   |";
		if (typeof user != "undefined"){
			logcheck.push(argument);
			messages.push(msgid.toString());
		};
		if (userid == API.getUser().id){
			logged.unshift(msgid);
			console.log(msgid);
		};
		if (pufflock){
			if (user == "THe Puff" || user == "Epiphainein"){
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
									if (user == "THe Puff"){
										c("Heya shmoobey butt! - Credits to 'THe Puff' for suggesting a sentence. (C) 2014 All Rights Reserved | Protected by Creative Commons 4.0");
										lockPuff = true;
										setTimeout(function(){lockPuff = false;},3000);
									}else if (user == "Epiphainein"){
										c("Hey Pippy!");
										lockPuff = true;
										setTimeout(function(){lockPuff = false;},3000);
									}
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
				case 0:	var stt = "Available (0)";break;
				case 1:	var stt = "Away (1)";break;
				case 2:	var stt = "Working (2)";break;
				case 3:	var stt = "Gaming (3)";break;
				case 4:	var stt = "Offline / Undefined (4?)";break;
				default:var stt = "Wot.";
			}
			switch(data.badge){
				case "bt":			var bb = "Beta Tester (" + data.badge + ")";break;
				case "ss":			var bb = "Plug SuperStar (" + data.badge + ")";break;
				case "og":			var bb = "Original Gangster (" + data.badge + ")";break;
				case "ea":			var bb = "Early Adopter (" + data.badge + ")";break;
				case "ba":			var bb = "Brand Ambassador (" + data.badge + ")";break;
				case "admin":		var bb = "Admin Badge (" + data.badge + ")";break;
				case "plot":		var bb = "Translator Badge (" + data.badge + ")";break;
				case "winter01":	var bb = "Ski Boot (" + data.badge + ")";break;
				case "winter02":	var bb = "Snowman Badge (" + data.badge + ")";break;
				case "winter03":	var bb = "Snowflake Badge (" + data.badge + ")";break;
				case "winter04":	var bb = "Reindeer Badge (" + data.badge + ")";break;
				case "winter05":	var bb = "Penguin Badge (" + data.badge + ")";break;
				case "winter06":	var bb = "Tree Badge (" + data.badge + ")";break;
				case "winter07":	var bb = "Ski Badge (" + data.badge + ")";break;
				case "winter08":	var bb = "Snowboard Badge (" + data.badge + ")";break;
				case "winter09":	var bb = "Ice Skating (" + data.badge + ")";break;
				case "winter10":	var bb = "Hockey Badge (" + data.badge + ")";break;
				case "music01":		var bb = "Record Player (" + data.badge + ")";break;
				case "music02":		var bb = "Musical Keyboard (" + data.badge + ")";break;
				case "music03":		var bb = "Compact Cassette (" + data.badge + ")";break;
				case "music04":		var bb = "Disco Ball (" + data.badge + ")";break;
				case "food01":		var bb = "Pizza Badge (" + data.badge + ")";break;
				case "food02":		var bb = "Ice Cream Badge (" + data.badge + ")";break;
				case "food03":		var bb = "Drink Badge (" + data.badge + ")";break;
				case "food04":		var bb = "Donut Badge (" + data.badge + ")";break;
				case "food05":		var bb = "Sushi Badge (" + data.badge + ")";break;
				case "food06":		var bb = "Hamburguer Badge (" + data.badge + ")";break;
				case "food07":		var bb = "Fries Badge (" + data.badge + ")";break;
				case "animals01":	var bb = "Wolf Badge (" + data.badge + ")";break;
				case "animals02":	var bb = "Cat Badge (" + data.badge + ")";break;
				case "animals03":	var bb = "Chicken Badge (" + data.badge + ")";break;
				case "style01":		var bb = "Shoe Badge (" + data.badge + ")";break;
				case "style02":		var bb = "Joystick Badge (" + data.badge + ")";break;
				case "tiki01":		var bb = "Fat Tiki Mask (" + data.badge + ")";break;
				case "tiki02":		var bb = "Slim Tiki Mask (" + data.badge + ")";break;
				case "tiki03":		var bb = "Green Tree (" + data.badge + ")";break;
				case "tiki04":		var bb = "Purple Tree (" + data.badge + ")";break;
				default:
					if (data.badge == null){
						var bb = "<a style='color:#eaaeae;'>[None]</a>";
					}else{
						var bb = data.badge;
					}
					break;
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

			//** Supposed to be working but isn't **//
			var votestats = "<a style='color:#646b7e;'>Not in the room</a>";
			var grabstats = "";
			var votestate;
			var grabstate;
			for (var i = 0; i < API.getUsers().length; i++){
				if (API.getUsers()[i].username == data.username){
					votestate = API.getUsers()[i].vote;
					grabstate = API.getUsers()[i].grab;
				}
			}
			if (votestate == 1){votestats = "<a style='color:#90ad2f;'>Woot!</a>"}
			else if (votestate == 0){votestats = "<a style='color:#646b7e;'>None</a>"}
			else if (votestate == -1){votestats = "<a style='color:#c42e3b;'>Meh</a>"}
			if (grabstate === true){grabstats = "| <a style='color:#aa74ff;'>Grabbed!</a>"}
			else if (grabstate === false){grabstats = " <a style='color:#646b7e;'>| Didn't grab</a>"}

			if (API.getDJ().username == data.username){
				votestats = "<a style='color:#646b7e;'>Is currently DJ'ing</a>";
				grabstats = "";
			}
			//** Supposed to be working but isn't **//

			var blurbTrue = "<a style='color:#eaaeae;'>[None]</a>";
			if (data.blurb != null){
				blurbTrue = data.blurb;
			}

			var hasProfile = "<a style='color:#eaaeae;'>[No profile yet]</a>";
			var profileColor = "#eaaeae"
			if (data.level > 5){
				hasProfile = "";
				profileColor = "#aec9ea"
			}

			if (data.username == null){
				addChat("<b><a style='color:#eaaeae;'>[User has not updated yet!]</a></b>","#CCCCCC",false,false,true);
			}else{
				addChat("<br><a style='color:#42a5dc;'><b>Name:</b></a> " + data.username + "<br><b>\
				<a style='color:#42a5dc;'>Slug:</b></a> <a style='color: " + profileColor + ";' href='/@/" + data.slug + "' target='_blank'>" + data.slug + "</a> " + hasProfile + "<br><b>\
				<a style='color:#42a5dc;'>Blurb:</b></a> " + blurbTrue + "<br><b>\
				<a style='color:#42a5dc;'>ID:</b></a> " + data.id + "<br><b>\
				<a style='color:#42a5dc;'>Level:</b></a> " + data.level + "<br><b>\
				<a style='color:#42a5dc;'>Avatar:</b></a> " + data.avatarID + "<br><b>\
				<a style='color:#42a5dc;'>Status:</b></a> " + stt + "<br><b>\
				<a style='color:#42a5dc;'>Role:</b></a> " + g + "<br><b>\
				<a style='color:#42a5dc;'>Joined:</b></a> " + jnd + "<br><b>\
				<a style='color:#42a5dc;'>Badge:</b></a> " + bb + "<br><b>\
				<a style='color:#42a5dc;'>Vote:</b></a> " + votestats + grabstats,"#CCCCCC",false,false,true);
			}
		});
	}

	API.on(API.CHAT_COMMAND, function(data){
		var msg = data;
		var command = msg.substring(1).split(' ');
		if(typeof command[2] != "undefined"){
			for(var i = 2; i < command.length; i++){
				command[1] = command[1] + ' ' + command[i];
			};
		};
		if (typeof command[1] == "undefined"){command[1] = "";}
		else{command[1] = command[1] + " ";};
		function ct(msg){API.sendChat(command[1] + msg);};

		console.log("[COMMAND] " + command[0] + " || [ARGUMENT] " + command[1]);

		switch(command[0].toLowerCase()){
			case "timeout":
				ct("You must wait 10 minutes before you can post links on chat after you join a room. This is done to prevent spam.");
				break;

			case "nsfw":
				ct('NSFW means Not Safe For Watching (objectionable content) -- nudity, scant clothing (incl. lingerie), blood and or violence (gore), snuff (dying)');
				break;

			case "mc":
			case "minecraft":
				ct('plug.dj now has its own Minecraft server! http://blog.plug.dj/2014/12/plugcraft-server/ (IP is plugdj.mcph.co)');
				break;

			case "emojisheet":
			case "emojicheat":
				ct("http://www.emoji-cheat-sheet.com/");
				break;

			case "mutedood":
				mutedood = !mutedood;
				break;

			case "unmutedood":
				API.moderateUnmuteUser(save);
				break;

			case "thepuff":
				pufflock = !pufflock;
				break;

			case "sacrifice":
			case "offering":
				c("/me &nbsp;&nbsp;&nbsp;:fire: :fire: :fire: :fire: :fire:");
				setTimeout(function(){c("/me &nbsp;&nbsp;&nbsp;:fire: :fire: :goat: :fire: :fire:")},250);
				setTimeout(function(){c("/me &nbsp;&nbsp;&nbsp;:fire: :fire: :fire: :fire: :fire:")},500);
				setTimeout(function(){c("/me Please, all mighty Gods, accept this sacrifice!")},750);
				break;

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

			case "break":
				API.sendChat('/me  ');
				setTimeout(function(){API.sendChat('/del 0')},550);
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

			case "showoff":
				c("/me :fire: :star2: :fire: :boom: :fire: :boom: :fire: :star2: :fire:");
				setTimeout(function(){c("/me &nbsp;&nbsp;~A wild me appears~");},250);
				setTimeout(function(){c("/me :fire: :star2: :fire: :boom: :boom: :fire: :fire: :star2: :fire:");},500);
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
				ct('XP and PP are earned on ticks. There is a tick cap of 72 per day. After 6 hours (72 ticks), you hit the “XP cap” and will not gain XP until the next day. More info: http://goo.gl/7SDAAr');
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
				var r = confirm("Delete entire chat on log?");
				if (r === true) {
					deleteAll();
				}else{
					l("[Command " + command[0] + " denied]",true);
				};
				break;

			case "rainbow":
			case "rainbows":
			case "hearts":
				c(":heart: :yellow_heart: :green_heart: :blue_heart: :purple_heart: :heart: :yellow_heart: :green_heart: :blue_heart: :purple_heart:");
				setTimeout(function(){c(":purple_heart: :heart: :yellow_heart: :green_heart: :blue_heart: :purple_heart: :heart: :yellow_heart: :green_heart: :blue_heart:")},250);
				setTimeout(function(){c(":blue_heart: :purple_heart: :heart: :yellow_heart: :green_heart: :blue_heart: :purple_heart: :heart: :yellow_heart: :green_heart:")},500);
				setTimeout(function(){c(":green_heart: :blue_heart: :purple_heart: :heart: :yellow_heart: :green_heart: :blue_heart: :purple_heart: :heart: :yellow_heart:")},750);
				setTimeout(function(){c(":yellow_heart: :green_heart: :blue_heart: :purple_heart: :heart: :yellow_heart: :green_heart: :blue_heart: :purple_heart: :heart:")},1000);
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

			case "12":
				ct('ᄅ⇂');
				break;

			case "emojis":
				addChat('~=[,,_,,]:3     ||     ¬_¬     ||     ಠ_ಠ',"#ececec");
				addChat('ლ(ಥ益ಥლ     ||     (っ◔‿◔)っ     ||     (╥﹏╥)',"#ececec");
				addChat('(─‿‿─)   ||   (ʃƪ ˘ ³˘)   ||   ( ͡° ͜ʖ ͡°)',"#ececec");
				addChat('(ᕗ ಠ益ಠ)ᕗ ︵﻿ ┻━┻   ||   (╯°□°)╯︵ ┻━┻',"#ececec");
				addChat('¯\\_(ツ)_/¯',"#ececec");
				break;

			case "readd":
				//BUGGED!
				var userID = API.getDJ().id;
				API.once(API.ADVANCE, function() {
					API.once(API.WAIT_LIST_UPDATE, function() {
						API.moderateMoveDJ(userID, 1);
					});
					API.moderateAddDJ(userID);
				});
				API.moderateForceSkip();
				break;

			case "swap":
				//BUGGED!
				var arg = command[1];
				var n1 = arg.indexOf('@');
				var n2 = arg.lastIndexOf('@');
				var u1 = arg.slice(n1 + 1,n2 - 1).trim();
				var u2 = arg.slice(n2 + 1).trim();
				var id1;var id2;
				for (var i = 0; i < API.getUsers().length; i++){
					if (API.getUsers()[i].username == u1){
						n1 = API.getWaitListPosition(API.getUsers()[i].id);
						id1 = API.getUsers()[i].id;
					}
					if (API.getUsers()[i].username == u2){
						n2 = API.getWaitListPosition(API.getUsers()[i].id);
						id2 = API.getUsers()[i].id;
					}
				}
				if (n1 == -1){API.moderateAddDJ(id1);n1 = API.getWaitList().length;}
				if (n2 == -1){API.moderateAddDJ(id2);n2 = API.getWaitList().length;}
				var posTime1 = setTimeout(function(){API.moderateMoveDJ(id1,n2);},500);
				var posTime2 = setTimeout(function(){API.moderateMoveDJ(id2,n1);},750);
				switch ("undefined"){
					case typeof n1:case typeof n2:
					case typeof u1:case typeof u2:
					case typeof id1:case typeof id2:
						clearTimeout(posTime1);
						clearTimeout(posTime2);
						console.log("[ERROR]");
						console.log("n1 " + n1 + " | n2 " + n2);
						console.log("u1 " + u1 + " | u2 " + u2);
						console.log("id1 " + id1 + " | id2 " + id2);
				}
				break;

			case "ban":
				$.ajax({
					type: 'POST', 
					url: 'https://plug.dj/_/bans/add', 
					contentType: 'application/json',
					data: '{"userID":' + command[1] + ',"reason":1,"duration":"f"}'
					}).done(function(msg) {
							console.log(msg);
				});
				break;

			//p3
			case "lockskip":case "skip":case "commands":case "nick":case "avail":
			case "afk":case "work":case "sleep":case "join":case "leave":case "whoami":
			case "refresh":case "version":case "mute":case "link":case "unmute":
			case "nextsong":case "automute":case "alertson":case "alertsoff":
			case "getpos":case "ignore":case "whois":case "kick":case "add":
			case "remove":case "lock":case "unlock":case "help":case "me":case "em":
				break;
			
			case "cmds":
			case "cmd":
				addChat("<br><a style='color:#7174ff;'><b>------=[ Beta's Beta Script v0.5 ]=------</b></a><br><br>\
						<a style='color:#ffffff;'><b>/id @</b><em>NAME</em></a><br>\
						<a style='color:#CCCCCC;'>Returns the ID of that user</a><br><br>\
						<a style='color:#ffffff;'><b>/lookup </b><em>ID</em></a><br>\
						<a style='color:#CCCCCC;'>Returns info about specified user</a><br><br>\
						<a style='color:#ffffff;'><b>/search @</b><em>NAME</em></a><br>\
						<a style='color:#CCCCCC;'>Returns info about specified user</a><br><br>\
						<a style='color:#ffffff;'><b>/deleteall</b></a><br>\
						<a style='color:#CCCCCC;'>Deletes all chat since joining</a><br><br>\
						<a style='color:#ffffff;'><b>/del </b><em>MSG#</em></a><br>\
						<a style='color:#CCCCCC;'>Deletes message from you, using Array position</a><br><br>\
						<a style='color:#ffffff;'><b>/erase </b><em>MSGID</em></a><br>\
						<a style='color:#CCCCCC;'>Deletes message with specified ID<br>(regardless of it being sent before or after you joined)</a><br><br>\
						<a style='color:#e6ff99;'><b>/readd</b></a><br>\
						<a style='color:#e6ff99;'>Skips > Puts in WL > Moves to 1st<br>BUGGED</a><br><br>\
						<a style='color:#e6ff99;'><b>/swap @</b><em>NAME</em> <b>@</b><em>NAME</em></a><br>\
						<a style='color:#e6ff99;'>Swaps two people in the WaitList<br>BUGGED</a><br><br>\
						<a style='color:#ffaaaa;'><b>/ban </b><em>ID</em></a><br>\
						<a style='color:#CCCCCC;'>Permabans an user by its ID</a><br><br>\
						<a style='color:#7174ff;'><b>------=[ Beta's Beta Script v0.5 ]=------</b></a><br>","#CCCCCC");
				break;

			default:
				addChat("Command " + command[0] + " is not a command!","#fea6a6");
				break;
		};
	});

	//Stolen from Igor's script <3//
	function addChat(text, color, state, hasBottom, isNotCenter) {
		var chat = $('#chat-messages');
		var a = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28;

		if (color == undefined){
			color = "#99ffd7";
		}

		if (isNotCenter){
			chat.append("<div class='update betabot-update'><div class='text-margin' style='margin-left: 10px;'><span class='betabot-text' style='color: " + color + "; font-size: 12px;'>" + text + "<br></span></div></div>");
		}else{
			if (hasBottom){
				chat.append("<div class='update betabot-update' style='border-left: double 6px " + color + "; border-bottom: double 6px " + color + "'><center><span class='betabot-text' style='color: " + color + "; font-size: 13px;'>" + text + "<br></span></center></div>");
			}else{
				if (state){
					chat.append("<div class='update betabot-update' style='border-left: double 6px " + color + "; margin-top:5px;margin-bottom:5px;'><center><span class='betabot-text' style='color: " + color + "; font-size: 12px;'>" + text + "<br></span></center></div>");
				}else{
					chat.append("<div class='update betabot-update' style='margin-top:5px;margin-bottom:5px;'><center><span class='betabot-text' style='color: " + color + ";'>" + text + "<br></span></center></div>");
				}
			}
		}

		if (a){
			$('#chat-messages').scrollTop(50000);
		}
		if (chat.children().length >= 512){
			chat.children().first().remove();
		}
	}
	}
}else{
	alert("This bot only functions at http://plug.dj/");
};
