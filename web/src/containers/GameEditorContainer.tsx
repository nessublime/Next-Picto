import React, { useContext } from "react";
import GameEditor from "../components/Organisms/GameEditor";
import { GameManagerContext } from "../context/GameManagerProvider";

const GameEditorContainer: React.FC = () => {
	const { onStartGame, isUserHost } = useContext(GameManagerContext);

	return <GameEditor onStartGame={onStartGame} isUserHost={isUserHost()} />;
};

export default GameEditorContainer;
