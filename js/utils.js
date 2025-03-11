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
    restartBtn = document.getElementById('restart-btn')
        if (player1.health === player2.health) {
            document.getElementById('displayText').innerHTML = 'It\'s a tie!';
            gsap.to('#displayText', {
                ease: 'elastic.out',
                duration: 3,
                opacity: 1,
                onComplete: () => {
                    flashPlayAgainText();
                    restartBtn.style.display = 'block';
                }
            })
        } else if (player1.health > player2.health) {
            document.getElementById('displayText').innerHTML = 'Player 1 wins!';
            console.log('Player 1 wins!');
            gsap.to('#displayText', {
                ease: 'elastic.out',
                duration: 3,
                opacity: 1,
                onComplete: () => {
                    flashPlayAgainText();
                    restartBtn.style.display = 'block';
                }
            })
        } else if (player1.health < player2.health) {
            document.getElementById('displayText').innerHTML = 'Player 2 wins!';
            console.log('Player 2 wins!');
            gsap.to('#displayText', {
                ease: 'elastic.out',
                duration: 3,
                opacity: 1,
                onComplete: () => {
                    flashPlayAgainText();
                    restartBtn.style.display = 'block';
                }
            })
        }
}

function flashPlayAgainText() {
    gsap.to('#displayText', {
        duration: 0.5,
        opacity: 0,
        repeat: -1,
        yoyo: true,
        ease: 'steps(1)',
        onRepeat: () => {
            document.getElementById('displayText').innerHTML = 'Play Again?';
        }
    });
}
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