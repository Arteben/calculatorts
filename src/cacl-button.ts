import * as types from '@/types/app'
import * as enums from '@/types/enums'
import { clickButtonForCalcCore } from '@/calc-core'

export class CalcButton {
  el: HTMLElement
  parentElement: HTMLElement
  name: enums.buttonNames
  elX: number
  elY: number
  elRect: DOMRect
  checkVisible (_mouse: MouseEvent) {
    const parentRect = this.parentElement.getBoundingClientRect()
    const elLeftValue = this.elX + parentRect.left
    const elTopValue = this.elY + parentRect.top
    const isCheckX = _mouse.x >= elLeftValue && _mouse.x <= (elLeftValue + this.elRect.width)
    const isCheckY = _mouse.y >= elTopValue && _mouse.y <= (elTopValue + this.elRect.height)

    const turnType = (isCheckX && isCheckY) ? 'off' : 'on'

    this.turnVisible(turnType)
  }

  turnVisible (_flag: types.turnFlag) {
    const theClass = 'invisible'
    const isContains = this.el.classList.contains(theClass)
    if (!isContains && _flag == 'on') {
      this.el.classList.add(theClass)
    }

    if (isContains && _flag == 'off') {
      this.el.classList.remove(theClass)
    }
  }

  resetViewRect () {
    this.elRect = this.el.getBoundingClientRect()
  }

  constructor(params: types.newButtonParams) {
    const buttons = {
      standart: '.highlightStandartButton',
      zero: '.highlightZeroButton',
      equal: '.highlightEqualButton'
    }
    const templateButton = <HTMLElement>document.querySelector(buttons[params.elmType])
    if (params.elmType == 'zero') {
      console.log(params.elmType, buttons[params.elmType], templateButton)
    }
    this.el = <HTMLElement>templateButton.cloneNode(false)
    const controls = <HTMLElement>document.querySelector('#calcInteractiveElements')
    controls.appendChild(this.el)
    this.parentElement = controls

    this.name = params.buttonName

    this.el.style.display = 'block'
    this.turnVisible('on')
    this.el.style.top = String(params.top + 'px')
    this.elY = params.top
    this.el.style.left = String(params.left + 'px')
    this.elX = params.left

    this.elRect = this.el.getBoundingClientRect()

    this.el.onclick = (function (_name: enums.buttonNames) {
      return function () {
        clickButtonForCalcCore(_name)
      }
    } (this.name))
  }
}
