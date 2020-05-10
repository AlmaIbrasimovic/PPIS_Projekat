import React from "react";
import loginSlika from "../logo.png";
import { withRouter, Redirect } from 'react-router-dom';
import {browserHistory} from 'react-router';

export class Login extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = () =>  {
        if (this.state.username === '' && this.state.password === '') alert('Molimo unesite vaše korisničke podatke!');
        else if  (this.state.username === '') alert('Molimo unesite vaše korisničko ime!');
        else if (this.state.password === '') alert('Molimo unesite vašu lozinku!');
        else {
            alert('Sve OK');
        }
    }

    render() {
        return (<div className ="base-container" ref={this.props.containerRef}>
            <div className="stil">Prijavi se na račun</div>
            <div className="content">
                <div className="image">
                    <img src={loginSlika} />
                </div>
                <div className="form">
                    <div className="form-group">
                        <label htmlFor="username">Korisničko ime</label>
                        <input type="text" name="username" 
                        value={this.state.username} 
                        onChange={e => this.handleChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Lozinka</label>
                        <input type="password" name="password" 
                        value={this.state.password} 
                        onChange={e => this.handleChange(e)}
                        />
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn" onClick={this.login}>
                    Login
                </button>
            </div>
        </div>
        );    
    }
}

