import '@/styles/style.scss'

interface Botton {
  element: any
  name: string
}

class BottonElement {
  element: any
  name: string

  constructor(el: any, name: string) {
    this.element = el;
    this.name = name;
  }
}

const someBotton: Botton = new BottonElement({}, 'Some Botton');
console.log(someBotton)
