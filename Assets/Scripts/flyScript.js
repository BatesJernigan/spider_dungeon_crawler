#pragma strict

var thePlayer : GameObject;
public var rotateSpeed : int;
public var moveSpeed : float;
var targetX : float;
var targetY : float;

function Start () {
	thePlayer = GameObject.Find("player");
	rotateSpeed = 0;
	moveSpeed = 1f;

}

function Update () {
	// targetX = thePlayer.transform.position.x;
	// targetY = thePlayer.transform.position.y;
	// transform.position = Vector3.MoveTowards(transform.position, new Vector3(targetX, targetY, -8), moveSpeed * Time.deltaTime);
}
