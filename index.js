const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const gravity = 0.7;
const tileWidth = 64;
const tileHeight = 64;
canvas.width = 1024;
canvas.height = 576;

c.imageSmoothingEnabled = false;
c.fillRect(0, 0, canvas.width, canvas.height);


const shop = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/oak_woods_v1.0/decorations/shop_anim.png',
    scale: 2
})

// Function to create background image sprite
function createBackgroundSprite(backgroundImg) {
    return new Sprite({
        position: {
            x: 0,
            y: 0
        },
        imageSrc: backgroundImg,
        scale: 3.20
    });
}


// Function to create a fence sprite
function createFence(positionX, positionY) {
    return new Sprite({
        position: {
            x: positionX,
            y: positionY
        },
        imageSrc: './img/oak_woods_v1.0/decorations/fence_1.png',
        scale: 3
    });
}


// Function to create a cobble ground sprite
function createCobbleGround(positionX) {
    return new Tile({
        position: {
            x: positionX,
            y: 470,
        },
        imageSrc: './img/oak_woods_v1.0/oak_woods_tileset.png',
        tileX: 134,
        tileY: 0,
        scale: 2,
        tileWidth: 70,
        tileHeight: 24
    })
}


// Function to create a normal ground sprite
function createNormalGround(positionX) {
    return new Tile({
        position: {
            x: positionX,
            y: 470,
        },
        imageSrc: './img/oak_woods_v1.0/oak_woods_tileset.png',
        tileX: 15,
        tileY: 0,
        scale: 2,
        tileWidth: 67,
        tileHeight: 24
    })
}

const background1 = createBackgroundSprite('./img/oak_woods_v1.0/background/background_layer_1.png');
const background2 = createBackgroundSprite('./img/oak_woods_v1.0/background/background_layer_2.png');
const background3 = createBackgroundSprite('./img/oak_woods_v1.0/background/background_layer_3.png');
const fence1 = createFence(150, 415);
const fence2 = createFence(380, 415);
const cobbleGround1 = createCobbleGround(0);
const cobbleGround2 = createCobbleGround(2.857 * 49);
const cobbleGround3 = createCobbleGround(2.857 * 236);
const cobbleGround4 = createCobbleGround(2.857 * 284);
const cobbleGround5 = createCobbleGround(2.857 * 332);
const normalGround1 = createNormalGround(2.857 * 98);
const normalGround2 = createNormalGround(2.857 * 144);
const normalGround3 = createNormalGround(2.857 * 190);


const player1 = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color: 'blue',
    offset: {
        x: 0,
        y: 0
    }
});

const player2 = new Fighter({
    position: {
        x: 400,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    color:'red',
    offset: {
        x: -50,
        y: 0
    }
});

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}


decreaseTimer();

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';  // Clear the canvas before drawing again.
    c.fillRect(0, 0, canvas.width, canvas.height);
    background1.update();
    background2.update();
    background3.update();
    fence1.update();
    fence2.update();
    cobbleGround1.update();
    cobbleGround2.update();
    normalGround1.update();
    normalGround2.update();
    normalGround3.update();
    cobbleGround3.update();
    cobbleGround4.update();
    cobbleGround5.update();
    player1.update();
    player2.update();
    player1.velocity.x = 0;
    player2.velocity.x = 0;
    shop.update();

    
    // player1 1 Movement
    if (keys.a.pressed && player1.lastKey === 'a') {
        player1.velocity.x = -5;
    } else if (keys.d.pressed && player1.lastKey === 'd') {
        player1.velocity.x = 5
    }

    // player1 2 Movement
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
        player2.velocity.x = -5;
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.velocity.x = 5
    }

    // Detect for Collision
    if (rectangularCollision({ rectangle1: player1, rectangle2: player2 }) && player1.isAttacking) {
        player1.isAttacking = false
        player2.health -= 10;
        console.log('player1 1 wins!');
        document.getElementById('player2-health').style.width = player2.health + '%';
    }

    if (rectangularCollision({ rectangle1: player2, rectangle2: player1 }) && player2.isAttacking) {
        player2.isAttacking = false
        player1.health -= 10;
        console.log('player1 1 wins!');
        document.getElementById('player1-health').style.width = player1.health + '%';
    }

    // End game based on health
    if (player1.health <= 0 || player2.health <= 0) {
        determineWinner({ player1, player2, timerId });
    }
}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        // player1 1 Keys
        case 'd':
            keys.d.pressed = true
            player1.lastKey = 'd'
            break;
        case 'a': 
            keys.a.pressed = true
            player1.lastKey = 'a'
            break;
        case 'w':
            player1.velocity.y = -20
            break;
        case ' ':
            player1.attack()
            break;
        // player1 2 Keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            player2.lastKey = 'ArrowRight'
            break;
        case 'ArrowLeft': 
            keys.ArrowLeft.pressed = true
            player2.lastKey = 'ArrowLeft'
            break;
        case 'ArrowUp':
            player2.velocity.y = -20
            break;
        case 'Shift':
            player2.attack()
            break;
        default:
    }
});

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        // player1 1 Keys
        case 'd':
            keys.d.pressed = false
            player1.lastKey = 'a'
            break;
        case 'a': 
            keys.a.pressed = false
            player1.lastKey = 'd'
            break;
        case 'w':
            keys.w.pressed =  false
            break;
        // player1 2 Keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            player2.lastKey = 'ArrowLeft'
            break;
        case 'ArrowLeft':  
            keys.ArrowLeft.pressed = false
            player2.lastKey = 'ArrowRight'
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed =  false
            break;
        default:
    }
});