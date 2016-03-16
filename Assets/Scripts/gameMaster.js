#pragma strict

public class GameMaster extends MonoBehaviour {
  // public static function KillPlayer (player : Player) {
  //   Destroy (player.gameObject);
  // }

  public static function KillEnemy(enemy : Enemy) {
    Destroy (enemy.gameObject);
  }
}
