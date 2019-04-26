import React from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Show extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: null, // logged in user
            user_id: null,
            comments: [],
            username: null, // profile of user
            title: null,
            img_url: null,
            genre_name: null,
            id: null, // show id
            comment: ""
        }
    }

    componentDidMount() {
        if (this.props.user) this.setState({ user: this.props.user, user_id: this.props.id }, () => console.log(this.state));

        const { id } = this.props.match.params;
        Axios.get(`http://localhost:3005/show/showinfo/${id}`)
            .then((data) => {
                console.log(data.data.data)
                let { username, genre_name, img_url, title, id } = data.data.data;
                this.setState({ username, genre_name, img_url, title, id })
            })
            .catch(err => console.log(err));

        Axios.get(`http://localhost:3005/comment/${id}`)
            .then((data) => {
                const comments = data.data.data.reverse();
                console.log(comments)
                this.setState({ comments });
            })
            .catch(err => console.log(err));
    };

    componentDidUpdate(props) {
        const { id } = this.props.match.params;

        if (props.match.params.id !== id) {
            Axios.get(`http://localhost:3005/show/showinfo/${id}`)
                .then((data) => {
                    console.log(data.data.data)
                    let { username, genre_name, img_url, title, id } = data.data.data;
                    this.setState({ username, genre_name, img_url, title, id })
                })
                .catch(err => console.log(err))
        };
    };

    displayComments = () => {
        return this.state.comments.map((e, i) => {
            return (
                <h5 key={i} style={{ padding: '5px' }}>{e.username}: {e.comment_body}</h5>
            );
        });
    };

    postComment = async (e) => {
        e.preventDefault()
        if (this.state.comment === "") return;
        if (!this.state.user) {
            alert('You must log in first!');
            return;
        }
        
        const comment_body = this.state.comment;
        const {user_id} = this.state;
        const show_id = this.state.id;

        let data = await Axios.post(`http://localhost:3005/comment/post`, { comment_body, user_id, show_id})
        data = data.data.allComments.reverse();
        this.setState({comments: data, comment:''})
    }


    render() {

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col col-6'><img style={{ height: '300px' }} src={this.state.img_url} alt='' /></div>
                    <div className='col col-6'>
                        <h2>{this.state.title}</h2>
                        <h3>{this.state.genre_name}</h3>
                    </div>
                </div>
                <br></br>
                <h3>Being watched by {this.state.username}</h3>
                <br></br>
                <h3>{this.state.comments.length} Comments</h3>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Add Comment" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(e)=> this.setState({comment: e.target.value})}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={this.postComment}>Post</button>
                    </div>
                </div>
                {
                    this.displayComments()
                }
            </div>
        );
    };
};
