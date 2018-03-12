import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
// import Recipe from '../client/pages/Recipe';
const fs = require('fs')

const stringUpperCase = str => str.charAt(0).toUpperCase() + str.slice(1);
const toTitleCase = str => str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });

const Recipies = new Mongo.Collection('recipies');

const RecipiesSchema = new SimpleSchema({
    userId: String,

    dish: {
        type: String,
        required: true
    },

    description: String,

    ingredients: Array,
    'ingredients.$': Object,
    'ingredients.$.name': String,
    'ingredients.$.amount': String,

    inMenu: Boolean,

    image: {
        type: String,
        optional: true
    }
});

Recipies.attachSchema(RecipiesSchema);

if(Meteor.isServer) {

    Meteor.publish('allRecipies', () => {
        return Recipies.find();
    });

    Meteor.methods({
        insertNewRecipie(object) {
            const ingredients = object.ingredients.map((ingredient, index) => {
                return {
                    name: toTitleCase(ingredient.name),
                    amount: toTitleCase(ingredient.amount),
                    bought: false
                }
            });

            if(Meteor.userId()){
                Recipies.insert({
                    userId: Meteor.userId(),
                    dish: toTitleCase(object.name),
                    description: stringUpperCase(object.description),
                    ingredients,
                    inMenu: true,
                    image: object.image
                });
            }
        },

        removeRecipie(id) {
            if(Meteor.userId()){
                Recipies.remove({ _id: id })
            }
        },

        toggelMenu(id, inMenu){
            if(Meteor.userId()){
                Recipies.update({ _id: id }, {
                    $set: {
                        inMenu: !inMenu
                    }
                })
            }
        },

        editRecipe(object){

            const ingredients = object.ingredients.map((ingredient, index) => {
                return {
                    name: ingredient.name,
                    amount: ingredient.amount
                }
            });

            if(Meteor.userId()){
                Recipies.update({ _id: object.id }, {
                    $set: {
                        dish: object.name,
                        description: object.description,
                        ingredients,
                        image: object.image
                    }
                })
            }
        }
    })
}

export default Recipies;