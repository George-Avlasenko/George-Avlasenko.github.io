import React, { useState } from 'react';
import { tableList } from './sortTable_info';
import './table.css';

const SortTable = () => {
  const [sortMode, setSortMode] = useState('default');
  const [reverse, setReverse] = useState(false);

  const salePrice = (price, sale) => {
    return Number(price) - Number((price * sale) / 100);
  };

  const switchSortMode = (e) => {
    if (sortMode === e.target.dataset.value) {
      setReverse((reverse) => !reverse);
    }

    setSortMode(e.target.dataset.value);
  };

  const sortedList = () => {
    let newList = [...tableList];

    if (reverse === false) {
      if (sortMode === 'name') {
        newList = newList.sort((a, b) => a.name.localeCompare(b.name));

      } else if (sortMode === 'price') {
        newList = newList.sort((a, b) => a.price - b.price);
      } else if (sortMode === 'stock') {
        newList = newList.sort((a, b) => a.stock - b.stock);
      } else if (sortMode === 'sale') {
        newList = newList.sort((a, b) => a.sale - b.sale);
      }
    } else {
      if (sortMode === 'name') {
        newList = newList.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortMode === 'price') {
        newList = newList.sort((a, b) => b.price - a.price);
      } else if (sortMode === 'stock') {
        newList = newList.sort((a, b) => b.stock - a.stock);
      } else if (sortMode === 'sale') {
        newList = newList.sort((a, b) => b.sale - a.sale);
      }
    }

    return newList;
  };

  return (
    <div>
      <div className='table'>
        <div className='th'>
          <div className='td th id' data-value='default'>
            Id
          </div>
          <div
            className='td th name'
            data-value='name'
            onClick={switchSortMode}
          >
            Name
          </div>
          <div
            className='td th price'
            data-value='price'
            onClick={switchSortMode}
          >
            Price
          </div>
          <div className='td th stock' data-value='stock' onClick={switchSortMode}>
            Pcs.
          </div>
          <div className='td th image' data-value='image'>
            Img
          </div>
         
          <div className='td th description' data-value='description'>
            Description
          </div>
          <div className='td th new' data-value='new'>
            New
          </div>
          <div className='td th sale' data-value='sale' onClick={switchSortMode}>
            Sale
          </div>

        </div>

        {sortedList().map((product, id) => (
          <div className='tr' key={id}>
            <div className='td id'>{id + 1}</div>
            <div className='td name'>{product.name}</div>
            <div className='td price'>({salePrice(product.price, product.sale)} $)</div>
            <div
              className='td stock'
              style={
                Number(product.stock) === 0
                  ? { backgroundColor: 'red', borderRadius: '5px' }
                  : product.stock > 0 && product.stock < 3
                  ? { backgroundColor: 'orange', borderRadius: '5px' }
                  : null
              }
            >
              {product.stock}
            </div>
            <div className='td image'>
              <div
                style={{
                  backgroundImage: `url(${product.image})`,
                  width: '80px',
                  height: '80px',
                  backgroundSize: 'contain',
			          	backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              ></div>
            </div>
            
            <div className='td description'>{product.description}</div>
            <div className='td new'>{product.newProduct === false ? '-' : '+'}</div>
            <div className='td sale'>{product.sale}%</div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortTable;
