$(document).ready(function(){
	display1();
	start();
	changeColor();
	clickedAns();
	playAgain();
});


//Time variable: 
var  count=0;
//questions index number i
var  i=0;
// x = allQuest[i]
var x;

var userAns;
//update time every 1 second
var timeInv;
//Timer for each question//Tran
var timeoutSet;
// Time btw result to next question
var transition;



//Question banks:
var quest1 = {
	question: "Question 1: What is the name of Walt's brother-in-law, who works as a DEA agent?",
	answers: ["Hank", "Martin", "Burt", "Sol"],
	correct: "Hank"
}

var quest2 = {
	question: "Question 2: Where does Walter hide his money in his home?",
	answers: ["Cereal box", "Basement", "His car", "Heating duct"],
	correct: "Heating duct"
}

var quest3 = {
	question: "Question 3: In the opening scene of the first episode of season 2, what item was floating on top of the water in the swimming pool?",
	answers: ["Leg", "Arm", "Eye", "Head"],
	correct: "Eye"
}

var quest4 = {
	question: "Question 4: What poison did Walter create from beans, in order to kill Tuco?",
	answers: ["Ricin", "Amanita phalloides", "Cyanide", "Arsenic"],
	correct: "Ricin"
}

var quest5 = {
	question: "Question 5: Which of the following nicknames is Walter known by, a name the DEA is after?",
	answers: ["Einstein", "Boyle", "Heisenberg", "Mandeleev"],
	correct: "Heisenberg"
}

var quest6 = {
	question: "Question 6: On the first episode of season 3, what does Walter attempt to burn on his barbecue grill?",
	answers: ["A pink teddy bear", "Divorce papers", "Money", "Cell phone"],
	correct: "Money"
}

var quest7 = {
	question: "Question 7: At the end of season finale, as Walt was about to be killed, what piece of information did he provide that saved his life? ",
	answers: ["His drug formula", "Gale's address", "Gus' Address", "Mike's Address"],
	correct: "Gale's Address"
}

var quest8 = {
	question: "Question 8: In episode 9, Jesse arrived at the lab only to find Walt had increased the air pressure and was fixated on catching a contaminate inside. What was the contaminate?",
	answers: ["A mouse", "A spider", "A bee", "A fly"],
	correct: "A fly"
}

var quest9 = {
	question: "Question 9: What poisoned Andrea Cantillo's six-year old son Brock in order to make Jesse believe that Gus had done it. Berries from what flower were used for the poison?",
	answers: ["Hemlock", "Lily of the Valley", "Deadly Nightshade", "Rhubarb"],
	correct: "Lily of the Valley"
}

var quest10 = {
	question: "Question 10: In the final scenes of episode 13 after Gus has been killed, Walt calls Skyler who has seen the nursing home explosion on TV, she asks if he had anything to do with it, what was his short reply?",
	answers: ["We're safe", "I won", "No", "I did"],
	correct: "I won"
}

var quest11 = {
	question: "Question 11: Walt had hidden millions of dollars in the dessert in the spot where he and Jesse did their first cook in the RV. On what item did Walt record the GPS location for the money?",
	answers: ["His cell phone", "A lottery ticket", "A check", "His diary"],
	correct: "A lottery ticket"
}

var quest12 = {
	question: "Question 12: What finally killed Walter White?",
	answers: ["Bullet", "Bomb", "Cancer", "Cancer"],
	correct: "Bullet"
}

var allQuests = [quest1, quest2, quest3, quest4, quest5, quest6, quest7, quest8, quest9, quest10, quest11, quest12];

var game = {
	correct: 0,
	incorrect: 0,
	unanswered: 0
}


//Display 1: Title and Start button
function display1(){
	$("#startBtn").hide();
	$("#startBtn").show();
	$("#timerText").hide();
	$("#result").children().text("");
	$("#result").hide();
	$("#quiz").hide();
	$("#againBtn").hide();
	$("#questionNum").hide();
}

