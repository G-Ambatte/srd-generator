require('./CreditsPage.css');
const React = require('react');
const createReactClass = require('create-react-class');

const CreditsPage = createReactClass({
	displayName : 'CreditsPage',

	render : function() {
		return <>
			<div className='credits'>
				<h2>Credits</h2>
				<p>credits</p>
			</div>
		</>;
	}
});

export default CreditsPage;
