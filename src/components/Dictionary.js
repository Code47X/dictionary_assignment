import React from 'react';
import DictService from '../services/DictService';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ImpulseSpinner } from "react-spinners-kit";
import '../styles/Dictionary.scss';

class Dictionary extends React.Component {
  state = {
    open: false,
    anchorEl: null,
    wordKey: null,
    definition: null,
    loading: false
  }

  handleClick = wordKey => async event => {
    const { currentTarget } = event;

    this.setState(state => ({
      open: state.anchorEl !== currentTarget || !state.open,
      anchorEl: currentTarget,
      wordKey,
      loading: true
    }));

    const word = wordKey.split('_')[0]
    const definition = await DictService.getDefinition(word);

    this.setState({
      definition,
      loading: false
    })

    console.log(definition);
  }

  render() {
    const { open, anchorEl, wordKey, definition, loading } = this.state;
    const words = ['carpenter', 'relax', 'faulty', 'white', 'clumsy', 'legs', 'trace', 'part', 'vacation', 'aware', 'notawordtest', 'afdsfadsfsf']
    const paragraph = "The quick brown fox jumps over the lazy dog. And now for some randomly generated text. A fabric alleges the invaluable script. Each circuit bounces into her sigh. This subtle dog enhances the confusing viewer. The ashamed harden chalks. The outlined opposite develops a backlog. The gate pats his image. The finished tour flies. A western trails underneath a required analogue. Inside a pedant reigns the intended opposite. A dog strikes near my heritage! When can a teapot lean?"

    return (
      <div>
        <h1 className="title">Dictionary Assignment</h1>

        {/*
          I'm using two seperate poppers here. One for the spinner and one for the definition.
          Ideally you would only need one, and just change contents based on the loading state,
          however there are issues with the positioning when the contents are changed in real time.
        */}

        <Popper open={loading && open} anchorEl={anchorEl} placement='top' transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className="spinContainer">
                <ImpulseSpinner size={30} />
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

        <Paper className="randWordsContainer">
          <Grid container>
            {words.map((word, i) => (
              // Using array indexes as keys is generally considered a bad practice and should not be used.
              // I chose to use it here only for simplicity, to avoid adding a unique id to every array element.
              // Since there is no array manipulation necessary in this assignment this should not cause problems.
              <Grid item xs={4} key={`${word}_${i}`}>
                <p
                  onClick={this.handleClick(`${word}_${i}`)}
                  className={open && wordKey === `${word}_${i}` ? 'highlight randomWord' : 'randomWord'}
                >
                  {word}
                </p>
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Paper className="paragraphContainer">
          {paragraph.split(' ').map((word, i) => {
            let w = word.replace(/[^A-Za-z]/g, "") // Just stripping punctuation for use as key here

            return (
              <span
                key={`${w}_${i}`}
                onClick={this.handleClick(`${w}_${i}`)}
                className={open && wordKey === `${w}_${i}` ? 'highlight paragraphText' : 'paragraphText'}
              >
                {word}
              </span>
            )
          })}
        </Paper>
      </div>
    );
  }
}

export default Dictionary;
