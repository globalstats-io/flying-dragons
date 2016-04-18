var GameOver = function() {};

GameOver.prototype = {

    menuConfig: {
        startY: 320,
        startX: 'center'
    },

    init: function(score) {
        this.gameoverText = game.make.text(game.world.centerX, 100, "GAME OVER", {
            font: '40pt Action',
            fill: '#FDFFB5',
            align: 'center'
        });
        this.gameoverText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.gameoverText.anchor.set(0.5);

        this.score = score;
        this.scoreText = game.make.text(game.world.centerX, 250, "YOUR SCORE - " + this.score, {
            font: '20pt Action',
            fill: '#FDFFB5',
            align: 'center'
        });
        this.scoreText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.scoreText.anchor.set(0.5);
    },

    preload: function() {
        this.optionCount = 1;
    },

    create: function() {
        game.stage.disableVisibilityChange = true;
        game.add.sprite(0, 0, 'menu-bg');
        game.add.existing(this.gameoverText);
        game.add.existing(this.scoreText);
        globalstats.update('a1rwulf', 'highscore', this.score);
        globalstats.get();

        this.addMenuOption('RETRY', function () {
            game.state.start("Game");
        });
    }
};

Phaser.Utils.mixinPrototype(GameOver.prototype, mixins);