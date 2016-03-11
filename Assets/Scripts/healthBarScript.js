#pragma strict

var thePlayer : GameObject;
var playerMax : int;
var playerCurrent : int;
var healthPercentage : float;
var oldHealthPercentage : float;

function Start () {
	thePlayer = GameObject.Find("player");
	playerMax = 20;
	playerCurrent = 20;
	healthPercentage = (parseFloat(playerCurrent) / parseFloat(playerMax)) * 100.0f;
	oldHealthPercentage = healthPercentage;
}

function Update () {
	playerMax = thePlayer.gameObject.GetComponent(playerController).playerMaxHealth;
	playerCurrent = thePlayer.gameObject.GetComponent(playerController).playerCurrentHealth;
	healthPercentage = (parseFloat(playerCurrent) / parseFloat(playerMax)) * 100.0f;
	if (healthPercentage != oldHealthPercentage){
		updateHealthBar();
		oldHealthPercentage = healthPercentage;
	}
		
}

function updateHealthBar(){
	GetComponent(RectTransform).sizeDelta = new Vector2(healthPercentage, GetComponent(RectTransform).rect.height);
}