import React, { useState } from 'react';

import Loading from './Helpers/Loading';
import PickGame from './GameBoard/PickGame';
import apiFetch from './Helpers/apiFetch';
import GameBoard from './GameBoard/GameBoard';

const Game = () => {
  const [feed, setFeed] = useState([]);
  const [winFactor, setWinFactor] = useState('');
  const [loading, setLoading] = useState(false);

  const getFeed = async (url) => {
    const feed = await apiFetch(url);
    setFeed(feed);
    setLoading(false);
  }

  const onCardsSelected = (type) => {
    setLoading(true);
    const url = `https://swapi.co/api/${type}`;
    setWinFactor(type === 'people' ? 'mass' : 'crew');
    getFeed(url);
  }

  const onChangeGameData = () => {
    setFeed([]);
    setWinFactor('');
  }

  if (loading) {
    return (
      <Loading />
    )
  }
  return (
    <div className="game-wrapper">
      {!feed.length ?
        <PickGame dataSelect={onCardsSelected} /> :
        <GameBoard feed={feed} winFactor={winFactor} changeGameData={onChangeGameData} />
      }
    </div>
  )
}

export default Game;