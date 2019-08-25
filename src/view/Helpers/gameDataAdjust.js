const getRandomCards = (cards) => {
  const baseNumber = cards.length - 1;
  const firstCardNumber = Math.round(Math.random() * baseNumber);
  const secondCardNumber = Math.round(Math.random() * baseNumber);
  if (firstCardNumber !== secondCardNumber) {
    return [
      cards[firstCardNumber],
      cards[secondCardNumber],
    ]
  } else {
    return getRandomCards(cards);
  }
}

const determineWiningCard = (roundData) => {
  const returnObj = [...roundData];
  const factors = roundData.map(ele => {
    const withoutComma = ele.value.split(',').join('');
    return parseInt(withoutComma, 10);
  });
  if (isNaN(factors[0]) || isNaN(factors[1]) || factors[0] === factors[1]) {
    return roundData.map(ele => ({ ...ele, win: 'draw' }))
  } else if (factors[0] > factors[1]) {
    returnObj[0].win = true;
    return returnObj;
  } else {
    returnObj[1].win = true;
    return returnObj;
  }
}

const getWinner = (data) => {
  const players = Object.keys(data);
  return players.map(ele => {
    if (data[ele].win && data[ele].win === "draw") {
      return "draw";
    } else if (data[ele].win) {
      return ele;
    } else {
      return false;
    }
  }).filter(ele => ele)[0];
}

const getUrlId = (url) => {
  const arr = url.split('/');
  return arr[arr.length - 2];
}

const getOnlyWantedFields = (cards, winFactor) => {
  return cards.map(ele => ({
    name: ele.name,
    value: ele[winFactor],
    winFactorName: winFactor,
    urlId: getUrlId(ele.url),
  }));
}

const prepareRoundData = (cards, winFactor) => {
  const pickedCards = getRandomCards(cards);
  const onlyWantedFields = getOnlyWantedFields(pickedCards, winFactor);
  const determinedWinner = determineWiningCard(onlyWantedFields);
  const roundData = {
    player1: determinedWinner[0],
    player2: determinedWinner[1],
  }
  return roundData;
}

export {
  getWinner,
  prepareRoundData,
  determineWiningCard,
  getOnlyWantedFields,
  getRandomCards
}