// Interactable prefab
class Interactable extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, name){
        super(scene, x, y, texture, frame);

        this.name = name;

        // add interactable to existing scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // animate interactable 
        this.anims.play(this.name, true);
    }

    update(){
        // Move right across the screen
        this.setVelocityX(this.scene.gameSpeed * 100);
    }

    collided(){
        // Handle collision effects based on the type of interactable element
        switch(this.name){
            case "obstacle":
                this.scene.sound.play('game_over');
                this.scene.isGameOver = true;
                break;
            case "catnip":
                this.scene.sound.play('item');
                // Increase game speed and stopwatch speed for 10 seconds
                this.scene.catnipEffect();
                break;
            case "treat":
                this.scene.sound.play('item');
                this.scene.score += 20;
                break;
            default:
                console.warn("Unknown interactable type collided:", this.name);
        }

        // Destroy the interactable element when collided with the player
        this.destroy();
    }

    overEdge(){
        this.destroy();
    }
}