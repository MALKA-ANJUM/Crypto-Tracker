import React, { useEffect, useState } from 'react';
import fetchCrypto from '../api/coinGoeko';
import CryptoCard from '../components/CryptoCard';

const Home = () => {
	const [ cyptoList, setCryptoList ] = useState([]);
	const [ filteredList, setFilterList ] = useState([]);

	const [ isLoading, setIsLoading ] = useState(true);
	const [ viewMode, setviewMode ] = useState('grid');
	const [ sortBy, setSortBy ] = useState('market_cap_rank');
	const [ searchQuery, setSearchQuery ] = useState("");


	useEffect(() => {
		fetchCryptoData();
	}, []);

	useEffect(() => {
		filterAndSort();
	}, [sortBy, filteredList, searchQuery]);

	const fetchCryptoData = async () => {
		try {
			const data = await fetchCrypto();
			setCryptoList(data);
		} catch (error) {
			console.error("Error fetching the data ", error);
		}finally {
			setIsLoading(false);
		}
	}

	const filterAndSort = () => {
		const filterData = cyptoList.filter((crypto) =>
			 crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			 crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
		);
		filterData.sort((a,b) => {
			switch (sortBy) {
				case "name" :
					return a.name.localeCompare(b.name);
				case "price" :
					return a.current_price - b.current_price;
				case "price_desc" :
					return b.current_price - a.current_price;
				case "change" :
					return a.price_change_percentage_24h - b.price_change_percentage_24h;	
				case "market_cap" :
					return a.market_cap - b.market_cap;	
				default:
					return a.market_cap_rank - b.market_cap_rank;	
			}
		});

		setFilterList(filterData);
	}

	return (
		<div className='app'>
			<div className="header">
				<div className="header-content">
					<div className="logo-section">
						<h1>Crypto Tracker</h1>
						<p>Real-time cryptocurrency prices and market data</p>
					</div>
					<div className="search-control">
						<input type="text" placeholder='Search Crypto' className='search-input'
							onChange={(e) => setSearchQuery(e.target.value)}
							value={searchQuery} />
					</div>
				</div>
			</div>

			<div className="controls">
				<div className="filter-group">
					<label htmlFor="">Sort by:</label>
					<select name="" id="" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
						<option value="market_cap_rank">Rank</option>
						<option value="name">Name</option>
						<option value="price">Price (Low to Hight)</option>
						<option value="price_desc">Price (Hight to Low)</option>
						<option value="change">24h Change</option>
						<option value="market_cap">Market Cap</option>
					</select>
				</div>
				<div className="view-toggle">
					<button className={viewMode === 'grid' ? 'active' : ''}
						onClick={() => setviewMode("grid")}>
							Grid
					</button>
					<button className={viewMode === 'list' ? 'active' : ''}
						onClick={() => setviewMode("list")}>
							List
					</button>
				</div>
			</div>

			{ isLoading 
			?
			<div className='loading'>
				<div className="spinner"></div>
			</div> 
			:
			<div className={`crypto-container ${viewMode == 'grid' ? 'grid' : 'list'}`}>
				{ filteredList.map((crypto, key) => (
					<CryptoCard crypto={crypto} key={key}  />
				))}
			</div>
			} 
		</div>
	)
}

export default Home
