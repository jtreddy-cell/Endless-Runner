// Endless Runner
// Jay Reddy

let config = {
    type: Phaser.AUTO,  
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// reserve keyboard bindings
let keyUP, keyDOWN, keySPACE

let { width, height } = game.config