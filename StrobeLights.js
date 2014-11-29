if(window.location.hostname === "plug.dj"){
	API.chatLog("Strobe script activated!");
	var strobeon = false;
	function c(msg){API.sendChat(msg);};
	function l(msg,arg){API.chatLog(msg,arg);};

	API.on(API.CHAT_COMMAND, function(data){
		var msg = data;
		var command = msg.substring(1);

		switch(command.toString().toLowerCase()){
			case "strobe":case "togglestrobe":case "strobetoggle":
			case "strobelight":case "strobelights":
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
		};
	});
}else{
	alert("This script only functions at http://plug.dj/");
};
