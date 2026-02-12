class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }


    create(){
        // log being in play scene to console
        console.log("Play Scene");

        // Display a background color for the play scene
        this.cameras.main.setBackgroundColor("#DDDDDD");

        // Create one black horizantal recatngles to use as a lane at the bottom of the screen
        const laneHeight = height / 5;

        // bottom lane
        this.ground = this.add.rectangle(width/2, laneHeight * 4 + 100, width, laneHeight, 0x000000);
        this.physics.add.existing(this.ground, true);

        // Create cat running animation
        this.anims.create({
            key: "cat_run",
            frames: this.anims.generateFrameNumbers("cat", { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });


        // Create cat jumping animation
        this.anims.create({
            key: "cat_jump",
            frames: this.anims.generateFrameNumbers("cat", { start: 2, end: 2 }),
            frameRate: 1,
            repeat: -1
        });
        

        // create cat at bottom right of the screen
        this.cat = new Cat(this, width - 50, laneHeight * 4 - 100, "cat").setOrigin(0.5);
        this.cat.immovable = true;  

        // collision between cat and ground
        this.physics.add.collider(this.cat, this.ground);

        // game over flag
        this.isGameOver = false;

        // score variable
        this.score = 0;

        // game speed variable
        this.gameSpeed = 2;

        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        // create an empty list of interactable elements (obstacle, catnip, treat)
        this.interactables = this.physics.add.group();

        this.physics.add.overlap(this.cat, this.interactables, (cat, interactable) => {
            interactable.collided();
        });
        

        // Stopwatch for elapsed time
        this.elapsedTime = 0;

        this.timeText = this.add.text(10, 10, "Time: 0.00", {
            fontSize: "32px",
            fill: "#FFFFFF"
        });
        
        this.stopwatchSpeed = 1;
        this.stopwatch = this.time.addEvent({
            delay: 10, // updates every 10ms
            loop: true,

            callback: () => {
                this.elapsedTime += 0.01; // increase elapsed time by 0.01 seconds (10ms) 
                this.score += 0.1 * this.stopwatchSpeed; // increase score over time, multiplied by the stopwatch speed
            }
        });
        
        this.spawnTimer = this.time.addEvent({
            delay: 2000, // spawns every 2 seconds
            loop: true,
            callback: () => {
                this.spawnInteractable();
            }
        });
        
        this.speedUp = this.time.addEvent({
            delay: 10000, // increases speed every 10 seconds
            loop: true,
            callback: () => {
                this.gameSpeed += 0.5;
                this.stopwatchSpeed += 0.25;
            }
        });

    }

    update(){ 
        // Update the time text
        this.timeText.setText("Time: " + this.elapsedTime.toFixed(2));
        
        // Keep updating while game is not over
        if(!this.isGameOver){
            this.cat.update();
            this.interactables.getChildren().forEach(interactable => {
                interactable.update();
            });
        }
        else{
            this.gameOver();
        }

        // If the game is over, check for input to restart or go back to menu
        if(this.isGameOver){
            if(Phaser.Input.Keyboard.JustDown(keySPACE)){
                this.scene.restart();
            }
            else if(Phaser.Input.Keyboard.JustDown(keyESC)){
                this.scene.start("menuScene");
            }
        }
    }

    // Spawns an interactable element (obstacle, catnip, treat) 
    spawnInteractable(){
        // Randomly choose between obstacle, catnip, and treat. Obstacles should be more common than catnip and treats, so they are weighted more heavily in the random selection.
        const types = ["obstacle", "obstacle", "obstacle", "catnip", "treat"];
        const type = Phaser.Utils.Array.GetRandom(types);

        // Create the interactable element at the left edge of the screen in the bottom lane
        const laneHeight = height / 5;
        const interactable = new Interactable(this, 0, laneHeight * 4 - 25, type, 0, type).setOrigin(0.5);

        // Add the interactable element to the list of interactables
        this.interactables.add(interactable);
    }

    // Handle game over state
    gameOver(){
        // Stop the stopwatch and spawn timer
        this.stopwatch.paused = true;
        this.spawnTimer.paused = true;
        this.speedUp.paused = true;

        // Stop cat animation
        this.cat.anims.stop();

        // Destroy all interactable elements
        this.interactables.clear(true, true);

        // Display the score rounded to the nearest integer
        console.log("Final Score:", Math.round(this.score));

        // Display game over text
        let gameOverConfig = {
            fontFamily: "Arial",
            fontSize: "48px",
            color: "#FFFFFF",
            align: "center",
            padding: {
                top: 5,
                bottom: 5,
            },
        }
        this.add.text(width/2, height/2, "Game Over", gameOverConfig).setOrigin(0.5);
        this.add.text(width/2, height/2 + 50, "Press Space to play again, or ESC to go back to menu.", gameOverConfig).setOrigin(0.5);       
    }

    // Handle catnip effect
    catnipEffect(){
        this.gameSpeed += 1;
        this.stopwatchSpeed += 0.5;
        // slows game back down after 10 seconds
        this.catnipTimer = this.time.addEvent({
            delay: 10000, 
            loop: false,
            callback: () => {
                this.gameSpeed -= 1;
                this.stopwatchSpeed -= 0.5;
                console.log("Catnip effect ended, game speed returned to normal");
            }
        });
    }
}