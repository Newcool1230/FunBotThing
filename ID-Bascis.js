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
	if (t == "undefined"){
		t = "0000000"
	}
	$('#user-rollover .meta .joined').css({top:"64px"});
	$("#user-rollover .info").append('<div id="Id_display" style="position:absolute; top:-21px; left:108px; color:#808691; font-size: 11px; font-family: ' + a + ', sans-serif;">ID: ' + t + "     </div>");
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
			case "og":			var bb = "Original Ganster (" + data.badge + ")";break;
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

		//** Supposed to be working but isn't */
		var votestats = 'None';
		var votestate = 0;
		for (var i = 0; i < API.getUsers().length; i++){
			if (API.getUsers()[i].username == data.username){
				votestate = API.getUsers()[i].vote;
			}
		}
		if (votestate == 1){votestats == "Woot!"}
		else if (votestate == 0){votestats == "None"}
		else if (votestate == -1){votestats == "Meh"}
		//** Supposed to be working but isn't */

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
			addChat("<b><a style='color:#eaaeae;'>[User has not updated yet!]</a></b>","#CCCCCC");
		}else{
			addChat("<b>Name:</b> " + data.username + "<br><b>\
			Blurb:</b> " + blurbTrue + "<br><b>\
			ID:</b> " + data.id + "<br><b>\
			Level:</b> " + data.level + "<br><b>\
			Avatar:</b> " + data.avatarID + "<br><b>\
			Status:</b> " + stt + "<br><b>\
			Role:</b> " + g + "<br><b>\
			Joined:</b> " + jnd + "<br><b>\
			Badge:</b> " + bb + "<br><b>\
			Slug:</b> <a style='color: " + profileColor + ";' href='/@/" + data.slug + "' target='_blank'>" + data.slug + "</a> " + hasProfile, "#CCCCCC");
		}
	});
}

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

function c(msg){
	API.sendChat(msg);
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
			var xname = command[1].substring(1).toString();
			var oname = xname.substring(0,xname.length - 2);
			var uname = oname.toLowerCase();
			console.log(xname + "||" + uname + "||" + oname);
			getuid(uname,oname);
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

		case "cmd":
			addChat("<a style='color:#eb9595;'>__________</a><br>\
			<a style='color:#ececec;'>/<b>getid</b> + [<b>@username </b>]</a><br>\
			<a style='color:#c8c8c8;'>Returns user's ID (if user is in the room)</a><br><br>\
			<a style='color:#ececec;'>/<b>lookup</b> + [<b>UID</b>]</a><br>\
			<a style='color:#c8c8c8;'>Shows info about user (if user has updated to the new site)</a><br><br>\
			<a style='color:#ececec;'>/<b>search</b> + [<b>@username </b>]</a><br>\
			<a style='color:#c8c8c8;'>Shows info about user (if user is in the room)</a><br><br>\
			<a style='color:#ececec;'>/<b>shrug</b> + [<b>MSG</b>]</a><br>\
			<a style='color:#c8c8c8;'>Adds ¯\\_(ツ)_/¯ to the end of your message</a><br><br>\
			<a style='color:#ececec;'>/<b>quote</b> + [<b>MSG</b>]</a><br>\
			<a style='color:#c8c8c8;'>Italics message surrounded by ❝ ❞</a><br><br>\
			<a style='color:#ececec;'>/<b>sing</b> + [<b>MSG</b>]</a><br>\
			<a style='color:#c8c8c8;'>Italics message surrounded by ♪ ♫</a><br>","#CCCCCC");
			addChat("<a style='color:#ff2e2e;'><b>Warning!</b></a><a style='color:#ececec;'><pre> </pre>[@username ] = '@' + 'username' + ' '</a><br>\
			<a style='color:#ececec;'>If the <b>@</b> and the <em><b>space</b></em> aren't inserted, it will not work!</a><br>\
			<a style='color:#eb9595;'>¯¯¯¯¯¯¯¯¯¯</a>","#CCCCCC");
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

addChat("<a style='color:#ececec;'>Beta Tester's getID script initiated!</a><br>\
	<a style='color:#eb9595;'>Beta v0.6</a><br>\
	<a style='color:#ececec;'>Check commands with /cmd</a>","#CCCCCC");
