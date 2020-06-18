import React, { FunctionComponent } from "react"
import styled from "styled-components"

export type TileProps = {
  size?: number
  number: number
}

type StyledDivProps = {
  number: number
}

const StyledDiv = styled.div<StyledDivProps>`
  position: absolute;
  height: 50%;
  width: 50%;
  padding: 23% 23%;
  margin: 2%;
  border-radius: 5px;
  background-color: ${({number}) => number ? `#225560` : `#B0B2B8` };
  text-align: center;
  display: flex;
  align-items: center;
`

type StyledPProps = {
  size: number
}

const StyledP = styled.p<StyledPProps>`
  font-size: ${({size}) => `${Math.floor(200 / size)}px`};
  color: #D9FF70;
  margin: 0 auto;
`

const Tile: FunctionComponent<TileProps> = ({ size, number }) => {
  return (
    <StyledDiv number={ number }>
      <StyledP size={ size }>{ number }</StyledP>
    </StyledDiv>
  );
}

export default Tile;
