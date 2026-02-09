class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }


    create(){
        // log being in play scene to console
        console.log("Play Scene");

        // Blue background
        this.cameras.main.setBackgroundColor("#0000FF");

        // Create one black horizantal recatngles to use as a lane at the bottom of the screen
        const laneHeight = height / 5;
        // bottom lane
        this.add.rectangle(width/2, laneHeight * 4, width, laneHeight, 0x0000000);

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
        
        // create cat at bottom right of the screen
        this.cat = new Cat(this, width - 50, laneHeight * 4 - 25, "cat").setOrigin(0.5);

        // create an empty list of interactable elements (obstacle, catnip, treat)
        this.interactables = [];

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
                this.elapsedTime += 0.01 * this.stopwatchSpeed; // increase elapsed time by 0.01 seconds (10ms) multiplied by the stopwatch speed
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
        //console.log("Updating Play Scene");

        // Update the time text
        this.timeText.setText("Time: " + this.elapsedTime.toFixed(2));
        
        // Keep updating while game is not over
        if(!this.isGameOver){
            this.cat.update();
            this.interactables.forEach(interactable => {
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

        // Check collision or if interactable goes off the right edge of the screen
        this.interactables.forEach(interactable => {
            if(this.checkCollision(this.cat, interactable)){
                interactable.collided();
                this.interactables = this.interactables.filter(i => i !== interactable);
            }
            else if(interactable.x > width){
                interactable.overEdge();
                this.interactables = this.interactables.filter(i => i !== interactable);
            }
        });     
    }

    // Spawns an interactable element (obstacle, catnip, treat) 
    spawnInteractable(){
        // Randomly choose between obstacle, catnip, and treat
        const types = ["obstacle", "catnip", "treat"];
        const type = Phaser.Utils.Array.GetRandom(types);

        // Create the interactable element at the left edge of the screen in the bottom lane
        const laneHeight = height / 5;
        const interactable = new Interactable(this, 0, laneHeight * 4 - 25, type, 0, type).setOrigin(0.5);
        
        // Add the interactable element to the list of interactables
        this.interactables.push(interactable);
    }

    // Check for collision between the player and an interactable element
    checkCollision(cat, interactable) {
        // simple AABB checking
        if (cat.x < interactable.x + interactable.width &&
            cat.x + cat.width > interactable.x &&
            cat.y < interactable.y + interactable.height &&
            cat.height + cat.y > interactable.y) {
                return true;
        } else {
            return false;
        }
    }

    // Handle game over state
    gameOver(){
        // Stop the stopwatch and spawn timer
        this.stopwatch.paused = true;
        this.spawnTimer.paused = true;

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
        this.scene.gameSpeed += 1;
        this.scene.stopwatchSpeed += 0.5;
        // slows game back down after 10 seconds
        this.catnipTimer = this.time.addEvent({
            delay: 10000, 
            loop: false,
            callback: () => {
                this.scene.gameSpeed -= 1;
                this.scene.stopwatchSpeed -= 0.5;
                console.log("Catnip effect ended, game speed returned to normal");
            }
        });
    }
}