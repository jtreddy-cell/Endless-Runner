/* Endless Runner
Jay Reddy
Approx Hours: 25
Creative Tilt Justification:
Technically, I was proud of my catnip mechanic. I think temporary speed ups in games can be fun, and though it was an easy addition, I think it does add a little bit of depth, especially since players can also just choose not to take it. It's a tradeoff of a higher score but more risk since the game speeds up.
Visually, though my graphics aren't the most well made, I haven't made assets at all before this class, so I think for a first try I did a decent job, especially with the cat animation. 
Overall, even though I didn't neccesarily do anything new with the genre, I think I did a decent job considering I tried out a lot of things new to me. 
*/

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
            debug: false
        }
    },
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// reserve keyboard bindings
let keyUP, keyDOWN, keySPACE, keyESC

let { width, height } = game.config