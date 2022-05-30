const React = require('react');
const createClass = require('create-react-class');
// const request = require('superagent');
const dedent = require('dedent-tabs').default;
const srdMonsters = require('./srd.json');

const GenPage = createClass({
	displayName     : 'SRDGenPage',
	getDefaultProps : function() {
		return {
			user : null
		};
	},

	getInitialState : function() {
		return {
			name        : '',
			filter      : '',
			monster     : {},
			monsterList : []
		};
	},

	componentDidMount : function() {
	},

	componentDidUpdate : function() {
		const url = new URL(window.location.href);
		const urlParams = new URLSearchParams(url.search);
		const filterTerm = this.state.filter.toLowerCase();

		if(urlParams.get('filter') === filterTerm)
			return;
		if(!filterTerm)
			urlParams.delete('filter');
		else
			urlParams.set('filter', filterTerm);
		url.search = urlParams;
		window.history.replaceState(null, null, url);
	},

	handleChange : function (e) {
		const name = e.target.value;

		const selectedMonster = srdMonsters.filter((monster)=>{
			return monster.name.toLowerCase().includes(name.toLowerCase());
		});

		this.setState({
			filter      : e.target.value,
			monsterList : selectedMonster
		});
	},

	handleKeyDown : function (e) {
		if(e.key === 'Enter'){
			const inputMonster = this.getByName(this.state.filter, false);
			this.setState({
				monster : inputMonster,
				filter  : inputMonster.name
			});
		}
		if(e.key === 'Escape'){
			this.setState({
				monster : {},
				filter  : ''
			});
		}
	},

	handleClickRandom : function (e) {
		console.log('Random');
		this.setState({
			monster : this.randomMonster
		});
		return;
	},

	handleClickOK : function (e) {
		console.log(`OK - ${this.state.filter} : ${JSON.stringify(this.getByName(this.state.filter, false))}`);
		this.setState({
			monster : this.getByName(this.state.filter, false)
		});
	},

	handleClickClipboard : function (e, renderer) {
		navigator.clipboard.writeText(this.getMonsterText(renderer));
		alert('Copied to clipboard!');
	},

	monsterNames : function(){
		return srdMonsters.flatMap((monster)=>{return [monster.name];});
	},

	randomMonster : function() {
		const monsterIndex = Math.floor(Math.random() * srdMonsters.length);
		this.setState({
			filter : ''
		});
		return srdFormat(srdMonsters[monsterIndex]);
	},

	getByName : function(name, text=true) {
		if(!name) return;
		const selectedMonster = srdMonsters.filter((monster)=>{
			return monster.name.toLowerCase().includes(name.toLowerCase());
		});
		if(text){
			if(selectedMonster.length === 0) {
				return `${name} not found!`;
			};
			if(selectedMonster.length > 1) {
				return `Multiple results found: ${selectedMonster.flatMap((monster)=>{return monster.name;}).join(', ')}`;
			};
		}
		return text ? selectedMonster[0].name : selectedMonster[0];
	},

	getMonsterText : function(renderer='v3') {
		return this.state.monster.name !== undefined ? srdFormat(this.state.monster, renderer) : 'No monster selected.';
	},

	render : function(){
		return <div className='srdPage'>
			<div className='srdForm'>
				<input
					type='text'
					value={this.state.filter}
					onChange={this.handleChange}
					onKeyDown={this.handleKeyDown}
				/>
				<button
					onClick={this.handleClickOK}
					disabled={this.state.filter===''}
				>
                    OK
				</button>
				<br />
				<button id='random' onClick={this.handleClickRandom}>
                    Random Monster
				</button>
				<br />
				<button id='copyToClipboardv3' onClick={(e)=>this.handleClickClipboard(e, 'v3')}>
                    Copy to Clipboard (v3)
				</button>
				<button id='copyToClipboardv1' onClick={(e)=>this.handleClickClipboard(e, 'legacy')}>
                    Copy to Clipboard (Legacy)
				</button>
				<p>{this.getByName(this.state.filter)}</p>
			</div>

			<hr />

			<div className='srdMonster'>
				<p>{this.getMonsterText()}</p>
			</div>
		</div>;
	}
});

