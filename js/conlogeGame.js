class Hero {
    constructor({ name = 'hero', xp = 0 } = {}) {
        this.name = name;
        this.xp = xp;
    }

    gainXp(amount) {
        alert(`${this.name} получает ${this.xp} опыта за убийство ${superMage.npcForBattle}`);
        this.xp += amount;
    }
}

class Mage extends Hero {
    constructor(config) {
        super(config);
        this.spells = config.spells;
        this.npc = config.npc;
        this.health = config.health;
    }

    cast() {
        objDB.chooseSpell();
        alert(`${this.name} кастует ${this.spells[objDB.indexOfSpell]}`);
    }
    npcAttack(health) {
        // console.log(`Вы встретили ${this.npc}, он агрессивно настроен и прыгает на Вас`);
        let healthOfNpc = health;
        let damageToNpc = 0;
        let mageHealth = this.health;
        let damageToMage = 0;
        let i = 0;
        do {
            const randomDamageByMage = Math.round(Math.random() * (100 - 1) + 1);
            const randomDamageByNpc = Math.round(Math.random() * (150 - 1) + 1);
            if (healthOfNpc >= 0) {
                this.cast();
                healthOfNpc -= randomDamageByMage;
                damageToNpc += randomDamageByMage;
                mageHealth -= randomDamageByNpc;
                damageToMage += randomDamageByNpc;
                // this.cast();
                if (healthOfNpc <= 0) {
                    alert(`Вы нанесли ${randomDamageByMage} урона и ты, ${this.name} одолел ${superMage.npcForBattle}`);
                    break;
                }
            }
            alert(`Вы нанесли ${randomDamageByMage} урона, у ${superMage.npcForBattle} осталось ${healthOfNpc} жизней. Вам нанесли ${damageToMage}. Остаток здоровья ${mageHealth}`);

        } while (i++ < 10);
        alert(`Ты сумарно нанес ${superMage.npcForBattle}, ${Number(damageToNpc)} урона. Поздравляю с победой, ${this.name}! Остаток твоего здоровья: ${mageHealth}`);
    }
}

const objDB = {
    indexOfSpell: 0,
    ratingOfGame: 0,
    spellsForCharacterToUse: 0,
    character: function () {
        let i = 0;
        while (i++ < 1) {
            const nameCharacter = prompt('Введите имя Вашего персонажа');
            if (nameCharacter != null && nameCharacter != '') {
                return nameCharacter;
            } else {
                i--;
            }
        }
    },
    startTheGame: function () {
        const start = confirm(`Поздравляю, ${superMage.name} в суворой реальности, где миром правят орки, и тебе судьбой преначертанно это исправить. Готов к испытаниям?`);
        if (start != null, start != '') {
            alert(`Напоминаю, ты, ${superMage.name} маг и вот твой список доступных заклинаний: ${superMage.spells}`);
            objDB.battleWithNpc();
            superMage.npcAttack(250);
            superMage.gainXp(500);
            this.endGame();
            // console.log(`${superMage.gainXp()}`);
            return start;
        } else {
            alert(`Игра окончена, единственная надежда была на тебе ${superMage.name}. Человечество пало.`);
            alert(`Если ты хочешь начать игру заново, обнови страницу. В следующий раз у тебя обязательно получиться, ${superMage.name}`);
        }
    },
    battleWithNpc: function () {
        const walk = confirm('Путишествуя, ты набрел на развилку. Слева дорога ведущая в странную пещеру, справа дорога ведущая в темный лес. Куда выберешь путь, путник? Чтоб пойти на лево, нажми ОК, чтоб пойти на право, нажми CANCEL ');

        if (walk != null, walk != '') {
            superMage.npcForBattle = superMage.npc[0];
            alert(`В пещере, ты набрел на ${superMage.npcForBattle}. Будь осторожней, это проворные существа.`);
            // let allSpells = '';
            this.spellsForCharacterToUse = superMage.spells.map(function (spell, i) {
                return ` ${i + 1} : ${spell}`;
            });
        } else {
            superMage.npcForBattle = superMage.npc[1];
            alert(`В тёмном лесу, ты набрел на ${superMage.npcForBattle}. Будь осторожней, это проворные существа.`);
            // let allSpells = '';
            this.spellsForCharacterToUse = superMage.spells.map(function (spell, i) {
                return ` ${i + 1} : ${spell}`;
            });
        }
    },
    chooseSpell: function () {
        let i = 0;
        while (i++ < 1) {
            this.indexOfSpell = Number(prompt(`Какое заклинание выберешь для атаки? ${this.spellsForCharacterToUse}`)) - 1;
            if (this.indexOfSpell === 0 || this.indexOfSpell === 1 || this.indexOfSpell === 2 || this.indexOfSpell === 3 || this.indexOfSpell === 4) {
                return this.indexOfSpell;
            } else {
                i--;
            }
        }
    },
    endGame: function () {
        this.ratingOfGame = Number(prompt(`Это была демо версия игры, если ты хочешь узнать как дальше развивались события, расскажи об этой игре своим друзьям и близким, а так же не забудь оценить эту игру`, '100'));
    }
};
// objDB.character();
const superMage = new Mage({ name: objDB.character(), xp: 500, spells: ['огненный шар', ' морозная волна', ' ледяная глыба', ' огненная стрела', ' огненная волна'], npc: ['гоблин', 'орк'], health: 1000 });

objDB.startTheGame();
console.log(objDB.indexOfSpell);


