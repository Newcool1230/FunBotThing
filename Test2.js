var Funbot = {};
var ruleSkip = {};
Funbot.misc = {};
Funbot.settings = {};
Funbot.moderators = {};
Funbot.filters = {};
botMethods = {};
Funbot.pubVars = {};
 
toSave = {};
toSave.settings = Funbot.settings;
toSave.moderators = Funbot.moderators;
 
Funbot.misc.version = "Edited by T98, former 1.1.18 version";
Funbot.misc.ready = true;
var songBoundary = 60 * 10;
var announcementTick = 60 * 20;
var lastAnnouncement = 0;

joined = new Date().getTime();
 
// Filterng Chat
Funbot.filters.beggerWords = new Array();
Funbot.filters.commandWords = new Array();

// Bot's settings
Funbot.settings.songLimit = 8; 
Funbot.settings.cooldown = 10; 
Funbot.settings.staffMeansAccess = true;
Funbot.settings.historyFilter = true;
Funbot.settings.beggerFilter = true;
Funbot.settings.commandFilter = true;
Funbot.settings.interactive = true;
Funbot.settings.ruleSkip = true;
Funbot.settings.removedFilter = true;

// Random announcements.
var announcements = [
"Make sure to check the OP List! http://bit.ly/GITOverPlayedEDMC",
"Read the rules, they are important! http://bit.ly/RulesEDMC",
"Make sure to check out our Facebook, it is a great way to keep updated! https://www.facebook.com/edmplugcommunity",
"Playlists looking bland? Go to bit.ly/YXNdkS and get some new music from our host's channel!"];

// Keywords of blocked songs
var blockedSongs = [];

// Keywords of blocked artist.
var blockedArtists = [];

// Filter Keywords
Funbot.filters.beggerWords = ["puto","viado","fdp","fuder","pnc","puta","filho da puta","bitch","nigger","nigga","mother fucker","motherfucker"];
Funbot.filters.commandWords = [".linkin",".say",".test",".ping",".marco",".reward",".add",".addsong",".flipcoin",".catfact",".dogfact",".hug",".8ball",".fortune",".songlink",".download",".help",".whywoot",".whymeh",".props",".votes",".woot",".meh",".version",".userstats @",".mystats",".source",".roomstats",".roomstats2",".register",".join",".leave",".roll"];


// Fun misc
Funbot.misc.tacos = ["Delicious", "Tasty"];
Funbot.misc.cookie = ["a chocolate chip cookie", "a sugar cookie", "an oatmeal raisin cookie", "a 'special' brownie", "an animal cracker", "a scooby snack", "a blueberry muffin", "a cupcake","Strawberry Sunday", "Chocolate Chip Icecream Cone", "Cookie Dough Triple Scoop ", "Mint Chocolate Chip Icecream Cone", "Chocolate Icecream Sunday", "Banana Split with Whipped Cream", "Vanilla Icecream Cone with Sprinkles ", "Bubblegum Flavored Popcicle"];
Funbot.misc.ball = [" [:8ball:] It is certain"," [:8ball:] It is decidedly so"," [:8ball:] Without a doubt"," [:8ball:] Yes definitely"," [:8ball:] You may rely on it"," [:8ball:] As I see it yes","[:8ball:] Nop.", " [:8ball:] Most likely"," [:8ball:] Outlook good"," [:8ball:] Yes"," [:8ball:] Signs point to yes :trollface:"," [:8ball:] Uh oh."," [:8ball:] Ask again later"," [:8ball:] Better not tell you now"," [:8ball:] Cannot predict now"," [:8ball:] Concentrate and ask again"," [:8ball:] Don't count on it"," [:8ball:] My reply is no"," [:8ball:] My sources say no"," [:8ball:] Outlook not so good"," [:8ball:] Very doubtful"];

Funbot.misc.ht = ["My magic coins says: Tails", "My magic coin says: Heads"];

Funbot.misc.roll = ["You rolled A 1. Bummer :(","You rolled A 2. Bummer :(","You rolled A 3. Bummer :("];
Funbot.misc.roll2 = ["4. Awesome!","5. Awesome!","6. Awesome!"];
 
