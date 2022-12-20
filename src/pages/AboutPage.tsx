import React from "react";
import { css } from "@emotion/css";
import { motion, Variants } from "framer-motion";

import { Layout } from "@comp/Layout";
import { DrawCanvas } from "@comp/canvas/DrawCanvas";
import { Grid } from "@comp/Grid";
import { Loading } from "@comp/Loading";
import { LineCanvas } from "@comp/canvas/LineCanvas";

const trans1 = { duration: 0.8, ease: "easeInOut" };
const variants1: Variants = {
  hidden: { opacity: 0, y: "200%" },
  enter: { opacity: 1, y: "0%", transition: trans1 },
  exit: { opacity: 0, y: "200%" },
};

const trans2 = { duration: 0.9, ease: "easeInOut" };
const variants2: Variants = {
  hidden: { opacity: 0, y: "200%" },
  enter: { opacity: 1, y: "0%", transition: trans2 },
  exit: { opacity: 0, y: "200%" },
};

const trans3 = { duration: 1, ease: "easeInOut" };
const variants3: Variants = {
  hidden: { opacity: 0, y: "200%" },
  enter: { opacity: 1, y: "0%", transition: trans3 },
  exit: { opacity: 0, y: "200%" },
};

export default function IndexPage() {
  return (
    <>
      <Layout>
        <Loading/>
        <Grid>
          <div className={sContent}>
            Thành viên nhóm:
          </div>
          <motion.div 
            className={sWrapper}
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants1}
          >
            <div className={sInner}>
              <div className={sTitle}>
                Nguyễn Thị Thùy Trang
              </div>
              <div className={sDesc}>
                20110580
              </div>
            </div>
          </motion.div>
          <motion.div 
            className={sWrapperTwo}
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants2}
          >            <div className={sInner}>
              <div className={sTitle}>
                Đỗ Thị Bích Ngọc
              </div>
              <div className={sDesc}>
                20110526
              </div>
            </div>
          </motion.div>
          <motion.div 
            className={sWrapperThree}
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants3}
          >
            <div className={sInner}>
              <div className={sTitle}>
                Nguyễn Hữu Thiện Lộc
              </div>
              <div className={sDesc}>
                19110238
              </div>
            </div>
          </motion.div>
        </Grid>
        <LineCanvas />
      </Layout>
    </>
  )
}

const sWrapper = css`
  position: absolute;
  top: 25%;
  z-index: 1;
`

const sWrapperTwo = css`
  position: absolute;
  top: 48%;
  z-index: 1;
`

const sWrapperThree = css`
  position: absolute;
  top: 72%;
  z-index: 1;
`

const sInner = css`
  width: 30em;
  height: 10em;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: var(--b-md) solid black;
  border-radius: 50px;
  background-color: var(--c-white);
  padding: 1.5em 1.5em;
	&::after {
		content: "";
		display: block;
		position: absolute;
		z-index: -1;
		width: 95%;
		height: 100%;
		bottom:  -20px;
		left: calc(50% - 45.5%);
    border-radius: 50px;
		border: 2px solid black;
		background-color: var(--c-pink-200);
	}
`

const sTitle = css`
  user-select: none;
  pointer-events: none;
  font-size: 1.75em;
  font-weight: 400;
  line-height: 20px;
  padding: 1em 1.5em;
  z-index: 1;
  border-radius: 30px;
	background-color: var(--c-green-200);
`

const sDesc = css`
  user-select: none;
  pointer-events: none;
  font-size: 1.5em;
  font-weight: 500;
  line-height: 20px;
  padding: 0.5em 1em;
`

const sContent = css`
  position: absolute;
  top: 15%;
  transition: 0.3s ease;
  z-index: 1;
  font-size: 2em;
  font-weight: 400;
  line-height: 20px;
  padding: 0.5em 1em;
`