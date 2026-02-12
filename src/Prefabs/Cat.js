// Cat prefab
class Cat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        // Add cat to the scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        // Jump properties
        this.fixedX = x;           // lock horizontal position
        this.groundY = y;           // the Y position of the lane (ground)
        this.jumpStrength = 500;    
        this.body.setGravityY(600)   
        this.setCollideWorldBounds(true); 

        // Play running animation by default
        this.anims.play("cat_run", true);
    }

    update(){
        // Lock X
        this.x = this.fixedX;

        // Jump input
        if(Phaser.Input.Keyboard.JustDown(keySPACE) && this.body.blocked.down){
            this.setVelocityY(-this.jumpStrength);
            this.anims.play("cat_jump", true);
        }
        // play cat running animation when on the ground
        else if(this.body.blocked.down){
            this.anims.play("cat_run", true);
        }

    }
}
