import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactLoading from 'react-loading';

import Recipe from '../../api/Recipies';

import SingleRecipeComponent from '../components/SingleRecipe';
import SingleRecipeForm from '../components/SingleRecipeForm';

class SingleRecipe extends Component {

    constructor(){
        super();
        this.state = {
            edit: false
        }
        this.addToMenu = this.addToMenu.bind(this);
        this.edit = this.edit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    edit(){
        this.state.edit == false ? 
        this.setState({
            edit: true
        }) :
        this.setState({
            edit: false
        }) 
    }

    addToMenu = (id, inMenu) => {
        Meteor.call('toggelMenu', id, inMenu);
    }

    handleCancel = (event) => {
        event.preventDefault();
        this.setState({
            edit: false
        })
    }


  render() {    
    if(this.props.ready){
        if(this.state.edit === false){
            return (
                <div className='single-recipe-grid'>
                    <SingleRecipeComponent
                        recipe={this.props.recipies[0]}
                        edit={this.edit}
                        addToMenu={this.addToMenu} />
                </div>
            )
        } else {
            return (
                <div className='single-recipe-grid'>
                    <SingleRecipeForm 
                        recipe={this.props.recipies[0]}
                        edit={this.edit}
                        cancel={this.handleCancel}/>
                </div>
            )
        }
    } else {
        return <div className='loading-div'>
            <ReactLoading type='spinningBubbles' height={64} width={64} />
        </div>
    }
  }

}

export default withTracker(props => {
    let recipiesSub = Meteor.subscribe('allRecipies');
    let userSub = Meteor.subscribe('currentUser');

    let singleRecipe = Recipe.find({
            _id: props.match.params.id
        }).fetch()

    return {
        ready: recipiesSub.ready() && userSub.ready(),
        recipies: singleRecipe
    }
})(SingleRecipe)
