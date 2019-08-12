import React, {useEffect, useState, useMemo} from 'react';
import {clearCanvas, drawCell, drawShape, getARandomShape} from './shapes/shapes'
import {
  cantMove,
  generateGrid,
  setAShapeAndUpdateGrid
} from './logics/grid'
import {useInterval} from './hooks'




export const zoneWidth = 330
export const zoneHeight = 660
const nbCols = 11
export const cellWidth = zoneWidth / nbCols
const nbLines = zoneHeight / cellWidth


const Canvas = ({getScore, speed}) => {




  const canvasRef = React.useRef(null)

  const [ctx, setCtx] = useState(null)
  const [rotationIndex, setRotationIndex] = useState(0)
  const [{shape: currentShape, color: colorShape}, setCurrentShape] = useState(getARandomShape())
  const [gameOver, setGameOver] = useState(false)
  const [grid, setGrid] = useState(null)



  //position initialement centrée du carré contenant la forme et qui prévoit l'espace nécessaire pour chacune des rotation
  const [shapePositionDraw, setShapePositionDraw] = useState({x: zoneWidth / 2 - cellWidth * 1.5, y: 0})  // * 1.5 for center 3 case shape

  //position réelle de la forme a minima
  const [positionOfShapeToCalcul, setPositionOfShapeToCalcul] = useState([])



  useEffect(() => {
    if(ctx === null) {
      setGrid(generateGrid(nbCols, nbLines, cellWidth))
      let ctx = canvasRef.current.getContext("2d")
      setCtx(ctx)
    }
  }, [ctx]);


  // useEffect(() => {
  // }, [grid])



  useEffect(() => {
    if(ctx && !gameOver) {

      clearCanvas(ctx)

      setPositionOfShapeToCalcul(drawShape(ctx, currentShape[rotationIndex], shapePositionDraw, cellWidth, colorShape))

      let linesCompleted = []
      grid.map((line, lineKey) => {
        let nbCellFilled = 0
        // draw cells confirmed

        line.get('cols').map((col, colKey) => {
          if(col.fill === true) {
            nbCellFilled ++
            drawCell(ctx, {x: colKey, y: lineKey}, cellWidth, col.color)
          }
        })

        if (line.get('cols').size === nbCellFilled) {
          linesCompleted.push(lineKey)
        }
      })


      if(linesCompleted.length > 0) {
        getScore(100 * linesCompleted.length)
        let updatedGrid = grid
        linesCompleted.forEach((yKey) => {
          for (let i = yKey; i >= 0; i -= cellWidth) {
            updatedGrid = updatedGrid.set(i, updatedGrid.get(i - cellWidth > 0 ? i - cellWidth : 0))
          }
        })

        console.error('Emeric::Canvas::test:: =>', updatedGrid.toJS())
        console.error('Emeric::Canvas::test:: =>', grid.toJS())


        clearCanvas(ctx)

        updatedGrid.map((line, lineKey) => {
          line.get('cols').map((col, colKey) => {
            if(col.fill === true) {
              console.error('Emeric::Canvas::yoplait:: =>', )
              drawCell(ctx, {x: colKey, y: lineKey}, cellWidth, col.color)
            }
          })
        })
        setGrid(updatedGrid)
      }


    }
  }, [ctx, grid, currentShape, rotationIndex, shapePositionDraw, colorShape, gameOver, getScore]);


  useInterval(() => {

    cantMove(grid, positionOfShapeToCalcul, 'bottom')
    || positionOfShapeToCalcul.some((item) => item.y + cellWidth >= zoneHeight)
      ? initANewShape()
      : setShapePositionDraw({...shapePositionDraw, y: shapePositionDraw.y + cellWidth})
  }, gameOver ? null : speed)



  const initANewShape = () => {
    // bug here ?

    console.error('Emeric::Canvas::initANewShape::grid =>', grid)

    setGrid(setAShapeAndUpdateGrid(ctx, grid, positionOfShapeToCalcul, colorShape))
    setShapePositionDraw({x: zoneWidth / 2 - cellWidth * 1.5, y: 0})
    setRotationIndex(0)
    setCurrentShape(getARandomShape())

    if (cantMove(grid, positionOfShapeToCalcul, 'bottom') && positionOfShapeToCalcul.some((item) => item.y === 0)) {
      setGameOver(true)
    }
  }

  const handleKeyPress = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        const futurePositionToCalcul = drawShape(null, currentShape[rotationIndex < currentShape.length - 1 ? rotationIndex + 1 : 0], shapePositionDraw, cellWidth)


        if(!futurePositionToCalcul.some((item) => item.x < 0)
          && !futurePositionToCalcul.some((item) => item.x >= zoneWidth)
          && !futurePositionToCalcul.some((item) => item.y >= zoneHeight)
          && !cantMove(grid, futurePositionToCalcul)) {
          setRotationIndex(rotationIndex < currentShape.length - 1 ? rotationIndex + 1 : 0)
        }
        break
      case 'ArrowLeft':
        if (!positionOfShapeToCalcul.some((item) => item.x === 0) && !cantMove(grid, positionOfShapeToCalcul, 'left')) {
          setShapePositionDraw({...shapePositionDraw, x: shapePositionDraw.x - cellWidth})
        }
        break
      case 'ArrowRight':

        if(!positionOfShapeToCalcul.some((item) => item.x + cellWidth === zoneWidth) && !cantMove(grid, positionOfShapeToCalcul, 'right')){
          setShapePositionDraw({...shapePositionDraw, x: shapePositionDraw.x + cellWidth})
        }
        break
      case 'Enter':
        console.error('Emeric::Canvas::handleKeyPress::space =>')
        setGameOver(!gameOver)
        break
      case 'ArrowDown':

        // 1) some pour retourner


        return cantMove(grid, positionOfShapeToCalcul, 'bottom') || positionOfShapeToCalcul.some((item) => item.y + cellWidth >= zoneHeight)
            ? initANewShape()
            : setShapePositionDraw({...shapePositionDraw, y: shapePositionDraw.y + cellWidth})

    }
  }

  return (
    <div onKeyDown={(e) => handleKeyPress(e)} tabIndex="-1">
      <canvas
        style={{border: '6px solid black', background: 'black'}}
        ref={canvasRef}
        width={zoneWidth}
        height={zoneHeight}
      />
    </div>

  )
}

export default Canvas;
