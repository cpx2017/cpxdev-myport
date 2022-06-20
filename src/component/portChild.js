import React from 'react';
import Paper from '@material-ui/core/Paper';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Grow from '@material-ui/core/Grow';
const PortCom = ({item, classes, Lang}) => {
    const [loaded, setLoaded] = React.useState(false)
    const handleImageLoad = () => {
        setLoaded(true);
    }
    return (
        <Grid item xs={12} sm={6}>
            <Paper>
                    <Card className={classes.root}>
                        <CardActionArea>
                        <Grow in={loaded} timeout={localStorage.getItem('graphic') === null ? 1300 : 0}>
                            <img src={item.src} onLoad={handleImageLoad} alt={item.title} width="100%" />
                        </Grow>
                            {!loaded && (
                              <div className={classes.loader}>
                                <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="80px"alt="load" />
                              </div>
                            )}
                        <CardContent>
                            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1500 : 0}>
                            <Typography gutterBottom variant="h5" component="h2">
                                {item.title}
                            </Typography>
                            </Grow>
                            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1600 : 0}>
                            <Typography variant="subtitle1" color="textSecondary" component="p">
                                {item.group}
                            </Typography>
                            </Grow>
                            <hr />
                            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1900 : 0}>
                            <Typography variant="body1" component="p">
                                {item.desc}
                            </Typography>
                            </Grow>
                        </CardContent>
                        </CardActionArea>
                        {item.link !== '' && (
                        <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 2100 : 0}>
                        <CardActions>
                            <Button href={item.link} target="_blank" color="secondary" size="small">{Lang.see}</Button>
                        </CardActions>
                        </Grow>
                        )}
                    </Card>
                </Paper>
        </Grid>
    )
    
}
 
export default PortCom;