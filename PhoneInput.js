import React, {useState} from 'react';

const countries = [
    {name: 'Беларусь', code: '+375', operators: ['МТС', 'A1', 'life:)'], lenght: 17},
    {name: 'Россия', code: '+7', operators: ['Билайн', 'Мегафон', 'МТС', 'Tele2'], lenght: 16},
    {name: 'Украина', code: '+380', operators: ['Lifecell', 'Vodafone', 'Київстар'], lenght: 17},
    {name: 'Польша', code: '+48', operators: ['Orange', 'Play', 'Plus', 'T-mobile'], lenght: 20},
    {name: 'Литва', code: '+370', operators: ['Telia', 'Bite', 'Tele2'], lenght: 17},
    {name: 'Латвия', code: '+371', operators: ['LMT', 'Tele2', 'Bite'], lenght: 18},
];

const operatorCodes = {
    'МТС': '29',
    'A1': '44',
    'life:)': '25',
    'Билайн': '99',
    'Мегафон': '92',
    'Tele2': '91',
    'Lifecell': '63',
    'Vodafone': '50',
    'Київстар': '67',
    'Orange': '22',
    'Play': '24',
    'Plus': '60',
    'T-mobile': '69',
    'Telia': '68',
    'Bite': '65',
    'LMT': '66',
};

const PhoneInput_3 = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedCountry, setSelectedCountry] = useState(countries[0]);
    const [selectedOperator, setSelectedOperator] = useState();
    const [input, setInput] = useState(`+375`);

    const handleCountryChange = (event) => {
        const selectedCountryCode = event.target.value;
        const newSelectedCountry = countries.find((country) => country.code === selectedCountryCode);
        setSelectedCountry(newSelectedCountry);
        setPhoneNumber('');
        setInput(`${newSelectedCountry.code}`);
    };

//вставка опертора
    const handleOperatorChange = (event) => {
        const selectedOperatorName = event.target.value;
        const selectedOperatorCode = operatorCodes[selectedOperatorName];
        setSelectedOperator(selectedOperatorName);
        setPhoneNumber(selectedCountry.code + selectedOperatorCode);
        setInput(`${selectedCountry.code} (${selectedOperatorCode})`);
    };


    function inputHandler(event) {
        let countryCode = "";
        let operatorCode = "";
        let codesBuffer = "";
        let codesBuffer_raw = "";
        let bracketTemplate = false;
        let phoneNumber = "";
        let supportMode = false;
        let countryCodeStage = false;
        let operatorCodeStage = false;
        let phoneNumberStage = false;
        if (event.target.value[0] === '+') countryCodeStage = true;
        for (let i = 0; i < event.target.value.length; i++) {
            codesBuffer += event.target.value[i];
            codesBuffer_raw += event.target.value[i];

            if ((event.target.value[i] === ' ' || event.target.value[i] === '(') && countryCodeStage) {
                if (event.target.value[i] === '(' && !bracketTemplate) bracketTemplate = true;
                countryCode = codesBuffer.slice(0, codesBuffer.length - 1);
                countryCode = countryCode.replace(/\s/g, '');
                countryCodeStage = false;
                operatorCodeStage = true;
                codesBuffer = "";
            } else if ((event.target.value[i] === ' ' || event.target.value[i] === ')') && operatorCodeStage) {
                if (event.target.value[i] === ')' && !bracketTemplate) bracketTemplate = true;
                operatorCode = codesBuffer.slice(0, codesBuffer.length - 1);
                codesBuffer = "";
                phoneNumberStage = true;
                break;
            }
        }

        operatorCode = operatorCode.replace(/[()]/g, '');
        countryCode = countryCode.replace(/[()]/g, '');

        if (phoneNumberStage === true) {
            supportMode = true;
        }
        phoneNumber = event.target.value.replace(codesBuffer_raw, '');
        phoneNumber = phoneNumber.replace(`(${operatorCode})`, '');
        phoneNumber = phoneNumber.replace(/[a-zA-Z]/g, '');
        phoneNumber = phoneNumber.replace(/[а-яА-Я]/g, '');
        phoneNumber = phoneNumber.replace(/\s/g, '');

        if(selectedCountry.name === "Беларусь" || selectedCountry.name === "Россия" || selectedCountry.name === "Украина" || selectedCountry.name === "Литва")
        phoneNumber = phoneNumber.replace(/(\d{3})(\d{2})(\d{2})/, "$1-$2-$3");

        if(selectedCountry.name === "Польша")
        phoneNumber = phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3");

        if(selectedCountry.name === "Латвия")
        phoneNumber = phoneNumber.replace(/(\d{4})(\d{4})/, "$1-$2");


        let foundCountry = countries.find((country) => {
            if (countryCode === country.code) return country;
        })
        if (foundCountry) {
            setSelectedCountry(foundCountry);
        }

        if (supportMode) {
            if (bracketTemplate) {
                setInput(`${selectedCountry.code} (${operatorCode}) ${phoneNumber}`);
            } else {
                setInput(`${selectedCountry.code} ${operatorCode} ${phoneNumber}`);
            }
        } else {
            setInput(event.target.value);
        }
    }

    return (
        <div>
            <select id="select" value={selectedCountry.code} onChange={handleCountryChange}>
                {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                        {country.name}
                    </option>
                ))}
            </select>
            <input onInput={inputHandler} value={`${input}` } maxLength={selectedCountry.lenght}/>
            <div>
                {selectedCountry.operators.map((operator) => (
                    <label key={operator}>
                        <input
                            type="radio"
                            value={operator}
                            checked={selectedOperator === operator}
                            onChange={handleOperatorChange}
                        />
                        {` ${operator} (${operatorCodes[operator]})`}
                        <br></br>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default PhoneInput_3;