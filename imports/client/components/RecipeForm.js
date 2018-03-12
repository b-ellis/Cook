import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Recipe from '../../api/Recipies'

class IngredientsForm extends Component {
    render(){
        return(
            <div>
                <input type='text' name={`ingredient-${this.props.index}`} />
                <button>-</button>
            </div>
        )
    }
}

export default class RecipeForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            description: '',
            ingredients: [{
                name: '',
                amount: ''
            }],
            image: null
        }
        this.handleDishNameChange = this.handleDishNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleIngredientNameChange = this.handleIngredientNameChange.bind(this);
        this.handleAmountNameChange = this.handleAmountNameChange.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
        this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleDishNameChange = (evt) => {
        const newDish = evt.target.value
        this.setState({
            name: newDish
        });
    }

    handleDescriptionChange = (evt) => {
        const newDescription = evt.target.value;
        this.setState({
            description: newDescription
        });
    }

    handleIngredientNameChange = (idx) => (evt) => {
        const newIngredient = this.state.ingredients.map((ingredient, sidx) => {
            if (idx !== sidx) return ingredient;
            return { ...ingredient, name: evt.target.value };
        });

        this.setState({ ingredients: newIngredient });
    }

    handleAmountNameChange = (idx) => (evt) => {
        const newAmount = this.state.ingredients.map((ingredient, sidx) => {
            if (idx !== sidx) return ingredient;
            return { ...ingredient, amount: evt.target.value };
        });

        this.setState({ ingredients: newAmount });
    }

    handleAddIngredient = () => {
        this.setState({
            ingredients: this.state.ingredients.concat([{ 
                name: '', 
                amount: '' 
            }])
        });
    }

    handleRemoveIngredient = (idx) => () => {
        this.setState({
            ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
        });
    }

    handleImageChange = (e) => {
        if(e.target.files && e.target.files[0]){
            const FR = new FileReader();
            const image = e.target.files[0];
            FR.readAsDataURL(image);

            FR.addEventListener('load', (e) => {
                this.setState({
                    image: e.target.result
                });
            })
        };
    }

    handleSubmit(event) {
        event.preventDefault();
        // console.log(event);
        // console.log(this.state);
        Meteor.call('insertNewRecipie', this.state, (err, res) => {
            if(!err){
                this.setState({
                    name: '',
                    description: '',
                    ingredients: [{
                        name: '',
                        amount: ''
                    }],
                });
                this.refs.dishInput.value = '';
                this.refs.descriptionInput.value = '';
                this.refs.fileInput.value = null;
            } else {
                console.log(err);
            }
        })
    }

  render() {

    return (
        <form className='recipe-form' onSubmit={this.handleSubmit}>
                <label>
                    Dish
                <input 
                    required
                    ref='dishInput'
                    type='text' 
                    name='dish' 
                    value={this.state.name}
                    onChange={this.handleDishNameChange}
                />
                </label>
                <label>
                    Directions
                <textarea 
                    ref='descriptionInput'
                    className='text-area' 
                    name='description' 
                    value={this.state.description}
                    onChange={this.handleDescriptionChange}
                />
                </label>
                Ingredients
                {this.state.ingredients.map((ingredient, index) => (
                    <div className="ingredients" key={index}>
                        <input
                            ref='ingredientNameInput'
                            name='ingredient'
                            key={`ingredient${index + 1}`}
                            type="text"
                            placeholder={`Ingredient ${index + 1}`}
                            value={ingredient.name}
                            onChange={this.handleIngredientNameChange(index)}
                        />
                        <input
                            ref='ingredientAmountInput'
                            name='amount'
                            key={`ingredient-amount${index + 1}`}
                            type="text"
                            placeholder={`Amount`}
                            value={ingredient.amount}
                            onChange={this.handleAmountNameChange(index)}
                        />
                        <button type="button" 
                        onClick={this.handleRemoveIngredient(index)} 
                        className="small">
                            -
                        </button>
                    </div>
                ))}
                <button type="button" onClick={this.handleAddIngredient} className="add-ingredient">Add Ingredient</button>
                Add An Image
                <label>
                <p className='form-image image-change'>Choose an Image</p>
                <input ref='fileInput' type='file' className='img-change' accept=".jpg, .jpeg, .png" onChange={this.handleImageChange} />
            </label>
                <button onClick={this.handleSubmit} className='submit-recipe'>Enter Recipe</button>
            </form>
    )
  }
}