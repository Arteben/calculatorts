import '@/styles/style.scss'


interface flashingObj {
  first: string
  second?: string
}

const setText = function(_someObj: flashingObj) {
  const textElement = document.querySelector('#someText')
  const text = _someObj.first
  console.log(_someObj.second)
  if (textElement && text && _someObj.second) {
    textElement.innerHTML = text + _someObj.second
  }
}

setText({first: 'a'})
