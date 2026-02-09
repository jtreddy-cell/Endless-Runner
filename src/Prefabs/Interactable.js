// Interactable prefab
class Interactable extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, name){
        super(scene, x, y, texture, frame);

        this.name = name;
        console.log("Interactable created with type:", name);


        // add interactable to existing scene
        scene.add.existing(this);
    }

    update(){
        // Move right across the screen
        this.x += this.scene.gameSpeed;

        // Destroy the interactable element if it goes off the right edge of the screen
        if(this.x > width){
            this.destroy();
        }
    }

    collided(){
        // Handle collision effects based on the type of interactable element
        console.log("Collided with " + this.name);
        switch(this.name){
            case "obstacle":
                console.log("Game Over");
                this.scene.isGameOver = true;
                break;
            case "catnip":
                console.log("Game speed increased");
                // Increase game speed and stopwatch speed for 10 seconds
                this.scene.catnipEffect();
                break;
            case "treat":
                console.log("Score increased by 20");
                this.scene.score += 20;
                break;
            default:
                console.log("Unknown interactable type");
        }

        // Destroy the interactable element when collided with the player
        this.destroy();
    }
}