import React from 'react'
import PropTypes from 'prop-types'
import button from './Button.module.css'

const Button = ({
  text, background, rows, columns, onClick, color,
}) => (
  <button
    className={button.styles}
    type="button"
    onClick={() => onClick(text)}
    style={{
      color,
      backgroundColor: `${background}`,
      gridColumn: `span ${columns}`,
      gridRow: `span ${rows}`,
    }}
  >
    {text}
  </button>
)

Button.defaultProps = {
  background: '#323232',
  color: 'white',
  rows: 1,
  columns: 1,
  onClick: undefined,
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  background: PropTypes.string,
  color: PropTypes.string,
  rows: PropTypes.number,
  columns: PropTypes.number,
  onClick: PropTypes.func,
}

export default Button
