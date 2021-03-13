const ROOT_ID = 'root';
const CANVAS_ID = 'main-canvas';

const ROOT_MARGIN = 5;
const CANVAS_BORDER_W = 1;

class App {
	constructor() {
		// set the canvas
		this.canvas = document.querySelector(`#${CANVAS_ID}`);
		this.c = this.canvas.getContext('2d');

		const { clientHeight, clientWidth } = document.documentElement;
		this.canvas.style.borderWidth = `${CANVAS_BORDER_W}px`;
		this.canvas.width = Math.trunc(clientWidth - 2 * CANVAS_BORDER_W - 2 * ROOT_MARGIN);
		this.canvas.height = Math.trunc(clientHeight - 2 * CANVAS_BORDER_W - 2 * ROOT_MARGIN);

		// set the "frame"
		const root = document.querySelector(`#${ROOT_ID}`);
		root.style.margin = `${ROOT_MARGIN}px`;
		root.style.height = `${clientHeight - 2 * ROOT_MARGIN}px`;

		this.drawMainBg();
		this.drawVerticalPixelGrid();
		// this.drawHorizontalPixelGrid();
	}

	drawMainBg() {
		this.c.fillStyle = 'lightgrey';
		this.c.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	drawVerticalPixelGrid() {
		for (let i = 0.5; i < this.canvas.width; i += 2) {
			this.c.lineWidth = 1;
			this.c.beginPath();
			this.c.moveTo(i, 0);
			this.c.lineTo(i, this.canvas.height);
			this.c.strokeStyle = '#8a8a8a';
			this.c.stroke();
		}
	}

	drawHorizontalPixelGrid() {
		for (let i = 0.5; i < this.canvas.height; i += 2) {
			this.c.lineWidth = 1;
			this.c.beginPath();
			this.c.moveTo(0, i);
			this.c.lineTo(this.canvas.width, i);
			this.c.strokeStyle = '#8a8a8a';
			this.c.stroke();
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const app = new App();
});

