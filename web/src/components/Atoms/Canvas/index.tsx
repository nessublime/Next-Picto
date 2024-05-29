import React, { useContext, useEffect, useRef } from "react";
import { BoardContext } from "../../../context/BoardProvider";
import styles from "./index.module.css";

interface Props {
	onMouseUp: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
	onMouseDown: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
	onMouseMove: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
	onMouseOut: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
}

const Canvas: React.FC<Props> = ({
	onMouseUp,
	onMouseDown,
	onMouseMove,
	onMouseOut,
}) => {
	const sketchRef = useRef<HTMLCanvasElement>();
	const parentRef = useRef<HTMLDivElement>(null);

	const { canvasContext } = useContext(BoardContext);

	const resizeCanvas = () => {
		canvasContext.current.canvas.width = parentRef.current.getBoundingClientRect().width;
		canvasContext.current.canvas.height =
			parentRef.current.getBoundingClientRect().width * 0.75;
	};

	useEffect(() => {
		const canvas = sketchRef.current;
		const ctx = canvas.getContext("2d");

		canvasContext.current = ctx;

		const handleResize = (e) => {
			const dataURL = canvasContext.current.canvas.toDataURL();
			resizeCanvas();
			const img = new Image();
			img.src = dataURL;
			img.onload = () => {
				canvasContext.current.drawImage(img, 0, 0);
			};
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		console.log("parent changed");
		if (parentRef.current) {
			resizeCanvas();
		}
	}, [parentRef]);

	return (
		<div className={styles["container"]} ref={parentRef}>
			<canvas
				ref={sketchRef}
				onMouseUp={onMouseUp}
				onMouseDown={onMouseDown}
				onMouseMove={onMouseMove}
				onMouseOut={onMouseOut}
			/>
		</div>
	);
};

export default Canvas;
