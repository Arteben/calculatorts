import * as types from '@/types/app'
import * as enums from '@/types/enums'
import { clickButtonForCalcCore } from '@/calc-core'

export class CalcButton {
  el: HTMLElement
  name: enums.buttonNames
  viewRect: DOMRect
  checkVisible (_mouse: MouseEvent) {
    const rect = this.viewRect
    const mouseX = _mouse.x
    const mouseYReal = _mouse.y + window.scrollY
    const isCheckX = mouseX >= rect.left && mouseX <= (rect.left + rect.width)
    const isCheckY = mouseYReal >= rect.top && mouseYReal <= (rect.top + rect.height)
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
    this.viewRect = this.el.getBoundingClientRect()
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

    this.name = params.buttonName

    this.el.style.display = 'block'
    this.turnVisible('on')
    this.el.style.top = String(params.top + 'px')
    this.el.style.left = String(params.left + 'px')
    this.viewRect = this.el.getBoundingClientRect()

    this.el.onclick = (function (_name: enums.buttonNames) {
      return function () {
        clickButtonForCalcCore(_name)
      }
    } (this.name))
  }
}
