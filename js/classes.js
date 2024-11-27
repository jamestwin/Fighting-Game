class Sprite {
    constructor({ position, imageSrc, scale }) {
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale
    }
    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.image.width * this.scale, this.image.height * this.scale);
    }
    update() {
        this.draw();
    }
}

class Tile {
    constructor({ position, imageSrc, tileX, tileY, tileWidth, tileHeight, scale }) {
        this.position = position
        this.height = 50
        this.width = 150
        this.image = new Image();
        this.image.src = imageSrc;
        this.tileX = tileX
        this.tileY = tileY
        this.tileWidth = tileWidth
        this.tileHeight = tileHeight
        this.image.width = this.tileWidth
        this.image.height = this.tileHeight
        this.scale = scale
    }
    draw() {
        c.drawImage(this.image, this.tileX, this.tileY, this.tileWidth, this.tileHeight, this.position.x, this.position.y, this.image.width * this.scale, this.image.height * this.scale);
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
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 105) {
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
