//The main script for player control

#pragma strict


//Initializing position variables
var posX : float;
var posY : float;
var angle : float;
var moveSpeed : float;
var mousePos : Vector3;
var lookPos : Vector3;

//Animation Variables
var animator: Animator;


function Start () {
	posX = 0f;
	posY = 0f;
	angle = 0f;
	moveSpeed = 1.5f;
	mousePos = Input.mousePosition;
	lookPos = Camera.main.ScreenToWorldPoint(mousePos);

	animator = gameObject.GetComponent(Animator);
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

    GetComponent.<Rigidbody2D>().velocity = new Vector2(Mathf.Lerp(0, Input.GetAxis("Horizontal")* moveSpeed, 0.8f),
                                                Mathf.Lerp(0, Input.GetAxis("Vertical")* moveSpeed, 0.8f));
}

function ResetTransitions(){
	animator.SetBool("spiderBiting",false);
	animator.SetBool("spiderMoving",false);
}

function Update () {

	ResetTransitions();

	if(Input.GetMouseButtonDown(0)){
		animator.SetBool("spiderBiting", true);
	}
	if(Input.GetAxis("Horizontal") || Input.GetAxis("Vertical")){
		animator.SetBool("spiderMoving",true);
	}

	//Make a call to our update functions
	UpdatePosition();
}