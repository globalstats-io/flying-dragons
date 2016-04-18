// Global Variables
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
var Main = function () {};

Main.prototype = {

    preload: function () {
        game.load.image('stars',        'assets/images/background.png');
        game.load.image('loading',      'assets/images/progress.png');
        game.load.image('brand',         'assets/images/logo.png');
        game.load.script('utils',       'lib/utils.js');
        game.load.script('splash',      'states/splash.js');
        game.load.script('highscore',   'globalstats.js');
    },

    create: function () {
        globalstats.init('geDUbUS6A6Kf7I8TmdMB3BN8KAM24hTkvwfHr7O1','zglhpeDC1eFC2OnCApHSi1nPh5goTiDszYKYdnAf');
        game.state.add('Splash', Splash);
        game.state.start('Splash');
    }
};

game.state.add('Main', Main);
game.state.start('Main');