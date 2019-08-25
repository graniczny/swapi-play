import React from 'react';
import { Grid, Card, CardContent, CardMedia } from '@material-ui/core';
import propTypes from 'prop-types';

const PickGame = ({ dataSelect }) => {
  return (
    <Grid
      className="pick-game"
      container
      spacing={6}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <h1>Pick cards!</h1>
      </Grid>
      <Grid item xs={2}>
        <Card className="pick-game-card" onClick={() => { dataSelect('people') }}>
          <CardMedia
            src='https://starwars-visualguide.com/assets/img/characters/1.jpg'
            component="img"
            alt="Character picture"
          />
          <CardContent>
            <h1>Characters</h1>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={2}>
        <Card className="pick-game-card" onClick={() => { dataSelect('starships') }}>
          <CardMedia
            src='https://starwars-visualguide.com/assets/img/starships/10.jpg'
            component="img"
            alt="Starship picture"
          />
          <CardContent>
            <h1>Starships</h1>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
PickGame.propTypes = {
  dataSelect: propTypes.func,
}
export default PickGame;