
import SignUpForm from './SignUpForm';

import Catalog from './Catalog';
import { tableList } from './sortTable_info'
import "./Catalog.css"

function Linker() {
    return (
        <div className="App">
            <SignUpForm />

            <Catalog productList={tableList} />
        </div>
    );
}

export default Linker;