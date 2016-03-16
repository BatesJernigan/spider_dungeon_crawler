#pragma strict

var attackSpeed : float = 2;

public class Enemy extends MonoBehaviour {
  var damage = 10;
  public class EnemyStats {
    var Health : int = 100;
  }

  var enemyStats : EnemyStats = new EnemyStats();

  function DamageEnemy (damage : int) {
    enemyStats.Health -= damage;
    if (enemyStats.Health <= 0) {
      GameMaster.KillEnemy(this);
    }
  }
}
