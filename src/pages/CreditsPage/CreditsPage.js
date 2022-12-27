require('./CreditsPage.css');
const React = require('react');
const createReactClass = require('create-react-class');

const CreditsPage = createReactClass({
	displayName : 'CreditsPage',

	render : function() {
		return <>
			<div className='credits'>
				<h1>Credits</h1>
				<p>Special thanks and credit to the following people and organizations:</p>
				<h2>TKFU</h2>
				<p>SRD data JSON from TKFU's GitHub Gist</p>
				<a href='https://gist.github.com/tkfu/9819e4ac6d529e225e9fc58b358c3479'>https://gist.github.com/tkfu/9819e4ac6d529e225e9fc58b358c3479</a>
				<h2>D&D Beyond</h2>
				<p>Data and images sourced from the D&D Beyond website</p>
				<a href='https://www.dndbeyond.com'>D&D Beyond</a>
				<h2>The Noun Project</h2>
				<p>Dragon icon from The Noun Project</p>
				<a href='https://thenounproject.com/icon/dragon-1879483/'>https://thenounproject.com/icon/dragon-1879483/</a>
				<h2>The Homebrewery</h2>
				<p>Styling, border frame, background image, and other elements from the Homebrewery editor</p>
				<a href='https://homebrewery.naturalcrit.com'>https://homebrewery.naturalcrit.com</a>
			</div>
		</>;
	}
});

export default CreditsPage;
