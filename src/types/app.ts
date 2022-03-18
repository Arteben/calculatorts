import * as enums from '@/types/enums'
import { CalcButton } from '@/cacl-button'

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