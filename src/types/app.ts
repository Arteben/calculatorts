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
export interface calcMemory {
  firstNumber: Big | null
  memoryCell: Big | null
  currentOperation: enums.buttonNames | null
}
