// TODO: Make the array container responsive i.e. set the width of each element according to the screen size => DONE

import React, { useState, useEffect, useRef } from "react";
import {
	Tooltip,
	Slider,
	Radio,
	RadioGroup,
	FormControlLabel,
	Button,
} from "@mui/material";
import { motion } from "framer-motion";
import "./sorting.css";
import { mergeSort } from "../algorithms/mergeSort";
import { bubbleSort } from "../algorithms/bubbleSort";
import { selectionSort } from "../algorithms/selectionSort";
import { insertionSort } from "../algorithms/insertionSort";
import { quickSort } from "../algorithms/quickSort";
import { heapSort } from "../algorithms/heapSort";

const INITIAL_CLR = "turquoise";
const INTERMEDIARY_CLR1 = "#ff1aff";
const INTERMEDIARY_CLR2 = "#cd1d66";
const RIGHT_CLR = "#1aff1a";
const WRONG_CLR = "#ff1a1a";
const FINAL_COLOR =
	"linear-gradient(45deg, rgba(131,58,180,1) 0%, rgba(156,39,176,1) 50%, rgba(69,118,252,1) 100%)";

// TODO: Change it to state later on to give user the access to control the speed of the animation => DONE
const FAST_ANIMATION_SPEED = 10;
const MEDIUM_ANIMATION_SPEED = 100;
const SLOW_ANIMATION_SPEED = 300;

// TODO: Change it to state later on to give user the access to control size of array => DONE

const SCREEN_SIZE = window.innerWidth;
const MIN_ARRAY_SIZE = 5;
const MAX_ARRAY_SIZE = Math.floor(SCREEN_SIZE / 8);
const DEFAULT_ARRAY_SIZE = 50;

const HEIGHT_INCREMENT_FACTOR = 5;

export const CTR1 = -1; // Selecting 2 elements
export const CTR2 = 0; // Comparison Result 1
export const CTR3 = 1; // Comparison Result 2
export const CTR4 = 2; // Show initial color
export const CTR5 = 3; // Swapping the elements
export const CTR6 = 4; // Copying second value to the first

export const randomIntFromInterval = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const visualizerUtility = (animations, rootRef, animationSpeed, sortingRef) => {
	const bars = rootRef.current.querySelectorAll(".sorting__array_value");
	sortingRef.current = 1;
	for (let i = 0; i < animations.length; i++) {
		const [barInd1, barInd2, barOneHeight, barTwoHeight, counter] =
			animations[i];
		const barOneStyle = bars[barInd1].style;
		const barTwoStyle = bars[barInd2].style;

		if (counter === CTR1) {
			setTimeout(() => {
				barOneStyle.backgroundColor = INTERMEDIARY_CLR1;
				barTwoStyle.backgroundColor = INTERMEDIARY_CLR1;
			}, i * animationSpeed);
		} else if (counter === CTR3) {
			setTimeout(() => {
				barOneStyle.backgroundColor = RIGHT_CLR;
				barTwoStyle.backgroundColor = RIGHT_CLR;
			}, i * animationSpeed);
		} else if (counter === CTR2) {
			setTimeout(() => {
				barOneStyle.backgroundColor = WRONG_CLR;
				barTwoStyle.backgroundColor = WRONG_CLR;
			}, i * animationSpeed);
		} else if (counter === CTR4) {
			setTimeout(() => {
				barOneStyle.backgroundColor = INITIAL_CLR;
				barTwoStyle.backgroundColor = INITIAL_CLR;
			}, i * animationSpeed);
		} else if (counter === CTR5) {
			setTimeout(() => {
				barOneStyle.backgroundColor = INTERMEDIARY_CLR2;
				barTwoStyle.backgroundColor = INTERMEDIARY_CLR2;
				barOneStyle.height = `${barTwoHeight * HEIGHT_INCREMENT_FACTOR}px`;
				barTwoStyle.height = `${barOneHeight * HEIGHT_INCREMENT_FACTOR}px`;
			}, i * animationSpeed);
		} else {
			setTimeout(() => {
				barOneStyle.backgroundColor = INTERMEDIARY_CLR2;
				barTwoStyle.backgroundColor = INTERMEDIARY_CLR2;
				barOneStyle.height = `${barTwoHeight * HEIGHT_INCREMENT_FACTOR}px`;
			}, i * animationSpeed);
		}
	}

	return animations.length * animationSpeed;
};

