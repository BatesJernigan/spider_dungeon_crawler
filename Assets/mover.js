#pragma strict

var speed : float;
function Update () {
	print("mover transform z: " + transform.rotation.z);
	var mesh = transform.FindChild('VFX');
	mesh.GetComponent.<MeshRenderer>().sortingLayerName = 'player';
	mesh.GetComponent.<MeshRenderer>().sortingOrder = 0;
	GetComponent.<Rigidbody>().velocity = transform.right * speed;
	Destroy (gameObject, 1);
}
