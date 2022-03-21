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
}

const calcOperations = <types.numberValueForButtons>{
  [enums.buttonNames.div]: 'div',
  [enums.buttonNames.mult]: 'mlt',
  [enums.buttonNames.minus]: 'min',
  [enums.buttonNames.plus]: 'pls'
}

const calcMemory = <types.calcMemory>{
  firstNumber: null,
  currentOperation: null,
  memoryCell: null
}

// const valueChecker = new RegExp('^[1-9]{1}[0-9]{0,8}(\.[0-9]{2})?$')
const inputChecker = new RegExp('^[1-9]{1}[0-9]{0,8}\.?[0-9]{0,2}$')

const isNumInput = function (_click: enums.buttonNames) {
  return Boolean(numberValues[_click])
}

const getInputedDisplay = function (_num: string) {
  const currentNums = (display.nums === display.defaultNumsValue) ? '' : display.nums
  return `${currentNums}${_num}`
}

const isInputAllow = function (_click: enums.buttonNames) {
  const someNumber = String(numberValues[_click])
  return inputChecker.test(getInputedDisplay(someNumber))
}

export const setDisplayForCoreCalc = function (_d: Display) {
  display = _d
}

export const clickButtonForCalcCore = function (_typeClick: enums.buttonNames) {
  if (_typeClick === enums.buttonNames.clear) {
    display.clearValues()
  }
  if (isNumInput(_typeClick) && isInputAllow(_typeClick)) {
    display.setNum(getInputedDisplay(String(numberValues[_typeClick])))
  }
}
