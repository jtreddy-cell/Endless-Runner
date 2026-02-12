// Endless Runner
// Jay Reddy

let config = {
    type: Phaser.AUTO,  
    width: 960,
    height: 480,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// reserve keyboard bindings
let keyUP, keyDOWN, keySPACE, keyESC

let { width, height } = game.config