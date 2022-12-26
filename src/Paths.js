import React from 'react';
const { Route, Routes, useParams, useSearchParams } = require('react-router-dom');

// Header
import HeaderElement from './pages/pageElements/headerElement/headerElement';
import BodyElement from './pages/pageElements/bodyElement/bodyElement';

// Pages
import HomePage from './pages/HomePage/HomePage';
import MonsterPage from './pages/MonsterPage/MonsterPage';
import CreditsPage from './pages/CreditsPage/CreditsPage';

const WithRoute = (props)=>{
	const params = useParams();
	const [searchParams] = useSearchParams();
	const queryParams = {};
	for (const [key, value] of searchParams?.entries() || []) {
		queryParams[key] = value;
	}
	const Element = props.el;
	const allProps = {
		...props,
		...params,
		query : queryParams,
		el    : undefined
	};
	return <div className='srd'>
		<HeaderElement />
		<BodyElement>
			<Element {...allProps} />
		</BodyElement>
	</div>;
};

const Paths = ()=>{
	return (
		<Routes>
			<Route path='/monster/:monster' element={<WithRoute el={MonsterPage} />} />
			<Route path='/credits' element={<WithRoute el={CreditsPage} />} />
			<Route path='/*' element={<WithRoute el={HomePage} />} />
		</Routes>
	);
};

export default Paths;