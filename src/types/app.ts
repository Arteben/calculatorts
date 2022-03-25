import * as enums from '@/types/enums'
import { CalcButton } from '@/cacl-button'
import Big from 'big.js'

export declare function clickButton(): enums.buttonNames

export type buttonCoordinates = {
  left: number
  top: number
}
export interface newButtonParams {
  buttonName: enums.buttonNames
  elmType: enums.buttonTitles
  left: number
  top: number
}

export type buttons = CalcButton[]
export type turnFlag = 'on' | 'off'

export type displayValueTypes = 'both' | 'nums' | 'special'

export interface numberValueForButtons {
  [index: string]: string
}

type calcValue = Big | null
export interface calcMemory {
  firstNumber: calcValue
  memoryCell: calcValue
  secondNumber: calcValue
  currentOperation: enums.buttonNames | null
  calculatedResult: calcValue
}

export type nameButtonOrNot = enums.buttonNames | undefined
