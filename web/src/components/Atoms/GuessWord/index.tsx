import React from "react";
import styles from "./index.module.css";

interface Props {
	guessWord: string;
	isMyTurn: boolean;
}

const GuessWord: React.FC<Props> = ({ guessWord, isMyTurn }) => {
	const getHiddenWord = (guessWord: string, hiddenSymbol: string) => {
		const words = guessWord.split(" ");
		let hiddenWord = "";
		for (let word of words) {
			hiddenWord = hiddenWord.concat(hiddenSymbol.repeat(word.length), " ");
		}

		return hiddenWord;
	};

	return (
		<div className={styles.container}>
			<h1>{isMyTurn ? guessWord : getHiddenWord(guessWord, "_")}</h1>
		</div>
	);
};

export default GuessWord;
