import createReactClass from 'create-react-class';
import React from 'react';

const FilterElement = createReactClass({
	displayName : 'FilterElement',

	getInitialState : function() {
		return {
			text        : this.props.text || '',
			placeholder : this.props.placeholder || 'default placeholder'
		};
	},

	updateText : function(e) {
		if(this.state.text != e.target.value) {
			this.setState({
				text : e.target.value
			});
			this.props.updateText(e.target.value);
		}
	},

	render() {
		return <div className='srd-filter'>
			<div>
				{this.props.label} <input
					type='text'
					value={this.state.text}
					placeholder={this.props.placeholder}
					onChange={(e)=>this.updateText(e)}
				/>
			</div>
		</div>;
	}
});

export default FilterElement;
