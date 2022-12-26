require('./headerElement.css');
import createReactClass from 'create-react-class';
import React from 'react';

import logo from './logo.svg';

const HeaderElement = createReactClass({
	displayName : 'HeaderElement',

	render : function() {
		return <div className='srd-header'>
			<a href='/' className='srd-title'>
				<img src={logo} className='srd-logo' alt='logo' />
				<h1>5E SRD GENERATOR</h1>
			</a>
			<a href='/#/credits' className='srd-credits'>
				<h2>i</h2>
			</a>
		</div>;
	}
});

export default HeaderElement;