import React from 'react';
import SignUpEmailInput from './SignUpEmailInput';
import SignUpPasswordInput from './SignUpPasswordInput';
import PhoneInput from './PhoneInput';
import StudentInfoHandler from './StudentInfoHandler';

class StudentInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            is_submit: [false, false]
        };
    }

    render() {
        return (
            <div>
                <form>
                Фамилия:<input type="text"/><br/>
                Имя:<input type="text"/><br/>
                Отчество:<input type="text"/><br/>
                дата:<input type="date"/>
                факультет:<input type="text"/><br/>
                группа:<input type="text"/><br/>
                спецыальность:<input type="text"/><br/>
                <SignUpEmailInput onUpdate={(value) => { this.setState((state) => { state.is_submit[0] = value; return { is_submit: state.is_submit } }) }}/>
                <PhoneInput />
                <button disabled={!(this.state.is_submit[0] && this.state.is_submit[1])} type='submit'>да</button>
                </form>
                <br/>
                <StudentInfoHandler/>
            </div>
        );
    }
}

export default StudentInfo;