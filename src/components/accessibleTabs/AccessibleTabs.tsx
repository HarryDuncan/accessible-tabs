import React, {useState,  useRef} from 'react';

// Don't normally like to use css - but styles are pretty simple for this one
import './TabStyles.css';
// I like using typescript over JS as it reduces unforced errors and declaring interfaces is an easy way of understanding a component if I've never seen it before
// I love a good linter :)

// This is the interface for an individual tab item
interface ITabData{
  tabHeader : string;
  tabId : string;

  // for aria-selected
  selected : boolean;
  // for aria controls
  controls : string;


  tabContent : JSX.Element;


}

// This is the interface for the tabs component as a whole
interface IAccessibleTabsProps{
  // This tab component in dynamic - so will take in an array of tab items
  tabItems : ITabData[]
  tabTitle : string;

  // default selected - if undefined the first tab will be the default selected
  defaultSelected?: string;
}


// For easy reference
const keys : any = {
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  delete: 46
};

// Add or substract depending on key pressed
const direction : object = {
  37: -1,
  38: -1,
  39: 1,
  40: 1
};

const buttonDefaultStyles = {

}

export const AccessibleTabs: React.FunctionComponent<IAccessibleTabsProps> = (props) =>  {


  // Set a ref for the element - so on key events will fire only when the tabs are focused
  const tabsRef = useRef<HTMLDivElement>(null)
  // Selected tab - part of the state
  const [selectedTab, setSelectedTab] = useState(props.defaultSelected ? props.defaultSelected : props.tabItems[0]['tabId'])


  // Function to change tab
  const _tabButtonPressed = (item : ITabData) => {
    console.log(item['tabId'])
    setSelectedTab(item['tabId'])
  }

  const _switchTabOnArrowPress = (event : any) => {
    var pressed : number = event.keyCode;

    // for let (x = 0; x < tabs.length; x++) {
    //   tabs[x].addEventListener('focus', focusEventHandler);
    // };


      var target = event.target;
      // if (target.index !== undefined) {
      //   // if (tabs[target.index + direction[pressed]]) {
      //   //   tabs[target.index + direction[pressed]].focus();
      //   // }


       if (pressed === keys.left || pressed === keys.up) {

         setSelectedTab(props.tabItems[0]['tabId'])     ;

        } else if (pressed === keys.right || pressed == keys.down) {

        setSelectedTab(props.tabItems[props.tabItems.length - 1]['tabId'])

       };
      // }

  };

  const _determineOrientation = (event : any) => {
        var key = event.keyCode;
      //  var vertical = tablist.getAttribute('aria-orientation') == 'vertical';
        var proceed = false;



          if (key === keys.left || key === keys.right) {
            proceed = true;
          };
      //  };

        if (proceed) {
          _switchTabOnArrowPress(event);
        };
      };

  const _keyPressed = (event : any) => {



    var key = event.keyCode;

    switch (key) {
      case keys.end:
        event.preventDefault();
        // Activate last tab
      setSelectedTab(props.tabItems[props.tabItems.length - 1]['tabId']);
        break;
      case keys.home:
        event.preventDefault();
        // Activate first tab
        setSelectedTab(props.tabItems[0]['tabId']);
        break;

      // Up and down are in keydown
      // because we need to prevent page scroll >:)
      case keys.up:
      case keys.down:
      case keys.left:
      case keys.right:
         _determineOrientation(event);
        break;
    };
  }



  return (
    <div className='tabs'>
      <div ref={tabsRef} className='tab-container'>
        <h1>{props.tabTitle}</h1>
        <div  role="tablist" aria-label={props.tabTitle}>
          {props.tabItems.map((item, index) => (
            <button key={`${index} ${selectedTab}`}
                    role="tab"
                    onKeyDown={_keyPressed}
                    className={selectedTab === item['tabId'] ? 'active' : ''}
                    onClick={() => _tabButtonPressed(item)}
                    aria-selected={selectedTab === item['tabId'] }
                    aria-controls={item['tabId']}
                    id={item['tabId']}>
              {item.tabHeader}
            </button>

          ))}
      </div>
      {props.tabItems.map((item, index) => (
        <div  key={`tabContent ${index}`}
              tabIndex={0}
               role="tabpanel"
               id={item['tabId']}
               aria-expanded={selectedTab === item['tabId']}
               hidden={selectedTab !== item['tabId']}
               aria-labelledby={item.tabHeader}
             >
            {item.tabContent}
        </div>
      ))}
    </div>
    </div>

  );
}
