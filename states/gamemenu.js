var GameMenu = function() {};

GameMenu.prototype = {

    menuConfig: {
        startY: 260,
        startX: 'center'
    },

    init: function() {
        this.titleText = game.make.text(game.world.centerX, 100, "FLAPPY BIRDS", {
            font: 'bold 30pt Action',
            fill: '#FDFFB5',
            align: 'center'
        });
        this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
        this.titleText.anchor.set(0.5);
    },

    preload: function() {
        this.optionCount = 1;
    },

    create: function() {
        game.stage.disableVisibilityChange = true;
        game.add.sprite(0, 0, 'menu-bg');
        game.add.existing(this.titleText);

        this.addMenuOption('START', function () {
            game.state.start("Game");
        });

    }
};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);