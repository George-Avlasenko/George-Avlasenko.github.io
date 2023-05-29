import React from 'react';
import PropTypes from 'prop-types';
import SignUpEmailInput from './SignUpEmailInput';
import SignUpPasswordInput from './SignUpPasswordInput';
import PhoneInput from './PhoneInput';
import TestComponent from './TestComponent';
import './SignUpForm.css';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      is_submit: [false, false],
      formValid: false,
      emailValid: false,
      passwordValid: false,
    };
    this.checkEmailValid = this.checkEmailValid.bind(this)
    this.checkFormValid = this.checkFormValid.bind(this)
    this.checkPasswordValid = this.checkPasswordValid.bind(this)
  }

  checkFormValid = () => {
    if (this.state.emailValid === true && this.state.passwordValid === true) {
      this.setState({ formValid: true })
    }
    else {
      this.setState({ formValid: false })
    }

  }

  checkPasswordValid = (check) => {

    this.setState((state) => {

      return { passwordValid: check, formValid: state.emailValid === true && check === true }
    })
  }

  checkEmailValid = (check) => {
    this.setState((state) => {
      return { emailValid: check, formValid: check === true && state.passwordValid === true }
    })
  }

  testArray = []
  testBool = true
  testNumber = 0
  testObject = {
    testStringProperty: 'hello',
  }
  testString = 'hello!'
  testSymbol = Symbol('s')

  testFunction = () => {
    return
  }

  render() {
    return (

      <div>
        <form>
          <SignUpEmailInput checkEmailValid={this.checkEmailValid} onUpdate={(value) => { this.setState((state) => { state.is_submit[0] = value; return { is_submit: state.is_submit } }) }} />
          <hr />
          <SignUpPasswordInput checkPasswordValid={this.checkPasswordValid} onUpdate={(value) => { this.setState((state) => { state.is_submit[1] = value; return { is_submit: state.is_submit } }) }} />
          <hr />
          Фамилия: <br /><input type="text" /><br />
          Имя:<br /><input type="text" /><br />
          Отчество:<br /><input type="text" /><br />
          <hr />
          пол: <br />м<input type="radio" name='genadiu' />{" "}ж<input type="radio" name='genadiu' /><br />
          <hr />
          дата: <br /><input type="date" />
          <hr />
          телефон: <br /><PhoneInput />
          <hr />

          <TestComponent
            array={this.testArray}
            bool={this.testBool}
            number={this.testNumber}
            object={this.testObject}
            string={this.testString}
            symbol={this.testSymbol}
            func={this.testFunction}
          />

          <button disabled={!(this.state.is_submit[0] && this.state.is_submit[1]) && !this.state.formValid} type='submit'>да</button>
        </form>
        <hr />
        <br />
      </div>
    );
  }
}

SignUpPasswordInput.propTypes = {
  checkValid: PropTypes.func
};

SignUpEmailInput.propTypes = {
  checkValid: PropTypes.func
};

export default SignUpForm;