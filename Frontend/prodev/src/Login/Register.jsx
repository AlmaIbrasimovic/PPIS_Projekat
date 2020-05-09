import React from "react";
import loginSlika from "../logo.png";

export class Register extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (<div className ="base-container" ref={this.props.containerRef}>
            <div className="header-register">Kreiraj račun</div>
            <div className="content">
                <div className="image">
                    <img src={loginSlika} />
                </div>
                <div className="forma">
                    <div className="form-grupa">
                        <label htmlFor="username">Korisničko ime</label>
                        <input type="text" name="username"/>
                    </div>
                    <div className="form-grupa">
                        <label htmlFor="password">E-mail adresa</label>
                        <input type="email" name="email"/>
                    </div>
                    <div className="form-grupa">
                        <label htmlFor="password">Lozinka</label>
                        <input type="password" name="password"/>
                    </div>
                </div>
            </div>
            <div className="footer">
                <button type="button" className="btn">
                    Register
                </button>
            </div>
        </div>
        );    
    }
}
