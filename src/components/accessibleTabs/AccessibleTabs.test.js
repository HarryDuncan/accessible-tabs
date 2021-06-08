import { render, screen } from '@testing-library/react';
import {AccessibleTabs} from './AccessibleTabs';

const tabData = [
        {
          tabHeader : 'First Part',
          tabId : 'first-tab',
          selected : true,
          // for aria controls
        //  controls : string;


          tabContent : <p>This is the first tab</p>
      },
        {
          tabHeader : 'Random Tab',
          tabId : 'random-tab',

          // for aria-selected
          selected : false,
          // for aria controls
        //  controls : string;


          tabContent : <div/>
      },
        {
          tabHeader : 'Function Tab',
          tabId : 'function-tab',

          // for aria-selected
          selected : false,
          // for aria controls
          // controls : string;


          tabContent : <div/>
      }
    ]

// Useful test to make sure tabs render properly

test('Renders Tab List', () => {
  render(<AccessibleTabs tabTitle='Example' tabItems={tabData} />);
  const tabList = screen.getByRole('tablist');
  expect(tabList).toBeInTheDocument();
});
