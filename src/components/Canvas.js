import React from 'react';

export const Canvas = (props) => (
  <canvas id="canvas" width={props.width * 10} height={props.height * 10} />
);

export default Canvas;
