import React, { PropTypes, Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';

import SideNavigation from '../partials/SideNav';
import AccountsUIWrapper from '../components/AccountsUIWrapper';

export default class MainLayout extends Component{
    render(){
        return(
            <div id='grid-div'>
                <header>
                    <div className='menu-wrapper'>
                        <h2>Cook</h2>
                    </div>
                    <Link className='logout' onClick={() => Meteor.logout()} to='/login'>Logout</Link>
                </header>
                <SideNavigation />

                {this.props.children}
            </div>  
        )
    }
}