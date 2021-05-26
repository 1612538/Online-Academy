import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card, CardActionArea, CardContent, CardMedia, Typography, Button, Grid, Link} from '@material-ui/core';
import {blue} from '@material-ui/core/colors';

const useStyles = makeStyles({
  root: {
    backgroundColor: blue[50],
    width: 250,
  },
  media: {
    height: 120,
    borderBottom: '1px solid #e0e0e0',
  },
  custom: {
    display: "-webkit-box",
    boxOrient: "vertical",
    lineClamp: 2,
    overflow: "hidden",
    lineHeight: 1.5,
  },
});

export default (props) => { 

    const category = props.categories;

  useEffect(() => {

  })

  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Link color='inherit' underline='none' href={`/categories/${category.idsmall_category}`}>
        <CardMedia
          className={classes.media}
          image={'http://localhost:8080'+category.img}
          title={category.name}
        />
        </Link>
        <CardContent>
          <Link color='inherit' underline='none' href={`/categories/${category.idsmall_category}`}>
          <Typography gutterBottom variant="subtitle1" component="h2" className={classes.custom}>
            {category.name}
          </Typography>
          </Link>
          <Typography variant="body2" color="textSecondary" component="p">
              Total enrollment: {category.count}
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}