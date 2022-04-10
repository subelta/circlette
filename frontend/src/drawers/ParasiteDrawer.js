import { getRandomNumber } from '../utils.js';
import { Drawer } from './Drawer.js';

const SPAWN_AREA_PAD = 20;

export class ParasiteDrawer extends Drawer {
	constructor(props) {
		super(props);
		this.spawnPoint = [0, 0];
		this.spawnAreas = [
			{ // top rect
				x0: SPAWN_AREA_PAD,
				y0: SPAWN_AREA_PAD,
				x1: this.cssWidth - SPAWN_AREA_PAD,
				y1: this.framePad - SPAWN_AREA_PAD
			},
			{ // right rect
				x0: this.cssWidth - this.framePad + SPAWN_AREA_PAD,
				y0: this.framePad - SPAWN_AREA_PAD,
				x1: this.cssWidth - SPAWN_AREA_PAD,
				y1: this.cssHeight - this.framePad + SPAWN_AREA_PAD
			},
			{ // bottom rect
				x0: SPAWN_AREA_PAD,
				y0: this.cssHeight - this.framePad + SPAWN_AREA_PAD,
				x1: this.cssWidth - SPAWN_AREA_PAD,
				y1: this.cssHeight - SPAWN_AREA_PAD
			},
			{ // left rect
				x0: SPAWN_AREA_PAD,
				y0: this.framePad - SPAWN_AREA_PAD,
				x1: this.framePad - SPAWN_AREA_PAD,
				y1: this.cssHeight - this.framePad + SPAWN_AREA_PAD
			},
		];
	}

	createSpawnPoint() {
		const chosenArea = this.spawnAreas[getRandomNumber(0, 3)];
		const x = getRandomNumber(chosenArea.x0, chosenArea.x1);
		const y = getRandomNumber(chosenArea.y0, chosenArea.y1);

		this.spawnPoint = [x, y];
	}
}