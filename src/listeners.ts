
import * as enums from '@/types/enums'
import { CalcButton } from '@/cacl-button'
import { Display } from '@/display'
import { setDisplayForCoreCalc } from '@/calc-core'

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

  const display = new Display('#calcDisplayNums', '#specialSymbs')
  setDisplayForCoreCalc(display)
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

  const btnNames = enums.buttonNames

  createButton(btnNames.MC, 'standart', 43, 110)
  createButton(btnNames.MPlus, 'standart', 118, 110)
  createButton(btnNames.MMinus, 'standart', 194, 110)
  createButton(btnNames.MR, 'standart', 270, 110)

  createButton(btnNames.clear, 'standart', 43, 170)
  createButton(btnNames.chSign, 'standart', 118, 170)
  createButton(btnNames.div, 'standart', 194, 170)
  createButton(btnNames.mult, 'standart', 270, 170)

  createButton(btnNames.num7, 'standart', 43, 230)
  createButton(btnNames.num8, 'standart', 118, 230)
  createButton(btnNames.num9, 'standart', 194, 230)
  createButton(btnNames.minus, 'standart', 270, 230)

  createButton(btnNames.num4, 'standart', 43, 290)
  createButton(btnNames.num5, 'standart', 118, 290)
  createButton(btnNames.num6, 'standart', 194, 290)
  createButton(btnNames.plus, 'standart', 270, 290)

  createButton(btnNames.num1, 'standart', 43, 350)
  createButton(btnNames.num2, 'standart', 118, 350)
  createButton(btnNames.num3, 'standart', 194, 350)
  createButton(btnNames.equal, 'equal', 270, 350)

  createButton(btnNames.num0, 'zero', 43, 410)
  createButton(btnNames.point, 'standart', 194, 410)
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