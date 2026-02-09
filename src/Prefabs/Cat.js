// Cat prefab
class Cat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add cat to existing scene
        scene.add.existing(this);

        this.isJumping = false;
    }

    update(){
        // Jump if the player presses space while the cat is on the ground
        if(Phaser.Input.Keyboard.JustDown(keySPACE) && !this.isJumping){
            console.log("Jump");
        }
    }
}