import React from 'react';
import DictService from '../services/DictService';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import { ClapSpinner } from "react-spinners-kit";
import '../styles/Dictionary.scss';

class Dictionary extends React.Component {
  state = {
    open: false,
    anchorEl: null,
    definition: null,
    loading: false
  }

  handleClick = word => async event => {
    const { currentTarget } = event;

    this.setState(state => ({
      open: state.anchorEl !== currentTarget || !state.open,
      anchorEl: currentTarget,
      loading: true
    }));

    const definition = await DictService.getDefinition(word);

    this.setState({
      definition,
      loading: false
    })

    console.log(definition);
  }

  render() {
    const words = ['carpenter', 'relax', 'faulty', 'white', 'clumsy', 'legs', 'trace', 'part', 'vacation', 'aware', 'notawordtest']
    const { open, anchorEl, definition, loading } = this.state;

    return (
      <div>
        <h1>Dictionary</h1>

        {/*
          I'm using two seperate poppers here. One for the spinner and one for the definition.
          Ideally you would only need one, and just change contents based on the loading state,
          however there are issues with the positioning when the contents are changed in real time.
        */}

        <Popper open={loading && open} anchorEl={anchorEl} placement='top' transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className="spinContainer">
                <ClapSpinner size={30} />
              </Paper>
            </Fade>
          )}
        </Popper>

        <Popper open={!loading && open} anchorEl={anchorEl} placement='top' transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className="defContainer">
                <p>{definition}</p>
              </Paper>
            </Fade>
          )}
        </Popper>

        {words.map((word, i) => (
          // Using array indexes as keys is generally considered a bad practice and should not be used.
          // I chose to use it here only for simplicity, to avoid adding a unique id to every array element.
          // Since there is no array manipulation necessary in this assignment this should not cause problems.
          <p key={i} onClick={this.handleClick(word)}>{word}</p>
        ))}
      </div>
    );
  }
}

export default Dictionary;
