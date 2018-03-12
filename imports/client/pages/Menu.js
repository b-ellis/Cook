import React, { Component } from 'react';
import RecipeContainer from '../components/Recipe';
import { withTracker } from 'meteor/react-meteor-data';

import Recipe from '../../api/Recipies';

class Menu extends Component {

  constructor(){
    super();
    this.toggelMenu = this.toggelMenu.bind(this);
  }

  componentWillMount() {
    if (!Meteor.userId()) {
      this.props.history.push('/login');
    }
  }

  toggelMenu = (id, inMenu) => {
    Meteor.call('toggelMenu', id, inMenu);
  }

  removeRecipe = (id) => {
    Meteor.call('removeRecipie', id, (err, res) => {
      if (!err) {
        // console.log(res);
      }
    })
  }

  render() {
    return (
      <div className='menu-grid'>
        <div className='menu-recipe-wrapper'>
          <h3 className='menu-title'>Menu</h3>
          <RecipeContainer 
          recipies={this.props.recipies}
          addToMenu={this.toggelMenu}
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
    recipies: Recipe.find({
      userId: Meteor.userId(),
      inMenu: true
    }).fetch()
  }
})(Menu)
