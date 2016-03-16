#pragma strict

var thePlayer : GameObject;
public var rotateSpeed : int;
public var moveSpeed : float;
public var roomAssignment : int; //The room the fly is assigned to
public var isActive : boolean;
var targetX : float;
var targetY : float;

function Start () {
  thePlayer = GameObject.Find("player");
  rotateSpeed = 100;
  moveSpeed = 1f;
  isActive = false;
}

function Update () {

  //Check if the player is in the room
  isActive = (thePlayer.GetComponent(playerController).currentRoom == roomAssignment);

  print(isActive);

  if(isActive){
    //Targeting
    //if(targetX == null || targetY ==null){
    targetX = thePlayer.transform.position.x;
    targetY = thePlayer.transform.position.y;
    //}

    //Movement
    transform.position = Vector3.MoveTowards(transform.position, new Vector3(targetX, targetY, -8), moveSpeed * Time.deltaTime);
    //transform.RotateAround(new Vector3(targetX, targetY, -8), new Vector3(0, 0, 0), rotateSpeed * Time.deltaTime);
  }
}
