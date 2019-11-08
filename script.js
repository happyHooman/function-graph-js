class Plotter {
    constructor() {
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.step = 50;

        this.init()
    }

    init() {
        this.drawAxes();
    }

    escape(fn) {
        const mapObj = {
            sin: "Math.sin",
            cos: "Math.cos",
            pi: "Math.PI",
            sqrt: "Math.sqrt"
        };

        const re = new RegExp(Object.keys(mapObj).join("|"), "gi");
        fn = fn.replace(re, function (matched) {
            return mapObj[matched];
        });
        return fn
    }

    drawAxes() {
        const midX = this.canvas.width / 2;
        const midY = this.canvas.height / 2;
        const ctx = this.ctx;
        const width = this.canvas.width;
        const height = this.canvas.height;

        ctx.fillStyle = '#000000';

        ctx.moveTo(0, midY);
        ctx.lineTo(width, midY);
        ctx.moveTo(midX, 0);
        ctx.lineTo(midX, height);

        ctx.moveTo(width - 10, midY + 4);
        ctx.lineTo(width, midY);
        ctx.lineTo(width - 10, midY - 4);

        ctx.moveTo(midX - 4, 10);
        ctx.lineTo(midX, 0);
        ctx.lineTo(midX + 4, 10);

        for (let i = 0; i < 7; i++) {
            this.oyGrades(i + 1)
        }

        for (let i = 0; i < 7; i++) {
            this.oyGrades(-1 - i)
        }

        for (let i = 0; i < 7; i++) {
            this.oxGrades(i + 1)
        }

        for (let i = 0; i < 7; i++) {
            this.oxGrades(-i - 1)
        }
        
        // ctx.stroke();
        //
        // ctx.fillStyle = '#333333';
        // ctx.moveTo(midX + this.step, 0);
        // ctx.lineTo(midX + this.step, height);

        ctx.stroke();
    }

    oxGrades(n) {
        const midX = this.canvas.width / 2;
        const midY = this.canvas.height / 2;
        const ctx = this.ctx;
        const step = this.step;

        ctx.moveTo(midX + n * step, midY - 5);
        ctx.lineTo(midX + n * step, midY + 5);

    }


    oyGrades(n) {
        const midX = this.canvas.width / 2;
        const midY = this.canvas.height / 2;
        const ctx = this.ctx;
        const step = this.step;

        ctx.moveTo(midX + 5, midY - n * step);
        ctx.lineTo(midX - 5, midY - n * step);

    }

    point(x, y, size) {
        const midX = this.canvas.width / 2;
        const midY = this.canvas.height / 2;
        const step = this.step;

        this.ctx.fillRect(x * step + midX - size / 2, this.canvas.height - midY - y * step - size / 2, size, size);
    }

    getFunctionDefinition() {
        return document.getElementById('functionDefinition').value;
    }

    plot() {
        const midX = this.canvas.width / 2;

        const fd = this.escape(this.getFunctionDefinition());
        this.ctx.fillStyle = '#00FF00';

        for (let i = 0; i < this.canvas.width; i++) {
            const x = (i - midX) / this.step;
            const y = eval(fd.replace('x', x));
            this.point(x, y, 2)
        }
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawAxes();
    }

    inspect(el) {
        const btn = document.getElementById('plotbtn');
        btn.disabled = !el.value;
    }
}

const plt = new Plotter();