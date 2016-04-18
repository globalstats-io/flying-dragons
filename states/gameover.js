var GameOver = function() {};

GameOver.prototype = {

    menuConfig: {
        startY: 260,
        startX: 'center'
    },

    init: function(score) {
        this.gameoverText = game.make.text(game.world.centerX, 100, "Game Over", {
            font: 'bold 60pt TheMinion',
            fill: '#FDFFB5',
            align: 'center'
        });
        this.gameoverText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.gameoverText.anchor.set(0.5);

        this.score = score;
        this.scoreText = game.make.text(game.world.centerX, 250, "Your score: " + this.score, {
            font: '30pt Arial',
            fill: '#FDFFB5',
            align: 'center'
        });
        this.scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.scoreText.anchor.set(0.5);
    },

    preload: function() {

    },

    create: function() {
        game.stage.disableVisibilityChange = true;
        game.add.sprite(0, 0, 'menu-bg');
        game.add.existing(this.gameoverText);
        game.add.existing(this.scoreText);
    }
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);