import {widthZone, zoneHeight} from '../Canvas'

export const drawCell = (ctx, pos, size, color ) => {
  if(color) ctx.fillStyle = color

  ctx.save()
  ctx.beginPath()
  ctx.strokeStyle = '#000'
  ctx.rect(pos.x, pos.y, size, size)
  ctx.fill()
  ctx.stroke()

  ctx.closePath()

  ctx.restore()

}


export const T = {
  shape: [
    [[1, 1, 1], [0, 1, 0], [0, 0, 0]],
    [[0, 0, 1], [0, 1, 1], [0, 0, 1]],
    [[0, 0, 0], [0, 1, 0], [1, 1, 1]],
    [[1, 0, 0], [1, 1, 0], [1, 0, 0]],
  ],
  color: 'pink'
}

export const I = {
  shape: [
    [[0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0]],
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]],
  ],
  color: 'green'
}

export const L = {
  shape: [
    [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
    [[1, 1, 1], [1, 0, 0], [0, 0, 0]],
    [[0, 1, 1], [0, 0, 1], [0, 0, 1]],
    [[0, 0, 0], [0, 0, 1], [1, 1, 1]],
  ],
  color: 'coral'
}

export const J = {
  shape: [
    [[0, 0, 1], [0, 0, 1], [0, 1, 1]],
    [[0, 0, 0], [1, 0, 0], [1, 1, 1]],
    [[1, 1, 0], [1, 0, 0], [1, 0, 0]],
    [[1, 1, 1], [0, 0, 1], [0, 0, 0]],
  ],
  color: 'yellow'
}

export const O = {
  shape: [
    [[0, 1, 1, 0], [0, 1, 1, 0]],
  ],
  color: 'teal'
}

export const S = {
  shape: [
    [[0, 1, 1], [1, 1, 0], [0, 0, 0]],
    [[1, 0, 0], [1, 1, 0], [0, 1, 0]],
    [[0, 0, 0], [0, 1, 1], [1, 1, 0]],
    [[0, 1, 0], [0, 1, 1], [0, 0, 1]],
  ],
  color: 'orange'
}

export const Z = {
  shape: [
    [[1, 1, 0], [0, 1, 1], [0, 0, 0]],
    [[0, 1, 0], [1, 1, 0], [1, 0, 0]],
    [[0, 0, 0], [1, 1, 0], [0, 1, 1]],
    [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
  ],
  color: 'lightblue'
}

const shapes = [T,I,L,J,O,S,Z]

export const getARandomShape = () => {
  const shape = shapes[Math.floor(Math.random() * Math.floor(shapes.length))]
  return {
    shape: shape.shape,
    color: shape.color
  }
}


export const clearCanvas = (ctx) => {
  ctx.clearRect(0, 0,zoneHeight, zoneHeight)
}

export const drawShape = (ctx, shape, position, size, color) => {
  let pos = {x: position.x, y: position.y}

  const realShapePos = []


  shape.forEach((line, indexLine) => {
    pos.x = position.x // a chaque changement de ligne on replace x a posX
    if(indexLine > 0) {
      pos.y += size
    }
    line.forEach((item, indexCell) => {
      if(indexCell > 0)       {
        pos.x += size
      }
      if(item) {
        realShapePos.push({
          x: pos.x,
          y: pos.y,
          color: color
        })
        if(ctx) {
          drawCell(ctx, pos, size, color)
        }
      }
    })
  })
  
  return realShapePos
}

