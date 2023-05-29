import React from 'react';

class SignUpEmailInput extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            value: '',
            flag:false,
            text:"Badly"
     }
    }
    
    render(){
        const handleWrite = (event) =>{
            this.setState((state) => { 
                let flag = event.target.value[event.target.value.length-1] === "m" &&
                event.target.value[event.target.value.length-2] === "o" &&
                event.target.value[event.target.value.length-3] === "c" &&
                event.target.value[event.target.value.length-4] === "." &&
                event.target.value[event.target.value.length-5] === "l" &&
                event.target.value[event.target.value.length-6] === "i" &&
                event.target.value[event.target.value.length-7] === "a" &&
                event.target.value[event.target.value.length-8] === "m" &&
                event.target.value[event.target.value.length-9] === "g" &&
                event.target.value[event.target.value.length-10] === "@"


                console.log(flag);
                this.props.onUpdate(flag);
                return { 
                    value: event.target.value,
                    flag: flag
                } 
            })
            event.target.value = event.target.value.replace(/[а-яА-Я]/g, '');
            event.target.value = event.target.value.replace(/[!--//:-?[-`{-~]/g, '');
            event.target.value = event.target.value.replace(/\s/g, '');
        }
        return (
            <div>
                Email<br/>
               <input type="text" value={this.state.value} onInput={handleWrite}/>
               {" "}{this.state.flag ? "good" : "Badly"}
             
            </div>
        );
    }
}

export default SignUpEmailInput;