const srdFormat = function(monster, renderer='v3'){
	console.log(`RENDERER: ${renderer}`);
	if(renderer==='v3') {
		return dedent`
        {{font-size:smaller *Monsters from the System Reference Document (SRD) are subject to the Open Gaming License. Please check the terms of use are met prior to distribution of material.*}}
        :
        {{monster,frame
        ## ${monster['name']}  
        *${monster['meta']}*  
        ___
        **Armor Class** :: ${monster['Armor Class']}
        **Hit Points** :: ${monster['Hit Points']}
        **Speed** :: ${monster['Speed']}
        ___
        |  STR  |  DEX  |  CON  |  INT  |  WIS  |  CHA  |
        |:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|
        |${['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].flatMap((item)=>{
		return `${monster[item]} ${monster[`${item}_mod`]}`;
	}).join('|')}|\n
        ${['Saving Throws', 'Skills', 'Damage Resistances', 'Damage Immunities', 'Condition Immunities', 'Senses', 'Languages'].flatMap((item)=>{
		return (monster[item] ? [`**${item}** :: ${monster[item]}`] : []);
	}).join('  \n')}					
        **Challenge** :: ${monster['Challenge']}
        ___
        ${monster['Traits'] ? `${monster['Traits'].map((trait)=>{return `${trait}  \n`;}).join('  ')}` : ''}
        ${monster['Actions'] ? `### Actions\n:\n${monster['Actions'].map((action)=>{return `${action}  `;}).join('\n')}` : ''}
        ${monster['Legendary Actions'] ? `:\n### Legendary Actions\n:\n${monster['Legendary Actions'].map((legendary)=>{return `${legendary}  `;}).join('\n')}` : ''}
        :
        }}
        ${monster['img_url'] ? `![](${monster['img_url']}){width:100%;mix-blend-mode:darken}` : ''}
        `;
	}

	if(renderer==='legacy') {
		return dedent`
        <span style='font-size:smaller'><em>Monsters from the System Reference Document (SRD) are subject to the Open Gaming License. Please check the terms of use are met prior to distribution of material.</em></span>
        
        ___
        > ## ${monster['name']}  
        > *${monster['meta']}*  
        > ___
        > - **Armor Class** ${monster['Armor Class']}
        > - **Hit Points** ${monster['Hit Points']}
        > - **Speed** ${monster['Speed']}
        > ___
        > | STR | DEX | CON | INT | WIS | CHA |
        > |:---:|:---:|:---:|:---:|:---:|:---:|
        > |${['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].flatMap((item)=>{
		return `${monster[item]} ${monster[`${item}_mod`]}`;
	}).join('|')}|
        > ___
        ${['Saving Throws', 'Skills', 'Damage Resistances', 'Damage Immunities', 'Condition Immunities', 'Senses', 'Languages'].flatMap((item)=>{
		return (monster[item] ? [`> - **${item}** ${monster[item]}`] : []);
	}).join('\n')}  
        > - **Challenge** ${monster['Challenge']}
        > ___
        ${monster['Traits'] ? `> ${monster['Traits'].map((trait)=>{return `${trait}`;}).join('\n> ')}` : ''}
        ${monster['Actions'] ? `> ### Actions\n${monster['Actions'].map((action)=>{return `> ${action}`;}).join('  \n')}` : ''}
        ${monster['Legendary Actions'] ? `> ### Legendary Actions\n> ${monster['Legendary Actions'].map((legendary)=>{return `${legendary}`;}).join('\n> ')}` : ''}
        
        ${monster['img_url'] ? `<img src='${monster['img_url']}' style='width:100%;mix-blend-mode:darken' />` : ''}
        `;
	}
	return JSON.stringify(monster);
};

module.exports = GenPage;