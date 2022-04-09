
// TODO document
export class Drawer {
	constructor(props) {
		Object.assign(this, props);
	}

	drawVerticalPixelGrid() {
		this.c.save();
		for (let i = 0.5; i < this.canvas.width; i += 2) {
			this.c.lineWidth = 1;
			this.c.beginPath();
			this.c.moveTo(i, 0);
			this.c.lineTo(i, this.canvas.height);
			this.c.strokeStyle = '#8a8a8a';
			this.c.stroke();
		}
		this.c.restore();
	}

	drawHorizontalPixelGrid() {
		this.c.save();
		for (let i = 0.5; i < this.canvas.height; i += 2) {
			this.c.lineWidth = 1;
			this.c.beginPath();
			this.c.moveTo(0, i);
			this.c.lineTo(this.canvas.width, i);
			this.c.strokeStyle = '#8a8a8a';
			this.c.stroke();
		}
		this.c.restore();
	}
}