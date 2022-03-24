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

const memoryOperations = <types.numberValueForButtons>{
  [enums.buttonNames.MC]: 'MC',
  [enums.buttonNames.MMinus]: '-M',
  [enums.buttonNames.MPlus]: '+M',
  [enums.buttonNames.MR]: 'MR'
}

const calcMemory = <types.calcMemory>{
  firstNumber: null,
  secondNumber: null,
  currentOperation: null,
  memoryCell: null,
  calculatedResult: null,
}

const inputChecker = /^((-?[1-9]{1}[0-9]{0,7})|(-?0+))\.?[0-9]{0,2}$/
const minusChecker = /^-+.*$/

const isNumInput = function (_click: enums.buttonNames) {
  return Boolean(numberValues[_click])
}

const getInputedDisplay = function (_click: types.nameButtonOrNot) {
  let displayString: string
  const numsWithoutZero = (display.nums === display.defaultNumsValue) ? '' : String(display.nums)
  switch (_click) {
    case enums.buttonNames.point:
      displayString = `${String(display.nums)}.`
      break
    case enums.buttonNames.chSign:
      if (minusChecker.test(numsWithoutZero)) {
        displayString = numsWithoutZero.replace('-', '')
      } else {
        displayString = `-${numsWithoutZero}`
      }
      break
    default:
      if (_click !== undefined) {
        displayString = `${numsWithoutZero}${numberValues[_click]}`
      } else {
        displayString = display.nums
      }
  }
  return displayString
}

const isInputAllow = function (_click?: enums.buttonNames) {
  console.log('input checker', getInputedDisplay(_click), inputChecker.test(getInputedDisplay(_click)))
  return inputChecker.test(getInputedDisplay(_click))
}

const setExtraDisplay = function () {
  let extraStr = ''
  display.setExtra(extraStr)
  if (calcMemory.currentOperation) {
    extraStr += calcOperations[calcMemory.currentOperation]
  }

  const memoryNum = calcMemory.memoryCell
  if (memoryNum) {
    if (Number(memoryNum.abs()) == Number(memoryNum)) {
      extraStr += memoryOperations[enums.buttonNames.MPlus]
    } else {
      extraStr += memoryOperations[enums.buttonNames.MMinus]
    }
  }

  display.setExtra(extraStr)
}

const calculate = function () {

  const doOperation = function () {
    let result: Big = Big(0)
    if (calcMemory.firstNumber && calcMemory.currentOperation && calcMemory.secondNumber) {
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
    }
    return result
  }

  if (calcMemory.firstNumber && calcMemory.currentOperation && calcMemory.secondNumber) {
    try {
      const result = doOperation()
      display.setNum(result)
      calcMemory.firstNumber = result
      calcMemory.calculatedResult = result
    } catch(e: any) {
      display.setError(e)
    }
    calcMemory.secondNumber = null
    calcMemory.currentOperation = null
    setExtraDisplay()
  }
}

const setNumValue = function (_bigValue: Big, _strValue: string) {
  if (calcMemory.currentOperation == null) {
    calcMemory.firstNumber = _bigValue
  } else {
    calcMemory.secondNumber = _bigValue
  }
  display.setNum(_strValue)
}

const doMemoryOperation = function (_click: enums.buttonNames) {

  const setCellMemoryNumber = function (_num: string, _typeSign: 'pl'| 'min') {
    let number = calcMemory.calculatedResult
      ? Big(calcMemory.calculatedResult)
      : Big(display.nums)
    if (_typeSign == 'pl') {
      number = number.abs()
    } else {
      number = Big(0).minus(number.abs())
    }
    calcMemory.memoryCell = number
  }

  const removeNumOperations = function () {
    display.clearValues('nums')
    calcMemory.firstNumber = null
    calcMemory.secondNumber = null
    calcMemory.currentOperation = null
  }

  switch (_click) {
    case enums.buttonNames.MC:
      calcMemory.memoryCell = null
      break
    case enums.buttonNames.MPlus:
      setCellMemoryNumber(display.nums, 'pl')
      removeNumOperations()
      break
    case enums.buttonNames.MMinus:
      setCellMemoryNumber(display.nums, 'min')
      removeNumOperations()
      break
    default:
      if (calcMemory.memoryCell) {
        display.clearValues('nums')
        setNumValue(calcMemory.memoryCell, String(calcMemory.memoryCell))
        calcMemory.memoryCell = null
      }
      break;
  }
  setExtraDisplay()
}

export const setDisplayForCoreCalc = function (_d: Display) {
  display = _d
}

export const clickButtonForCalcCore = function (_typeClick: enums.buttonNames) {

  if (calcMemory.calculatedResult && !memoryOperations[_typeClick]) {
    calcMemory.calculatedResult = null
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
    console.log('setNumValue', value)
    setNumValue(Big(value), value)
  } else if (memoryOperations[_typeClick] && isInputAllow()) {
    doMemoryOperation(_typeClick)
  } else if (_typeClick === enums.buttonNames.equal) {
    calculate()
  }
}
