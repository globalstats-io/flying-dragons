var Splash = function () {};

Splash.prototype = {

    loadScripts: function () {
        //game.load.script('style', 'lib/style.js');
        //game.load.script('mixins', 'lib/mixins.js');
        game.load.script('WebFont', 'vendor/webfontloader.js');
        //game.load.script('gamemenu','states/GameMenu.js');
        //game.load.script('game', 'states/Game.js');
        //game.load.script('gameover','states/GameOver.js');
        //game.load.script('credits', 'states/Credits.js');
        //game.load.script('options', 'states/Options.js');
    },

    // varios freebies found from google image search
    loadImages: function () {
        game.load.image('menu-bg', 'assets/images/background.png');
        game.load.image('options-bg', 'assets/images/background.png');
        game.load.image('gameover-bg', 'assets/images/background.png');
    },

    loadFonts: function () {
        WebFontConfig = {
            custom: {
                families: ['TheMinion'],
                urls: ['assets/style/theminion.css']
            }
        }
    },

    init: function () {
        this.loadingBar = game.make.sprite(game.world.centerX-(400/2), 400, "loading");
        //this.logo       = game.make.sprite(game.world.centerX, 200, 'brand');
        this.title      = game.make.text(game.world.centerX, 200, 'Loading...', {fill: 'white'});
        this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
        utils.centerGameObjects([this.title, this.status]);
    },

    preload: function () {
        game.add.sprite(0, 0, 'stars');
        //game.add.existing(this.logo).scale.setTo(0.5);
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
        //game.state.add("Game",Game);
        //game.state.add("GameOver",GameOver);
        //game.state.add("Credits",Credits);
        //game.state.add("Options",Options);
    },

    create: function() {
        this.title.setText('Flappy Birds!');
        this.status.setText('Ready!');
        this.addGameStates();

        setTimeout(function () {
            game.state.start("GameMenu");
        }, 1000);
    }
};