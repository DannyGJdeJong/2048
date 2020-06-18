import React, { FunctionComponent, KeyboardEvent, useState, useEffect } from "react"
import styled from "styled-components"
import Tile, { TileProps } from "./Tile"

type GameBoardProps = {
  size: number
}

const StyledTable = styled.table`
  position: absolute;
  margin: 0;
  padding: 5px;
  width: 100%;
  height: 100%;
  background-color: #171219;
`

const StyledTr = styled.tr`
  padding: 0;
`

const StyledTd = styled.td<GameBoardProps>`
  padding: 0;
  width: ${({size}) => `${100 / size}%` };
  padding-bottom: ${({size}) => `${100 / size}%` };
  position: relative;
`

const GameBoard: FunctionComponent<GameBoardProps> = ({ size }) => {
  const [tiles, setTiles] = useState<TileProps[][]>(Array(size).fill(null).map(()=>Array(size).fill(null)))

  useEffect(() => {
    setTiles(Array(size).fill(null).map(()=>Array(size).fill(null)))
  }, [size])

  const handleKeyDown = (event : KeyboardEvent) => {
    let eventKey = event.key

    setTiles((origTiles) => {
      // Rotate tiles clockwise by 90 degrees
      const rotateTiles = (_tiles : any[][]) => {
        return _tiles[0].map((_, colIndex) => _tiles.map(row => row[colIndex]).reverse());
      }

      const tilesMatch = (tiles1 : TileProps[][], tiles2 : TileProps[][]) => {
        let _tiles1 = [... tiles1].flat().map(x => x?.number)
        let _tiles2 = [... tiles2].flat().map(x => x?.number)

        // Check if length is equal
        if (_tiles1.length != _tiles2.length) return false

        // Check if values are equal
        for (let i = 0; i < _tiles1.length; i++) {
          if (_tiles1[i] != _tiles2[i]) return false
        }

        // Tiles match cause false wasn't returned earlier
        return true
      }

      // Create a copy instead of using a reference
      let newTiles = [ ... origTiles ]

      // Rotate newTiles based on keypress
      switch(eventKey) {
        case "ArrowDown":
          newTiles = rotateTiles(newTiles);
          break;
        case "ArrowRight":
          newTiles = rotateTiles(rotateTiles(newTiles));
          break;
        case "ArrowUp":
          newTiles = rotateTiles(rotateTiles(rotateTiles(newTiles)));
          break;
        case "ArrowLeft":
          break;
        default:
          return newTiles
      }

      // Move and merge tiles
      newTiles = newTiles.map((row) => {
        let newRow = Array(row.length).fill(null)
        for (let i = 0; i < row.length; i++) {
          const tile = row[i];
          if (tile == null) continue;

          // Check where the tile will move to, this is the left-most reachable empty spot or tile with a number that's the same
          let indexToMoveTo = i
          for (let x = i - 1; x >= 0; x--) {
            const tileToCheck = newRow[x];
            if (tileToCheck == null || tileToCheck.number == tile.number) {
              indexToMoveTo = x
            } else {
              break;
            }
          }

          // If the new index already has a tile this means it'll merge, causing the number to double
          if (newRow[indexToMoveTo] != null) {
            newRow[indexToMoveTo] = {
              number: tile.number * 2
            }
          } else { // If not, just move the tile there
            newRow[indexToMoveTo] = {
              number: tile.number
            }
          }
        }
        return newRow
      })

      // Rotate back
      switch(eventKey) {
        case "ArrowDown":
          newTiles = rotateTiles(rotateTiles(rotateTiles(newTiles)));
          break;
        case "ArrowRight":
          newTiles = rotateTiles(rotateTiles(newTiles));
          break;
        case "ArrowUp":
          newTiles = rotateTiles(newTiles);
          break;
        case "ArrowLeft":
          break;
        default:
          break
      }

      // Add new tile at random
      let emptyTileIndices = newTiles.flat()
      .map((value, index) => !value ? index : null)
      .filter((value) => value !== null)

      if(emptyTileIndices.length == 0) {
        window.alert("You lost :(")
        return newTiles
      }
      if (!tilesMatch(newTiles, origTiles) || newTiles.flat().every(val => val == null)) {
        let randomIndex = emptyTileIndices[Math.floor(Math.random() * emptyTileIndices.length)];
        newTiles[Math.floor(randomIndex / size)][randomIndex % size] = {
          number: (Math.floor(Math.random() * 2) + 1) * 2
        }
      }

      return newTiles
    })
  }

  return (
    <StyledTable
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <tbody>
      {
        tiles.map((tileRow) => {
          return (
            <StyledTr>
              {
                tileRow.map((tile) => {
                  return (
                    <StyledTd size={ size }>
                      <Tile number={tile?.number} size={ size }/>
                    </StyledTd>
                  )
                })
              }
            </StyledTr>
          )
        })
      }
      </tbody>
    </StyledTable>
  );
}

export default GameBoard;
