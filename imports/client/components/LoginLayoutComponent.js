import React, { Component } from 'react';
const imgUrl = '/images/background.jpeg';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faUtensils from '@fortawesome/fontawesome-free-solid/faUtensils';


export default class LoginLayoutComponent extends Component {
    render() {
        return (
            <div style={{ height: '100vh', background: 'black'}}>
                <img style={{
                    height: '100%',
                    width: '100vw',
                    position: 'absolute',
                    opacity:'.7'}} src={imgUrl} />
                <header style={{ position: 'relative', background: '#e1c5b042'}}>
                </header>
                <div className='login-div-wrapper'>
                    <div className='login-about-div'>
                        <h1 style={{color:'white'}}>Your Own Personal Cook Book</h1>
                        <ul>
                            <li><FontAwesomeIcon icon={faUtensils} size='lg'/><h4>Enter Recipies</h4></li>
                            <li><FontAwesomeIcon icon={faUtensils} size='lg' /><h4>Create a Personal Food Menu</h4></li>
                            <li><FontAwesomeIcon icon={faUtensils} size='lg' /><h4>Recive a Personalized Shopping List</h4></li>
                        </ul>
                    </div>
                    <div className='login-login-div'>{this.props.children}</div>
                </div>
            </div>
        )
    }
}