Funbot.misc.catfact = [
"Cats have five toes on each front paw, but only four toes on each back paw.",
"Cats have true fur, in that they have both an undercoat and an outer coat.",
"Newborn kittens have closed ear canals that don''t begin to open for nine days.When the eyes open, they are always blue at first. They change color over a period of months to the final eye color.",
"Most cats have no eyelashes.","A cat cannot see directly under its nose.",
"You can tell a cat's mood by looking into its eyes. A frightened or excited cat will have large, round pupils. An angry cat will have narrow pupils. The pupil size is related as much to the cat's emotions as to the degree of light.",
"It is a common belief that cats are color blind. However, recent studies have shown that cats can see blue, green and red.",
"A cat can jump even seven times as high as it is tall.",
"The cat's footpads absorb the shocks of the landing when the cat jumps.",
"A cat is pregnant for about 58-65 days.",
"When well treated, a cat can live twenty or more years but the average life span of a domestic cat is 14 years.",
"Neutering a cat extends its life span by two or three years.",
"Cats can't taste sweets.",
"Cats must have fat in their diet because they can't produce it on their own.",
"Some common houseplants poisonous to cats include: English Ivy, iris, mistletoe, philodendron, and yew.",
"Tylenol and chocolate are both poisonous to cats.",
"Many cats cannot properly digest cow's milk.",
"The average cat food meal is the equivalent to about five mice.",
"Cats have AB blood groups just like people.",
"The color of the points in Siamese cats is heat related. Cool areas are darker.",
"The chlorine in fresh tap water irritates sensitive parts of the cat's nose. Let tap water sit for 24 hours before giving it to a cat.",
"Today there are about 100 distinct breeds of the domestic cat.",
"The first cat show was in 1871 at the Crystal Palace in London.",
"In ancient Egypt, mummies were made of cats, and embalmed mice were placed with them in their tombs. In one ancient city, over 300,000 cat mummies were found.",
"In ancient Egypt, killing a cat was a crime punishable by death.",
"The ancestor of all domestic cats is the African Wild Cat which still exists today.",
"Cats do not think that they are little people. They think that we are big cats. This influences their behavior in many ways.",
"Abraham Lincoln loved cats. He had four of them while he lived in the White House.",
"Julius Caesar, Henri II, Charles XI, and Napoleon were all afraid of cats.",
"Cats have an average of 24 whiskers, arranged in four horizontal rows on each side.",
"Almost 10% of a cat's bones are in its tail, and the tail is used to maintain balance.",
"Jaguars are the only big cats that don't roar.",
"A cat's field of vision is about 185 degrees.",
"The Maine Coon is 4 to 5 times larger than the Cingapura, the smallest breed of cat.",
"Retractable claws are a physical phenomenon that sets cats apart from the rest of the animal kingdom. In the cat family, only cheetahs cannot retract their claws.",
"A cat can sprint at about thirty-one miles per hour.",
"A cat can spend five or more hours a day grooming themselves.",
"The cat has been living in close association with humans for somewhere between 3,500 and 8,000 years.",
"The domestic house cat is a small carnivorous mammal. Its most immediate ancestor is believed to be the African wild cat.",
"Cats usually weigh between 2.5 and 7 kg (5.5–16 pounds), although some breeds can exceed 11.3 kg (25 pounds).",
"Domestic cats tend to live longer if they are not permitted to go outdoors.",
"Cats, in some cases, can sleep as much as 20 hours in a 24-hour period. The term cat nap refers to the cat's ability to fall asleep (lightly) for a brief period.",
"Cats dislike citrus scent.",
"A cat''s tongue has tiny barbs on it.",
"Cats can be right-pawed or left-pawed.",
"It has been scientifically proven that stroking a cat can lower one's blood pressure.",
"Six-toed kittens are so common in Boston and surrounding areas of Massachusetts that experts consider it an established mutation.",
"Cat families usually play best in even numbers. Cats and kittens should be acquired in pairs whenever possible."];
 
Funbot.misc.dogfact = [
"Three dogs (from First Class cabins!) survived the sinking of the Titanic – two Pomeranians and one Pekingese.",
"It’s rumored that, at the end of the Beatles song, “A Day in the Life,” Paul McCartney recorded an ultrasonic whistle, audible only to dogs, just for his Shetland sheepdog.",
"Puppies have 28 teeth and normal adult dogs have 42.",
"Dogs chase their tails for a variety of reasons: curiosity, exercise, anxiety, predatory instinct or, they might have fleas! If your dog is chasing his tail excessively, talk with your vet.",
"Dalmatian puppies are pure white when they are born and develop their spots as they grow older.",
"Dogs and humans have the same type of slow wave sleep (SWS) and rapid eye movement (REM) and during this REM stage dogs can dream. The twitching and paw movements that occur during their sleep are signs that your pet is dreaming",
"Dogs’ eyes contain a special membrane, called the tapetum lucidum, which allows them to see in the dark.",
"A large breed dog’s resting heart beats between 60 and 100 times per minute, and a small dog breed’s heart beats between 100-140. Comparatively, a resting human heart beats 60-100 times per minute.",
"According to a Petside.com - Press poll, 72% of dog owners believe their dog can detect when stormy weather is on the way.",
"A dog’s normal temperature is between 101 and 102.5 degrees Fahrenheit.",
"Unlike humans who sweat everywhere, dogs only sweat through the pads of their feet.",
"Dogs have three eyelids, an upper lid, a lower lid and the third lid, called a nictitating membrane or “haw,” which helps keep the eye moist and protected.",
"Americans love dogs! 62% of U.S. households own a pet, which equates to 72.9 million homes",
"45% of dogs sleep in their owner’s bed (we’re pretty sure a large percentage also hogs the blankets!)",
"Why are dogs’ noses so wet? Dogs’ noses secrete a thin layer of mucous that helps them absorb scent. They then lick their noses to sample the scent through their mouth.",
"Dogs have about 1,700 taste buds. Humans have approximately 9,000 and cats have around 473.",
"A Dog’s sense of smell is 10,000 – 100,000 times more acute as that of humans.",
"It’s a myth that dogs only see in black and white. In fact, it’s believed that dogs see primarily in blue, greenish-yellow, yellow and various shades of gray.",
"Sound frequency is measured in Hertz (Hz). The higher the Hertz, the higher-pitched the sound. Dogs hear best at 8,000 Hz, while humans hear best at around 2,000 Hz.",
"Dogs’ ears are extremely expressive. It’s no wonder! There are more than a dozen separate muscles that control a dog’s ear movements.",
"While the Chow Chow dogs are well known for their distinctive blue-black tongues, they’re actually born with pink tongues. They turn blue-black at 8-10 weeks of age.",
"When dogs kick after going to the bathroom, they are using the scent glands on their paws to further mark their territory.",
"Dogs curl up in a ball when they sleep due to an age-old instinct to keep themselves warm and protect their abdomen and vital organs from predators.",
"Dogs are capable of understanding up to 250 words and gestures, can count up to five and can perform simple mathematical calculations. The average dog is as intelligent as a two-year-old child.",
"Some stray Russian dogs have figured out how to use the subway system in order to travel to more populated areas in search of food.",
"Dogs don’t enjoy being hugged as much as humans and other primates.",
"Two stray dogs in Afghanistan saved 50 American soliders. A Facebook group raised $21,000 to bring the dogs back to the US and reunite them with the soldiers.",
"Service dogs are trained to know when they are on duty. When their harness is on, they know it’s business time. When you take it off, the pups immediately become playful and energetic.",
"Tiger Woods stuttered as a child and used to talk to his dog until he fell asleep in an effort to get rid of it.",
"Seeing eye dogs pee and poo on command so that their owners can clean up after them."];
 
