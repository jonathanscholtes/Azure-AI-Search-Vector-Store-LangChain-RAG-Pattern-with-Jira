import { React, Component } from 'react'
import './Main.css'
import Search from './Requirements/Search'


class App extends Component {
  constructor() {
    super()
    this.state = { question: '', searchResults: [] }
  }

  render() {
    return (
      <div className="Main">
        <div className="Main-Header">
          <img
                src={require('./images/site_logo.png')}
                height={'100px'}
              />
        </div>
        <div className="Main-Body">
          <div className="Main-Content">
            <Search/>
          </div>
        </div>
        <div className="Main-Footer">
          <b>Disclaimer: Sample Application</b>
          <br />
          Please note that this sample application is provided for demonstration
          purposes only and should not be used in production environments
          without proper validation and testing.
        </div>
      </div>
    )
  }
}

export default App