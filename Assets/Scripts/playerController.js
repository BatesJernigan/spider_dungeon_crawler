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

//Grab the rigidBody component
var rgdbdy: Rigidbody2D;


function Start () {
	posX = 0f;
	posY = 0f;
	angle = 0f;
	moveSpeed = 1.5f;
	mousePos = Input.mousePosition;
	lookPos = Camera.main.ScreenToWorldPoint(mousePos);

	animator = gameObject.GetComponent(Animator);

	rgdbdy = gameObject.GetComponent(Rigidbody2D);

	//Turn off gravity
	rgdbdy.gravityScale = 0;
}

//Here are our main collision functions
function OnTriggerEnter2D(coll: Collider2D) {
	if (coll.gameObject.layer == LayerMask.NameToLayer("portal")){
		Debug.Log("touching");
		//Move the camera to the new room
		for (var room: GameObject in (GameObject.Find("Room Collection"))){
			if (coll.gameObject.GetComponent(portalController).destinationRoom == room.GetComponent(roomController).roomID){
				Camera.main.transform.position = room.transform.position;
			}
		}
	}
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
	
	animator.SetBool('spiderBiting', Input.GetMouseButtonDown(0));
	if(Input.GetAxis("Horizontal") || Input.GetAxis("Vertical")){
		animator.SetBool("spiderMoving",true);
	}
	
	//Make a call to our update functions
	UpdatePosition();
}
