// Create our 'main' state that will contain the game
var Game = function(game) {};

Game.prototype = {

    preload: function() {
        // This function will be executed at the beginning
        // That's where we load the images and sounds
        game.load.image('bird', 'assets/images/bird.png');
        game.load.image('pipe', 'assets/images/pipe.png');
    },

    create: function() {
        // This function is called after the preload function
        // Here we set up the game, display sprites, etc.
        game.stage.disableVisibilityChange = false;

        // Change the background color of the game to blue
        game.add.sprite(0, 0, 'menu-bg');

        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display the bird at the position x=100 and y=245
        this.bird = game.add.sprite(100, 245, 'bird');

        // Add physics to the bird
        // Needed for: movements, gravity, collisions, etc.
        game.physics.arcade.enable(this.bird);

        // Add gravity to the bird to make it fall
        this.bird.body.gravity.y = 1000;

        // Call the 'jump' function when the spacekey is hit
        var spaceKey = game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        // Call the 'jump' function when we tap/click on the screen
        game.input.onDown.add(this.jump, this);

        this.pipes = game.add.group();

        this.timer = game.time.events.loop(2000, this.addRowOfPipes, this);

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0",
            { font: "30px Arial", fill: "#ffffff" });

        this.bird.anchor.setTo(-0.2, 0.5);
    },

    update: function() {
        // This function is called 60 times per second
        // It contains the game's logic

        // If the bird is out of the screen (too high or too low)
        // Call the 'restartGame' function
        if (this.bird.y < 0 || this.bird.y > 600)
            this.restartGame();

        game.physics.arcade.overlap(
            this.bird, this.pipes, this.hitPipe, null, this);

        if (this.bird.angle < 20)
            this.bird.angle += 1;
    },

    // Make the bird jump
    jump: function() {
        if (this.bird.alive == false)
            return;

        // Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;

        game.add.tween(this.bird).to({angle: -20}, 100).start();
    },

// Restart the game
    restartGame: function() {
        //if (this.score > 0)
            //globalstats.update("a1rwulf", 'highscore', this.score);

        // Start the 'main' state, which restarts the game
        game.state.start('GameOver', true, false, this.score);
    },

    addOnePipe: function(x, y) {
        // Create a pipe at the position x and y
        var pipe = game.add.sprite(x, y, 'pipe');

        // Add the pipe to our previously created group
        this.pipes.add(pipe);

        // Enable physics on the pipe
        game.physics.arcade.enable(pipe);

        // Add velocity to the pipe to make it move left
        pipe.body.velocity.x = -200;

        // Automatically kill the pipe when it's no longer visible
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function() {
        // Randomly pick a number between 1 and 5
        // This will be the hole position
        var hole = Math.floor(Math.random() * 5) + 1;

        // Add the 6 pipes
        // With one big hole at position 'hole' and 'hole + 1'
        for (var i = 0; i < 10; i++)
            if (i != hole -1 && i != hole && i != hole + 1 && i != hole +2)
                this.addOnePipe(800, i * 60);

        this.score += 1;
        this.labelScore.text = this.score;
    },

    hitPipe: function() {
        // If the bird has already hit a pipe, do nothing
        // It means the bird is already falling off the screen
        if (this.bird.alive == false)
            return;

        // Set the alive property of the bird to false
        this.bird.alive = false;

        // Prevent new pipes from appearing
        game.time.events.remove(this.timer);

        // Go through all the pipes, and stop their movement
        this.pipes.forEach(function(p){
            p.body.velocity.x = 0;
        }, this);
    },
};