import React, { Component } from 'react';
import { Link } from 'react-router-dom';
var imgUrl = 'images/plate-vector.jpg'

const stringUpperCase = str => str.charAt(0).toUpperCase() + str.slice(1) 

export default class RecipeContainer extends Component {
  render() {
      const image = image => image ? image : imgUrl
      const inMenu = (inMenu) => inMenu ? 'Remove from Menu' : 'Add to Menu'

      const recipe = this.props.recipies.map((recipe, index) => (
          <div className='recipe-wrapper' key={index}>
              <div className='img-header'>
                  <div className='img' style={{ backgroundImage: `url(${image(recipe.image)})` }}></div>
                  <h4 className='dish-name'>{stringUpperCase(recipe.dish)}</h4>
                  <p className='add-to-menu' onClick={() => (this.props.addToMenu(recipe._id, recipe.inMenu))}>{inMenu(recipe.inMenu)}</p>
                  <p className='remove' onClick={() => (this.props.removeRecipe(recipe._id))}>X</p>
              </div>
              <div className='about-div'>
                  <div className='description-grid'>
                    <h4>Directions</h4>
                    <p>{recipe.description}</p>
                  </div>
                  <div className='ingredients-grid'>
                      <h4>Ingredients</h4>
                      <ul>
                      {recipe.ingredients.map((ingredient, index) => {
                          if (index === 0 || index === 1 || index === 2) {
                              return (
                                  <div key={index}>
                                    <li>name: {stringUpperCase(ingredient.name)}</li>
                                    <li>amount: {ingredient.amount}</li>
                                </div>
                              )
                          }
                      })}
                      </ul>
                  </div>
              </div>
              <div className='button-wrapper'>
                  <Link to={`/recipe/${recipe._id}`}><button className='btn'>View More</button></Link>
              </div>
          </div>
      ))

      return  recipe 
  }
}
