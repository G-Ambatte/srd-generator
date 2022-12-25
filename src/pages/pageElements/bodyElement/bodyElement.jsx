import createReactClass from 'create-react-class';
import React from 'react';

const BodyElement = createReactClass({
	displayName : 'BodyElement',

	render : function() {
		return <div className='srd-body'>
			{this.props.children}
		</div>;
	}
});

export default BodyElement;