import * as enums from '@/types/enums'
import { Display } from './display'
import * as types from '@/types/app'
import Big from 'big.js'

let display: Display
const numberValues = <types.numberValueForButtons>{
  [enums.buttonNames.num0]: '0',
  [enums.buttonNames.num1]: '1',
  [enums.buttonNames.num2]: '2',
  [enums.buttonNames.num3]: '3',
  [enums.buttonNames.num4]: '4',
  [enums.buttonNames.num5]: '5',
  [enums.buttonNames.num6]: '6',
  [enums.buttonNames.num7]: '7',
  [enums.buttonNames.num8]: '8',
  [enums.buttonNames.num9]: '9',
  [enums.buttonNames.point]: '.',
  [enums.buttonNames.chSign]: '-',
}

const calcOperations = <types.numberValueForButtons>{
  [enums.buttonNames.div]: 'div',
  [enums.buttonNames.mult]: 'mlt',
  [enums.buttonNames.minus]: 'min',
  [enums.buttonNames.plus]: 'pls'
}

const calcMemory = <types.calcMemory>{
  firstNumber: null,
  secondNumber: null,
  currentOperation: null,
  memoryCell: null,
  showedResult: false,
}

const inputChecker = /^((-?[1-9]+[0-9]{0,7})|(-?0+))\.?[0-9]{0,2}$/
const minusChecker = /^-+.*$/

const isNumInput = function (_click: enums.buttonNames) {
  return Boolean(numberValues[_click])
}

const getInputedDisplay = function (_click: enums.buttonNames) {
  let displayString: string
  const numsWithoutZero = (display.nums === display.defaultNumsValue) ? '' : String(display.nums)
  switch (_click) {
    case enums.buttonNames.point:
      displayString = `${String(display.nums)}.`
      console.log('display point', display.nums, displayString)
      break
    case enums.buttonNames.chSign:
      if (minusChecker.test(numsWithoutZero)) {
        displayString = numsWithoutZero.replace('-', '')
      } else {
        displayString = `-${numsWithoutZero}`
      }
      break
    default:
      displayString = `${numsWithoutZero}${numberValues[_click]}`
  }
  return displayString
}

const isInputAllow = function (_click: enums.buttonNames) {
  return inputChecker.test(getInputedDisplay(_click))
}

const setExtraDisplay = function () {
  let extraStr = ''
  display.setExtra(extraStr)
  if (calcMemory.currentOperation) {
    extraStr += calcOperations[calcMemory.currentOperation]
  }
  display.setExtra(extraStr)
}

const calculate = function () {
  if (calcMemory.firstNumber && calcMemory.currentOperation && calcMemory.secondNumber) {
    let result: Big = Big(0)
    switch (calcMemory.currentOperation) {
      case enums.buttonNames.plus:
        result = calcMemory.firstNumber.plus(calcMemory.secondNumber)
        break;
      case enums.buttonNames.minus:
        result = calcMemory.firstNumber.minus(calcMemory.secondNumber)
        break;
      case enums.buttonNames.mult:
        result = calcMemory.firstNumber.mul(calcMemory.secondNumber)
        break;
      case enums.buttonNames.div:
        result = calcMemory.firstNumber.div(calcMemory.secondNumber)
        break;
    }
    display.setNum(result)
    calcMemory.firstNumber = result
  }
  calcMemory.secondNumber = null
  calcMemory.currentOperation = null
  setExtraDisplay()
  calcMemory.showedResult = true
}

export const setDisplayForCoreCalc = function (_d: Display) {
  display = _d
}

export const clickButtonForCalcCore = function (_typeClick: enums.buttonNames) {
  if (calcMemory.showedResult) {
    calcMemory.showedResult = false
    display.clearValues('nums')
  }

  if (_typeClick === enums.buttonNames.clear) {
    display.clearValues('nums')
  } else if (calcOperations[_typeClick] && calcMemory.firstNumber) {
    calcMemory.currentOperation = _typeClick
    setExtraDisplay()
    display.clearValues('nums')
    return
  } else if (isNumInput(_typeClick) && isInputAllow(_typeClick)) {
    const value = getInputedDisplay(_typeClick)
    if (calcMemory.currentOperation == null) {
      calcMemory.firstNumber = Big(value)
    } else {
      calcMemory.secondNumber = Big(value)
    }
    display.setNum(value)
  } else if (_typeClick === enums.buttonNames.equal) {
    calculate()
  }
}
