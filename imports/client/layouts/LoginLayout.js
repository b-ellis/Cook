import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LoginLayoutComponent from '../components/LoginLayoutComponent';

export default LoginLayout = ({ component: Component, children, ...rest }) =>
    <Route {...rest} render={matchProps => (
        <LoginLayoutComponent>
            <Component {...matchProps} />
        </LoginLayoutComponent>
    )} />
