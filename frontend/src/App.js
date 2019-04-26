import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar';
import Home from './containers/home';
import User from './containers/user';
import Profile from './containers/userProfile';
import Show from './containers/show';
import AddShow from './containers/addShow';
import AllShows from './containers/allShows';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null,
      id: null
    }
  }

  componentDidMount () {
    console.log('mounted')
    if (!this.state.user) {
      let user = localStorage.getItem('user')
      let id = localStorage.getItem('id');
      if (user) this.setState({user, id}, () => console.log('set'))
    }
  }

  selectUser = (user, id) => {
    this.setState({user, id}, ()=> console.log(this.state));
  }


  render() {
    return (
    <HashRouter>
      <Route path='/' component={Navbar}/>
      <Switch>
      <Route path='/' exact render={(routeProps) => (<Home {...routeProps} user={this.state.user}/>)}/>
      <Route path='/user/post'  render={(routeProps) => (<AddShow {...routeProps} user={this.state.user} id={this.state.id}/>)}/>
      <Route path='/users'render={(routeProps) => (<User {...routeProps} user={this.state.user} id={this.state.id} selectUser={this.selectUser}/>)}/>    
      <Route path='/user/:id' render={(routeProps) => (<Profile {...routeProps} user={this.state.user}/>)}/>
      <Route path='/show/:id' render={(routeProps) => (<Show {...routeProps} user={this.state.user} id={this.state.id}/>)}/>
      <Route path='/allshows' render={(routeProps) => (<AllShows {...routeProps} user={this.state.user} id={this.state.id}/>)}/>
      </Switch>
    </HashRouter>
    );
  };
};

export default App;
