import logo from './logo.svg';
import './App.css';
import {AccessibleTabs} from './components/accessibleTabs/AccessibleTabs'

// Parsing a random component into the tabs - to show that you can do it
import RandomComponent from './components/randomComponent/RandomComponent';




function App() {

  // This is where the data for the tabs are declared then parsed into the accesible tab component
  // A use case for this would be if you wanted to dynamically genereate tabs based on data retrieved from B.E in which case you would generate the tabs in a use effect

  // Function to return tab content
  // Just another example of another way one could dynamically generate content
  const _renderThirdTabContent = () => {
    let rand = Math.random()

    if(rand > 0.5){
      return <div><h2>The Random Number is {rand}</h2></div>
    }else{
      return <p>The random number is less than 0.5</p>
    }
  }
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


            tabContent : <RandomComponent />
        },
          {
            tabHeader : 'Function Tab',
            tabId : 'function-tab',

            // for aria-selected
            selected : false,
            // for aria controls
            // controls : string;


            tabContent : _renderThirdTabContent()
        }
      ]


  return (
    <div className="App">
      <div  className='tab-container'>
        <AccessibleTabs tabTitle='Example' tabItems={tabData} />
      </div>
    </div>
  );
}

export default App;
