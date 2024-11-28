class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }, flip = false }) {
        this.position = position
        this.height = 150
        this.width = 50
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0;
        this.framesElapsed = 0
        this.framesHold = 10
        this.offset = offset
        this.flip = flip
    }
    draw() {
        c.drawImage(this.image,
                    this.framesCurrent * (this.image.width / this.framesMax),
                    0,
                    this.image.width / this.framesMax,
                    this.image.height,
                    this.position.x - this.offset.x, 
                    this.position.y - this.offset.y, 
                    (this.image.width / this.framesMax) * this.scale,
                    this.image.height * this.scale
                );
    }
    animateFrames() {
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0
            }
        }
    }
    update() {
        this.draw();
        this.animateFrames();
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

class Fighter extends Sprite{
    constructor({ position,
                  velocity,
                  color, 
                  imageSrc, 
                  scale = 1, 
                  framesMax = 1, 
                  offset = { x: 0, y: 0 }, 
                  sprites, flip = false, 
                  attackBox = { offset: {}, width: undefined, height: undefined },
                  isDead = false,
                }) 
        {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset,
            flip
        })
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.color = color
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height 
        } 
        this.lastKey
        this.isAttacking = false
        this.health = 100
        this.framesCurrent = 0;
        this.framesElapsed = 0
        this.framesHold = 7
        this.sprites = sprites
        this.isDead = isDead
        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }
    update() {
        this.draw();
        if (!this.isDead) {
            this.animateFrames();
        }
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        // c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height, 'rgba(255,')
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // gravity functionality
        if(this.position.y + this.height + this.velocity.y >= canvas.height - 105) {
            this.velocity.y = 0;
            this.position.y = 322
        } else {
            this.velocity.y += gravity;
        }
    }
    attack() {
        this.switchSprite('attack1');
        this.isAttacking = true;
    }
    takeHit() {
        this.health -= 10;
        if (this.health <= 0) {
            this.switchSprite('death');
        } else {
            this.switchSprite('takeHit');
        }
    }
    switchSprite(sprite) {
        if (this.image === this.sprites.death.image) {
            if (this.framesCurrent >= this.sprites.death.framesMax - 1)
                this.isDead = true;
    
            return;
        }
        if (this.image === this.sprites.attack1.image 
            && this.framesCurrent < this.sprites.attack1.framesMax - 1) return
        
        if (this.image === this.sprites.takeHit.image
            && this.framesCurrent < this.sprites.takeHit.framesMax - 1) return
        
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'run':
                if (this.image!== this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'jump':
                if (this.image!== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'fall':
                if (this.image!== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image;
                    this.framesMax = this.sprites.fall.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'attack1':
                if (this.image!== this.sprites.attack1.image) {
                    this.image = this.sprites.attack1.image;
                    this.framesMax = this.sprites.attack1.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'takeHit':
                if (this.image!== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image;
                    this.framesMax = this.sprites.takeHit.framesMax;
                    this.framesCurrent = 0;
                }
                break;
            case 'death':
                if (this.image!== this.sprites.death.image) {
                    this.image = this.sprites.death.image;
                    this.framesMax = this.sprites.death.framesMax;
                    this.framesCurrent = 0;
                }
                break;
        }
    }
}
