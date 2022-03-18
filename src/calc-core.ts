import * as enums from '@/types/enums'
import { Display } from './display'

let display: Display

export const setDisplayForCoreCalc = function (_d: Display) {
  display = _d
}

export const clickButtonForCalcCore = function (_typeClick: enums.buttonNames) {
  console.log('click!', _typeClick)
  display.setNum(_typeClick)
}
