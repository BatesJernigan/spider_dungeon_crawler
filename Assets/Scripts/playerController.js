//The main script for player control

#pragma strict


//Initializing position variables
var posX : float;
var posY : float;
var angle : float;
var moveSpeed : float;
var mousePos : Vector3;
var lookPos : Vector3;
var firePoint : Transform;
var whatToHit : LayerMask;
var timeToSpawnEffect : float;
var effectSpawnRate : float = 10;
var damage : int = 10;
var webPrefab : Transform;
var currentRoom : int;

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
	mousePos = Input.mousePosition;
	lookPos = Camera.main.ScreenToWorldPoint(mousePos);
  	currentRoom = 1;

	playerCurrentHealth = playerMaxHealth;

	animator = gameObject.GetComponent(Animator);

	rgdbdy = gameObject.GetComponent(Rigidbody2D);
  	firePoint = transform.FindChild('arrow');

	//Turn off gravity
	rgdbdy.gravityScale = 0;
}

//Here are our main collision functions
function OnTriggerEnter2D(coll: Collider2D) {
	//Collision with enemy
	if (coll.gameObject.layer == LayerMask.NameToLayer("enemy")){
		playerCurrentHealth -= 1;
		if (playerCurrentHealth <= 0){
			playerCurrentHealth = 0;
			SceneManagement.SceneManager.LoadScene('start_menu');
		}
	}
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

        //Change the player's currentRoom value
        currentRoom = room.GetComponent(roomController).roomID;

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
	
	animator.SetBool('spiderBiting', Input.GetButtonDown('Fire1'));
	if(Input.GetAxis("Horizontal") || Input.GetAxis("Vertical")){
		animator.SetBool("spiderMoving",true);
	}
	

  if (Input.GetButtonDown ("Fire1")) {
    shoot();
  }
	//Make a call to our update functions
	UpdatePosition();
}

function shoot () {
  var firePointPosition : Vector2 = Vector2(firePoint.position.x, firePoint.position.y);
//  var hit : RaycastHit2D = Physics2D.Raycast (firePointPosition, lookPos - firePointPosition, 100, whatToHit);
  effect();
//  Debug.DrawLine (lookPos, firePointPosition, Color.cyan);
//  if(hit.collider2d != null) {
//    Debug.Log ("We hit " + hit.collider.name + " and did " + damage + " damage");
  //   //   hit.collider.GetComponent.<Fly>().DamageFly(damage);
  //   Debug.DrawLine (firePointPosition, hit.point, Color.red);
//  }
}
function effect() {
  Instantiate(webPrefab, firePoint.position, firePoint.rotation);
}

function OnCollisionEnter2D(coll: Collision2D) {
	damagePlayer(coll);
}

function OnCollisionStay2D(coll: Collision2D) {
	damagePlayer(coll);
}

function damagePlayer(coll: Collision2D) {
	//Collision with enemy
	if (coll.gameObject.layer == LayerMask.NameToLayer("enemy")){
		playerCurrentHealth--;
		if (playerCurrentHealth <= 0){
			playerCurrentHealth = 0;
			SceneManagement.SceneManager.LoadScene('start_menu');
		}
	}

	if (coll.gameObject.layer == LayerMask.NameToLayer("enemyProjectile")){
		playerCurrentHealth-=20;
		print("test");
		Destroy(coll.gameObject);
		if (playerCurrentHealth <= 0){
			playerCurrentHealth = 0;
			SceneManagement.SceneManager.LoadScene('start_menu');
		}
	}

	//Collision with portal
	if (coll.gameObject.layer == LayerMask.NameToLayer("portal")){
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

        //Change the player's currentRoom value
        currentRoom = room.GetComponent(roomController).roomID;

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
