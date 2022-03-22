import * as types from '@/types/app'
// import * as enums from '@/types/enums'

export class Display {
  numsElm: HTMLElement
  extraElm: HTMLElement

  nums: string
  specialSyms: string

  defaultNumsValue = '0'
  defaultSpecialSyms = ''

  setValuesInElements (_type: types.displayValueTypes = 'both') {
    const setValue = function (_el: HTMLElement, _value: string) {
      _el.innerHTML = _value
    }
    if (_type == 'both' || _type == 'nums') {
      setValue(this.numsElm, this.nums)
    }
    if (_type == 'both' || _type == 'special') {
      setValue(this.extraElm, this.specialSyms)
    }
  }

  clearValues (_type: types.displayValueTypes = 'both') {
    if (_type == 'both' || _type == 'nums') {
      this.nums = this.defaultNumsValue
      this.setValuesInElements(_type)
    }
    if (_type == 'both' || _type == 'special') {
      this.specialSyms = this.defaultSpecialSyms
      this.setValuesInElements(_type)
    }
  }

  setNum (_text: any) {
    this.nums = String(_text)
    this.setValuesInElements('nums')
  }

  setExtra (_extra: any) {
    this.specialSyms = String(_extra)
    this.setValuesInElements('special')
  }

  constructor(_numsId: string, _extraId: string) {
    this.numsElm = <HTMLElement>document.querySelector(_numsId)
    this.extraElm = <HTMLElement>document.querySelector(_extraId)
    this.nums = this.defaultNumsValue
    this.specialSyms = this.defaultSpecialSyms
    this.setValuesInElements('both')
  }
}
