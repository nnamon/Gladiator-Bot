const Gladiator = require('./gladiator');

class Arena {
  constructor() {
    this.inProgress = false;

    this.baseGladiatorStats = {
      health: 100
    };

    this.attacks = {
      head: {
        chance: 0.1,
        damage: 50
      },
      body: {
        chance: 0.33,
        damage: 30
      },
      legs: {
        chance: 0.80,
        damage: 10
      },
      lions: {
        chance: 1,
        damage: 1000
      }
    }
  }

  startFight(gladiator1, gladiator2) {
    if (this.inProgress) return false;
    this.gladiator1 = new Gladiator(gladiator1, this.baseGladiatorStats);
    this.gladiator2 = new Gladiator(gladiator2, this.baseGladiatorStats);
    this.inProgress = true;
    return true;
  }

  _getGladiator(user) {
    return user.id === this.gladiator1.id ? this.gladiator1 : user.id === this.gladiator2.id ? this.gladiator2 : null;
  }

  _attackGladiator(attackingUser, attack) {
    const attacker = this._getGladiator(attackingUser);
    const target = attacker === this.gladiator1 ? this.gladiator2 : this.gladiator1;
    if (attacker && target) {
        if (!this.lastAttacker || this.lastAttacker !== attacker.id) {
            this.lastAttacker = attacker.id;
            const roll = Math.random();
            if (roll < attack.chance) {
              target.damage(attack.damage);
      
              if (target.health <= 0) {
                this.inProgress = false;
                this.gladiator1 = null;
                this.gladiator2 = null;
                return {
                  message: 'WIN',
                  winner: attacker,
                  loser: target
                }
              }
              return {
                message: 'HIT',
                gladiator: attacker,
                target
              }
            } else {
              return {
                message: 'MISS',
                gladiator: attacker,
                target
              }
            }
            } else {
            return {
              message: 'NOT_GLADIATOR'
            }
          }
          } else {
            message.channel.send('How about you give your opponent a chance?  The fans don\' like one sided battles')
        }
      

  }

  attackHead(attackingUser) {
    return this._attackGladiator(attackingUser, this.attacks.head);
  }

  attackBody(attackingUser) {
    return this._attackGladiator(attackingUser, this.attacks.body);
  }

  attackLegs(attackingUser) {
    return this._attackGladiator(attackingUser, this.attacks.legs);
  }

  attackLions(attackingUser) {
    return this._attackGladiator(attackingUser, this.attacks.lions);
  }
}

module.exports = new Arena();