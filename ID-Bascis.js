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
	$("#user-rollover .info").append('<div id="Id_display" style="position:absolute; top:-21px; left:108px; color:#808691; font-size: 11px; font-family: ' + a + ', sans-serif;">ID: ' + t + "     </div>");
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
			addChat("<b>    User has not updated yet!</b>","#ececec");
		}else{
			addChat("<b>    Name:</b> " + data.username + "<br><b>\
			    Blurb:</b> " + data.blurb + "<br><b>\
			    ID:</b> " + data.id + "<br><b>\
			    Level:</b> " + data.level + "<br><b>\
			    Avatar:</b> " + data.avatarID + "<br><b>\
			    Status:</b> " + stt + "<br><b>\
			    Role:</b> " + g + "<br><b>\
			    Joined:</b> " + jnd + "<br><b>\
			    Badge:</b> " + bb, "#ececec");
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
			addChat("__________","#eb9595");
			addChat("/<b>getid</b> + [<b>@username </b>]","#ececec");
			addChat("Returns user's ID (if user is in the room)","#c8c8c8");
			addChat("/<b>lookup</b> + [<b>UID</b>]","#ececec");
			addChat("Shows info about user (if user has updated to the new site)","#c8c8c8");
			addChat("/<b>search</b> + [<b>@username </b>]","#ececec");
			addChat("Shows info about user (if user is in the room)","#c8c8c8");
			addChat("/<b>shrug</b> + [<b>MSG</b>]","#ececec");
			addChat("Adds ¯\\_(ツ)_/¯ to the end of your message","#c8c8c8");
			addChat("/<b>quote</b> + [<b>MSG</b>]","#ececec");
			addChat("Italics message surrounded by ❝ ❞","#c8c8c8");
			addChat("/<b>sing</b> + [<b>MSG</b>]","#ececec");
			addChat("Italics message surrounded by ♪ ♫","#c8c8c8");
			addChat("¯¯¯¯¯¯¯¯¯¯","#eb9595");
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

addChat("Beta Tester's getID script initiated!","#ececec");
addChat("Beta v0.5","#eb9595");
addChat("Check commands with /cmd","#ececec");
