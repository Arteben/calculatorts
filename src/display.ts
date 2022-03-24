import * as types from '@/types/app'
export class Display {
  numsElm: HTMLElement
  extraElm: HTMLElement

  nums: string
  specialSyms: string

  defaultNumsValue = '0'
  defaultSpecialSyms = ''

  setValuesInElements(_type: types.displayValueTypes = 'both') {
    const setValue = function (_el: HTMLElement, _value: string) {
      _el.innerHTML = _value
    }

    const converToBeauty = function (_num: string) {
      let displayNum = Number(_num).toLocaleString(undefined,
        { minimumFractionDigits: 0 })
      const checkPoint = /^.*\.+$/
      if (checkPoint.test(_num)) {
        displayNum += '.'
      }
      return displayNum
    }

    if (_type == 'both' || _type == 'nums') {
      setValue(this.numsElm, converToBeauty(this.nums))
    }
    if (_type == 'both' || _type == 'special') {
      setValue(this.extraElm, this.specialSyms)
    }
  }

  clearValues(_type: types.displayValueTypes = 'both') {
    if (_type == 'both' || _type == 'nums') {
      this.nums = this.defaultNumsValue
      this.setValuesInElements(_type)
    }
    if (_type == 'both' || _type == 'special') {
      this.specialSyms = this.defaultSpecialSyms
      this.setValuesInElements(_type)
    }
  }

  setNum(_num: any) {
    this.nums = String(_num)
    this.setValuesInElements('nums')
  }

  setExtra(_extra: any) {
    this.specialSyms = String(_extra)
    this.setValuesInElements('special')
  }

  setError (_msg: string) {
    this.clearValues('nums')
    this.numsElm.innerHTML = _msg
  }

  constructor(_numsId: string, _extraId: string) {
    this.numsElm = <HTMLElement>document.querySelector(_numsId)
    this.extraElm = <HTMLElement>document.querySelector(_extraId)
    this.nums = this.defaultNumsValue
    this.specialSyms = this.defaultSpecialSyms
    this.setValuesInElements('both')
  }
}
