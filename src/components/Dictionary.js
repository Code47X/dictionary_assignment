import React from 'react';
import DictService from '../services/DictService';
import '../styles/Dictionary.scss'

class Dictionary extends React.Component {
  handleClick = word => async event => {
    const definition = await DictService.getDefinition(word);
    console.log(definition);
  }

  render() {
    const words = ['carpenter', 'relax', 'faulty', 'white', 'clumsy', 'legs', 'trace', 'part', 'vacation', 'aware', 'notawordtest']

    return (
      <div>
        <h1>Dictionary</h1>
        {words.map(word => (
          <p key={word} onClick={this.handleClick(word)}>{word}</p>
        ))}
      </div>
    );
  }
}

export default Dictionary;
