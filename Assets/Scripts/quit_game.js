#pragma strict

function Start() {
  gameObject.GetComponent.<MeshRenderer>().sortingLayerName = 'player';
  gameObject.GetComponent.<MeshRenderer>().sortingOrder = 0;
}

function OnMouseUp () {
  Application.Quit();
}
