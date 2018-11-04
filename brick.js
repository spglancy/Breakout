class brick {
    constructor() {
        this.height = 50;
        this.width = 200;
    }

    draw() {
        ctx.beginPath();
        ctx.rect(this.y, this.x, this.width, this.height);
        ctx.fillStyle = blue;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}
