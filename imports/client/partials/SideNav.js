import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlus';
import faListUl from '@fortawesome/fontawesome-free-solid/faListUl';
import faMap from '@fortawesome/fontawesome-free-solid/faMap';
import faShoppingCart from '@fortawesome/fontawesome-free-solid/faShoppingCart';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class SideNavigation extends Component {
  render() {
    return (
        <nav className='side-nav'>
            <ul className='side-nav-ul'>
                <li>
                    <Link id='side-nav-link' to='/'>
                        <FontAwesomeIcon icon={faPlus} size='lg' />
                        Add Recipe
                    </Link>
                </li>
                <li>
                    <Link id='side-nav-link' to="/recipe-book">
                        <FontAwesomeIcon icon={faListUl} size='lg' />
                        Recipe Book
                    </Link>
                </li>
                <li>
                    <Link id='side-nav-link' to="/menu">
                        <FontAwesomeIcon icon={faMap} size='lg' />
                        Menu
                    </Link>
                </li>
                <li>
                    <Link id='side-nav-link' to="/shopping-list">
                        <FontAwesomeIcon icon={faShoppingCart} size='lg' />
                        Shopping List
                    </Link>
                </li>
            </ul>
        </nav>
    )
  }
}
