#pragma strict

var moveSpeed : int;

function Update () {
  gameObject.GetComponent.<LineRenderer>().sortingLayerName = 'player';
  gameObject.GetComponent.<LineRenderer>().sortingOrder = 0;
  transform.Translate (Vector3.right * Time.deltaTime * moveSpeed);
  Destroy (gameObject, 1);
}
