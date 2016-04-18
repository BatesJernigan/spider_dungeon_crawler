#pragma strict

var speed : float;
function Start () {
	var mesh = transform.FindChild('VFX');
	mesh.GetComponent.<MeshRenderer>().sortingLayerName = 'player';
	mesh.GetComponent.<MeshRenderer>().sortingOrder = 0;
	GetComponent.<Rigidbody>().velocity = transform.right * speed;
	Destroy (gameObject, 1);
}
