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
        this.gameOver = false;

        // define keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        // create cat at bottom right of the screen
        this.cat = new Cat(this, width - 50, laneHeight * 4 - 25, "cat").setOrigin(0.5);

        // create an empty list of interactable elements (obstacle, catnip, treat)
        this.interactables = [];

        // create a text display for time elapsed
        this.starttime = this.time.now;
        this.timeText = this.add.text(10, 10, "Time: 00:00", { fontSize: "32px", fill: "#FFFFFF" });
        

    }

    update(){ 
        console.log("Updating Play Scene");

        // Display time elapsed
        this.elapsedTime = Math.floor((this.time.now - this.starttime) / 1000);
        const minutes = Math.floor(this.elapsedTime / 60).toString().padStart(2, "0");
        const seconds = (this.elapsedTime % 60).toString().padStart(2, "0");
        this.timeText.setText(`Time: ${minutes}:${seconds}`);
        

        // Create a random interactable element (obstacle, catnip, treat) every 2 seconds

        
        // Keep updating while game is not over
        if(!this.gameOver){
            this.cat.update();
        }
    }

}