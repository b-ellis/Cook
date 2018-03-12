import React, { Component } from 'react'

const stringUpperCase = str => str.charAt(0).toUpperCase() + str.slice(1) 
function pluralize(s, w) {
    return String(s.split(w).length - 1) + ' ' + w + (s.split(w).length == 2 ? '' : 's')
}

export default class List extends Component {
    componentWillUpdate(){}
  render() {
      let result = [];
      const ingredient = this.props.shoppingList.forEach((a) => {
          if (!this[a.name]) {
              this[a.name] = { name: a.name, amount: '' }
              result.push(this[a.name])
          }
          const word = a.amount.match(/[a-zA-Z]/g).join('');
          this[a.name].amount = pluralize(this[a.name].amount + ' ' + a.amount, word)
      })

    return (
        <div className='shopping-list-div'>
            <ul className='shopping-list'>
                <li><h1 className='shopping-list-title'>Shopping List</h1></li>
                {
                    result.map((x, index) => {
                        return <li className='list-item' key={index}>
                            <h3>{stringUpperCase(x.name) + ' : ' + stringUpperCase(x.amount)}</h3>
                        </li>
                    })
                }
            </ul>
        </div>
    )
  }
}
