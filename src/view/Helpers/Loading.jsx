import React from 'react';
import { Grid } from '@material-ui/core';
import LoadingGif from './loading.gif'

const Loading = () => {
  return (
    <Grid
      className="loading-site"
      container
      justify="center"
      alignItems="center"
    >
      <Grid item xs={2}>
        <img src={LoadingGif} alt="Loading circle" />
      </Grid>
    </Grid>
  )
}

export default Loading;