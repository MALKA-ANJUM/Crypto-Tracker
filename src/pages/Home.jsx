import React, { useEffect, useState } from 'react';
import fetchCrypto from '../api/coinGoeko';
import CryptoCard from '../components/CryptoCard';

const Home = () => {
	const [ cyptoList, setCryptoList ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);

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
			{ isLoading 
			?
			<div className='loading'>
				<div className="spinner"></div>
			</div> 
			:
			<div>
				{ cyptoList.map((crypto, key) => (
					<CryptoCard crypto={crypto} key={key}  />
				))}
			</div>
			} 
		</div>
	)
}

export default Home
