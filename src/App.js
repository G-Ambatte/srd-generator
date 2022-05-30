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
			suggestion : ''
		};
	},

	updateText : function(newText) {
		const update = {};
		const firstMonster = srdData.filter((monster)=>{ return monster.name.toLowerCase().includes(newText.toLowerCase()); })[0];

		if(firstMonster) {
			update.suggestion = firstMonster.name;
		};
		if(this.state.text != newText){
			update.text = newText;
		}

		if(update.text || update.suggestion){
			this.setState(update);
		}
	},

	renderMonsterList : function() {
		const monsterList = srdData.filter((monster)=>{ return monster.name.toLowerCase().includes(this.state.text.toLowerCase()); });
		const monsterSuggestion = srdData.filter((monster)=>{ return monster.name.toLowerCase().includes(this.state.suggestion.toLowerCase()); });

		const outputList = monsterList.length ? monsterList : monsterSuggestion;

		return outputList
			.map((monster, idx)=>{ return <div id={`monster-${idx}`}>{monster.name}: CR{monster.Challenge}</div>; });
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
					{this.state.text ? `Do you mean ${this.state.suggestion}?` : 'Suggestions will appear here while typing'}
				</div>
				<div className='srd-data'>
					{this.renderMonsterList()}
				</div>
			</div>
		</div>;
	}
});

export default App;
