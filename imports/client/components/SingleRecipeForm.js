import React, { Component } from 'react';
var imgUrl = '/images/plate-vector.jpg'

const stringUpperCase = str => str.charAt(0).toUpperCase() + str.slice(1)

export default class SingleRecipeForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            ingredients: [{
                name: '',
                amount: ''
            }],
            image: null,
            id: ''
        }
        this.handleDishNameChange = this.handleDishNameChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleIngredientNameChange = this.handleIngredientNameChange.bind(this);
        this.handleAmountNameChange = this.handleAmountNameChange.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
        this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        let ingredientMap = this.props.recipe.ingredients.map((ingredient, index) => {
           return ingredient
        })
        this.setState({
            name: this.props.recipe.dish,
            description: this.props.recipe.description,
            ingredients: ingredientMap,
            id: this.props.recipe._id,
        })
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

    handleChange(event){
        event.preventDefault();
        Meteor.call('editRecipe', this.state, (res, err) => {
            if(!err){
                this.props.edit()
            }
        })
    }

    handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
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

  render() {
    return (
        <form className='recipe-div'>
            <div className='single-img-div'>
                {!this.props.recipe.image ?
                    <img className='single-img' src={imgUrl} />
                    :
                    <img className='single-img' src={this.props.recipe.image} />
                }
            </div>
            <div className='dish-input-wrapper'>
                <input className='single-dish-input' 
                type='text' 
                value={this.state.name}
                onChange={this.handleDishNameChange} />
            </div>
            <div className='single-description-form-div'>
                <div>
                    <h4>Ingredients</h4>
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
                    <button type="button" onClick={this.handleAddIngredient} className="add-single-ingredient">Add Ingredient</button>
                    <h4>Directions</h4>
                    <textarea className='single-description-input'
                    value={this.state.description}
                    onChange={this.handleDescriptionChange} />
                    <label>
                    <h4>Image</h4>
                    <h4 className='image-change'>Choose an Image</h4>
                    <input ref='fileInput' type='file' className='img-change'  accept=".jpg, .jpeg, .png" onChange={this.handleImageChange} />
                    </label>
                </div>
                
            </div>
            <button onClick={this.handleChange} className='change-recipe'>Change Recipe</button>
            <button onClick={this.props.cancel} className='cancel-recipe'>Cancel</button>
        </form>
    )
  }
}
