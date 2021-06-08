import { render, screen } from '@testing-library/react';
import { getRoles, isInaccessible } from '@testing-library/dom'
import App from './App';

test('Test to make sure First Part renders', () => {
  render(<App />);
  const linkElement = screen.getByText('First Part');
  expect(linkElement).toBeInTheDocument();
});


test('Makes sure that all tabs are accesible', () => {
  render(<App/>);
  const tabItems = screen.getAllByRole('tabpanel');

  for(let i in tabItems){
    expect(isInaccessible(tabItems[i])).toBe(false)
  }

})
