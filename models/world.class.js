class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),

    ];
    canvas;
    ctx; //ctx steht für context

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas=canvas;
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.character.img ,this.character.height, this.character.width, this.character.height, this.character.width);
        
        
        //Draw wird immer wieder Aufgerufen!
        let self=this;
        requestAnimationFrame(function(){
            self.draw();
        });

    };
}