const elements: any = {
   result: document.querySelector('#result'),
   equal: document.querySelector('#equal'),
   btn: document.querySelectorAll('.pads__btn'),
   btnNumber: document.querySelectorAll('.numbers'),
   btnOperand: document.querySelectorAll('.pads__btn--operand'),
   ac: document.querySelector('#ac'),
   wrapper: document.querySelector('.wrapper'),
   wrapperIcon: document.querySelector('#wrapper-icon'),
   switch: document.querySelectorAll('.switch'),
   dot: document.querySelector('#dot'),
   plusminus: document.querySelector('#plusminus')
}

class Calculator {
   operand: string;
   firstNumber: string = '';
   secondNumber: string = '';
   mode: boolean = false;
   sum: string;
   el: any

   constructor(elements) {
      this.el = elements
   }

   windowSwitch() {
      this.el.switch.forEach((btn) => {
             btn.onclick = () => {
                if (this.el.wrapperIcon.classList.contains('animation')) {
                   this.el.wrapper.classList.toggle('animation')
                   setTimeout(() => {
                      this.el.wrapperIcon.classList.toggle('animation')
                   }, 300)
                } else {
                   this.el.wrapperIcon.classList.toggle('animation')
                   setTimeout(() => {
                      this.el.wrapper.classList.toggle('animation')
                   }, 300)
                }
             }
          }
      )
   }

   clean() {
      this.operandsOff()
      this.el.result.textContent = '0'
      this.operand = ''
      this.firstNumber = ''
      this.secondNumber = ''
      this.mode = false
      this.sum = ''
   }

   numberSet(number) {
      if (!this.mode) {
         this.firstNumber += number
         this.el.result.textContent = this.firstNumber.replace('.', ',')
      } else if (this.mode && this.sum) {
         this.firstNumber = this.sum
         this.secondNumber += number
         this.el.result.textContent = this.secondNumber.replace('.', ',')
      } else {
         this.secondNumber += number
         this.el.result.textContent = this.secondNumber.replace('.', ',')
      }
   }

   operandSet(operand) {
      switch (operand) {
         case ('divide'):
            this.mode = true
            this.operand = operand
            break;
         case ('multiply'):
            this.mode = true
            this.operand = operand
            break;
         case ('plus'):
            this.mode = true
            this.operand = operand
            break;
         case ('minus'):
            this.mode = true
            this.operand = operand
            break;
         case ('equal'):
            this.calculate()
      }
   }

   result() {
      if (this.sum === 'NaN') {
         console.log('NAN')
         this.operandsOff()
         this.clean()
         this.el.ac.textContent = 'AC'
      } else {
         this.el.result.textContent = this.sum.slice(0, 8).replace('.', ',')
      }
      this.secondNumber = ''
   }


   calculate() {
      if (this.firstNumber && this.secondNumber) {
         if (this.operand === 'divide') {
            this.sum = `${(parseFloat(this.firstNumber) / parseFloat(this.secondNumber))}`
         } else if (this.operand === 'multiply') {
            this.sum = `${(parseFloat(this.firstNumber) * parseFloat(this.secondNumber))}`
         } else if (this.operand === 'plus') {
            this.sum = `${(parseFloat(this.firstNumber) + parseFloat(this.secondNumber))}`
         } else if (this.operand === 'minus') {
            this.sum = `${(parseFloat(this.firstNumber) - parseFloat(this.secondNumber))}`
         }
         this.result()
      }
   }

   operandsOff() {
      this.el.btnOperand.forEach(e => {
         e.style.setProperty('background-color', '#FF9F07')
         e.style.setProperty('color', '#fff')
      })
   }

   plusminus() {
      if (this.secondNumber) {
         if (this.secondNumber[0] === '-') {
            this.secondNumber = this.secondNumber.slice(1)
            this.el.result.textContent = this.secondNumber.replace('.', ',')
         } else {
            this.secondNumber = '-' + this.secondNumber
            this.el.result.textContent = this.secondNumber.replace('.', ',')
         }
      } else {
         if (this.firstNumber[0] === '-') {
            this.firstNumber = this.firstNumber.slice(1)
            this.el.result.textContent = this.firstNumber.replace('.', ',')
         } else {
            this.firstNumber = '-' + this.firstNumber
            this.el.result.textContent = this.firstNumber.replace('.', ',')
         }
      }
   }


   render() {
      /*window.onclick = () => {
          console.log(`FIRST NUMBER: ${this.firstNumber}`);
          console.log(`SECOND NUMBER: ${this.secondNumber}`);
          console.log(`MODE: ${this.mode}`);
          console.log(`SUM: ${this.sum}`);
          console.log(`OPERAND: ${this.operand}`);
      }*/
      this.el.plusminus.onclick = () => {
         this.plusminus()
      }
      this.el.dot.onclick = () => {
         if (this.firstNumber && !this.secondNumber) {
            this.firstNumber += '.'
            this.el.result.textContent += ','
         } else if (this.mode && this.secondNumber) {
            this.secondNumber += '.'
            this.el.result.textContent += ','
         }
      }
      this.el.btnNumber.forEach(btn => {
         btn.addEventListener('click', (e) => {
            if (e.target.dataset.key && this.firstNumber.length < 8) {
               this.operandsOff()
               this.el.ac.textContent = 'C'
               this.numberSet(e.target.dataset.key)
            }
         })
      })
      this.el.ac.onclick = (e) => {
         this.operandsOff()
         e.target.textContent = 'AC'
         this.clean()
      }
      this.el.btnOperand.forEach(btn => {
         btn.onclick = (e) => {
            if (e.target.dataset.key !== 'equal') {
               this.operandsOff()
               e.target.style.setProperty('background-color', '#fff')
               e.target.style.setProperty('color', '#FF9F07')
               this.operandSet(e.target.dataset.key)
            } else {
               this.operandSet(e.target.dataset.key)
            }
         }
      })
   }

   app() {
      this.windowSwitch()
      this.render()
   }
}

let calculator = new Calculator(elements)
calculator.app()

