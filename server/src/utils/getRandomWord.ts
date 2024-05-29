const guessWords = [
	"perro",
	"gato",
	"dragon de comodo",
	"torre eifel",
	"santa claus",
];

export default function () {
	const index = Math.floor(Math.random() * guessWords.length);
	return guessWords[index];
}
