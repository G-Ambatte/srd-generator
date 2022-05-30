import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', ()=>{
	render(<App />);
	const linkElement = screen.getByText(/5E SRD GENERATOR/i);
	expect(linkElement).toBeInTheDocument();
});
