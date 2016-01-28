//The main script for player control

#pragma strict


//Initializing position variables
var posX : float;
var posY : float;
var angle : float;
var mousePos : Vector3;
var lookPos : Vector3;


function Start () {
	posX = 0f;
	posY = 0f;
	angle = 0f;
	mousePos = Input.mousePosition;
	lookPos = Camera.main.ScreenToWorldPoint(mousePos);
}

//Functions for update assistance
function UpdatePosition() {
	posX = transform.position.x;
	posY = transform.position.y;

	mousePos = Input.mousePosition;
    mousePos.z = 2.0f; //The distance (z-axis) from the camera to the player object.
    lookPos = Camera.main.ScreenToWorldPoint(mousePos);
    lookPos = lookPos - transform.position;
    angle = Mathf.Atan2(lookPos.y, lookPos.x) * Mathf.Rad2Deg;
    transform.rotation = Quaternion.AngleAxis(angle, Vector3.forward);
}

function Update () {

	//Make a call to our update functions
	UpdatePosition();
}