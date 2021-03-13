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

		// this.drawVerticalPixelGrid();
		// this.drawHorizontalPixelGrid();
		this.drawCirclesPattern(50);
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

	drawCirclesPattern(radius) {
		const { height, width } = this.canvas;
		const minPadding = 10;
		const circlesInRow = Math.floor(width / (radius * 2 + minPadding * 2));
		const circlesInCol = Math.floor(height / (radius * 2 + minPadding * 2));

		console.log(circlesInRow, circlesInCol);
		const paddingX = Math.floor((width - (circlesInRow * 2 * radius)) / (2 * circlesInRow));
		const paddingY = Math.floor((height - (circlesInCol * 2 * radius)) / (2 * circlesInCol));

		for (let i = 0; i < circlesInRow; i++) {
			for (let j = 0; j < circlesInCol; j++) {
				this.drawCircle(
					(1 + i * 2) * (radius + paddingX),
					(1 + j * 2) * (radius + paddingY),
					radius,
					i % 3 < 1
				);
			}
		}
	}

	drawCircle(x, y, r, shouldFill) {
		const startAngle = getRandomNumber(0, Math.PI * 2);
		const diffAngle = getRandomNumber(Math.PI / 2, Math.PI * 2);

		this.c.save();
		this.c.beginPath();
		this.c.arc(x, y, r, startAngle, startAngle + diffAngle, false);
		if (shouldFill) {
			this.c.fillStyle = '#000';
			this.c.fill();
		} else {
			this.c.strokeStyle = '#000';
			this.c.lineWidth = 2;
			this.c.stroke();
		}
		this.c.restore();
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const app = new App();
});

function getRandomNumber(min, max) {
	return (Math.random() * (max - min)) + min;
}
