import elements from "./elements.js";

class Calc {
   current = '';
   memory = '';
   result = '';
   operand = '';
   operandActive = ''
   init = true

   constructor(el) {
	  this.el = el
   }

   #animation() {
	  this.el.wrapperIcon.classList.toggle('animation')
	  this.el.wrapper.classList.toggle('animation')
	  window.onkeydown = e => this.keyboardHandler(e)
   }

   #numberWindow = () => this.el.result.textContent = this.current.toString().replaceAll('.', ',')
   #resultWindow = () => this.el.result.textContent = this.result.toString().replaceAll('.', ',')

   #reset() {
	  if (this.operandActive) this.operandHighlight(false, this.operandActive)
	  this.current = ''
	  this.memory = ''
	  this.result = 0
	  this.operand = ''
	  this.operandActive = ''
	  this.init = true
	  this.el.result.textContent = '0'
	  this.el.ac.textContent = 'AC'
   }

   operandHighlight(status, btn) {
	  if (!status && this.operandActive) btn.classList.remove('active')
	  else btn.classList.add('active')
   }

   #plusMinus() {
	  if (!this.current.includes('-')) this.current = '-' + this.current
	  else this.current = this.current.slice(1)
	  if (this.init && !this.current) this.el.result.textContent = this.current + '0'
	  else this.el.result.textContent = this.current

   }

   currentRefresh() {
	  this.init = false
	  this.memory = this.current
	  this.current = ''
   }
   
   #calcLogic() {
	  if (this.operand === 'divide' && this.current) this.result = (+this.memory / +this.current).toString()
	  if (this.operand === 'multiply' && this.current) this.result = (+this.memory * +this.current).toString()
	  if (this.operand === 'plus' && this.current) this.result = (+this.memory + +this.current).toString()
	  if (this.operand === 'minus' && this.current) this.result = (+this.memory - +this.current).toString()
	  this.#resultWindow()
	  this.memory = this.result
	  this.current = ''
	  this.operand = ''
	  this.operandHighlight(false, this.operandActive)
   }

   #calculate(btn) {
	  if (this.current && this.memory && this.operand === btn.dataset.key && this.operandActive && btn.dataset.key !== 'equal') this.#calcLogic()
	  let operand = btn.dataset.key
	  if (!this.operandActive && btn.dataset.key !== 'equal') this.operandHighlight(true, btn)
	  else if (this.operandActive && btn.dataset.key !== 'equal') {
		 this.operandHighlight(false, this.operandActive)
		 this.operandHighlight(true, btn)
	  }
	  if (btn.dataset.key !== 'equal') this.operandActive = btn
	  switch (operand) {
		 case('divide'):
			this.operand = operand
			if (this.init) this.currentRefresh()
			break;
		 case('multiply'):
			this.operand = operand
			if (this.init) this.currentRefresh()
			break;
		 case('plus'):
			this.operand = operand
			if (this.init) this.currentRefresh()
			break;
		 case('minus'):
			this.operand = operand
			if (this.init) this.currentRefresh()
			break;
		 case('equal'):
			if (this.current && this.memory) {
			   this.#calcLogic()
			}
	  }
   }

   #dotHandler() {
	  if (this.current && !this.current.includes('.')) {
		 this.current += '.'
		 this.#numberWindow()
	  }
   }

   #percentage() {
	  if (!this.memory) {
		 this.result = this.current / 100
		 this.#resultWindow()
	  } else if (!this.current && this.result) {
		 this.result = this.result / 100
		 this.#resultWindow()
		 this.memory = this.result
		 this.current = ''
		 this.operand = ''
		 this.operandHighlight(false, this.operandActive)
	  } else if (this.current && this.memory) {
		 this.current = this.memory * this.current / 100
		 this.el.result.textContent = this.current.toString().replaceAll('.', ',')
	  }
   }

   keyboardHandler(e) {
	  if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9' || e.key === '0') {
		 this.el.ac.textContent = 'C'
		 this.current += e.key
		 this.#numberWindow()
		 if (this.operandActive) this.operandHighlight(false, this.operandActive)
	  } else if (e.key === 'Backspace') {
		 if (this.current) {
			this.current = this.current.slice(0, -1)
			this.#resultWindow()
		 }
	  } else if (e.key === '/') this.#calculate(this.el.divide)
	  else if (e.key === '*') this.#calculate(this.el.multiply)
	  else if (e.key === '-') this.#calculate(this.el.minus)
	  else if (e.key === '+') this.#calculate(this.el.plus)
	  else if (e.key === '=' || e.key === 'Enter') this.#calculate(this.el.equal)
	  else if (e.key === '.' || e.key === ',') this.#dotHandler()
	  else if (e.key === 'r' || e.key === 'c') this.#reset()
	  else if (e.key === '%') this.#percentage()
   }

   app() {
	  this.el.btnNumber.forEach(btn => btn.addEventListener('click', () => {
		 this.el.ac.textContent = 'C'
		 this.current += btn.dataset.key
		 this.#numberWindow()
		 if (this.operandActive) this.operandHighlight(false, this.operandActive)
	  }))
	  this.el.wrapperIcon.onclick = () => this.#animation()
	  this.el.home.onclick = () => this.#animation()
	  this.el.ac.onclick = () => this.#reset()
	  this.el.btnOperand.forEach(btn => btn.onclick = () => this.#calculate(btn))
	  this.el.dot.onclick = () => this.#dotHandler()
	  this.el.plusMinus.onclick = () => this.#plusMinus()
	  this.el.percent.onclick = () => this.#percentage()
   }
}

const calc = new Calc(elements)
calc.app()

export default Calc
