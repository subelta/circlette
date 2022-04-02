const ROOT_ID = 'root';
const CANVAS_ID = 'main-canvas';

const ROOT_MARGIN = 5;
const CANVAS_BORDER_W = 1;
const MIN_CIRCLES_PAD = 8;
const FRAME_PAD = 130;

class App {
	constructor() {
		const { clientHeight, clientWidth } = document.documentElement;

		// set the "frame"
		const root = document.querySelector(`#${ROOT_ID}`);
		root.style.margin = `${ROOT_MARGIN}px`;
		root.style.height = `${clientHeight - 2 * ROOT_MARGIN}px`;

		// set the canvas
		this.canvas = document.querySelector(`#${CANVAS_ID}`);
		this.c = this.canvas.getContext('2d');

		const dpr = window.devicePixelRatio;
		this.canvas.width = Math.trunc((clientWidth - 2 * CANVAS_BORDER_W - 2 * ROOT_MARGIN) * dpr);
		this.canvas.height = Math.trunc((clientHeight - 2 * CANVAS_BORDER_W - 2 * ROOT_MARGIN) * dpr);

		this.cssWidth = Math.trunc(clientWidth - 2 * CANVAS_BORDER_W - 2 * ROOT_MARGIN);
		this.cssHeight = Math.trunc(clientHeight - 2 * CANVAS_BORDER_W - 2 * ROOT_MARGIN);
		this.canvas.style.width = `${this.cssWidth}px`;
		this.canvas.style.height = `${this.cssHeight}px`;
		this.canvas.style.borderWidth = `${CANVAS_BORDER_W}px`;
		this.c.scale(dpr, dpr);
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
		const circleVicinity = radius * 2 + MIN_CIRCLES_PAD * 2;
		const adjustedWidth = this.cssWidth - (FRAME_PAD * 2);
		const adjustedHeight = this.cssHeight - (FRAME_PAD * 2);

		const circlesInRow = Math.floor(adjustedWidth / circleVicinity); // TODO abstract
		const circlesInCol = Math.floor(adjustedHeight / circleVicinity);

		const paddingX = Math.floor((adjustedWidth - (circlesInRow * 2 * radius)) / (2 * circlesInRow));
		const paddingY = Math.floor((adjustedHeight - (circlesInCol * 2 * radius)) / (2 * circlesInCol));

		let cnt = 0;
		for (let i = 0; i < circlesInRow; i++) {
			for (let j = 0; j < circlesInCol; j++) {
				this.drawCircle(
					FRAME_PAD + (1 + i * 2) * (radius + paddingX), // TODO wtf is 1, again?
					FRAME_PAD + (1 + j * 2) * (radius + paddingY),
					radius,
					cnt > 2,
				);
			}
			cnt = cnt > 4 ? 0 : cnt + 1;
		}
	}

	drawCircle(x, y, r, filled, pie) {
		const startAngle = pie ? getRandomNumber(0, Math.PI * 2) : 0;
		const diffAngle = pie ? getRandomNumber(Math.PI / 2, Math.PI * 3) : 360;

		this.c.save();
		this.c.beginPath();
		this.c.arc(x, y, r, startAngle, startAngle + diffAngle, false);
		if (filled) {
			this.c.fillStyle = '#000';
			this.c.fill();
		} else {
			this.c.strokeStyle = '#000';
			this.c.lineWidth = 1;
			this.c.stroke();
		}
		this.c.restore();
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const app = new App();

	// app.drawVerticalPixelGrid();
	// app.drawHorizontalPixelGrid();
	app.drawCirclesPattern(30);
});

function getRandomNumber(min, max) {
	return (Math.random() * (max - min)) + min;
}
