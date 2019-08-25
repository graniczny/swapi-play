import React from 'react';
import { Card, CardMedia } from '@material-ui/core';
import Logo from '../Resources/logo.webp';

const Reverse = () => {
  return (
    <Card className="inner reverse">
      <CardMedia
        component="img"
        src={Logo}
        alt="Star wars logo"
      />
    </Card>
  )
}

export default Reverse