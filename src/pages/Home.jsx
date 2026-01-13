import React, { useEffect, useState } from 'react';
import fetchCrypto from '../api/coinGoeko';
import CryptoCard from '../components/CryptoCard';

const Home = () => {
	const [ cyptoList, setCryptoList ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);
	const [ viewMode, setviewMode ] = useState('grid');

	useEffect(() => {
		fetchCryptoData();
	}, []);

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

	return (
		<div className='app'>
			<div className="controls">
				<div className="filter-group"></div>
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
				{ cyptoList.map((crypto, key) => (
					<CryptoCard crypto={crypto} key={key}  />
				))}
			</div>
			} 
		</div>
	)
}

export default Home