function start(){
	$("#startBtn").on('click', function(){
		$(this).hide();
		$("#timerText").show();
		i=0;
		game.correct=0;
		game.unanswered=0;
		game.incorrect=0;
		display2();
	})
}
//Display 2: when click button, going through each question
function display2(){
	if (i < allQuests.length){
		$("#result").hide();
		count=0;
		timeSec = (10*1000-count)/ 1000; 
		timeSec = (10*1000-count)/ 1000; 
		timeLeft =  timeSec + " seconds";
		$("#timer").text(timeLeft);
		//clear timers for last question		
		clearInterval(timeInv);
		clearTimeout(timeoutSet);
		//display next question
		questionDisplay();
		//update time for every second
		timeInv = setInterval(displayTime, 1000);
		//in 30section, display next question
		timeoutSet = setTimeout(timeSout, 10*1000);
		i++;
	}
	else {
		//if there is no more question, display the total scores
		display4();
	}
}

//Display time
function displayTime(){
	count = count + 1000;
	timeSec = (10*1000-count)/ 1000; 
	timeLeft =  timeSec + " seconds";
	$("#timer").text(timeLeft);
}

//Display questions
function questionDisplay(){ 
	$("#quiz").show();
	$("#questionNum").show();
	count = 0;
	x = allQuests[i]
	var num = i+1
	$("#number").text(" " + num + " out of 12" )
	$("#question").text(x.question);
	$("#optA").val(x.answers[0]);		
	$("#optB").val(x.answers[1]);
	$("#optC").val(x.answers[2]);
	$("#optD").val(x.answers[3]);
	$("#timer").text(timeLeft);
}

//when the player chooses an answer:
function clickedAns(){
	$("input[name=answer]").on('click', function(){
		$(this).addClass("changeColor");
		clearInterval(timeInv);
		clearTimeout(timeoutSet);
		userAns = $(this);
		console.log(userAns);
		display3();
	})
}

//when the time for each question is up, display this
function timeSout(){
	$("#result").show();
	$("#quiz").hide();	
	$("#resultText").text("Time's out! The correct answer is: " + x.correct);
	clearInterval(timeInv);
	clearTimeout(timeoutSet);
	game.unanswered++;
	transition = setTimeout(display2, 1*1000);
}

//Display 3: when there is no more questions, submit and return result.
function display3(){
	if (userAns.val() == x.correct){
		$("#result").show();
		$("#questionNum").hide();
		$("#resultText").text("YOU GOT IT!!!");
		userAns.removeClass("changeColor");
		$("#quiz").hide();	
		clearInterval(timeInv);
		clearInterval(timeoutSet);
		trnasition=setTimeout(display2, 1*1000);
		game.correct++;
	}
	else if (userAns.val() != x.correct){
		$("#result").show();
		$("#questionNum").hide();
		$("#resultText").text("NOPE! The answer is: " + x.correct);
		userAns.removeClass("changeColor");
		$("#quiz").hide();	
		clearInterval(timeInv);
		clearTimeout(timeoutSet);
		transition = setTimeout(display2, 1*1000);
		game.incorrect++;
	}
}

//Display 4: Total Score
function display4(){
	$("#result").show();
	$("#timerText").hide();
	$("#questionNum").hide();
	clearInterval(timeInv);
	clearTimeout(timeoutSet);
	clearTimeout(transition);
	$("#resultText").text("");
	$("#corText").text("Total correct answers: " + game.correct);
	$("#incorText").append("Total incorrect answers: " + game.incorrect);
	$("#unansText").append("Total unanswered answers: " + game.unanswered);
	$("#againBtn").show();
}

//Play again btn
function playAgain(){
	$("#againBtn").on('click', function(){
		display1();
	})
}

function changeColor(){
	$("input[name=answer]").hover(function(){
		$(this).addClass("changeColor");
	}, function(){
		$(this).removeClass("changeColor");
	})
}

