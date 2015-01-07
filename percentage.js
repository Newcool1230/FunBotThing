function displayLvl(){
	$("#footer-user .percentage").remove();
	var lvl = $("#footer-user .progress").attr('style');
	var lvlPc = lvl.substring(6,lvl.length - 1);
	$("#footer-user .progress").append('<div class="percentage" style="font-size: 10px; position:block; margin-left:50px; margin-top:-1px"><b>' + lvlPc + '</b></div>');
}
displayLvl();
$("#footer-user .bar").mouseenter(function(){$("#footer-user .percentage").hide();});
$("#footer-user .bar").mouseleave(function(){$("#footer-user .percentage").show();});
API.on(API.ADVANCE,displayLvl);

/*
//\\//\\ Actually important ^ //\\//\\
\\//\\// Not really important v \\//\\//
*/

//Stolen from Igor's script <3//
function addChat(text, color, state, size) {
	var chat = $('#chat-messages'),
		a = chat.scrollTop() > chat[0].scrollHeight - chat.height() - 28;

	if (color == undefined)
		color = "#9fee00";

	if (state){
		chat.append("<div class='update percentage-update' style='border-left: double 6px " + color + "';'><center><span class='antitroll-text' style='color: " + color + "; " + si + "'>" + text + "<br></span></center></div>");
	}else{
		chat.append("<div class='update percentage-update' style=''><center><span class='antitroll-text' style='color: " + color + "; " + si + "'>" + text + "<br></span></center></div>");
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

addChat("<a style='color:#ececec;'>Beta Tester's percentage script initiated!</a><br>\
	<a style='color:#eb9595;'>Beta v0.6</a>","#CCCCCC");
