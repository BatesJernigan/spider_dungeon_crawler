#pragma strict

var thePlayer : GameObject;
public var roomAssignment : int; //The room dumby is assigned to
public var isActive : boolean;
var targetX : float;
var targetY : float;
var enemyMaxHealth : float;
private var enemyCurrentHealth : float;
var animator: Animator;
var clip: AnimationClip;
var eggs = new Array(); //Array of instantiated eggs

function Start () {
  thePlayer = GameObject.Find("player");
  isActive = false;
  gameObject.GetComponent(Rigidbody2D).gravityScale = 0;
  enemyCurrentHealth = enemyMaxHealth;
  animator = gameObject.GetComponent(Animator);
}

function Update () {

  //Check if the player is in the room
  isActive = (thePlayer.GetComponent(playerController).currentRoom == roomAssignment);

  if(isActive){
    //Targeting
    //if(targetX == null || targetY ==null){
    targetX = thePlayer.transform.position.x;
    targetY = thePlayer.transform.position.y;
    //}

    if (!IsInvoking("throwEgg")){
        InvokeRepeating("throwEgg", 3, 3); //Repeat throwing action
    } else if (eggs.length > 3) {
    	var temp : GameObject = eggs.Shift();
    	Destroy(temp);
    }
  }

}

function throwEgg(){
	animator.Play("throwingAnim");
	var newEgg : GameObject = Instantiate(Resources.Load("Egg"));
	newEgg.GetComponent(Rigidbody2D).gravityScale = 0;
	newEgg.transform.parent = transform.parent;
	newEgg.transform.position = transform.position;
	eggs.Push(newEgg);
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
