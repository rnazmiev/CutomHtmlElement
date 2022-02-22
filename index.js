
class MyCustom extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
  }

  connectedCallback() {
    this.render()
  }

  render() {
    const textInput = document.querySelector('#text-input')
    const selectLayout = document.querySelector('#layout')
    const selectOrder = document.querySelector('#order')
    const styleOrder = document.createElement('style')
    const wrapper = document.createElement('div')
    wrapper.setAttribute('class','wrapper')
    const styleWrapper = document.createElement('style')
    const colors = ['red', 'green', 'yellow', 'orange', 'blue']
    let flexDirection, flexOrder

    textInput.oninput = function() {
      let text = textInput.value.toUpperCase().trim()
      if(wrapper.firstChild) {
        wrapper.innerHTML = ''
        for(let i in text) {
          let random_color = colors[ Math.floor(Math.random() * colors.length) ]
          const box = document.createElement('div')
          box.setAttribute('class','box');
          box.textContent = text[i]
          wrapper.appendChild(box)
          box.style.backgroundColor = random_color
        }
      } else {
        for(let i in text) {
          let random_color = colors[ Math.floor(Math.random() * colors.length) ]
          const box = document.createElement('div')
          box.setAttribute('class','box');
          box.textContent = text[i]
          wrapper.appendChild(box)
          box.style.backgroundColor = random_color
        }
      }
    }

    
    
    selectLayout.onchange = function() {
      flexDirection = selectLayout.value
      styleWrapper.textContent = `
        .wrapper {
          display: flex;
          flex-wrap: wrap;
          flex-direction: ${flexDirection};
        }
      `
    }

    selectOrder.onchange = function() {
      switch(selectOrder.value) {
        case 'direct':
          flexOrder = 'initial'
          break;
        case 'reversed':
          flexDirection === 'row' ? flexOrder = 'row-reverse' : flexOrder ='column-reverse'
          break;
        case 'randomized':
          flexOrder = selectOrder.value
          break;
        default:
      }
      
      styleWrapper.textContent = `
        .wrapper {
          display: flex;
          flex-wrap: wrap;
          flex-direction: ${flexOrder};
        }
      `
    }

    this.shadow.appendChild(styleWrapper)
    this.shadow.appendChild(wrapper)
    this.addBackground()
  }



  addBackground() {
    const styleBox = document.createElement('style');
    styleBox.textContent = `
      .box {
        width: 200px;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ccc;
      }
    `
    this.shadow.appendChild(styleBox) 
  }
  
}

customElements.define('my-custom', MyCustom)
