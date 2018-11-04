class ball {
    constructor() {
        this.trajectory = 30;
        this.speed = 2;
        this.radius = 10;
        this.vectorY = this.speed * Math.sin(degToRad(this.trajectory) * -1);
        this.vectorX = this.speed * Math.cos(degToRad(this.trajectory) * -1);
        this.color = "black";
        this.x = canvas.width/2
        this.y = canvas.height-25;
    }

    update() {
        this.x += this.vectorX;
        this.y += this.vectorY;
    }

    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fillstyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    wallCheck() {
        if(this.x + this.vectorX >= canvas.width + this.radius || this.x - this.vectorX <= 0 - this.radius || this.y - this.vectorY <= 0 - this.radius) {
            const offset = 90 - this.trajectory;
            this.trajectory = offset + 90;
            console.log(this.trajectory);
        }
    }
}
