import FilterElement from '../pageElements/filterElement.jsx';

require('./HomePage.css');
const React = require('react');
const createReactClass = require('create-react-class');

const srdData = require('../data/srd.json');

const HomePage = createReactClass({
	displayName : 'HomePage',

	getInitialState : function() {
		return {
			text       : '',
			suggestion : '',
			count      : srdData.length
		};
	},

	updateText : function(newText) {
		const update = {};
		const monsters = srdData.filter((monster)=>{ return monster.name.toLowerCase().includes(newText.toLowerCase()); });

		update.text = newText;
		update.count = newText === '' ? srdData.length : monsters.length;
		if(monsters.length) {
			update.suggestion = newText;
		};

		console.log(monsters.length);
		if(update.text || update.suggestion){
			this.setState(update);
		}
	},

	renderMonsterList : function() {
		const monsterList = srdData.filter((monster)=>{ return monster.name.toLowerCase().includes(this.state.text.toLowerCase()); });
		const monsterSuggestionList = srdData.filter((monster)=>{ return monster.name.toLowerCase().includes(this.state.suggestion.toLowerCase()); });

		const outputList = monsterList.length ? monsterList : monsterSuggestionList;

		return outputList
			.map((monster, idx)=>{ return <div key={`monster-${idx}`}><a href={`/monster/${encodeURIComponent(monster.name)}`}>{monster.name}: CR{monster.Challenge}</a></div>; });
	},

	buttonClick : function(){
		// console.log('Clicked');
		navigator.clipboard.writeText(this.state.suggestion);
	},

	render : function() {
		return <>
			<div className='srd-filter-box'>
				<FilterElement label='NAME:' text={this.state.text} placeholder='start typing here...' updateText={this.updateText} />
				<button onClick={this.buttonClick} >Copy to Clipboard</button>
				<p>Current suggestion count: {this.state.count}</p>
			</div>
			<div className='srd-data'>
				{this.renderMonsterList()}
			</div>
		</>;
	}
});

export default HomePage;
