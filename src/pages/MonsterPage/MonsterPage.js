require('./MonsterPage.css');
const React = require('react');
const createReactClass = require('create-react-class');

const srdData = require('../data/srd.json');

const MonsterPage = createReactClass({
	displayName : 'MonsterPage',

	getInitialState : function() {
		return {
			text       : '',
			suggestion : '',
			count      : srdData.length
		};
	},

	render : function() {
		return <p>MONSTER INFO GOES HERE</p>;
	}
});

export default MonsterPage;
