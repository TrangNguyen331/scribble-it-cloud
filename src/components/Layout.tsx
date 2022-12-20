import React from "react";
import { css } from "@emotion/css";

import { Header } from "@comp/Header"
import { Cursor } from "@comp/Cursor"

interface Props {
  children: React.ReactNode;
}

export const Layout = (props: Props) => {
  const { children } = props;

  return (
    <>
      <div className={sContainer}>
        <Header/>
        <div className={sWrapperContent}>
          { children }
        </div>
        <Cursor/>
      </div>
    </>
  )
}

const sContainer = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
	display: flex;
  flex-direction: column;
	align-items: center;
  background-color: #F3FCFD;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  height: 95vh;
  width: 95vw;
  margin: auto;
  border: 4px solid black;
  z-index: 999;
  overflow: hidden;
`

const sWrapperContent = css`
  width: 100%;
  height: 100%;
  margin-top: 2em;
`