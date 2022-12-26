import createReactClass from 'create-react-class';
import React from 'react';

require('./bodyElement.css');

const BodyElement = createReactClass({
	displayName : 'BodyElement',

	render : function() {
		return <div className='srd-body-scroll'>
			<div className='srd-body'>
				{this.props.children}
			</div>
		</div>;
	}
});

export default BodyElement;