import {cellWidth} from '../Canvas'

export const generateGrid = (nbCols, nbLines, cellWidth) => {
  let gridObj = new Map()

  for (let lineIndex = 0; lineIndex < nbLines; lineIndex++) {
    let cols = new Map()
    for (let colIndex = 0; colIndex < nbCols; colIndex++) {
      cols.set(cellWidth * colIndex, {fill: false, color: '', posx: (colIndex) * cellWidth, posy: (lineIndex) * cellWidth})
    }
    gridObj.set(cellWidth * lineIndex, {cols, posy: cellWidth * lineIndex})
  }
  return gridObj
}

export const setAShapeAndUpdateGrid = (ctx, grid, positionOfShapeToCalcul, color) => {

  positionOfShapeToCalcul.forEach((item) => {
    grid.get(item.y).cols.get(item.x).fill = true
    grid.get(item.y).cols.get(item.x).color = color
  })
  return grid
}


export const cantMove = (grid, positionOfShapeToCalcul, direction) => {

  return positionOfShapeToCalcul.some((item) => {
    let cantMoveLeft = (grid.get(item.y).cols.get(item.x - cellWidth) && grid.get(item.y).cols.get(item.x - cellWidth).fill === true)
    let cantMoveRight = (grid.get(item.y).cols.get(item.x + cellWidth) && grid.get(item.y).cols.get(item.x + cellWidth).fill === true)
    let cantMoveBottom = (grid.get(item.y + cellWidth) && grid.get(item.y + cellWidth).cols.get(item.x).fill === true)


    switch (direction) {
      case 'left':
        return cantMoveLeft
      case 'right':
        return cantMoveRight
      case 'bottom':
        return cantMoveBottom
      default:
        return (grid.get(item.y).cols.get(item.x).fill === true)
    }


  })
}
