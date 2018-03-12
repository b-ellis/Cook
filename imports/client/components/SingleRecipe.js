import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit';
var imgUrl = '/images/plate-vector.jpg'

const stringUpperCase = str => str.charAt(0).toUpperCase() + str.slice(1) 

export default class SingleRecipeComponent extends Component {
  render() {
    const inMenu = (inMenu) => inMenu ? 'Remove from Menu' : 'Add to Menu'
    return (
        <div className='recipe-div'>
            <div className='single-img-div'>
                {!this.props.recipe.image ?
                    <img className='single-img' src={imgUrl} />
                    :
                    <img className='single-img' src={this.props.recipe.image} />
                }
            </div>
            <div className='single-title-div'>
                <div>
                    <FontAwesomeIcon icon={faEdit} size='1x' onClick={this.props.edit} />
                </div>
                <h4 className=''>{stringUpperCase(this.props.recipe.dish)}</h4>
                <p className='' onClick={() => (this.props.addToMenu(this.props.recipe._id, this.props.recipe.inMenu))}>
                    {inMenu(this.props.recipe.inMenu)}
                </p>

            </div>
            <div className='single-description-div'>
                <div>
                    <h4>Ingredients</h4>
                    <ul>
                        {this.props.recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{stringUpperCase(ingredient.name)} : {ingredient.amount}</li>
                        ))}
                    </ul>
                    <h4>Directions</h4>
                    <p>{this.props.recipe.description}</p>
                </div>
            </div>
        </div>
    )
  }
}
