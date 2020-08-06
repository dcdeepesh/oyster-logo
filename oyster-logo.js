const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const context = canvas.getContext("2d");
context.lineCap = "round";
context.strokeStyle = "#FFFFFF";

const CX = Math.floor(canvas.width / 2);
const CY = Math.floor(canvas.height / 2);
const RADIUS = 55;
const DIFF = Math.floor(RADIUS / 2.1);
const LINE_WIDTH = Math.floor(DIFF / 3);
context.lineWidth = LINE_WIDTH;

const animation = new class {
    constructor() {
        this.isOn = false;
        this.rotatedBy = 0;
        this.handle = null;
    }

    toggle() {
        if (this.isOn) this.stop();
        else this.start();
    }

    start() {
        this.handle =
            setInterval(() => drawState(this.rotatedBy), 60);
        this.isOn = true;
    }

    stop() {
        clearInterval(this.handle);
        this.isOn = false;
    }

    get rotatedBy() {
        var temp = this._rotatedBy;
        this._rotatedBy += 0.4;
        return temp;
    }

    set rotatedBy(amount) {
        this._rotatedBy = amount;
    }
}

function drawArc(radius, sa, ea) {
    sa = 360-sa;
    ea = 360-ea;

    // set angles to (angle % 360) except when
    // they are non-zero and multiples of 360
    if (sa != 0 && sa % 360 == 0)
        sa = 360;
    else sa %= 360;
    if (ea != 0 && ea % 360 == 0)
        ea = 360;
    else ea %= 360;

    var saDegree = Math.PI * sa / 180;
    var eaDegree = Math.PI * ea / 180;

    context.beginPath();
    context.arc(CX, CY, radius, saDegree, eaDegree, true);
    context.stroke();
}

function drawState(rotateAmount=0) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    var rad0 = RADIUS;
    var rad1 = RADIUS + DIFF;
    var rad2 = rad1 + DIFF;
    var r = rotateAmount;

    // core (0)
    drawArc(rad0, 0, 360);

    // inner (2,4)
    drawArc(rad1, 111-r, 152-r);
    drawArc(rad1, 254-r, 20-r);

    // outer (1,3,5)
    drawArc(rad2, 121+r, 215+r);
    drawArc(rad2, 31+r, 60+r);
    drawArc(rad2, 273+r, 303+r);
}

drawState();