import { Card, CardContent, Typography } from '@material-ui/core';
import './styles.scss';

import React from 'react'

const CustomCard = ({ data: { name, createdBy } }) => {
  console.log(name, createdBy);
  return (
    <Card className="Card" variant='outlined'>
      <CardContent>
        <Typography variant='h4'>{name}</Typography>
        <Typography variant='body1'>{createdBy}</Typography>
      </CardContent>
    </Card>
  )
}


export default CustomCard;