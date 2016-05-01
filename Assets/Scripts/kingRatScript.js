#pragma strict

var thePlayer : GameObject;
public var roomAssignment : int; //The room dumby is assigned to
public var isActive : boolean;
var targetX : float;
var targetY : float;
var moveHor : float;
var moveVer : float;
public var moveSpeed : float;
var enemyMaxHealth : float;
private var enemyCurrentHealth : float;
var animator: Animator;
var clip: AnimationClip;
var direction : int; //1 = up, 2 = right, 3 = down, 4 = left

function Start () {
  thePlayer = GameObject.Find("player");
  isActive = false;
  gameObject.GetComponent(Rigidbody2D).gravityScale = 0;
  enemyCurrentHealth = enemyMaxHealth;
  animator = gameObject.GetComponent(Animator);
  direction = 3;
  moveHor = 0;
  moveVer = 0;
}

function Update () {

  //Check if the player is in the room
  isActive = (thePlayer.GetComponent(playerController).currentRoom == roomAssignment);

  if(isActive){

    if (!IsInvoking("moveDirection")){
        InvokeRepeating("moveDirection", 2, 2); //Repeat throwing action
	}

   	GetComponent.<Rigidbody2D>().velocity = new Vector2(moveHor, moveVer);
  }

}

function moveDirection(){
	var oldDirection = direction;
	while (oldDirection == direction){
		direction = Random.Range(1,5);
	}

	switch(direction){
		case 1:
			moveVer = moveSpeed;
			moveHor = 0;
			break;
		case 2:
			moveHor = moveSpeed;
			moveVer = 0;
			break;
		case 3:
			moveVer = -moveSpeed;
			moveHor = 0;
			break;
		case 4:
			moveHor = -moveSpeed;
			moveVer = 0;
			break;
	}
	animator.SetInteger("direction",direction);
	print(direction);
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
