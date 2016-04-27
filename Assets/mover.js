#pragma strict

var speed : float;
function Update () {
	var mesh = transform.FindChild('VFX');
	mesh.GetComponent.<MeshRenderer>().sortingLayerName = 'player';
	mesh.GetComponent.<MeshRenderer>().sortingOrder = 0;
	GetComponent.<Rigidbody2D>().velocity = transform.right * speed;
	Destroy (gameObject, 1);
}

function OnCollisionEnter2D (coll: Collision2D) {
	switch(coll.gameObject.layer){
		case LayerMask.NameToLayer("enemy"):
		case LayerMask.NameToLayer("portal"):
//		case LayerMask.NameToLayer("Default"):
			Destroy(gameObject);
			break;
		default:
			Destroy(gameObject, .25);
	}
}
