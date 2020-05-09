import React from "react";
import loginSlika from "../logo.png";

export class Login extends React.Component {
    constructor (props) {
        super(props);
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
                        <input type="text" name="username"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Lozinka</label>
                        <input type="password" name="password"/>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn">
                    Login
                </button>
            </div>
        </div>
        );    
    }
}
