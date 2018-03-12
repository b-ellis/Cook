import React, { Component } from 'react'
import { withTracker } from 'meteor/react-meteor-data';

import Recipe from '../../api/Recipies';
import RecipeContainer from '../components/Recipe';

class RecipeBook extends Component {

  constructor(){
    super();
    this.addToMenu = this.addToMenu.bind(this);
    this.removeRecipe = this.removeRecipe.bind(this);
  }

  componentWillMount() {
    if (!Meteor.userId()) {
      this.props.history.push('/login');
    }
  }

  addToMenu = (id, inMenu) => {
    Meteor.call('toggelMenu', id, inMenu);
  }

  removeRecipe = (id) => {
    Meteor.call('removeRecipie', id, (err, res) => {
      if(!err){
        console.log(res);
      }
    })
  }

  render() {
    return (
      <div className='recipe-grid'>
        <div className='recipes-wrapper'>
        <h3 className='recipies-title'>Recipes</h3>

          <RecipeContainer 
          recipies={this.props.recipies}
          addToMenu={this.addToMenu}
          removeRecipe={this.removeRecipe}
          />

        </div>
      </div>
    )
  }
}

export default withTracker(props => {
  let recipiesSub = Meteor.subscribe('allRecipies');
  let userSub = Meteor.subscribe('currentUser');


  return {
    ready: recipiesSub.ready() && userSub.ready(),
    recipies: Recipe.find({userId: Meteor.userId()}).fetch()
  }
})(RecipeBook)
