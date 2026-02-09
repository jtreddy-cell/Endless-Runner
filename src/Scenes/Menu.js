class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        // Will preload assets here once I have some

        // Preload cat 
        this.load.image("cat", "./assets/cat.png");

        // Preload interactable elements (obstacle, catnip, treat)
        this.load.image("obstacle", "./assets/obstacle.png");
        this.load.image("catnip", "./assets/catnip.png");
        this.load.image("treat", "./assets/treat.png");
    }

    create(){
        // log being in menu scene to console
        //console.log("Menu Scene");

        // Display a blue background
        this.cameras.main.setBackgroundColor("#0000FF");


        // Display text describing instructions
        let menuConfig = {
            fontFamily: "Arial",
            fontSize: "28px",
            color: "#FFFFFF",
            align: "center",
            padding: {
                top: 5,
                bottom: 5,
            },
        }

        this.add.text(width/2, height/2 - 50, "Endless Runner", menuConfig).setOrigin(0.5);
        menuConfig.fontSize = "18px";
        this.add.text(width/2, height/2, "Use UP and DOWN arrows to move", menuConfig).setOrigin(0.5);
        this.add.text(width/2, height/2 + 50, "Press SPACE to start", menuConfig).setOrigin(0.5);


        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){ 
        // console.log("Updating Menu Scene");
        // Switch to play scene if player hits spacebar
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            this.scene.start("playScene");
        }
    }
}
