// Global Variables
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
var Main = function () {};

Main.prototype = {

    preload: function () {
        // If this is not a desktop (so it's a mobile device)
        if (game.device.desktop == false) {
            // Set the scaling mode to SHOW_ALL to show all the game
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            // Set a minimum and maximum size for the game
            // Here the minimum is half the game size
            // And the maximum is the original game size
            game.scale.setMinMax(game.width/2, game.height/2,
                game.width, game.height);
        }

        // Center the game horizontally and vertically
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;

        game.load.image('stars',      'assets/images/background.png');
        game.load.image('loading',    'assets/images/progress.png');
        game.load.image('brand',      'assets/images/logo.png');
        game.load.script('utils',     'lib/utils.js');
        game.load.script('polyfill',  'lib/polyfill.js');
        game.load.script('splash',    'states/splash.js');
        game.load.script('highscore', 'globalstats.js');
    },

    create: function () {
        globalstats.init('geDUbUS6A6Kf7I8TmdMB3BN8KAM24hTkvwfHr7O1','zglhpeDC1eFC2OnCApHSi1nPh5goTiDszYKYdnAf');
        globalstats.create('a1rwulf', 'highscore', 0);
        game.state.add('Splash', Splash);
        game.state.start('Splash');
    }
};

game.state.add('Main', Main);
game.state.start('Main');