const Sorting = () => {
	const [arraySize, setArraySize] = useState(DEFAULT_ARRAY_SIZE);
	const [animationSpeed, setAnimationSpeed] = useState(FAST_ANIMATION_SPEED);
	const [arr, setArr] = useState([]);
	const [toalSortingAnimationTime, setToalSortingAnimationTime] = useState(0);
	const [arrayBarColor, setArrayBarColor] = useState(INITIAL_CLR);

	const rootRef = useRef();
	const arrayRef = useRef(arr);
	const sortingRef = useRef(0); //0: sorting not started, 1: sorting, 2: sorting finishe

	const handleAnimationSpeedChange = (e) => {
		setAnimationSpeed(e.target.value);
	};

	const createNewArray = (size) => {
		const a = [];
		for (let i = 0; i < size; i++) {
			a.push(randomIntFromInterval(5, 100));
		}
		sortingRef.current = 0;
		setArr(a);
		setArrayBarColor(INITIAL_CLR);
		arrayRef.current = a;
	};

	useEffect(() => {
		createNewArray(arraySize);
	}, [arraySize]);

	useEffect(() => {
		if (toalSortingAnimationTime > 0) {
			let tmpArr = [...arr];
			tmpArr.sort((a, b) => a - b);
			setTimeout(() => {
				setArr(tmpArr);
				setArrayBarColor(FINAL_COLOR);
				sortingRef.current = 2;
			}, toalSortingAnimationTime);
		}
	}, [toalSortingAnimationTime]);

	const mergeSortVisualizer = (array) => {
		const animations = mergeSort(array);
		const time = visualizerUtility(
			animations,
			rootRef,
			animationSpeed,
			sortingRef
		);
		setToalSortingAnimationTime(time);
	};

	const bubbleSortVisualizer = (array) => {
		const animations = bubbleSort(array.slice());
		const time = visualizerUtility(
			animations,
			rootRef,
			animationSpeed,
			sortingRef
		);
		setToalSortingAnimationTime(time);
	};

	const selectionSortVisualizer = (array) => {
		const animations = selectionSort(array.slice());
		const time = visualizerUtility(
			animations,
			rootRef,
			animationSpeed,
			sortingRef
		);
		setToalSortingAnimationTime(time);
	};

	const insertionSortVisualizer = (array) => {
		const animations = insertionSort(array.slice());
		const time = visualizerUtility(
			animations,
			rootRef,
			animationSpeed,
			sortingRef
		);
		setToalSortingAnimationTime(time);
	};

	const quickSortVisualizer = (array) => {
		const animations = quickSort(array.slice());
		const time = visualizerUtility(
			animations,
			rootRef,
			animationSpeed,
			sortingRef
		);
		setToalSortingAnimationTime(time);
	};

	const heapSortVisualizer = (array) => {
		const animations = heapSort(array.slice());
		const time = visualizerUtility(
			animations,
			rootRef,
			animationSpeed,
			sortingRef
		);
		setToalSortingAnimationTime(time);
	};

	return (
		<div ref={rootRef} className="sorting__top_container">
			<div className="sorting__menu">
				<div className="italianno-regular sorting__heading">
					Sorting Algorithms
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
						alignItems: "flex-start",
						gap: "5px",
					}}>
					<div>
						<div className="arvo-bold-italic">Array Size</div>
						<Slider
							sx={{
								width: "150px",
								marginBottom: "25px",
							}}
							color="secondary"
							aria-label="Array Size"
							defaultValue={arraySize}
							getAriaValueText={(value) => value}
							valueLabelDisplay="auto"
							shiftStep={3}
							marks
							step={1}
							min={MIN_ARRAY_SIZE}
							max={MAX_ARRAY_SIZE}
							onChange={(event, newArraySize) => {
								setArraySize(newArraySize);
							}}
						/>
					</div>
					<Button
						variant="contained"
						color="success"
						sx={{
							fontFamily: `"Arvo", serif`,
							fontWeight: 400,
							fontStyle: "normal",
						}}
						onClick={() => {
							createNewArray(arraySize);
							setToalSortingAnimationTime(0);
						}}>
						Generate New Array
					</Button>
				</div>
				<div className="sorting__btn_container">
					<div>
						<div
							style={{
								display: "flex",
								justifyContent: "flex-start",
								alignItems: "center",
							}}>
							<div
								className="arvo-bold-italic"
								style={{
									marginRight: "30px",
									fontSize: "1.2em",
								}}>
								Animation Speed
							</div>
							<RadioGroup
								aria-labelledby="Animation Speed Controller"
								name="animation-speed-controller"
								value={animationSpeed}
								onChange={handleAnimationSpeedChange}
								row>
								<FormControlLabel
									value={FAST_ANIMATION_SPEED}
									control={
										<Radio
											color="secondary"
											sx={{
												color: "white",
											}}
										/>
									}
									label={<span className="arvo-regular-italic">Fast</span>}
								/>
								<FormControlLabel
									value={MEDIUM_ANIMATION_SPEED}
									control={
										<Radio
											color="secondary"
											sx={{
												color: "white",
											}}
										/>
									}
									label={<span className="arvo-regular-italic">Medium</span>}
								/>
								<FormControlLabel
									value={SLOW_ANIMATION_SPEED}
									control={
										<Radio
											color="secondary"
											sx={{
												color: "white",
											}}
										/>
									}
									label={<span className="arvo-regular-italic">Slow</span>}
								/>
							</RadioGroup>
						</div>
						<div className="sorting__btn_small_container">
							<Button
								sx={{
									fontFamily: `"Arvo", serif`,
									fontWeight: 400,
									fontStyle: "italic",
								}}
								color="secondary"
								variant="outlined"
								className="sorting__btn"
								onClick={() => {
									if (sortingRef.current === 0) {
										mergeSortVisualizer(arr.slice());
									}
								}}>
								Merge Sort
							</Button>
							<Button
								sx={{
									fontFamily: `"Arvo", serif`,
									fontWeight: 400,
									fontStyle: "italic",
								}}
								color="secondary"
								variant="outlined"
								className="sorting__btn"
								onClick={() => {
									if (sortingRef.current === 0) {
										quickSortVisualizer(arr.slice());
									}
								}}>
								Quick Sort
							</Button>
							<Button
								sx={{
									fontFamily: `"Arvo", serif`,
									fontWeight: 400,
									fontStyle: "italic",
								}}
								color="secondary"
								variant="outlined"
								className="sorting__btn"
								onClick={() => {
									if (sortingRef.current === 0) {
										bubbleSortVisualizer(arr.slice());
									}
								}}>
								Bubble Sort
							</Button>
							<Button
								sx={{
									fontFamily: `"Arvo", serif`,
									fontWeight: 400,
									fontStyle: "italic",
								}}
								color="secondary"
								variant="outlined"
								className="sorting__btn"
								onClick={() => {
									if (sortingRef.current === 0) {
										insertionSortVisualizer(arr.slice());
									}
								}}>
								Insertion Sort
							</Button>
							<Button
								sx={{
									fontFamily: `"Arvo", serif`,
									fontWeight: 400,
									fontStyle: "italic",
								}}
								color="secondary"
								variant="outlined"
								className="sorting__btn"
								onClick={() => {
									if (sortingRef.current === 0) {
										selectionSortVisualizer(arr.slice());
									}
								}}>
								Selection Sort
							</Button>
							<Button
								sx={{
									fontFamily: `"Arvo", serif`,
									fontWeight: 400,
									fontStyle: "italic",
								}}
								variant="outlined"
								color="secondary"
								className="sorting__btn"
								onClick={() => {
									if (sortingRef.current === 0) {
										heapSortVisualizer(arr.slice());
									}
								}}>
								Heap Sort
							</Button>
						</div>
					</div>
				</div>
			</div>

			<div
				style={{
					height: "600px",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
				<div className="sorting__array_container">
					{arr &&
						arr.map((value, ind) => (
							<Tooltip
								title={
									rootRef.current.querySelectorAll(".sorting__array_value")[
										ind
									] / HEIGHT_INCREMENT_FACTOR || value
								}
								placement="top"
								key={`${value}-${ind}`}>
								<div
									style={{
										height: `${value * HEIGHT_INCREMENT_FACTOR}px`,
										width: `min(70px, ${Math.floor(
											(SCREEN_SIZE - 5 * arraySize) / arraySize // 30px margin on each side
										)}px)`,
										background: arrayBarColor,
										borderTopLeftRadius: `max(calc(min(70px, ${Math.floor(
											(SCREEN_SIZE - 5 * arraySize) / arraySize // 30px margin on each side
										)}px)/5), 2px)`,
										borderTopRightRadius: `max(calc(min(70px, ${Math.floor(
											(SCREEN_SIZE - 5 * arraySize) / arraySize // 30px margin on each side
										)}px)/5), 2px)`,
									}}
									className="sorting__array_value"></div>
							</Tooltip>
						))}
				</div>
			</div>

			<Button
				variant="contained"
				size="large"
				color="secondary"
				sx={{
					display: sortingRef.current === 2 ? "block" : "none",
					fontSize: "1em",
					fontFamily: `"Arvo", serif`,
					fontWeight: 700,
					fontStyle: "normal",
					position: "relative",
					margin: "30px auto",
					// bottom: "-20px",
				}}
				onClick={() => {
					setArr(arrayRef.current);
					setArrayBarColor(INITIAL_CLR);
					setToalSortingAnimationTime(0);
					sortingRef.current = 0;
				}}>
				Reset Array
			</Button>
		</div>
	);
};

export default Sorting;

// OLD MERGE SORT APPROACH

// const bars = rootRef.current.querySelectorAll(".sorting__array_value");
// for (let i = 0; i < animations.length; i++) {
// 	if (i % 3 !== 2) {
// 		const [barInd1, barInd2] = animations[i];
// 		const bar1 = bars[barInd1];
// 		const bar2 = bars[barInd2];

// 		setTimeout(() => {
// 			bar1.style.backgroundColor =
// 				i % 3 == 0 ? INTERMEDIARY_CLR1 : INITIAL_CLR;
// 			bar2.style.backgroundColor =
// 				i % 3 == 0 ? INTERMEDIARY_CLR1 : INITIAL_CLR;
// 		}, i * animationSpeed);
// 	} else {
// 		const [barInd, newHeight] = animations[i];
// 		const bar = bars[barInd];

// 		setTimeout(() => {
// 			bar.style.height = `${newHeight * HEIGHT_INCREMENT_FACTOR}px`;
// 		}, i * animationSpeed);
// 	}
// }

// setTimeout(() => {
// 	for (let bar of bars) {
// 		bar.style.background = FINAL_COLOR;
// 	}
// }, (animations.length + 5) * animationSpeed);
