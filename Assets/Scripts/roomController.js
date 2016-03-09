#pragma strict

public var roomID : int;
public var bottomSpawn : Vector3;
public var topSpawn : Vector3;
public var leftSpawn : Vector3;
public var rightSpawn : Vector3;

function Start () {
	//Note: The float values should not be hardcoded and should be calculated based on the size of the room.
	//Also note that the -8 is the current Z-value of the spider.
	bottomSpawn = new Vector3(transform.position.x, transform.position.y - .5f, -8);
	topSpawn = new Vector3(transform.position.x, transform.position.y + .5f, -8);
	leftSpawn = new Vector3(transform.position.x - 1.5f, transform.position.y, -8);
	rightSpawn = new Vector3(transform.position.x + 1.5f, transform.position.y, -8);
}

function Update () {

}