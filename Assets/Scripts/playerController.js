//The main script for player control

#pragma strict


//Initializing position variables
var posX : float;
var posY : float;
var angle : float;
var moveSpeed : float;
var mousePos : Vector3;
var lookPos : Vector3;

//Gameplay variables
public var playerMaxHealth : int;
public var playerCurrentHealth : int;

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

	playerMaxHealth = 20;
	playerCurrentHealth = 20;

	animator = gameObject.GetComponent(Animator);

	rgdbdy = gameObject.GetComponent(Rigidbody2D);

	//Turn off gravity
	rgdbdy.gravityScale = 0;
}

//Here are our main collision functions
function OnTriggerEnter2D(coll: Collider2D) {
	//Collision with portal
	if (coll.gameObject.layer == LayerMask.NameToLayer("portal")){
		Debug.Log("touching");
		//Move the camera and player to the new room
		//We do this by grabbing the children of the Room collection, and checking each of their roomID.
		//If we have a match, we move the camera to those coordinates.
		var roomCollection = GameObject.Find("Room Collection").gameObject;
		var numChildren = roomCollection.transform.childCount;
		Debug.Log(numChildren);
		for (var i : int = 0; i < numChildren; i++){
			var room = roomCollection.transform.GetChild(i).gameObject;
			if (coll.gameObject.GetComponent(portalController).destinationRoom == room.GetComponent(roomController).roomID){
				Camera.main.transform.position.x = room.transform.position.x;
				Camera.main.transform.position.y = room.transform.position.y;

				//Move the player to the appropriate section of the room.
				switch(coll.gameObject.GetComponent(portalController).portalDirection){
					
					case 0: //North
						transform.position = room.GetComponent(roomController).bottomSpawn;
						break;
					case 1: //East
						transform.position = room.GetComponent(roomController).leftSpawn;
						break;
					case 2: //South
						transform.position = room.GetComponent(roomController).topSpawn;
						break;
					case 3: //West
						transform.position = room.GetComponent(roomController).rightSpawn;
						break;
					default:
						transform.position.x = room.transform.position.x;
						transform.position.y = room.transform.position.y;
						break;
				}
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
