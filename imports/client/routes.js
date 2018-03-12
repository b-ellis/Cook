import React from 'react'
import {
    Router,
    Route,
    IndexRoute,
    BrowserRouter,
    Switch
} from 'react-router-dom';
import { render } from 'react-dom';

import MainLayout from './layouts/MainLayout';
import LoginLayout from './layouts/LoginLayout';
import Login from './pages/Login';
import SignupPage from './pages/SignUp';
import App from './components/App';
import RecipeBook from './pages/RecipeBook';
import SingleRecipe from './pages/Recipe';
import Menu from './pages/Menu';
import ShoppingList from './pages/ShoppingList';

Meteor.startup(() => {
    render(
        <BrowserRouter id='browser-router'>
        <Switch>
            <LoginLayout path='/login' component={Login} />
                {/* <Route path='/login' component={Login} />
                <Route path='/signup' component={SignupPage} /> */}
            <LoginLayout path='/signup' component={SignupPage} />
            <MainLayout history={this.context} pathname={this.location.pathname}>
                <Route exact path='/' component={App} />
                <Route path='/recipe-book' component={RecipeBook} />
                <Route path='/menu' component={Menu} />
                <Route path='/shopping-list' component={ShoppingList} />
                <Route path='/recipe/:id' component={SingleRecipe} />
            </MainLayout>
            </Switch>
        </BrowserRouter>,
        document.getElementById('render-target')
    )
});