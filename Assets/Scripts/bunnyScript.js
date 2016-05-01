#pragma strict

var thePlayer : GameObject;
public var rotateSpeed : int;
public var moveSpeed : float;
public var roomAssignment : int; //The room the fly is assigned to
public var isActive : boolean;
var targetX : float;
var targetY : float;
var enemyMaxHealth : float;
private var enemyCurrentHealth : float;
var animator: Animator;
animator = gameObject.GetComponent(Animator);

function Start () {
  thePlayer = GameObject.Find("player");
  rotateSpeed = 100;
  isActive = false;
  gameObject.GetComponent(Rigidbody2D).gravityScale = 0;
  enemyCurrentHealth = enemyMaxHealth;
}
function Update () {

  //Check if the player is in the room
  var oldActive = isActive;
  isActive = (thePlayer.GetComponent(playerController).currentRoom == roomAssignment);
  if(!oldActive && isActive){
 	targetX = thePlayer.transform.position.x;
    targetY = thePlayer.transform.position.y;
  }
  if(isActive){

    if (!IsInvoking("jump")){
        InvokeRepeating("jump", 3, 3); //Repeat throwing action
    }
    else{

    	Invoke("updatePosition", 1);
    }
  }
}

function updatePosition(){
	transform.position = Vector2.MoveTowards(transform.position, new Vector2(targetX, targetY), moveSpeed * Time.deltaTime);
}

function jump(){
	targetX = thePlayer.transform.position.x;
    targetY = thePlayer.transform.position.y;
	animator.Play("dustBunnyJump");
}

function OnCollisionEnter2D(coll: Collision2D) {
//	var flyCurrentHeal = thePlayer.GetComponent(playerController).playerCurrentHealth;
	print("enemy current health on collision enter" + enemyCurrentHealth);
	//Collision with enemy
	if (coll.gameObject.layer == LayerMask.NameToLayer("web")){
		enemyCurrentHealth--;
		if (enemyCurrentHealth <= 0){
			Destroy(gameObject);
		}
	}
}
