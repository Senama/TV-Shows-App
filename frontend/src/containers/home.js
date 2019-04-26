import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null
    };
  };

  componentDidMount() {
    if (!this.props.user) {
      let user = localStorage.getItem('user');
      if (user) this.setState({user})
    }
    else this.setState({user: this.props.user});
  };

  render() {
    return (
      <div className="card bg-dark text-white mx-auto mt-5" style={{minHeight:300, maxWidth:500}}>
    <img className="card-img" src=".../1000px270/#55595c:#373a3c/text:Card image" alt="" />
    <div className="card-img-overlay ">
        <div style={{textAlign:'center'}}>
            <h3 className='display-4'>Welcome to the TV Show Watchlist App!</h3>
            {
          !this.state.user ?
            <h5>No One is Logged In</h5>
            :
            <h5> {this.state.user}</h5>
        }
                
        </div>
    </div>
</div>
    );
  };
};
