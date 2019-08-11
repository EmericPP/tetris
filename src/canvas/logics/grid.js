import  {OrderedMap, Map} from 'immutable'
import {cellWidth} from '../Canvas'

export const generateGrid = (nbCols, nbLines, cellWidth) => {
  let gridObj = OrderedMap()

  for (let lineIndex = 0; lineIndex < nbLines; lineIndex++) {
    let cols = OrderedMap()
    for (let colIndex = 0; colIndex < nbCols; colIndex++) {
      cols = cols.set(cellWidth * colIndex, {fill: false, color: '', posx: (colIndex) * cellWidth, posy: (lineIndex) * cellWidth})
    }
    gridObj = gridObj.set(cellWidth * lineIndex, Map({cols, posy: cellWidth * lineIndex}))
  }


  return gridObj
}

export const setAShapeAndUpdateGrid = (ctx, grid, positionOfShapeToCalcul, color) => {



  let newGrid = grid

  positionOfShapeToCalcul.forEach((item) => {
    newGrid = newGrid
      .setIn([item.y, 'cols', item.x, 'fill'], true)
      .setIn([item.y, 'cols', item.x, 'color'], color)
    
  })


  return newGrid
}


export const cantMove = (grid, positionOfShapeToCalcul, direction) => {

  return positionOfShapeToCalcul.some((item) => {
    let cantMoveLeft = (grid.getIn([item.y, 'cols', item.x - cellWidth]) && grid.getIn([item.y, 'cols', item.x - cellWidth, 'fill']) === true)
    let cantMoveRight = (grid.getIn([item.y, 'cols', item.x + cellWidth]) && grid.getIn([item.y, 'cols', item.x + cellWidth, 'fill']) === true)
    let cantMoveBottom = (grid.get(item.y + cellWidth) && grid.getIn([item.y + cellWidth, 'cols', item.x, 'fill']) === true)

    switch (direction) {
      case 'left':
        return cantMoveLeft
      case 'right':
        return cantMoveRight
      case 'bottom':
        return cantMoveBottom
      default:
        return (grid.getIn([item.y, 'cols', item.x, 'fill']) === true)
    }


  })
}
