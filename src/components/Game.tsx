import React, { FunctionComponent, useState } from "react"
import GameBoard from "./GameBoard";
import styled from "styled-components";

const StyledDiv = styled.div`
  margin: auto;
  position: relative;
  width: 40%;
  ::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
`

const Game: FunctionComponent = () => {
  const [size, setSize] = useState<number>(4)

  return (
    <>
      <StyledDiv>
        <GameBoard
          size={ size }
        />
      </StyledDiv>
      <input
        type="number"
        min="1"
        max="50"
        onChange={ (e) => setSize(parseInt(e.target.value)) }
        placeholder="4"
      />
    </>
  );
}

export default Game;
