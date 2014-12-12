if(window.location.hostname === "plug.dj"){

	API.chatLog('         :purple_heart:   AutoGrab enabled by default   :purple_heart:',false);
	API.chatLog('Do /stop to disable AutoGrab and /start to reenable it',false);
	API.on(API.CHAT_COMMAND, input);
	API.on(API.DJ_ADVANCE, grab);

	grab();
	var grablock = false;

	function input(com) {
		if (com == "/start") {
			grablock = false;
			API.chatLog(":purple_heart: AutoGrab enabled", false);
		}
		else if (com == "/stop") {
			grablock = true;
			API.chatLog(":purple_heart: AutoGrab disabled", false);
		}
	}

	function grab(){
		if (!grablock){
			setTimeout(function(){$("#grab").click();}, 100);
			setTimeout(function(){$($(".grab .menu ul li")[0]).mousedown();}, 100);
		}
	}

}else{
	alert("This script only functions at http://plug.dj/");
};
