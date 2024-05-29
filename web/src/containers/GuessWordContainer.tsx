import React, { useContext } from "react";
import GuessWord from "../components/Atoms/GuessWord";
import { GameManagerContext } from "../context/GameManagerProvider";

const GuessWordContainer: React.FC = () => {
	const { gameData, isMyTurn } = useContext(GameManagerContext);

	return <GuessWord guessWord={gameData.guessWord} isMyTurn={isMyTurn()} />;
};

export default GuessWordContainer;
