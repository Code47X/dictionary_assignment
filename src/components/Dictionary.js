import React from 'react';
import '../styles/Dictionary.scss'

class Dictionary extends React.Component {
  render() {
    const words = ['carpenter', 'relax', 'faulty', 'white', 'clumsy', 'legs', 'trace', 'part', 'vacation', 'aware']

    return (
      <div>
        <h1>Dictionary</h1>
        {words.map(word => (
          <p key={word}>{word}</p>
        ))}
      </div>
    );
  }
}

export default Dictionary;
