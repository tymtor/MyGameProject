const startButton = document.getElementById("start-button");
const startScreen = document.getElementById("start-screen");
const gameCanvas = document.getElementById("gameCanvas");

startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameCanvas.style.display = "block";
    startGame();
});

function startGame() {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: "gameCanvas",
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 300 },
                debug: false,
            },
        },
        scene: {
            preload: preload,
            create: create,
            update: update,
        },
    };

    const game = new Phaser.Game(config);

    let player;
    let cursors;

    function preload() {
        this.load.image("background", "path-to-background.jpg");
        this.load.image("player", "path-to-character.png");
    }

    function create() {
        this.add.image(400, 300, "background").setScale(2);

        player = this.physics.add.sprite(100, 450, "player").setScale(0.5);
        player.setCollideWorldBounds(true);

        cursors = this.input.keyboard.createCursorKeys();
    }

    function update() {
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
        } else {
            player.setVelocityX(0);
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
    }
}
