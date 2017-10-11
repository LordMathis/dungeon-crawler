import React from 'react';
import PropTypes from 'prop-types';

export const Canvas = (props) => (
  <canvas id="canvas" width={props.width * 10} height={props.height * 10} />
);

Canvas.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
}

export default Canvas;
