var elements = {
    result: document.querySelector('#result'),
    equal: document.querySelector('#equal'),
    btn: document.querySelectorAll('.pads__btn'),
    btnNumber: document.querySelectorAll('.numbers'),
    btnOperand: document.querySelectorAll('.pads__btn--operand'),
    ac: document.querySelector('#ac'),
    wrapper: document.querySelector('.wrapper'),
    wrapperIcon: document.querySelector('#wrapper-icon'),
    switch: document.querySelectorAll('.switch'),
    dot: document.querySelector('#dot')
};
var Calculator = /** @class */ (function () {
    function Calculator(elements) {
        this.firstNumber = '';
        this.secondNumber = '';
        this.mode = false;
        this.el = elements;
    }
    Calculator.prototype.windowSwitch = function () {
        var _this = this;
        this.el.switch.forEach(function (btn) {
            btn.onclick = function () {
                if (_this.el.wrapperIcon.classList.contains('animation')) {
                    _this.el.wrapper.classList.toggle('animation');
                    setTimeout(function () {
                        _this.el.wrapperIcon.classList.toggle('animation');
                    }, 300);
                }
                else {
                    _this.el.wrapperIcon.classList.toggle('animation');
                    setTimeout(function () {
                        _this.el.wrapper.classList.toggle('animation');
                    }, 300);
                }
            };
        });
    };
    Calculator.prototype.clean = function () {
        this.operandsOff();
        this.el.result.textContent = '0';
        this.operand = '';
        this.firstNumber = '';
        this.secondNumber = '';
        this.mode = false;
        this.sum = '';
    };
    Calculator.prototype.numberSet = function (number) {
        if (!this.mode) {
            this.firstNumber += number;
            this.el.result.textContent = this.firstNumber.replace('.', ',');
        }
        else if (this.mode && this.sum) {
            this.firstNumber = this.sum;
            this.secondNumber += number;
            this.el.result.textContent = this.secondNumber.replace('.', ',');
        }
        else {
            this.secondNumber += number;
            this.el.result.textContent = this.secondNumber.replace('.', ',');
        }
    };
    Calculator.prototype.operandSet = function (operand) {
        switch (operand) {
            case ('divide'):
                this.mode = true;
                this.operand = operand;
                break;
            case ('multiply'):
                this.mode = true;
                this.operand = operand;
                break;
            case ('plus'):
                this.mode = true;
                this.operand = operand;
                break;
            case ('minus'):
                this.mode = true;
                this.operand = operand;
                break;
            case ('equal'):
                this.calculate();
        }
    };
    Calculator.prototype.result = function () {
        if (this.sum === 'NaN') {
            console.log('NAN');
            this.operandsOff();
            this.clean();
            this.el.ac.textContent = 'AC';
        }
        else {
            this.el.result.textContent = this.sum.slice(0, 8).replace('.', ',');
        }
        this.secondNumber = '';
    };
    Calculator.prototype.calculate = function () {
        if (this.operand === 'divide') {
            this.sum = "".concat((parseFloat(this.firstNumber) / parseFloat(this.secondNumber)));
        }
        else if (this.operand === 'multiply') {
            this.sum = "".concat((parseFloat(this.firstNumber) * parseFloat(this.secondNumber)));
        }
        else if (this.operand === 'plus') {
            this.sum = "".concat((parseFloat(this.firstNumber) + parseFloat(this.secondNumber)));
        }
        else if (this.operand === 'minus') {
            this.sum = "".concat((parseFloat(this.firstNumber) - parseFloat(this.secondNumber)));
        }
        this.result();
    };
    Calculator.prototype.operandsOff = function () {
        this.el.btnOperand.forEach(function (e) {
            e.style.setProperty('background-color', '#FF9F07');
            e.style.setProperty('color', '#fff');
        });
    };
    Calculator.prototype.render = function () {
        var _this = this;
        window.onclick = function () {
            console.log("FIRST NUMBER: ".concat(_this.firstNumber));
            console.log("SECOND NUMBER: ".concat(_this.secondNumber));
            console.log("MODE: ".concat(_this.mode));
            console.log("SUM: ".concat(_this.sum));
            console.log("OPERAND: ".concat(_this.operand));
        };
        this.el.dot.onclick = function () {
            if (_this.firstNumber && !_this.secondNumber) {
                _this.firstNumber += '.';
                _this.el.result.textContent += ',';
            }
            else if (_this.mode && _this.secondNumber) {
                _this.secondNumber += '.';
                _this.el.result.textContent += ',';
            }
        };
        this.el.btnNumber.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                if (e.target.dataset.key && _this.firstNumber.length < 8) {
                    _this.operandsOff();
                    _this.el.ac.textContent = 'C';
                    _this.numberSet(e.target.dataset.key);
                }
            });
        });
        this.el.ac.onclick = function (e) {
            _this.operandsOff();
            e.target.textContent = 'AC';
            _this.clean();
        };
        this.el.btnOperand.forEach(function (btn) {
            btn.onclick = function (e) {
                if (e.target.dataset.key !== 'equal') {
                    _this.operandsOff();
                    e.target.style.setProperty('background-color', '#fff');
                    e.target.style.setProperty('color', '#FF9F07');
                    _this.operandSet(e.target.dataset.key);
                }
                else {
                    _this.operandSet(e.target.dataset.key);
                }
            };
        });
    };
    Calculator.prototype.app = function () {
        this.windowSwitch();
        this.render();
    };
    return Calculator;
}());
var calculator = new Calculator(elements);
calculator.app();
