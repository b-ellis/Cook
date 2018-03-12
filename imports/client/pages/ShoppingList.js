import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ReactLoading from 'react-loading';
import List from '../components/List';

import Recipe from '../../api/Recipies';

class ShoppingList extends Component {

  componentWillMount() {
    if (!Meteor.userId()) {
      this.props.history.push('/login');
    }
  }

  render() { 

    if (this.props.ready) {
      return (
        <div className='shopping-list-grid'>
          <List 
            shoppingList={this.props.shoppingList}
          />
        </div>
      )
    } else {
        return ( 
          <div className='loading-div'>
            <ReactLoading type='spinningBubbles' height={64} width={64} />
          </div>
        )
    }
  }
}

export default withTracker(props => {
  let recipiesSub = Meteor.subscribe('allRecipies');
  let userSub = Meteor.subscribe('currentUser');

  let singleRecipe = Recipe.find(
    {
      userId:Meteor.userId(),
      inMenu: true
    }, 
    {fields:{ingredients: 1}})
    .fetch()

  let ingredientArray = []
  const recipe = singleRecipe.map((recipe, index) => {
    return recipe.ingredients.map((ingredient, index) => {
      ingredientArray.push(ingredient);
    })
  });

  return {
    ready: recipiesSub.ready() && userSub.ready(),
    recipies: singleRecipe,
    shoppingList: ingredientArray
  }
})(ShoppingList)
