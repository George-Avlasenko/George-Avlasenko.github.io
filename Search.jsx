import React, { useState } from 'react';

const Search = ({ productList, getSearchList }) => {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    getSearchList([...productList.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()))]);
  };

  return (
    <>
      <div>
        <input type="text" value={input} onChange={handleChange} />
      </div>
    </>
  );
};

export default Search;
