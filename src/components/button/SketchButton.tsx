import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { css } from "@emotion/css";
import * as tf from '@tensorflow/tfjs';

const modelDigitPath = './model/digits/model.json';
const modelCharacterPath = './model/characters/model.json';

interface Props {
  context: CanvasRenderingContext2D;
  setPred: React.Dispatch<React.SetStateAction<Array<number>>>;
}

export const SketchButton = ({ context, setPred }: Props) => {
	const [modelDigit, setModelDigit] = useState<tf.LayersModel>();
	const [modelCharacter, setModelCharacter] = useState<tf.LayersModel>();

  const location = useLocation()

  const buttonRef = useRef<HTMLDivElement>(null)
  const effectRef = useRef<HTMLSpanElement>(null)

  const predictDigitsHandle = (): any => {
    const imageData = getImageData();
    if (!modelDigit) return;
    
    const score = tf.tidy(() => {
      const channels = 1;
      let input = tf.browser.fromPixels(imageData!, channels).toFloat();
			input = input.div(tf.scalar(255));
			input = input.expandDims();
			return modelDigit.predict(input);
    })

    const result: number[] = [];
		const datas = Array.isArray(score) ? score[0].dataSync() : score.dataSync();
		datas.forEach(d => result.push(d));
    return result;
  }

  const predictCharactersHandle = (): any => {
    const imageData = getImageData();
    if (!modelCharacter) return;

    const score = tf.tidy(() => {
      const channels = 1;
      let input = tf.browser.fromPixels(imageData!, channels).toFloat();
			input = input.div(tf.scalar(255));
			input = input.expandDims();
			return modelCharacter.predict(input);
    })

    const result: number[] = [];
		const datas = Array.isArray(score) ? score[0].dataSync() : score.dataSync();
		datas.forEach(d => result.push(d));
    return result;
  }

  const getImageData = () => {
		if (!context) return;

		const inputWidth = 28;
		const inputHeight = 28;

    		// resize
		const tmpCanvas = document.createElement('canvas').getContext('2d')!;
		tmpCanvas.drawImage(context.canvas, 0, 0, inputWidth, inputHeight);

		let imageData = tmpCanvas.getImageData(0, 0, inputWidth, inputHeight);
		for (let i = 0; i < imageData.data.length; i += 4) {
			const avg = (imageData.data[i] + imageData.data[i + 1] + imageData.data[i + 2]) / 3;
			imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = avg;
		}

		return imageData;
	};
  

  const onClickHandle = () => {
    if (location.pathname === "/digits") {
      const data = predictDigitsHandle()
        setPred(data)
      }
    else {
      const data = predictCharactersHandle()
      setPred(data)
    }
  }

  useEffect(() => {
    const loadModel = async () => {
			try {
				const loadDigitModel = await tf.loadLayersModel(modelDigitPath);
				setModelDigit(loadDigitModel);
				const loadCharacterModel = await tf.loadLayersModel(modelCharacterPath);
				setModelCharacter(loadCharacterModel);
			} catch (error) {
				console.error({ error });
			}
		};
		loadModel();

    const handleMouseEnter = (e: MouseEvent) => {
      if (buttonRef.current && effectRef.current) {
        const offsetLeft = buttonRef.current.getBoundingClientRect().left
        const offsetTop = buttonRef.current.getBoundingClientRect().top
        const relX = e.clientX - offsetLeft
        const relY = e.clientY - offsetTop
        effectRef.current.style.top = relY + 'px';
        effectRef.current.style.left = relX + 'px';
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      if (buttonRef.current && effectRef.current) {
        const offsetLeft = buttonRef.current.getBoundingClientRect().left
        const offsetTop = buttonRef.current.getBoundingClientRect().top
        const relX = e.clientX - offsetLeft
        const relY = e.clientY - offsetTop
        effectRef.current.style.top = relY + 'px';
        effectRef.current.style.left = relX + 'px';
      }
    }

    const addEventListeners = () => {
      if (buttonRef.current) {
        buttonRef.current.addEventListener("mouseenter", handleMouseEnter);
        buttonRef.current.addEventListener("mouseout", handleMouseOut);
      }
    }

    const removeEventListeners = () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener("mouseenter", handleMouseEnter);
        buttonRef.current.removeEventListener("mouseout", handleMouseOut);
      }
    }

    addEventListeners();
    return () => removeEventListeners();
  }, [buttonRef.current, effectRef.current])

  return (
    <>
      <div ref={buttonRef} className={sWrapper} onClick={onClickHandle}>
        <a className={sInner}>
          <div className={sTitle}>
            D??? ??o??n
          </div>
          <div className={sEffectWrapper}>
            <span ref={effectRef} className={sEffect}/>
          </div>
        </a>
      </div>
    </>
  )
}
const sWrapper = css`
  height: 80px;
  width: 200px;
  margin-top: 2.5em;
  margin-bottom: 1em;
  transition: 0.1s ease;
  z-index: 1;
  &:hover {
    cursor: pointer;
    a::after {
      background-color: var(--c-green-300);
    }
    span {
      width: 550px;
      height: 550px;
    }
  }
  &:active  {
    span {
      background-color: var(--c-green-300);
    }
    transform: scale(0.9);
  }
`

const sInner = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: var(--b-sm) solid black;
  border-radius: 25px;
  background-color: var(--c-white);
  transition: 0.2s ease;
  &::after {
		content: "";
		display: block;
		position: absolute;
		z-index: -1;
		width: 95%;
		height: 100%;
		bottom:  -12px;
		left: calc(50% - 46.5%);
    border-radius: 25px;
		border: 2px solid black;
		background-color: var(--c-green-200);
  }
  &:active {
    background-color: var(--c-green-300);
  }
`

const sTitle = css`
  user-select: none;
  pointer-events: none;
  font-size: 1.5em;
  font-weight: 500;
  line-height: 20px;
  padding: 1.25em 1.5em;
  z-index: 1;
`

const sEffectWrapper = css`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 25px;
  overflow: hidden;
`

const sEffect = css`
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-radius: 50%;
  background-color: var(--c-green-100);
  transition: width 0.4s ease-in-out, height 0.4s ease-in-out;
  transform: translate(-50%, -50%);
  overflow: hidden;
  transition: 0.3s ease;
`