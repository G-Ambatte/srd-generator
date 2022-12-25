import logo from './logo.svg';
import FilterElement from './pageElements/filterElement.jsx';

require('./App.css');
const React = require('react');
const createReactClass = require('create-react-class');

const srdData = require('./data/srd.json');

const App = createReactClass({
	displayName : 'App',

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
			.map((monster, idx)=>{ return <div key={`monster-${idx}`}>{monster.name}: CR{monster.Challenge}</div>; });
	},

	buttonClick : function(){
		console.log('Clicked');
		navigator.clipboard.writeText(this.state.suggestion);
	},

	render : function() {
		return <div className='srd'>
			<div className='srd-header'>
				<div className='srd-title'>
					<img src={logo} className='srd-logo' alt='logo' />
					<h1>5E SRD GENERATOR</h1>
				</div>
			</div>
			<div className='srd-body'>

				<div className='srd-filter-box'>
					<FilterElement label='NAME:' text={this.state.text} placeholder='start typing here...' updateText={this.updateText} />
					<button onClick={this.buttonClick} >Copy to Clipboard</button>
					<p>Current suggestion count: {this.state.count}</p>
				</div>
				<div className='srd-data'>
					{this.renderMonsterList()}
				</div>
			</div>
		</div>;
	}
});

export default App;
