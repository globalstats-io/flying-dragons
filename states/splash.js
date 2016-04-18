var Splash = function () {};

Splash.prototype = {

    loadScripts: function () {
        game.load.script('style', 'lib/style.js');
        game.load.script('mixins', 'lib/mixins.js');
        game.load.script('WebFont', 'vendor/webfontloader.js');
        game.load.script('gamemenu','states/gamemenu.js');
        game.load.script('game', 'states/game.js');
        game.load.script('gameover','states/gameover.js');
    },

    loadImages: function () {
        game.load.image('menu-bg', 'assets/images/background.png');
        game.load.image('options-bg', 'assets/images/background.png');
        game.load.image('gameover-bg', 'assets/images/background.png');
    },

    loadFonts: function () {
        WebFontConfig = {
            custom: {
                families: ['Action'],
                urls: ['assets/style/action_black.css']
            }
        }
    },

    init: function () {
        this.loadingBar = game.make.sprite(game.world.centerX-(400/2), 400, "loading");
        this.title      = game.make.text(game.world.centerX, 200, 'Loading...', {fill: 'white'});
        this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
        utils.centerGameObjects([this.title, this.status]);
    },

    preload: function () {
        game.add.sprite(0, 0, 'stars');
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);
        game.add.existing(this.title);
        this.load.setPreloadSprite(this.loadingBar);

        this.loadScripts();
        this.loadImages();
        this.loadFonts();
    },

    addGameStates: function () {

        game.state.add("GameMenu",GameMenu);
        game.state.add("Game",Game);
        game.state.add("GameOver",GameOver);
    },

    create: function() {
        this.title.setText('Loading...');
        this.status.setText('Ready!');
        this.addGameStates();

        setTimeout(function () {
            game.state.start("GameMenu");
        }, 1000);
    }
};