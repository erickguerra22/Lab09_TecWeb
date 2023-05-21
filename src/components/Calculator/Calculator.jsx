import React from 'react'
import calculator from './Calculator.module.css'
import Button from '../Button/Button'

const buttons = [
  { text: 'C', columns: 3 },
  { text: '÷' },
  { text: '7', background: '#3B3B3B' },
  { text: '8', background: '#3B3B3B' },
  { text: '9', background: '#3B3B3B' },
  { text: '×' },
  { text: '4', background: '#3B3B3B' },
  { text: '5', background: '#3B3B3B' },
  { text: '6', background: '#3B3B3B' },
  { text: '-' },
  { text: '1', background: '#3B3B3B' },
  { text: '2', background: '#3B3B3B' },
  { text: '3', background: '#3B3B3B' },
  { text: '+' },
  { text: '+/-', background: '#3B3B3B' },
  { text: '0', background: '#3B3B3B' },
  { text: '.', background: '#3B3B3B' },
  { text: '=', background: '#848381', color: 'black' },
]

const Calculator = () => {
  let disableKeyboard = false

  const operate = (operation) => {
    const operands = operation.split(' ')
    let result = 0
    switch (operands[1]) {
      case '+':
        result = +operands[0] + +operands[2]
        break
      case '-':
        result = +operands[0] - +operands[2]
        break
      case '×':
        result = +operands[0] * +operands[2]
        break
      case '÷':
        if (+operands[2] !== 0) result = +operands[0] / +operands[2]
        else result = -1
        break
      default:
        break
    }
    if (result.toString().includes('.')) result = parseFloat(result).toFixed(2)
    return result >= 0 && result.toString().length <= 9 ? result : 'ERROR'
  }

  const handleAction = (action) => {
    const display = document.getElementById('display')
    const history = document.getElementById('history')

    if (display.value === 'ERROR' && action !== 'C') return

    if (!Number.isNaN(+action)) {
      if (history.value.includes('=')) history.value = ''
      if (display.value === '0' || disableKeyboard) {
        disableKeyboard = false
        display.value = action
      } else if (display.value.length < 9) display.value += action
    } else {
      switch (action) {
        case '=':
          if (history.value.includes('=')) {
            history.value.replace(' =', '')
            history.value = history.value.replace(history.value.split(' ')[0], display.value)
            display.value = operate(history.value + display.value)
          } else {
            history.value = `${history.value + display.value} =`
            display.value = operate(history.value + display.value)
          }
          break
        case '.':
          if (!display.value.includes('.')) {
            if (disableKeyboard) {
              disableKeyboard = false
              display.value = '0.'
            } else if (display.value.length < 9) display.value += action
          }
          break
        case 'C':
          display.value = '0'
          history.value = ''
          break
        case '+/-':
          display.value = +display.value * -1
          if (display.value.length > 9) display.value = display.value.slice(0, 9)
          break
        default:
          disableKeyboard = true
          display.value = history.value !== '' ? operate(history.value + display.value) : display.value
          history.value = `${display.value} ${action} `
          break
      }
    }
  }

  return (
    <div className={calculator.styles}>
      <input id="history" defaultValue="" disabled />
      <input id="display" className={calculator.display} defaultValue="0" disabled />
      <div className={calculator.keyboard}>
        {buttons.map((but) => (
          <Button
            key={but.text}
            onClick={handleAction}
            text={but.text}
            columns={but.columns ? but.columns : undefined}
            rows={but.rows ? but.rows : undefined}
            background={but.background ? but.background : undefined}
            color={but.color ? but.color : undefined}
          />
        ))}
      </div>
    </div>
  )
}

export default Calculator
