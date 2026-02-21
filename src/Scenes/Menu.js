class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }

    preload(){
        // Will preload assets here once I have some

        // Preload cat 
        this.load.spritesheet("cat", "./assets/cat.png", {
            frameWidth: 64,
            frameHeight: 64
        });

        // Preload interactable elements (obstacle, catnip, treat)
        this.load.spritesheet("obstacle", "./assets/obstacle.png", {    
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.spritesheet("catnip", "./assets/catnip.png", {
            frameWidth: 64,
            frameHeight: 64
        });

        this.load.spritesheet("treat", "./assets/treat.png", {
            frameWidth: 64,
            frameHeight: 64
        });

        // preload background and scrollling elements
        this.load.image("background", "./assets/background.png");
        this.load.image("big clouds", "./assets/big_clouds.png");

        // preload audio
        this.load.audio("jump", "./assets/jump.wav");
        this.load.audio("item", "./assets/bonus.wav");
        this.load.audio("game_over", "./assets/game-over.wav");
        this.load.audio("game_start", "./assets/game-start.wav");
        this.load.audio("background_music", "./assets/background-music.mp3");
    }

    create(){
        // Display a background color for the menu
        this.cameras.main.setBackgroundColor("#DDDDDD");

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
        this.add.text(width/2, height/2 + 50, "Press SPACE to start and jump", menuConfig).setOrigin(0.5);
        this.add.text(width/2, height/2 + 80, "Avoid obstacles and collect catnip and treats for points!", menuConfig).setOrigin(0.5);


        // Credits on the bottom left
        menuConfig.fontSize = "14px";
        this.add.text(10, height - 70, "Visuals and Programming done by Jay Reddy", menuConfig);
        this.add.text(10, height - 50, "Sound effects from Mixkit", menuConfig);
        this.add.text(10, height - 30, "Background music by Tatamusic on Pixabay", menuConfig);

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(){ 
        // Switch to play scene if player hits spacebar
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            // Play game start sound effect
            this.sound.play("game_start");
            this.scene.start("playScene");
        }
    }
}
