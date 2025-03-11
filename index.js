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
        x: 620,
        y: 120
    },
    imageSrc: './img/oak_woods_v1.0/decorations/shop_anim.png',
    scale: 2.75,
    framesMax: 6
})

// Function to create background image sprite
function createBackgroundSprite(backgroundImg) {
    return new Sprite({
        position: {
            x: 0,
            y: 0
        },
        imageSrc: backgroundImg,
        scale: 3.20,
        framesMax: 1
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
        x: 100,
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
    },
    scale: 2.5,
    imageSrc: './img/Martial Hero/Sprites/Idle.png',
    framesMax: 8,
    offset: {
        x: 215,
        y: 156
    },
    sprites: {
        idle: {
            imageSrc: './img/Martial Hero/Sprites/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/Martial Hero/Sprites/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/Martial Hero/Sprites/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/Martial Hero/Sprites/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './img/Martial Hero/Sprites/Attack1.png',
            framesMax: 6
        },
        attack2: {
            imageSrc: './img/Martial Hero/Sprites/Attack2.png',
            framesMax: 6
        },
        takeHit: {
            imageSrc: './img/Martial Hero/Sprites/Take Hit - white silhouette.png',
            framesMax: 4
        },
        death: {
            imageSrc: './img/Martial Hero/Sprites/Death.png',
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 80,
            y: 50
        },
        width: 160,
        height: 50
    },
    health: 500,
});

const player2 = new Fighter({
    position: {
        x: 800,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    color:'red',
    offset: {
        x: 0,
        y: 0
    },
    scale: 2.5,
    imageSrc: './img/Martial Hero 2/Sprites/Idle.png',
    framesMax: 4,
    offset: {
        x: 215,
        y: 169
    },
    sprites: {
        idle: {
            imageSrc: './img/Martial Hero 2/Sprites/Idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './img/Martial Hero 2/Sprites/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/Martial Hero 2/Sprites/Jump.png',
            framesMax: 2
        },
        fall: {
            imageSrc: './img/Martial Hero 2/Sprites/Fall.png',
            framesMax: 2
        },
        attack1: {
            imageSrc: './img/Martial Hero 2/Sprites/Attack1.png',
            framesMax: 4
        },
        attack2: {
            imageSrc: './img/Martial Hero 2/Sprites/Attack2.png',
            framesMax: 4
        },
        takeHit: {
            imageSrc: './img/Martial Hero 2/Sprites/Take hit.png',
            framesMax: 3
        },
        death: {
            imageSrc: './img/Martial Hero 2/Sprites/Death.png',
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50
        },
        width: 160,
        height: 50
    },
    health: 300
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

let timer = 10
decreaseTimer();

function animate() {
    let winnerDeclared = false
    if (timer <= 0) {
        return;
    }
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';  // Clear the canvas before drawing again.
    c.fillRect(0, 0, canvas.width, canvas.height);
    background1.update();
    background2.update();
    background3.update();
    fence1.update();
    fence2.update();
    shop.update();
    cobbleGround1.update();
    cobbleGround2.update();
    normalGround1.update();
    normalGround2.update();
    normalGround3.update();
    cobbleGround3.update();
    cobbleGround4.update();
    cobbleGround5.update();
    c.fillStyle = 'rgba(255, 255, 255, 0.15)'
    c.fillRect(0, 0, canvas.width, canvas.height);
    player1.update();
    player2.update();
    player1.velocity.x = 0;
    player2.velocity.x = 0;
    

    
    // player1 1 Movement
    
    if (keys.a.pressed && player1.lastKey === 'a') {
        player1.velocity.x = -5;
        player1.switchSprite('run');
    } else if (keys.d.pressed && player1.lastKey === 'd') {
        player1.switchSprite('run');
        player1.velocity.x = 5
    } else {
        player1.switchSprite('idle');
    }
    if (player1.velocity.y < 0) {
        player1.switchSprite('jump');
    } else if (player1.velocity.y > 0) {
        player1.switchSprite('fall');
    }

    // player1 2 Movement
    if (keys.ArrowLeft.pressed && player2.lastKey === 'ArrowLeft') {
        player2.velocity.x = -5;
        player2.switchSprite('run');
    } else if (keys.ArrowRight.pressed && player2.lastKey === 'ArrowRight') {
        player2.switchSprite('run');
        player2.velocity.x = 5
    } else {
        player2.switchSprite('idle');
    }
    if (player2.velocity.y < 0) {
        player2.switchSprite('jump');
    } else if (player2.velocity.y > 0) {
        player2.switchSprite('fall');
    }

    // Detect for Collision
    if (rectangularCollision({ rectangle1: player1, rectangle2: player2 }) && player1.isAttacking && player1.framesCurrent === 4) {
        player2.takeHit()
        player1.isAttacking = false
        gsap.to('#player2-health',{
            width: player2.health / 3+ '%',
        })
    }

    if (player1.isAttacking && player1.framesCurrent === 4) {
        player1.isAttacking = false
    }

    if (rectangularCollision({ rectangle1: player2, rectangle2: player1 }) && player2.isAttacking && player2.framesCurrent === 2) {
        player1.takeHit()
        player2.isAttacking = false
        gsap.to('#player1-health',{
            width: player1.health / 5 + '%',
        })
    }

    if (player2.isAttacking && player2.framesCurrent === 2) {
        player2.isAttacking = false
    }

    // End game based on health
    if (player1.health <= 0 || player2.health <= 0 && !winnerDeclared) {
        determineWinner({ player1, player2, timerId });
        winnerDeclared = true
    }
}

animate();

window.addEventListener('keydown', (event) => {
    if (!player1.isDead) {
        switch (event.key) {
            // player1 Keys
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
        }
    }
    if (!player2.isDead) {

            // player2 Keys
            switch(event.key) {
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