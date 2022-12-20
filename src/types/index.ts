export type tCoordinates2D = {
  x: number;
  y: number;
}

export type iDrawLine = {
  c: CanvasRenderingContext2D, 
  from: tCoordinates2D, 
  to: tCoordinates2D,
  color: string,
  size: number
}