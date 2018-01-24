import React from 'react'
import ReactDOM from 'react-dom';  
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom';

  //My Components
  import Header from './Header'
  import Footer from './Footer'
  import Home from './Pages/Home'
  import Gym from './Pages/Gym'
  import Laundry from './Pages/Laundry'

/**
 * Main Component.
 * @author Joanna Sienkiewicz
 */
class App extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
        };
    }
    componentWillMount(){
        axios.get('/user?ID=12345')
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    render() {
        return (
            <div>
                <Header></Header>
                <Router>
                    <div className="container">
                        <ul>
                            <li>
                            <Link to="/">Home</Link>
                            </li>
                            <li>
                            <Link to="/gym">Gym</Link>
                            </li>
                            <li>
                            <Link to="/laundry">Laundry</Link>
                            </li>
                        </ul>
                        <Route exact path="/" component={Home} />
                        <Route path="/gym" component={Gym} />
                        <Route path="/laundry" component={Laundry} />
                    </div>
                </Router>
                <Footer></Footer>
            </div>
        )
    }
}

ReactDOM.render(<App ></App>, document.getElementById('app'));