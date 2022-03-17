
import * as enums from '@/types/enums'
import {CalcButton} from '@/cacl-button'

const buttons = <CalcButton[]>[]

const resizeScreen = function () {
  const imgElement = <HTMLElement>document.querySelector('#calcImg')
  const controlElementDiv = <HTMLElement>document.querySelector('#calcInteractiveElements')
  if (imgElement && controlElementDiv) {
    const coordinates = imgElement.getBoundingClientRect()
    controlElementDiv.style.left = `${String(coordinates.x)}px`
    controlElementDiv.style.top = `${String(coordinates.y)}px`
  }

  buttons.forEach(_el => {
    _el.resetViewRect()
  })
}

const createButtons = function () {
  const createButton = function (_name: enums.buttonNames, type: enums.buttonTitles, l: number, t: number) {
    const params = {
      elmType: type,
      top: t,
      left: l,
      buttonName: _name
    }
    buttons.push(new CalcButton(params))
  }

  createButton(enums.buttonNames.MC, 'standart', 43, 110)
  createButton(enums.buttonNames.MPlus, 'standart', 118, 110)
  createButton(enums.buttonNames.MMinus, 'standart', 194, 110)
  createButton(enums.buttonNames.MR, 'standart', 270, 110)
}

export const setWindowListeners = function () {
  resizeScreen()

  window.addEventListener('resize', resizeScreen, true)
  window.addEventListener('mousemove', function (_event: MouseEvent) {
    buttons.forEach(_button => {
      _button.checkVisible(_event)
    })
  }, true)
  window.addEventListener('load', createButtons, true)
}