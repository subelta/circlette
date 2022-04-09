export const getRandomNumber = (min, max, round) => {
	const random = (Math.random() * (max - min)) + min;
	return round ? Math.round(random) : random;
}