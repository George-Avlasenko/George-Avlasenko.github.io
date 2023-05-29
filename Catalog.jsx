import React, { useState } from 'react';
import Search from './Search';

const Catalog = (props) => {
	const [sortMode, setSortMode] = useState('name');
	const [reverse, setReverse] = useState(false);
	const [searchList, setSearchList] = useState(props.productList.sort(product => product.new === true),)
	//высчитывает последнюю цену
	const salePrice = (price, sale) => {
		return Number(price) - Number(price * (sale / 100));
	};

	const changeSortMode = (e) => {
		if (sortMode === e.target.dataset.value) {
			setReverse(!reverse);
		}

		setSortMode(e.target.dataset.value);
	};

	const sortCatalog = () => {
		let newList = [...props.productList];

		if (reverse === false) {
			if (sortMode === 'name') {
				newList = newList.sort((a, b) => a.name - b.name);
			} else if (sortMode === 'price') {
				newList = newList.sort((a, b) => a.price - b.price);
			} else if (sortMode === 'stock') {
				newList = newList.sort((a, b) => a.stock - b.stock);
			} else if (sortMode === 'sale') {
				newList = newList.sort((a, b) => a.sale - b.sale);
			}
		} else {
			if (sortMode === 'name') {
				newList = newList.sort((a, b) => a.name - b.name).reverse();
			} else if (sortMode === 'price') {
				newList = newList.sort((a, b) => a.price - b.price).reverse();
			} else if (sortMode === 'stock') {
				newList = newList.sort((a, b) => a.stock - b.stock).reverse();
			} else if (sortMode === 'sale') {
				newList = newList.sort((a, b) => a.sale - b.sale).reverse();
			}
		}

		let newProductList = newList.filter((product) => product.newProduct === true);
		let notNewProductList = newList.filter((product) => product.newProduct !== true);

		newList = [...newProductList, ...notNewProductList];
		return newList;
	};

	const getSearchList = (searchList) => {
		setSearchList(searchList);
	};

	const finalList = () => {
		let productList = [...props.productList];

		if (searchList === productList) {
			return sortCatalog();
		} else {
			return searchList;
		}
	};

	return (
		<div className='catalog'>

			<Search productList={sortCatalog()} getSearchList={getSearchList} />
			<div className='Catalog_buttons'>
				<button onClick={changeSortMode} data-value='name'>
					По названию
				</button>
				<button onClick={changeSortMode} data-value='price'>
					По цене
				</button>
				<button onClick={changeSortMode} data-value='sale'>
					По скидке
				</button>
				<button onClick={changeSortMode} data-value='stock'>
					По наличию
				</button>
			</div>
			{finalList().map((product, id) => (
				<div className='oneProduct' key={id}>
					<div className={'product_container'}>
						<div
							className={
								'info' +
								(product.newProduct === true ? ' new' : '') +
								(product.sale > 0 ? ' sale' : '')
							}>

							<div className='newInfo'>Новинка</div>
							<div className='saleInfo'>{product.sale}%</div>
							<div className='arrow_left'>&lang;</div>
							<div className='arrow_right'>&rang;</div>
						</div>
						<div
							className='image'
							style={{
								backgroundImage: `url(${product.image})`,
								width: '350px',
								height: '350px',
								backgroundSize: 'contain',
								backgroundRepeat: 'no-repeat',
								backgroundPosition: 'center',
							}}
						></div>
						<div className='product_information'>
							<h2>{product.name}</h2>
							<h3>
								{salePrice(product.price, product.sale)}${' '}
								<span>{product.sale > 0 ? product.price + '$' : ''}</span>
							</h3>
							<h4>В наличии {product.stock} шт.</h4>
							<p className='description'>{product.description}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default Catalog;
