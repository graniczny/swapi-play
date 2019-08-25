import React, { useState } from 'react';
import { Grid, Button } from '@material-ui/core';
import propTypes from 'prop-types';

import { getWinner, prepareRoundData } from '../Helpers/gameDataAdjust';
import GameCard from '../Card/GameCard';
import Reverse from '../Card/Reverse';
import deathStar from '../Resources/deathstar.png';


const GameBoard = ({ feed, winFactor, changeGameData }) => {
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [roundData, setRoundData] = useState(false);
  const [killRound, setKillRound] = useState(false);
  const [draw, setDraw] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const finishRound = () => {
    const winner = getWinner(roundData);
    if (winner === 'draw') {
      setDraw(true);
    } else {
      setScore((currentScore) => {
        const newScore = { ...currentScore };
        newScore[winner] = newScore[winner] + 1;
        return newScore;
      })
    }
    setButtonDisabled(false);
  }

  const startNewRound = () => {
    const newRoundData = prepareRoundData(feed, winFactor);
    setRoundData(false);
    setTimeout(() => {
      setKillRound(false);
      setDraw(false);
      setRoundData(newRoundData);
    }, 10)
  }

  const nextRound = () => {
    setButtonDisabled(true);
    if (roundData) {
      setKillRound(true);
    } else {
      startNewRound();
    }
  }

  return (
    <Grid container spacing={0} className="game-room">
      <Grid item xs={12} className="score-board">
        <h1>
          <span className="score">{score.player1}</span> : <span className="score">{score.player2}</span>
        </h1>
      </Grid>
      <Grid item xs={3} className="card-holder" >
        <div className="card-slot">
          {roundData ?
            <div className="animated-card">
              <GameCard
                stats={roundData.player1}
                onFinishRound={finishRound}
                killRound={killRound}
                onRoundKilled={startNewRound}
                left
              />
            </div> :
            ''
          }
          <div className="gamecard">
            <Reverse />
          </div>
        </div>
      </Grid>
      <Grid item xs={6} className="game-table">
        {draw && <h2>Can't tell who wins.</h2>}
        <img src={deathStar} alt="Star Wars Death Star" />
      </Grid>
      <Grid item xs={3} className="card-holder">
        <div className="card-slot">
          {roundData ?
            <div className="animated-card">
              <GameCard
                stats={roundData.player2}
                killRound={killRound}
                onFinishRound={() => { }}
                onRoundKilled={() => { }}
              />
            </div> :
            ''
          }
          <div className="gamecard">
            <Reverse />
          </div>
        </div>
      </Grid>
      <Grid item xs={3} className="round-control">
        <Button variant="outlined" onClick={changeGameData} disabled={buttonDisabled}>
          Change cards
        </Button>
      </Grid>
      <Grid item xs={6} className="round-control">
        <Button variant="outlined" onClick={nextRound} disabled={buttonDisabled}>
          Next round!
        </Button>
      </Grid>
    </Grid>
  )
}

GameBoard.propTypes = {
  feed: propTypes.array,
  winFactor: propTypes.string,
  changeGameData: propTypes.func,
}

export default GameBoard