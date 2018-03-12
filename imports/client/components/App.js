import React, { Component } from 'react';

import RecipeForm from './RecipeForm';

export default class App extends Component {

    componentWillMount(){
        if(!Meteor.userId()){
            this.props.history.push('/login');
        }
    }
    
  render() {
    return (
        <div id='main-div'>
            <div className='main-page-wrapper'>
                <RecipeForm />
            </div>
        </div>
    )
  }
}
