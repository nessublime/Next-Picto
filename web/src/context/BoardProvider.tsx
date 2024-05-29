import React, { createContext, useRef, useState } from "react";
import { DrawData } from "../../../shared/models/draw.model";

interface IBoardContext {
	isDrawing: boolean;
	setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>;
	canvasContext: React.MutableRefObject<CanvasRenderingContext2D>;
	drawSettings: {
		color: string;
		width: number;
	};
	setDrawSettings: React.Dispatch<
		React.SetStateAction<{
			color: string;
			width: number;
		}>
	>;
	startDrawing: (drawData: DrawData) => void;
	draw: (drawData: DrawData) => void;
	finishDrawing: () => any;
	clearCanvas: () => void;
}

export const BoardContext = createContext<IBoardContext>({} as IBoardContext);

export const BoardProvider: React.FC = (props) => {
	const [isDrawing, setIsDrawing] = useState<boolean>(false);
	const [drawSettings, setDrawSettings] = useState({
		color: "#000",
		width: 5,
	});
	const canvasContext = useRef<CanvasRenderingContext2D>();

	const clearCanvas = () => {
		if (!canvasContext.current) return;
		canvasContext.current.clearRect(
			0,
			0,
			window.innerWidth,
			window.innerHeight
		);
	};

	const startDrawing = (drawData: DrawData) => {
		if (!canvasContext.current) return;
		const { x, y, color, width } = drawData;
		canvasContext.current.strokeStyle = color || drawSettings.color;
		canvasContext.current.lineWidth = width || drawSettings.width;
		canvasContext.current.lineCap = "round";
		canvasContext.current.lineJoin = "round";
		canvasContext.current.beginPath();
		canvasContext.current.moveTo(x, y);
	};

	const finishDrawing = () => {
		if (!canvasContext.current) return;
		canvasContext.current.closePath();
	};

	const draw = (drawData: DrawData) => {
		if (!canvasContext.current) return;
		const { x, y } = drawData;
		canvasContext.current.lineTo(x, y);
		canvasContext.current.stroke();
	};

	return (
		<BoardContext.Provider
			value={{
				isDrawing,
				setIsDrawing,
				canvasContext,
				drawSettings,
				setDrawSettings,
				draw,
				finishDrawing,
				startDrawing,
				clearCanvas,
			}}
		>
			{props.children}
		</BoardContext.Provider>
	);
};
