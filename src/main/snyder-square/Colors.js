export default class Colors {
    lightGreen = 0x1fed04;
    white = 0xffffff;
    black = 0x000000;

    fillColor = this.lightGreen;
    clearColor = this.white;
    squareColor = this.clearColor;
    borderColor = 'black'; // this.black;

    snyderSquare() {
        return {
            borderColor: this.black,
            color: this.white
        };
    }
}