import React from 'react';
import ReactDOM from 'react-dom';  
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect 
  } from 'react-router-dom';
import { Loader, Image, Segment, Dimmer, Menu, Button, Icon, Sticky } from 'semantic-ui-react';

//My Components
import Login from './Login';
import Logout from './Logout';
import Header from './Header';
import Footer from './Footer';
import Home from './Pages/Home';
import Gym from './Pages/Gym';
import Laundry from './Pages/Laundry';
import Report from './Pages/Report';
import StudyRoom from './Pages/StudyRoom';

  class User{
    constructor(props) {
        this.id = props.id;
        this.email = props.email;
        this.username = props.nickname;
        this.type = props.type;
        this.ds = props.ds;
        this.room = props.room;
        this.floor = props.room/100;
    }
  }

/**
 * Main Component.
 * @author Joanna Sienkiewicz
 */
class App extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            logged:null,
            user:null
        };
        this.activePage = null;
        this.logout = this.logout.bind(this);
    }

    logout(){
        this.setState({
            logged:false,
            user:null
        })
    }

    componentWillMount(){

        let self = this;
        var url = null;
        var randLogin = Math.random();
        url = "http://localhost:3000/authenticate?status=true"

        axios.get(url)
        .then(function (response) {
            if(response.data[0].status){
                var logged = true;
                var user = new User(response.data[0]);
                self.setState({logged, user});
            }
            else{
                var logged = false;
                self.setState({logged});
            }
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    handleContextRef = contextRef => this.setState({ contextRef })

    render() {
        let self = this;
        var loginOrHome = null;
        let loaderElement = null;
        const { contextRef } = this.state

        if(this.state.logged == null){
            loaderElement = <Dimmer inverted active><Loader inverted size='big'>Loading</Loader> </Dimmer>;
        }
        if(this.state.logged)
            return (
                <div ref={this.handleContextRef}>
                    <Segment className="no-padd">
                        {loaderElement}
                        <Router>
                            <div className="container bottom-margin">
                                <Header username={(this.state.user)? this.state.user.username : null }></Header>
                                <Route exact path="/" render={() => (
                                    this.state.logged == false  ? (
                                        <Redirect to="/login"/>
                                    ) : (
                                        <Home user={self.state.user}/>
                                    )
                                )}/>
                                <Route path="/gym" render={() => (
                                    this.state.logged == false  ? (
                                        <Redirect to="/login"/>
                                    ) : (
                                        <Gym user={self.state.user}/>
                                    )
                                )}/>
                                <Route path="/laundry" render={() => (
                                    this.state.logged == false  ? (
                                        <Redirect to="/login"/>
                                    ) : (
                                        <Laundry user={self.state.user} />
                                    )
                                )}/>
                                <Route path="/report" render={() => (
                                    this.state.logged == false  ? (
                                        <Redirect to="/login"/>
                                    ) : (
                                        <Report user={self.state.user}/>
                                    )
                                )}/>
                                <Route path="/study-room" render={() => (
                                    this.state.logged == false  ? (
                                        <Redirect to="/login"/>
                                    ) : (
                                        <StudyRoom user={self.state.user}/>
                                    )
                                )}/>
                                <Route path="/login" render={() => (
                                    this.state.logged == true  ? (
                                        <Redirect to="/"/>
                                    ) : (
                                        <Login />
                                    )
                                )}/>
                                <Route path="/logout" render={() => (
                                    <Logout logout={this.logout} />
                                )}/>
                                <Footer></Footer>
                            </div>
                        </Router>
                    </Segment>
                </div>
            )
        else
            return (
                <div ref={this.handleContextRef}>
                    <Segment className="no-padd">
                        {loaderElement}
                        <Router>
                            <div >
                                <Route exact path="/" render={() => (
                                    this.state.logged == false  ? (
                                        <Redirect to="/login"/>
                                    ) : (
                                        <Home user={self.state.user}/>
                                    )
                                )}/>
                                <Route path="/gym" render={() => (
                                    this.state.logged == false  ? (
                                        <Redirect to="/login"/>
                                    ) : (
                                        <Gym user={self.state.user}/>
                                    )
                                )}/>
                                <Route path="/laundry" render={() => (
                                    this.state.logged == false  ? (
                                        <Redirect to="/login"/>
                                    ) : (
                                        <Laundry user={self.state.user} />
                                    )
                                )}/>
                                <Route path="/report" render={() => (
                                    this.state.logged == false  ? (
                                        <Redirect to="/login"/>
                                    ) : (
                                        <Report user={self.state.user}/>
                                    )
                                )}/>
                                <Route path="/study-room" render={() => (
                                    this.state.logged == false  ? (
                                        <Redirect to="/login"/>
                                    ) : (
                                        <StudyRoom user={self.state.user}/>
                                    )
                                )}/>
                                <Route path="/login" render={() => (
                                    this.state.logged == true  ? (
                                        <Redirect to="/"/>
                                    ) : (
                                        <Login />
                                    )
                                )}/>
                                <Route path="/logout" render={() => (
                                    <Redirect to="/login" push />
                                )}/>
                            </div>
                        </Router>
                    </Segment>
                </div>
            );
    }
}

ReactDOM.render(<App ></App>, document.getElementById('app'));