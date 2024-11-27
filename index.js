const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;
class Sprite {
    constructor({ position, }) {
        this.position = position
        this.height = 150
        this.width = 50
    }
    draw() {
    }
    update() {
        this.draw();
    }
}

class Fighter {
    constructor({ position, velocity, color, offset }) {
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.color = color
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50 
        } 
        this.lastKey
        this.isAttacking = false
        this.health = 100
    }
    draw() {
        c.fillStyle = this.color;
        c.fillRect(this.position.x, this.position.y, this.width, this.height);

        // Attack box
        if (this.isAttacking) {
            c.fillStyle = 'yellow';
            c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }
    update() {
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if(this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }
    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }
}


const player1 = new Sprite({
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

const player2 = new Sprite({
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
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x 
        && rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width
        && rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y
        && rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function determineWinner({ player1, player2, timerId }) {
    clearTimeout(timerId);
    document.getElementById('displayText').style.display = 'flex'
        if (player1.health === player2.health) {
            document.getElementById('displayText').innerText = 'It\'s a tie!';
        } else if (player1.health > player2.health) {
            document.getElementById('displayText').innerText = 'Player 1 wins!';
        } else if (player1.health < player2.health) {
            document.getElementById('displayText').innerText = 'Player 2 wins!';
        }
}

let timer = 10
let timerId
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--;
        document.getElementById('timer').innerText = timer;
    }
    
    if (timer === 0) {
        determineWinner({ player1, player2 });
    }
}

decreaseTimer();

function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';  // Clear the canvas before drawing again.
    c.fillRect(0, 0, canvas.width, canvas.height);
    player1.update();
    player2.update();
    player1.velocity.x = 0;
    player2.velocity.x = 0;
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