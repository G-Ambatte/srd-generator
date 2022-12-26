require('./MonsterPage.css');
const React = require('react');
const createReactClass = require('create-react-class');

const srdData = require('../data/srd.json');

const MonsterPage = createReactClass({
	displayName : 'MonsterPage',

	getMonsterData : function(monsterName) {
		if(!monsterName) return { name: 'No monster data' };
		const monster = srdData.filter((monster)=>{ return monster.name===monsterName; })[0];
		// console.log(monster);
		return monster;
	},

	renderAttacks : function(attackContent) {
		if(Array.isArray(attackContent)) {
			return attackContent.map((item, idx)=>{return <span key={idx}>{item.italics && <em>{item.italics} </em>}{item.content} </span>;});
		}
		if(typeof attackContent=='object') {
			return <><em>{attackContent.italics}</em>{attackContent.content}</>;
		}
	},

	renderMonster : function(monster, renderer=0) {
		if(!monster) return <><h2>No monster data</h2></>;

		return <>
			<div className='monster frame'>
				<img src={monster.img_url} />
				<h2>{monster.name}</h2>
				<p><em>{monster.meta}</em></p>
				<hr />
				<dl>
					{['Armor Class', 'Hit Points', 'Speed'].map((item, idx)=>{ return <div key={idx}><dt><strong>{item}</strong></dt><dd>{monster[item]}</dd></div>; })}
				</dl>
				<hr />
				<table>
					<thead>
						<tr>
							{['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map((item, idx)=>{return <th key={idx} align='center'>{item}</th>;})}
						</tr>
					</thead>
					<tbody>
						<tr>
							{['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'].map((item, idx)=>{return <td key={idx} align='center'>{monster[item]} {monster[`${item}_mod`]}</td>;})}
						</tr>
					</tbody>
				</table>
				<hr />
				<dl>
					{['Saving Throws', 'Skills', 'Damage Immunities', 'Condition Immunities', 'Senses', 'Languages', 'Challenge'].map((item, idx)=>{
						if(!monster[item]) return;
						return <div key={idx}>
							<dt key={idx}>
								<strong>{item}</strong>
							</dt>
							<dd>
								{monster[item]}
							</dd>
						</div>;
					})}
				</dl>
				<hr />
				{monster.Traits.map((trait, idx)=>{
					return <p key={idx}><em><strong>{trait.title}</strong></em> {trait.content.content}</p>;
				})}
				<h3 id='actions'>Actions</h3>
				{monster.Actions.map((action, idx)=>{
					return <p key={idx}><em><strong>{action.title}</strong></em> {this.renderAttacks(action.content)}</p>;
				})}
				{monster['Legendary Actions'] && <>
					<h3 id='actions'>Legendary Actions</h3>
					{monster['Legendary Actions'].map((legendaryaction, idx)=>{
						if(!legendaryaction) return;
						return <p key={idx}><em><strong>{legendaryaction.title}</strong></em> {legendaryaction.content.content}</p>;
					})}
				</>}
			</div>
		</>;
	},

	render : function() {
		const monsterData = this.getMonsterData(this.props.monster);
		return <div>
			{this.renderMonster(monsterData)}
		</div>;
	}
});

export default MonsterPage;
