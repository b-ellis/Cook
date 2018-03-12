import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component {
    constructor(){
        super();
    }
    componentDidMount() {
        // Use Meteor Blaze to render login buttons
        this.view = Blaze.render(Template.loginButtons,
            ReactDOM.findDOMNode(this.refs.container));
    }
    componentWillUnmount() {
        // Clean up Blaze view
        Blaze.remove(this.view);
    }
    render() {
        return <span ref="container" onClick={() => {
            if(this.view.isCreated === true){
                console.log(Template.loginButtons)
            }
        } }/>;
    }
}