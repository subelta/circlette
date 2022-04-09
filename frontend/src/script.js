import { CirclesDrawer } from './drawers/CirclesDrawer.js';

const ROOT_ID = 'root';
const CANVAS_ID = 'main-canvas';

const ROOT_MARGIN = 5;
const CANVAS_BORDER_W = 1;
const CIRCLES_FRAME_PAD = 130;


document.addEventListener('DOMContentLoaded', () => {
	const { clientHeight, clientWidth } = document.documentElement;

	const root = document.querySelector(`#${ROOT_ID}`);
	const canvas = document.querySelector(`#${CANVAS_ID}`);
	const ctx = canvas.getContext('2d');
	const dpr = window.devicePixelRatio;

	root.style.margin = `${ROOT_MARGIN}px`;
	root.style.height = `${clientHeight - 2 * ROOT_MARGIN}px`;
	canvas.width = Math.trunc((clientWidth - 2 * CANVAS_BORDER_W - 2 * ROOT_MARGIN) * dpr);
	canvas.height = Math.trunc((clientHeight - 2 * CANVAS_BORDER_W - 2 * ROOT_MARGIN) * dpr);

	const cssWidth = Math.trunc(clientWidth - 2 * CANVAS_BORDER_W - 2 * ROOT_MARGIN);
	const cssHeight = Math.trunc(clientHeight - 2 * CANVAS_BORDER_W - 2 * ROOT_MARGIN);
	canvas.style.width = `${cssWidth}px`;
	canvas.style.height = `${cssHeight}px`;
	canvas.style.borderWidth = `${CANVAS_BORDER_W}px`;
	ctx.scale(dpr, dpr);

	const props = { canvas, c: ctx, cssWidth, cssHeight, framePad: CIRCLES_FRAME_PAD };
	const circlesDrawer = new CirclesDrawer(props);
	circlesDrawer.drawPattern();

	// circles.drawVerticalPixelGrid();
	// circles.drawHorizontalPixelGrid();
});

