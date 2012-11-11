$(function() {
	$( ".dropfeld" ).droppable({ 
		drop: function( event, ui ) { 
				movePlayerTo( $(ui.draggable).attr("id"),$(this).attr("id")); 
			}
	});
	$("#clear").click(
		function () { 
			$("#history ul").children().remove();
			$("#clear").hide();
		}
	);

	$(".menuBtn").click(
		function () {
			switch ($(this).attr("id")) {
				case "clearBtn": 
					$("#history ul").children().remove();
					$("#clearBtn").hide();
					
					break;
				case "refreshBtn": 
					$(".spielfigur").remove();
					getPositions();
					break;						
				case "debugBtn": toggleDebugLog();
					break;
				case "settingsBtn": toggleSettingsMenu();
					break;
				default: 
					if ($(this).attr("id").toString() != "") {
					showMessage("MenuButton Unkown: "+$(this).attr("id"));
					}
			
			}
		
		}
	);
});



$(document).ready(function()
{
	getPositions();
	
	posVal = setInterval(function(){ getPositions(); }, 5000);
});

function toggleDebugLog () {
showMessage("boom");
	if ( $('#debugMenu').is(":visible") ) {
		$('#debugMenu').hide();	
		showMessage("DebugLog Disabled.");
	}
	else {
		$('#debugMenu').show();	
		showMessage("DebugLog Enabled.");
	}

}

function toggleSettingsMenu () {
showMessage("boom");
	if ( $('#settingsMenu').is(":visible") ) {
		$('#settingsMenu').hide();	
		showMessage("SettingsMenu Disabled.");
	}
	else {
		$('#settingsMenu').show();	
		showMessage("SettingsMenu Enabled.");
	}

}

function showMessage ($message) {
	$("#headMessage").text($message);
}

function getPlayerName($playerID) {
	return "Spieler "+$playerID.substr(1,1);
}

function playerIsAtPosition($playerID,$fieldID) {
	var $curFieldID = $("#"+$playerID).parent().attr("id");
	if ($curFieldID == $fieldID) {
		return true;
	}
	return false;
}

var getPositions = function() {
$("#updateDisplay").show();
$.getJSON("getPlayers", function(data) {
	$.each(data, function(i,item){
			var pName = "";
			var x = "";
			var y = "";
			$.each(item, function(key,val) {
					//debug("i: "+key+" - item: "+val);
					switch (key) {
						case ("playerName"): pName = val;
							break;
						case ("x"): x= val;
							break;
						case ("y"): y= val;
							break;
					}
			});
			if (!playerIsAtPosition(pName, "f"+x+y)) {				
				removePlayer(pName);
				setPlayerTo(pName,"f"+x+y);
				debug("Set Player: "+pName+" to f"+x+y);
			}
		});
  });
  $("#updateDisplay").hide();
}


  

function setPlayerTo( $playerID, $fieldID ) {
	$("#"+$fieldID).append("<div id='"+$playerID+"' class='spielfigur'><img src='img/user_icon.png' style='margin:16px;' title='"+getPlayerName($playerID)	+"'></div>");
	$("#"+$playerID).draggable({
		revert: "invalid",
		helper: "clone",
		cusor: "move"});
	$(".spielfigur").hover(function() {
			$(this).addClass("hover");
		},function(){
			$(this).removeClass("hover");
		});
}
function sendPlayerPosition( $playerID, $fieldID ) {
$.post("move", { 
		id: $playerID,
		x: $fieldID.toString().substr(1,1),
		y: $fieldID.toString().substr(2,1)
	},
	function(data) {
		//getPositions();
		}
	);
}
function removePlayer($playerID) {
	$("#"+$playerID).remove()
}
function getXYString($fieldID) {
	return $fieldID.toString().substr(1,1)+"/"+ $fieldID.toString().substr(2,1);
}
function getXY($fieldID) {
	return new Array($fieldID.toString().substr(1,1), $fieldID.toString().substr(2,1));
}	
function debug($text) {
	$("#history ul").append("<li>"+$text+"</li>");
	$("#clearBtn").show();
}
function movePlayerTo( $playerID, $fieldID ) {
	var $oldFieldID = $("#"+$playerID).parent().attr('id');
	if (getXYString($oldFieldID) != getXYString($fieldID)) {
		removePlayer($playerID);
		debug("moved "+$playerID+" from "+getXYString($oldFieldID) +" to " +getXYString($fieldID));
		setPlayerTo($playerID,$fieldID);
		//SEND GET TO SERVER WITH PLAYERID AND FIELID TO STORE IN DATABASE
		sendPlayerPosition($playerID,$fieldID);
	}
}

	