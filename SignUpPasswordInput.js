import React from 'react';
import ProgressBar from './ProgressBar';

class SignUpPasswordInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value_1: '',
            value_2: '',
            text_1: 0,
            flag_1: false,
            flag_2: false,
            flag: false
        }
    }

    render() {
        const handleWrite_1 = (event) => {
            this.setState((state) => {
                this.state.text_1 = 0
                if ((/[a-z]/g).test(event.target.value)) { (this.state.text_1 += 1) }   
                if ((/[A-Z]/g).test(event.target.value)) { (this.state.text_1 += 1) }
                if ((/[а-я]/g).test(event.target.value)) { (this.state.text_1 += 1) }
                if ((/[А-Я]/g).test(event.target.value)) { (this.state.text_1 += 1) }
                if ((/[0-9]/g).test(event.target.value)) { (this.state.text_1 += 1) }
                if ((/[!--//:-?[-`{-~]/g).test(event.target.value)) { (this.state.text_1 += 1) }
                if (event.target.value.length >= 6) { (this.state.text_1 += 1) }
                if (event.target.value.length >= 8) { (this.state.text_1 += 1) }
                if (event.target.value.length >= 10) { (this.state.text_1 += 1) }
                if (event.target.value.length >= 12) { (this.state.text_1 += 1) }
                console.log(this.state.text_1)

                let flag_4 = false
                if (this.state.text_1 >= 7) {
                    flag_4 = true
                }   

                this.props.onUpdate(event.target.value === state.value_2);
                return {
                    value_1: event.target.value,
                    flag_1: flag_4,
                    flag_2: event.target.value === state.value_2
                }
            })
        
            event.target.value = event.target.value.replace(/\s/g, '');
        }


        const handleWrite_2 = (event) => {
            this.setState((state) => {
                let flag = false

              
                    let flag_3 = false
                if (event.target.value === this.state.value_1) {
                    flag_3 = true
                }

             

                if (this.state.flag_1 === true && flag_3 === true) {flag = true }
                console.log("1->", this.state.flag_1);
                console.log("2->", flag_3);
                console.log("all->", flag);
                this.props.onUpdate(flag);
                return {
                    value_2: event.target.value,
                    flag_2: flag_3
                }
            })

        }
        return (
            <div>
                <div>Пароль<br />
                    <input type="text" value={this.state.value_1} onInput={handleWrite_1} />
                </div>
                <ProgressBar
          trust={this.state.text_1}
        />
                <div>Подтверждение пароля<br />
                    <input type="text" value={this.state.value_2} onInput={handleWrite_2} />
                    {" "}{this.state.flag_2 ? "right" : "wrong"}
                </div>

            </div>
        );
    }
}

export default SignUpPasswordInput;