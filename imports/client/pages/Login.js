import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let email = document.getElementById('login-email').value;
        let password = document.getElementById('login-password').value;
        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                this.setState({
                    error: err.reason
                });
            } else {
                this.props.history.push('/');
            }
        });
    }

    render() {
        const error = this.state.error;
        return (
            <div className="show">
                <div className="modal-dialog">
                    <div className="modal-content" style={{ background: '#f5deb300', border: 'none'}}>
                        <div className="modal-header" style={{
                            border: 'none',
                            display: 'flex',
                            justifyContent: 'center'}}>
                            <h1 className="text-center">Login</h1>
                        </div>
                        <div className="modal-body">
                            {error.length > 0 ?
                                <div className="alert alert-danger fade in">{error}</div>
                                : ''}
                            <form id="login-form"
                                className="form col-md-12 center-block"
                                onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <input type="email"
                                        id="login-email"
                                        className="form-control input-lg"
                                        placeholder="email" />
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                        id="login-password"
                                        className="form-control input-lg"
                                        placeholder="password" />
                                </div>
                                <div className="form-group text-center">
                                    <input type="submit"
                                        id="login-button"
                                        className="btn btn-primary btn-lg btn-block"
                                        value="Login" 
                                        style={{ height: '40px' }}/>
                                </div>
                                <div className="form-group text-center">
                                    <p className="text-center">
                                        Don't have an account? Register <Link to="/signup">here</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer" style={{ borderTop: 0 }}></div>
                    </div>
                </div>
            </div>
        );
    }
}