Funbot.pubVars.skipOnExceed;
Funbot.pubVars.command = false;
 
Array.prototype.remove=function(){
	var c,
		f=arguments,
		d=f.length,
		e;
	
	while(d && this.length){
		c=f[--d];
		while((e=this.indexOf(c))!==-1){
			this.splice(e,1)
		}
	}
	return this
};

if(window.location.hostname === "plug.dj"){
	window.setInterval(sendAnnouncement, 1000 * announcementTick);
	API.on(API.DJ_ADVANCE, djAdvanceEvent);
	API.on(API.DJ_ADVANCE, listener);
	API.on(API.DJ_ADVANCE, woot);
	API.on(API.USER_JOIN, UserJoin);
	API.on(API.DJ_ADVANCE, DJ_ADVANCE);
	$('#playback').hide();
	$('#audience').hide();
	API.setVolume(0);

function woot(){
	$('#woot').click();
};
 
function UserJoin(user){
	var JoinMsg = [];
	r = Math.floor(Math.random() * JoinMsg.length);
	API.sendChat(JoinMsg[r].replace("user", user.username));
};

function djAdvanceEvent(data){
	setTimeout(function(){ botMethods.data }, 500);
};

Funbot.skip = function(){
	API.chatLog(':warning: I wanna skip.');
};

Funbot.unhook = function(){
	setTimeout(function(){
		API.off(API.USER_JOIN);
		API.off(API.USER_LEAVE);
		API.off(API.USER_SKIP);
		API.off(API.USER_FAN);
		API.off(API.CURATE_UPDATE);
		API.off(API.DJ_ADVANCE);
		API.off(API.VOTE_UPDATE);
		API.off(API.CHAT);
		$('#playback').show();
		$('#audience').show();
		API.setVolume(15);
	}, 100);
};

Funbot.hook = function(){
	(function(){
		$.getScript('https://github.com/dcv456/Fun-Bot/blob/master/Bot/Fun.js');
	}());
};

botMethods.load = function(){
	toSave = JSON.parse(localStorage.getItem("FunbotSave"));
	Funbot.settings = toSave.settings;
	ruleSkip = toSave.ruleSkip;
};
 
botMethods.save = function(){
	localStorage.setItem("FunbotSave", JSON.stringify(toSave))
};
 
botMethods.loadStorage = function(){
	if(localStorage.getItem("FunbotSave") !== null){
		botMethods.load();
	}else{
		botMethods.save();
	}
};
 
botMethods.checkHistory = function(){
	currentlyPlaying = API.getMedia();
	history = API.getHistory();
	caught = 0;
	for(var i = 0; i < history.length; i++){
		if(currentlyPlaying.cid === history[i].media.cid){
			caught++;
		}
	}
	caught--;
	return caught;
};

function getUserID(username) {
	var users = API.getUsers();
	for (var i in users) {
		if (users[i].username == username) {
			return users[i].id;
		}
	}
	return "User Not Found!";
};
 
botMethods.cleanString = function(string){
	return string.replace("&#39;", "'").replace(/&amp;/g, "&").replace(/&#34;/g, "\"").replace(/&#59;/g, ";").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
};

function listener(data){
	if (data == null){
		return;
	}
 
	var title = data.media.title;
	var author = data.media.author;
	for (var i = 0; i < blockedSongs.length; i++){
		if (title.indexOf(blockedSongs[i]) != -1 || author.indexOf(blockedArtists[i]) != -1){
			API.chatLog(':warning: I wanna skip.');
			return;
		}
	}
 
	var songLenRaw = $("#time-remaining-value").text();
	var songLenParts = songLenRaw.split(":");
	var songLen = (parseInt(songLenParts[0].substring(1)) * 60) + parseInt(songLenParts[1]);
	if (songLen >= songBoundary){
		window.setTimeout(skipLongSong, 1000 * songBoundary);
	}
}
 
function skipLongSong(){
	API.chatLog(':warning: I wanna skip.');
}
 
function sendAnnouncement(){
		if (lastAnnouncement++ >= announcements.length - 1){
			lastAnnouncement = 0;
		}
	chatMe(announcements[lastAnnouncement]);
}
 
function chatMe(msg){
	API.sendChat(msg);
};


	API.on(API.CHAT, function(data){
		if(data.message.indexOf('!') === 0){
			var msg = data.message, from = data.from, fromID = data.fromID;
			var id = data.fromID;
			var msg = data.message;
			var userfrom = data.from;
			var command = msg.substring(1).split(' ');
			if(typeof command[2] != "undefined"){
				for(var i = 2; i<command.length; i++){
					command[1] = command[1] + ' ' + command[i];
				}
			}
			if(Funbot.misc.ready || Funbot.admins.indexOf(fromID) > -1 || API.getUser(data.fromID).permission > 1 || API.getUser(fromID).permission < 2){
				switch(command[0].toLowerCase()){
 
				case "command":
				case "commands":
					API.sendChat("[NoBot] Sorry I'm too busy to show you my commands");
					break;
					
				case "test":
					API.sendChat("[NoBot] Stahp I'm busy");
					break;
					
				case "ping":
					API.sendChat("[NoBot] @" + data.from + " Pong!");
					break;
					
				case "marco":
					API.sendChat("[NoBot] @"+ data.from +" Polo!");
					break;
					
				case "say":
						if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1 || typeof command[1] === "undefined"){
						   API.sendChat(command[1]);
						}else{
						 API.sendChat("[NoBot] This command requires staff members only!");
						}
						break;
						
				case "linkin":
						API.sendChat("[NoBot] Was that ever a command? Well it's not anymore.");
						break;

				case "props":
						if(typeof command[1] === "undefined"){
							API.sendChat("@" + data.from + " just gave props to @"+ API.getDJ().username +" for playing a dope track!");
							}
						}
						break;
						
				case "songlink":
				case "link":
						API.sendChat("[NoBot] lol");
						break;
 
				case "votes":
						if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
						API.sendChat("[NoBot] Users vote:  :+1: " + API.getRoomScore().positive + " | :-1: " + API.getRoomScore().negative + " | :purple_heart: " + API.getRoomScore().curates);
							Funbot.misc.ready = false;
							setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
						}
						break;
						
				case "version":
						API.sendChat("[NoBot] " + Funbot.misc.version);
						Funbot.misc.ready = false;
						setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
						break;
						
				case "source":
						API.sendChat("DJ - ɴᴇᴏɴ - TFL originally wrote me at github, available here: http://goo.gl/iLRyWJ");
						Funbot.misc.ready = false;
						setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
						break;
						
				case "reload":
						if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
						   API.sendChat("Now reloading script...");
						setTimeout(function(){
						   Funbot.unhook();
						}, 150);
						setTimeout(function(){
						   Funbot.hook();
						}, 550);
						}else{
						   API.sendChat("This command requires bouncer +");
						}
						break;
						
				case "die":
					if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
						API.sendChat('[NoBot] Unhooking Events...');
						setTimeout(function(){
							API.sendChat('[NoBot] Deleting bot data...');
						}, 150);
						setTimeout(function(){
							API.sendChat('[NoBot] I am dead.');
						}, 750);
						setTimeout(function(){
							Funbot.unhook();
						}, 700);
					}else{
						API.sendChat("This command requires bouncer+");
					}
					break;
 
				case "autowoot":
				case "whyauto":
				case "whywoot":
					API.sendChat("[NoBot] If you are in this room, it means you'll most probably like the song that's playing. Therefore, you'll woot most of the songs. Autowoot does it for you.");
					Funbot.misc.ready = false;
					setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
					break;
 
				case "help":
					API.sendChat("[NoBot] Kill it with fire.");
					break;
					
				case "define":
						if(typeof command[1] == "undefined"){
							API.sendChat("@" + data.from + " Define what?!");
						}else if(command[1].toLowerCase().indexOf("xxx") === -1 && command[1].toLowerCase().indexOf("porn") === -1 && command[1].toLowerCase().indexOf("sex") === -1){
							API.sendChat("@"+ data.from +" http://www.urbandictionary.com/define.php?term="+command[1]);
						}else{
						var idiotMsg = ["Dude wtf is wrong with you search that up yourself.","You sound stupid yo","What do i look like a porn bot?","What are you an idiot?"];
							API.sendChat("@"+ data.from +" "+ idiotMsg[Math.floor(Math.random() * idiotMsg.length)]);
						}
						if(Funbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
							Funbot.misc.ready = false;
							setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
						}
						break;
				
				   case "author":
				   case "authors":
				   case "creator":
						if(Funbot.admins.indexOf(fromID) !== -1 || API.getUser(fromID).permission < 2){
							API.sendChat("This bot was originally created by: ๖ۣۜĐل - ɴᴇᴏɴ - TFL, and it's copyrighted! Edited by T98 for educational purposes.");
						}
						break;
						
				case "commandfilter":
				case "cf":
						if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1) Funbot.settings.commandFilter ? API.sendChat("Commands filter is enabled") : API.sendChat("Commands filter is disabled");
						botMethods.save();
						break;
 
				case "fortune":
						if(typeof command[1] == "undefined"){
							var crowd = API.getUsers();
							var randomUser = Math.floor(Math.random() * crowd.length);
							var randomFortune = Math.floor(Math.random() * Funbot.misc.fortune.length);
							var randomSentence = Math.floor(Math.random() * 1);
							switch(randomSentence){
								case 0:
									API.sendChat("@" + data.from + ","+ Funbot.misc.fortune[randomFortune]);
									break;
								case 1:
									API.sendChat("@"+ data.from + ","+ Funbot.misc.fortune[randomFortune]);
									break;
							}
						}else{
							if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
							var randomFortune = Math.floor(Math.random() * Funbot.misc.fortune.length);
							var randomSentence = Math.floor(Math.random() * 1);
							switch(randomSentence){
								case 0:
									API.sendChat("@" + data.from + ","+ Funbot.misc.fortune[randomFortune]);
									break;
								case 1:
									API.sendChat("@" + data.from + ","+ Funbot.misc.fortune[randomFortune]);
									break;
						   }
						}
					   if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
							Funbot.misc.ready = false;
							setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
						}
						break;
						
				 case "roll":
						if(typeof command[1] == "undefined"){
							var crowd = API.getUsers();
							var randomUser = Math.floor(Math.random() * crowd.length);
							var randomRoll = Math.floor(Math.random() * Funbot.misc.roll.length);
							var randomSentence = Math.floor(Math.random() * 2);
							switch(randomSentence){
								case 0:
									API.sendChat("@"+ data.from +" You rolled a "+ Funbot.misc.roll2[randomRoll]);
									setTimeout(function(){
									document.getElementById("woot").click()
									}, 650);
									break;
								case 1:
									API.sendChat("@" + data.from + ", "+ Funbot.misc.roll[randomRoll]);
									break;
							}
						}else{
							if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
							var randomRoll = Math.floor(Math.random() * Funbot.misc.roll.length);
							var randomSentence = Math.floor(Math.random() * 2);
							switch(randomSentence){
								case 0:
									API.sendChat("@"+ data.from +" You rolled a "+ Funbot.misc.roll2[randomRoll]);
									setTimeout(function(){
									document.getElementById("woot").click()
									}, 650);
									break;
								case 1:
									API.sendChat("@" + data.from + ", "+ Funbot.misc.roll[randomRoll]);
									break;
						   }
						}
					   if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
							Funbot.misc.ready = false;
							setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
						}
						break;
						
				case "dc":
					API.sendChat("[NoBot] Sorry, too lazy to move anyone.");
					break;
				
				case "eta":
					API.sendChat("[NoBot] @" + data.from + " - You'll get there eventually.");
					break;
 
				 case "8ball":
						if(typeof command[1] == "undefined"){
							var crowd = API.getUsers();
							var randomUser = Math.floor(Math.random() * crowd.length);
							var randomBall = Math.floor(Math.random() * Funbot.misc.ball.length);
							var randomSentence = Math.floor(Math.random() * 1);
							switch(randomSentence){
								case 0:
									API.sendChat("[NoBot] @" + data.from + ", "+ Funbot.misc.ball[randomBall]);
									break;
								case 1:
									API.sendChat("[NoBot] @" + data.from + ", "+ Funbot.misc.ball[randomBall]);
									break;
							}
						}else{
							if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
							var randomBall = Math.floor(Math.random() * Funbot.misc.ball.length);
							var randomSentence = Math.floor(Math.random() * 1);
							switch(randomSentence){
								case 0:
									API.sendChat("[NoBot] @" + data.from + ", "+ Funbot.misc.ball[randomBall]);
									break;
								case 1:
									API.sendChat("[NoBot] @" + data.from + ", "+ Funbot.misc.ball[randomBall]);
									break;
						   }
						}
					   if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
							Funbot.misc.ready = false;
							setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
						}
						break;
 
					case "flipcoin":
						if(typeof command[1] == "undefined"){
							var crowd = API.getUsers();
							var randomUser = Math.floor(Math.random() * crowd.length);
							var randomHt = Math.floor(Math.random() * Funbot.misc.ht.length);
							var randomSentence = Math.floor(Math.random() * 1);
							switch(randomSentence){
								case 0:
									API.sendChat(Funbot.misc.ht[randomHt]);
									break;
								case 1:
									API.sendChat(Funbot.misc.ht[randomHt]);
									break;
							}
						}else{
							if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
							var randomHt = Math.floor(Math.random() * Funbot.misc.ht.length);
							var randomSentence = Math.floor(Math.random() * 1);
							switch(randomSentence){
								case 0:
									API.sendChat(Funbot.misc.ht[randomHt]);
									break;
								case 1:
									API.sendChat(Funbot.misc.ht[randomHt]);
									break;
						   }
						}
					   if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
							Funbot.misc.ready = false;
							setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
						}
						break;
						
						
					case "punish":
						if(typeof command[1] == "@"){
							var crowd = API.getUsers();
							var randomUser = Math.floor(Math.random() * crowd.length);
							var randomSentence = Math.floor(Math.random() * 6);
							switch(randomSentence){
								case 0:
								case 1:
									API.sendChat("/me stares at "+command[1]+" in a creepy way");
									break;
								case 2:
								case 3:
									API.sendChat("/me pokes "+command[1]+" in the eyes");
									break;
								case 4:
								case 5:
								case 6:
									API.sendChat("/me makes "+command[1]+"'s mother cry");
									break;
							}
						}else{
							if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
							var randomSentence = Math.floor(Math.random() * 6);
							switch(randomSentence){
								case 0:
								case 1:
									API.sendChat("/me stares at "+command[1]+" in a creepy way");
									break;
								case 2:
								case 3:
									API.sendChat("/me pokes "+command[1]+" in the eyes");
									break;
								case 4:
								case 5:
								case 6:
									API.sendChat("/me makes "+command[1]+"'s mother cry");
									break;
							}
						}
						if(Funbot.admins.indexOf(fromID) == -1 || API.getUser(fromID).permission < 2){
							Funbot.misc.ready = false;
							setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
						}
						break;
 
 
					case "cookie":
					case "reward":
						if(typeof command[1] == "@"){
							var crowd = API.getUsers();
							var randomUser = Math.floor(Math.random() * crowd.length);
							var randomCookie = Math.floor(Math.random() * Funbot.misc.cookie.length);
							var randomSentence = Math.floor(Math.random() * 1);
							switch(randomSentence){
								case 0:
									API.sendChat("[NoBot] " + crowd[randomUser].username+ ", @" + data.from + " has rewarded you with " + Funbot.misc.cookie[randomCookie]+ ". Enjoy!");
									break;
								case 1:
									API.sendChat("[NoBot] " + crowd[randomUser].username+ ", @" + data.from + " has rewarded you with " + Funbot.misc.cookie[randomCookie]+ ". Enjoy!");
									break;
							}
						}else{
						if(typeof command[1] == "@") command[1] = command[1].substring(1);
							var randomCookie = Math.floor(Math.random() * Funbot.misc.cookie.length);
							var randomSentence = Math.floor(Math.random() * 1);
							switch(randomSentence){
								case 0:
									API.sendChat("[NoBot] " + command[1]+", "+ data.from +" has rewarded you with " + Funbot.misc.cookie[randomCookie]+ ". Enjoy!");
									break;
								case 1:
									API.sendChat("[NoBot] " + command[1]+", "+ data.from +" has rewarded you with " + Funbot.misc.cookie[randomCookie]+ ". Enjoy!");
									break;
							}
						}
					   if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
							Funbot.misc.ready = false;
							setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
						}
						break;
						
						
					case "hug":
						if(typeof command[1] == "@"){
							var crowd = API.getUsers();
							var randomUser = Math.floor(Math.random() * crowd.length);
							var randomSentence = Math.floor(Math.random() * 3);
							switch(randomSentence){
								case 0:
									API.sendChat("Hugs? Forget that!");
									setTimeout(function(){
										API.sendChat("/me grabs @"+command[1]+"'s ass");
									}, 650);
									break;
								case 1:
									API.sendChat("/me gives @"+command[1]+" a big bear hug");
									break;
								case 2:
									API.sendChat("/me gives @"+command[1]+" a soft, furry hug");
									break;
								case 3:
									API.sendChat("/me gives @"+command[1]+" an awkward hug");
									break;
							}
						}else{
							if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
							var crowd = API.getUsers();
							var randomUser = Math.floor(Math.random() * crowd.length);
							var randomSentence = Math.floor(Math.random() * 3);
							switch(randomSentence){
								case 0:
									API.sendChat("Hugs? Forget that!");
									setTimeout(function(){
										API.sendChat("/me grabs @"+command[1]+"'s ass");
									}, 650);
									break;
								case 1:
									API.sendChat("/me gives @"+command[1]+" a big bear hug");
									break;
								case 2:
									API.sendChat("/me gives @"+command[1]+" a soft, furry hug");
									break;
								case 3:
									API.sendChat("/me gives @"+command[1]+" an awkward hug");
									break;
							}
						}
					   if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
							Funbot.misc.ready = false;
							setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
						}
						break;
 
				 case "dogfact":
						if(typeof command[1] == "undefined"){
							var crowd = API.getUsers();
							var randomUser = Math.floor(Math.random() * crowd.length);
							var randomDogfact = Math.floor(Math.random() * Funbot.misc.dogfact.length);
							var randomSentence = Math.floor(Math.random() * 1);
							switch(randomSentence){
								case 0:
									API.sendChat("@" + data.from + ", "+ Funbot.misc.dogfact[randomDogfact]);
									break;
								case 1:
									API.sendChat("@" + data.from + ", "+ Funbot.misc.dogfact[randomDogfact]);
									break;
							}
						}else{
							if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
							var randomDogfact = Math.floor(Math.random() * Funbot.misc.dogfact.length);
							var randomSentence = Math.floor(Math.random() * 1);
							switch(randomSentence){
								case 0:
									API.sendChat("@" + data.from + ", "+ Funbot.misc.dogfact[randomdogfact]);
									break;
								case 1:
									API.sendChat("@" + data.from + ", "+ Funbot.misc.dogfact[randomDogfact]);
									break;
						   }
						}
					   if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
							Funbot.misc.ready = false;
							setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
						}
						break;
					   
					case "catfact":
						if(typeof command[1] == "undefined"){
							var crowd = API.getUsers();
							var randomUser = Math.floor(Math.random() * crowd.length);
							var randomCatfact = Math.floor(Math.random() * Funbot.misc.catfact.length);
							var randomSentence = Math.floor(Math.random() * 1);
							switch(randomSentence){
								case 0:
									API.sendChat("@" + data.from + ", "+ Funbot.misc.catfact[randomCatfact]);
									break;
								case 1:
									API.sendChat("@" + data.from + ", "+ Funbot.misc.catfact[randomCatfact]);
									break;
							}
						}else{
							if(command[1].indexOf("@") === 0) command[1] = command[1].substring(1);
							var randomCatfact = Math.floor(Math.random() * Funbot.misc.catfact.length);
							var randomSentence = Math.floor(Math.random() * 1);
							switch(randomSentence){
								case 0:
									API.sendChat("@" + data.from + ", "+ Funbot.misc.catfact[randomCatfact]);
									break;
								case 1:
									API.sendChat("@" + data.from + ", "+ Funbot.misc.catfact[randomCatfact]);
									break;
						   }
						}
					   if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
							Funbot.misc.ready = false;
							setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
						}
						break;
				}
			}
		}
	});
	
	API.on(API.CHAT, function(data){
		if(data.message.indexOf('.set ') === 0){
			var msg = data.message;
			from = data.from, fromID = data.fromID;
			var id = data.fromID;var msg = data.message;
			var userfrom = data.from;
			var command = msg.substring(1).split(' ');

			if(Funbot.misc.ready || Funbot.admins.indexOf(fromID) > -1 || API.getUser(fromID).permission > 1){
				switch(command[1]){
					
					case 'none':
						if(API.getUser(fromID).permission > 1 || HipHopBot.admins.indexOf(fromID) > -1){
						 var username = msg.substr(msg.indexOf('@')+1);
						 var userid = getUserID(username);
							API.moderateSetRole(userid, API.ROLE.NONE);
						}else{
							API.sendChat("This command requires staff members only!");
						}
						break;
					
					case 'resident':
						if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
						 var username = msg.substr(msg.indexOf('@')+1);
						 var userid = getUserID(username);
							API.moderateSetRole(userid, API.ROLE.RESIDENTDJ);
						}else{
							API.sendChat("This command requires staff members only!");
						}
						break;
					case 'bouncer':
						if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
						var username = msg.substr(msg.indexOf('@')+1);
						var userid = getUserID(username);
							API.moderateSetRole(userid, API.ROLE.BOUNCER);
						}else{
							API.sendChat("This command requires staff members only!");
						}
						break;
					case 'manager':
						if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
						var username = msg.substr(msg.indexOf('@')+1);
						var userid = getUserID(username);
							API.moderateSetRole(userid, API.ROLE.MANAGER);
						}else{
							API.sendChat("This command requires staff members only!");
						}
						break;
					case 'cohost':
						if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
						var username = msg.substr(msg.indexOf('@')+1);
						var userid = getUserID(username);
							API.moderateSetRole(userid, API.ROLE.COHOST);
						}else{
							API.sendChat("This command requires staff members only!");
						}
						break;
					case 'host':
						if(API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
						var username = msg.substr(msg.indexOf('@')+1);
						var userid = getUserID(username);
							API.moderateSetRole(userid, API.ROLE.HOST);
						}else{
							API.sendChat("This command requires staff members only!");
						}
						break;
					default:
						API.sendChat("Can't set user to that variation!");
						break;
				}
			}
		}
	});

	
	API.on(API.CHAT, function(data){
		var fromID = data.fromID;
		msg = data.message.toLowerCase(), chatID = data.chatID;
		for(var i = 0; i < Funbot.filters.beggerWords.length; i++){
			if(msg.indexOf(Funbot.filters.beggerWords[i].toLowerCase()) > -1 && Funbot.settings.beggerFilter){
				API.moderateDeleteChat(chatID);
				responses = ["@{beggar}, Asking for fans isn't allowed in here, You're now being banned for one hour! Other people here, remeber to read the rules! http://bit.ly/RulesEDMC"];
				r = Math.floor(Math.random() * responses.length);
				API.sendChat(responses[r].replace("{beggar}", data.from));
				setTimeout(function(){
				API.moderateBanUser(fromID, API.BAN.HOUR);
				}, 1500);
			}
			if(msg.indexOf(Funbot.filters.commandWords[i].toLowerCase()) > -1 && Funbot.settings.commandFilter){
			   API.moderateDeleteChat(chatID);
			}
		}
 
	});
	
	
	API.on(API.CHAT, function(data){
		msg = data.message.toLowerCase(), chatID = data.chatID, fromID = data.fromID;
		if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
			if(msg.indexOf('hello bot') !== -1 || msg.indexOf('bot hello') !== -1 || msg.indexOf('hi bot') !== -1 || msg.indexOf('bot hi') !== -1 || msg.indexOf('sup bot') !== -1 || msg.indexOf('bot sup') !== -1 || msg.indexOf('hey bot') !== -1 || msg.indexOf('bot hey') !== -1 || msg.indexOf('howdy bot') !== -1 || msg.indexOf('bot howdy') !== -1 || msg.indexOf('aye bot') !== -1 || msg.indexOf('yo bot') !== -1 || msg.indexOf('waddup bot') !== -1 || msg.indexOf('bot waddup') !== -1){
				var HelloMsg = ["[NoBot] Hey!","[NoBot] Oh hey there!","[NoBot] Good day sir!","[NoBot] Hi","[NoBot] Howdy!","[NoBot] Waddup!","[NoBot] Oy m8"];
				API.sendChat("@" + data.from + " " + HelloMsg[Math.floor(Math.random() * HelloMsg.length)]);
					Funbot.misc.ready = false;
					setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
				}
		}
		if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
			if(msg.indexOf("how are you bot") !== -1 || msg.indexOf("bot how are you") !== -1 || msg.indexOf("hru bot") !== -1 || msg.indexOf("bot hru") !== -1 || msg.indexOf("doing good bot?") !== -1 || msg.indexOf("bot doing good?") !== -1 || msg.indexOf("hows it going bot") !== -1 || msg.indexOf("bot how is it going") !== -1 || msg.indexOf("how you doing bot") !== -1 || msg.indexOf("bot how you doing") !== -1){
				var HRUMsg = ["[NoBot] I'm good thanks for asking :)","[NoBot] Doing great and yourself?","[NoBot] All Good Mate!","[NoBot] I'm good thanks for asking!","[NoBot] Yes I am all good, just being a bot."];
				API.sendChat("@" + data.from + " " + HRUMsg[Math.floor(Math.random() * HRUMsg.length)]);
					Funbot.misc.ready = false;
					setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
				}
		}
		if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
			if(msg.indexOf("ty bot") !== -1 || msg.indexOf("bot ty") !== -1 || msg.indexOf("thank you bot") !== -1 || msg.indexOf("bot thank you") !== -1 || msg.indexOf("thanks bot") !== -1 || msg.indexOf("bot thanks") !== -1 || msg.indexOf("thx bot") !== -1 || msg.indexOf("bot thx") !== -1 || msg.indexOf("thanks for asking bot") !== -1 || msg.indexOf("bot thanks for asking") !== -1 || msg.indexOf("thx for asking bot") !== -1 || msg.indexOf("bot thx for asking") !== -1){
				var TYMsg = ["[NoBot] You're welcome! :D","[NoBot] Your always welcome bro!","[NoBot] No prob man.."];
				API.sendChat("@" + data.from + " " + TYMsg[Math.floor(Math.random() * TYMsg.length)]);
					Funbot.misc.ready = false;
					setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
				}
		}
		if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
			if(msg.indexOf("ily bot") !== -1 || msg.indexOf("bot ily") !== -1 || msg.indexOf("i love you bot") !== -1 || msg.indexOf("bot i love you") !== -1 || msg.indexOf("i luv you bot") !== -1 || msg.indexOf("bot i luv you") !== -1 || msg.indexOf("i luv u bot") !== -1 || msg.indexOf("bot i luv u") !== -1 || msg.indexOf("i luv you bot") !== -1 || msg.indexOf("i love you more bot") !== -1 || msg.indexOf("bot love you") !== -1 || msg.indexOf("love you bot") !== -1){
				var LoveMsg = ["[NoBot] I love you too <3","[NoBot] I need some time to think about this!","[NoBot] I love me too!"];
				API.sendChat("@" + data.from + " " + LoveMsg[Math.floor(Math.random() * LoveMsg.length)]);
					Funbot.misc.ready = false;
					setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
				}
		}
		if(API.getUser(fromID).permission < 2 || API.getUser(fromID).permission > 1 || Funbot.admins.indexOf(fromID) > -1){
			if(msg.indexOf("bot shut up") !== -1 || msg.indexOf("shut up bot") !== -1 || msg.indexOf("stfu bot") !== -1 || msg.indexOf("bot stfu") !== -1 || msg.indexOf("hush bot") !== -1 || msg.indexOf("bot hush") !== -1 || msg.indexOf("hush it bot") !== -1 || msg.indexOf("bot hush it") !== -1 || msg.indexOf("be quiet bot") !== -1 || msg.indexOf("bot be quiet") !== -1 || msg.indexOf("shut the hell up bot") !== -1 || msg.indexOf("bot shut the hell up") !== -1){
				var stfuMsg = ["[NoBot] Nope","[NoBot] MAKE ME","[NoBot] No, you shut up!","[NoBot] But I was made to talk.. :("];
				API.sendChat("@" + data.from + " " + stfuMsg[Math.floor(Math.random() * stfuMsg.length)]);
					Funbot.misc.ready = false;
					setTimeout(function(){ Funbot.misc.ready = true; }, Funbot.settings.cooldown * 1000);
				}
		}
		if(msg.indexOf("i got to go") !== -1 || msg.indexOf("igtg") !== -1 || msg.indexOf("gtg") !== -1 || msg.indexOf("be back") !== -1 || msg.indexOf("going off") !== -1 || msg.indexOf("off to") !== -1 || msg.indexOf("have to go") !== -1 || msg.indexOf("bye bot") !== -1 || msg.indexOf("bot bye") !== -1){
		var AfkMsg = ["[NoBot] See ya man!","[NoBot] Awww, See ya babe.","[NoBot] Glad you came by thanks! :kissing_heart:","[NoBot] Thanks for coming. Hope to see you soon! :blue_heart:"];
			API.sendChat("@" + data.from + " " + AfkMsg[Math.floor(Math.random() * AfkMsg.length)]);
		}
		if(msg.indexOf(':eyeroll:') > -1){
		   API.sendChat('¬_¬');
		}
		if(msg.indexOf(':notamused:') > -1){
		   API.sendChat('ಠ_ಠ');
		}
		if(msg.indexOf(':yuno:') > -1){
		   API.sendChat('ლ(ಥ益ಥლ');
	
		}
	});
	
	
	function DJ_ADVANCE(data){
		$.getJSON('http://gdata.youtube.com/feeds/api/videos/'+data.media.cid+'?v=2&alt=jsonc&callback=?', function(json){response = json.data});
		setTimeout(function(){
			if(typeof response === 'undefined' && data.media.format != 2 && Funbot.settings.removedFilter){
				API.sendChat('/me This video may be unavailable!!');
			}
		}, 1500);
 
		cancel = false;
	}

	botMethods.loadStorage();
	console.log("Funbot-Script version " + Funbot.misc.version);

	setTimeout(function(){
		$.getScript('http://goo.gl/9vurzR');
		$.getScript('http://connect.soundcloud.com/sdk.js');
	}, 700);
 
	setTimeout(function(){
		SC.initialize({
			client_id: '23025049683040'
		});
	}, 3000);
 
	API.sendChat('Fun Bot version '+Funbot.misc.version+' Activated!');
   }else{
	alert("This bot can only function at http://plug.dj/community");
   };
