import {cellWidth} from '../Canvas'

export const generateGrid = (nbCols, nbLines, cellWidth) => {
  let gridObj = new Map()

  for (let lineIndex = 0; lineIndex < nbLines; lineIndex++) {
    let cols = new Map()
    for (let colIndex = 0; colIndex < nbCols; colIndex++) {
      cols.set(`x${cellWidth * colIndex}`, {fill: false, color: '', posx: (colIndex) * cellWidth})
    }
    gridObj.set(`y${cellWidth * lineIndex}`, {cols, posy: cellWidth * lineIndex})
  }
  return gridObj
}

export const setAShapeAndUpdateGrid = (grid, positionOfShapeToCalcul, color) => {
  let cellsFilled = []

  positionOfShapeToCalcul.forEach((item) => {
    grid.get(`y${item.y}`).cols.get(`x${item.x}`).fill = true
    grid.get(`y${item.y}`).cols.get(`x${item.x}`).color = color
    cellsFilled.push({
      posX:  grid.get(`y${item.y}`).cols.get(`x${item.x}`).posx,
      posY:  grid.get(`y${item.y}`).posy,
      color: color
    })
  })
  return [grid, cellsFilled]
}


export const cantMove = (grid, positionOfShapeToCalcul, direction) => {

  return positionOfShapeToCalcul.some((item) => {
    let cantMoveLeft = (grid.get(`y${item.y}`).cols.get(`x${item.x - cellWidth}`) && grid.get(`y${item.y}`).cols.get(`x${item.x - cellWidth}`).fill === true)
    let cantMoveRight = (grid.get(`y${item.y}`).cols.get(`x${item.x + cellWidth}`) && grid.get(`y${item.y}`).cols.get(`x${item.x + cellWidth}`).fill === true)
    let cantMoveBottom = (grid.get(`y${item.y + cellWidth}`) && grid.get(`y${item.y + cellWidth}`).cols.get(`x${item.x}`).fill === true)


    switch (direction) {
      case 'left':
        return cantMoveLeft
      case 'right':
        return cantMoveRight
      case 'bottom':
        return cantMoveBottom
      default:
        return (grid.get(`y${item.y}`).cols.get(`x${item.x}`).fill === true)
    }


  })
}


export const getIndexIfARowIsFilled = (grid) => {
  Array.from(grid.values()).forEach((line, index) => {
    return Array.from(line.cols.values()).every((item) => item.fill === true) ? index : null
  })
}


export const checkIfRowMustBeDeleted = (grid) => {

  if(typeof getIndexIfARowIsFilled() === 'number') {

  }

}
