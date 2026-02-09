// Cat prefab
class Cat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        // Add cat to the scene
        scene.add.existing(this);

        // Jump properties
        this.fixedX = x;           // lock horizontal position
        this.yStart = y;           // the Y position of the lane (ground)
        this.isJumping = false;
        this.jumpVelocity = -15;    // negative = upward
        this.gravity = 0.3;        // pulls cat down
        this.velocityY = 0;        // current vertical speed
    }

    update(){
        // Lock X
        this.x = this.fixedX;

        // Jump input
        if(Phaser.Input.Keyboard.JustDown(keySPACE) && !this.isJumping){
            this.velocityY = this.jumpVelocity;
            this.isJumping = true;
            console.log("Jump!");
        }

        // Apply gravity
        this.velocityY += this.gravity;
        this.y += this.velocityY;

        // Check landing
        if(this.y >= this.yStart){
            this.y = this.yStart;
            this.velocityY = 0;
            this.isJumping = false;
        }
    }
}
