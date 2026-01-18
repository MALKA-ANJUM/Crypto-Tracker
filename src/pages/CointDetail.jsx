import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchCryptoData } from '../api/coinGoeko';

const CointDetail = () => {
	const { id } = useParams();
	const [ coin, setCoin ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(true);

	useEffect(() => {
		loadCoinData();
	}, [id]);

	const loadCoinData = async () => {
		try {
			const data = await fetchCryptoData();
			setCoin(data);
		} catch (error) {
			console.error("Error fetching crypto: ", error)
		} finally {
			setIsLoading(false);
		}
	}
	
	if(!coin){
		return (
			<div className="app">
				<div className="no-results">
					<p>Coin not found</p>
					<button>Go Back</button>
				</div>
			</div>
		)
	}
	
	return (
		<div>
		this is coin detail page: {id}
		</div>
	)
}

export default CointDetail
