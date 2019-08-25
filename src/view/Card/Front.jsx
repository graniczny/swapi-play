import React from 'react';
import { Card, CardContent, CardMedia } from '@material-ui/core';


const Front = ({ stats }) => {
  const { name, value, winFactorName, urlId } = stats;
  const imgUrlPart = winFactorName === 'mass' ? 'characters' : 'starships';
  return (
    <Card className="inner front">
      <CardContent className="head">
        <h1>{name}</h1>
      </CardContent>
      <CardMedia
        src={`https://starwars-visualguide.com/assets/img/${imgUrlPart}/${urlId}.jpg`}
        component="img"
        alt="Card picture"
        onError={(e) => { e.target.src = 'https://starwars-visualguide.com/assets/img/placeholder.jpg' }}
      />
      <CardContent>
        <h1>{winFactorName} : {value === 'unknown' ? '?' : value}</h1>
      </CardContent>
    </Card>
  )
}

export default Front;