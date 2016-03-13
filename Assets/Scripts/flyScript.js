#pragma strict

var thePlayer : GameObject;
public var rotateSpeed : int;
public var moveSpeed : float;
var targetX : float;
var targetY : float;

function Start () {
	thePlayer = GameObject.Find("player");
	rotateSpeed = 100;
	moveSpeed = 1f;

}

function Update () {
	//if(targetX == null || targetY ==null){
		targetX = thePlayer.transform.position.x;
		targetY = thePlayer.transform.position.y;
	//}
	transform.position = Vector3.MoveTowards(transform.position, new Vector3(targetX, targetY, -8), moveSpeed * Time.deltaTime);
	//transform.RotateAround(new Vector3(targetX, targetY, -8), new Vector3(0, 0, 0), rotateSpeed * Time.deltaTime);

}