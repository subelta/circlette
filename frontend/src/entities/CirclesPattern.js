import { getRandomNumber } from '../utils.js';
import { Canvas } from './Canvas.js';

const MIN_CIRCLES_PAD = 8;
const RADIUS = 30;
const COLORS = {
	vaporWave: ['#5df8ff', '#db7aff'],
	judgementDay: ['#FFEB27', '#FF146A']
};


export class CirclesPattern extends Canvas {
	constructor(props) {
		super(props);
	}

	draw(radius = RADIUS) {
		const circleVicinity = radius * 2 + MIN_CIRCLES_PAD * 2;
		const adjustedWidth = this.cssWidth - (this.framePad * 2);
		const adjustedHeight = this.cssHeight - (this.framePad * 2);

		const circlesInRow = Math.floor(adjustedWidth / circleVicinity);
		const circlesInCol = Math.floor(adjustedHeight / circleVicinity);

		const paddingX = Math.floor((adjustedWidth - (circlesInRow * 2 * radius)) / (2 * circlesInRow)); // TODO abstract
		const paddingY = Math.floor((adjustedHeight - (circlesInCol * 2 * radius)) / (2 * circlesInCol));

		const defaultColor = COLORS.judgementDay[getRandomNumber(0, 1, true)];

		let cnt = 0;
		for (let i = 0; i < circlesInRow; i++) {
			const startColor = COLORS.judgementDay[getRandomNumber(0, 1, true)];
			const endColor = COLORS.judgementDay[getRandomNumber(0, 1, true)];
			for (let j = 0; j < circlesInCol; j++) {
				const isFilled = cnt > 2;

				this._drawCircle(
					this.framePad + (1 + i * 2) * (radius + paddingX), // TODO wtf is 1, again?
					this.framePad + (1 + j * 2) * (radius + paddingY),
					radius,
					isFilled ? startColor : defaultColor,
					isFilled ? endColor : defaultColor,
					isFilled,
				);
			}
			cnt = cnt > 4 ? 0 : cnt + 1;
		}
	}

	_drawCircle(x, y, r, startColor, endColor, filled, pie) {
		const startAngle = pie ? getRandomNumber(0, Math.PI * 2) : 0;
		const diffAngle = pie ? getRandomNumber(Math.PI / 2, Math.PI * 3) : 360;

		this.c.save();
		this.c.beginPath();
		this.c.arc(x, y, r, startAngle, startAngle + diffAngle, false);

		const gradient = this.c.createLinearGradient(x, y - r, x, y + r);
		gradient.addColorStop(0, startColor);
		gradient.addColorStop(1, endColor);

		if (filled) {
			this.c.fillStyle = gradient;
			this.c.fill();
		} else {
			this.c.strokeStyle = gradient;
			this.c.lineWidth = 2;
			this.c.stroke();
		}
		this.c.restore();
	}
}