import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Typography,
} from '@material-ui/core';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
const ErrorPage = () => {
  const classes = useStyles();
    return ( 
      <Fade in={true} timeout={localStorage.getItem('graphic') === null ? 800 : 0}>
        <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Not found this page
        </Typography>
        <Typography variant="h2" component="h2">
          Error 404
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Please check correct URL path to continue
        </Typography>
        <Typography variant="body2" component="p">
          ไม่พบหน้าเพจที่ระบุไว้
        </Typography>
      </CardContent>
    </Card>
    </Fade>
    );
}
 
export default ErrorPage;