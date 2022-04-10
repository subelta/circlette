export const getRandomNumber = (min, max, round = true) => {
	const random = (Math.random() * (max - min)) + min;
	return round ? Math.round(random) : random;
};