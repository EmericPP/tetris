import React, {useEffect, useState} from 'react';
import {clearCanvas, drawCell, drawShape, getARandomShape} from './shapes/shapes'
import {
  cantMove, checkIfRowIsFilled,
  generateGrid,
  setAShapeAndUpdateGrid
} from './logics/grid'




export const zoneWidth = 330
export const zoneHeight = 600
const nbCols = 11
export const cellWidth = zoneWidth / nbCols
const nbLines = zoneHeight / cellWidth


const Canvas = () => {


  const canvasRef = React.useRef(null)

  const [ctx, setCtx] = useState(null)
  const [rotationIndex, setRotationIndex] = useState(0)
  const [{shape: currentShape, color: colorShape}, setCurrentShape] = useState(getARandomShape())

  const [grid, setGrid] = useState(null)
  const [cellsToDraw, setCellsToDraw] = useState([])



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
  }, []);

  useEffect(() => {
    if(ctx) {
      clearCanvas(ctx)
      setPositionOfShapeToCalcul(drawShape(ctx, currentShape[rotationIndex], shapePositionDraw, cellWidth, colorShape))
      cellsToDraw.forEach((item) => {
        drawCell(ctx, {x: item.posX, y: item.posY}, cellWidth, item.color)
      })
    }

  }, [rotationIndex, ctx, shapePositionDraw]);

  const initANewShape = () => {
    const [gridUpdated, newCellsToDraw] = setAShapeAndUpdateGrid(grid, positionOfShapeToCalcul, colorShape)

    checkIfRowIsFilled(grid)


    setGrid(gridUpdated)
    setCellsToDraw([...cellsToDraw, ...newCellsToDraw])
    setShapePositionDraw({x: zoneWidth / 2 - cellWidth * 1.5, y: 0})
    setRotationIndex(0)
    setCurrentShape(getARandomShape())
  }



  const handleKeyPress = (e) => {
    switch (e.key) {
      case 'ArrowUp':
        //don'twork

        const futurePositionToCalcul = drawShape(null, currentShape[rotationIndex < currentShape.length - 1 ? rotationIndex + 1 : 0], shapePositionDraw, cellWidth)

        console.error('Emeric::Canvas::handleKeyPress::futurePositionToCalcul =>', futurePositionToCalcul)
        console.error('Emeric::Canvas::handleKeyPress::grid =>', grid)

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
        console.error('Emeric::Canvas::handleKeyPress::positionOfShapeToCalcul =>', positionOfShapeToCalcul)

        if(!positionOfShapeToCalcul.some((item) => item.x + cellWidth === zoneWidth) && !cantMove(grid, positionOfShapeToCalcul, 'right')){
          setShapePositionDraw({...shapePositionDraw, x: shapePositionDraw.x + cellWidth})
        }
        break
      case 'ArrowDown':




        return cantMove(grid, positionOfShapeToCalcul, 'bottom')
        || positionOfShapeToCalcul.some((item) => item.y + cellWidth === zoneHeight)
            ? initANewShape()
            : setShapePositionDraw({...shapePositionDraw, y: shapePositionDraw.y + cellWidth})

    }
  }
  


  return (
    <div onKeyDown={(e) => handleKeyPress(e)} tabIndex="-1">
      <canvas
        style={{border: '1px solid black'}}
        ref={canvasRef}
        width={zoneWidth}
        height={zoneHeight}
      />
    </div>

  )
}

export default Canvas;
