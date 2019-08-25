import React from 'react';
import { Card, CardMedia } from '@material-ui/core';
import Logo from './logo.webp';

const Reverse = () => {
  return (
    <Card className="inner reverse">
      <CardMedia
        component="img"
        src={Logo}
      />
    </Card>
  )
}

export default Reverse