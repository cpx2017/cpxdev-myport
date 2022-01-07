import React from 'react';
import {
    DialogContent,
    DialogActions,
    Button,
    Slide,
    Grid,
    Zoom,
  } from '@material-ui/core';
  import DialogTitle from '@material-ui/core/DialogTitle';
  import Grow from '@material-ui/core/Grow';
  import Typography from '@material-ui/core/Typography';
  import Box from '@material-ui/core/Box';

const FavCom = ({arr, setOpen, Lang, classes}) => {
    const [loaded, setLoaded] = React.useState(false)
    const handleImageLoad = () => {
        setLoaded(true);
    }
    return ( 
        <div>
            <Slide direction='left' in={true} timeout={localStorage.getItem('graphic') === null ? 900 : 0}>
              {arr.link !== undefined && arr.link !== '' ? (
                <a href={arr.link} target="_blank" rel="noopener noreferrer">
                  <DialogTitle id="scroll-dialog-title">
                    {arr.title}
                  </DialogTitle>
                </a>
              ) : (
                <DialogTitle id="scroll-dialog-title">
                  {arr.title}
                </DialogTitle>
              )}
              </Slide>
            <DialogContent dividers>
              <br />
              <Grid container spacing={4}>
            <Grid item sm md={5}>
              {window.innerWidth > 600 ? (
                <Zoom in={loaded} timeout={localStorage.getItem('graphic') === null ? 800 : 0}>
                <img
                    src={arr.src}
                    alt={arr.title}
                    width={'100%'}
                    onLoad={handleImageLoad}
                />
              </Zoom>
              ) : (
              <Grow in={loaded} timeout={localStorage.getItem('graphic') === null ? 800 : 0}>
                <img
                    src={arr.src}
                    alt={arr.title}
                    width={'100%'}
                    onLoad={handleImageLoad}
                />
              </Grow>
              )}
            
              {!loaded && (
                 <Grow in={!loaded}>
                    <div className={classes.loader}>
                      <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="70px" alt="load" />
                    </div>
                  </Grow>
                )}
            </Grid>
            <Grid item sm md={7}>
            <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 800 : 0}>
               <Box mt={3}>
                 <Typography>
                   {arr.desc}
                 </Typography>
               </Box>
             </Grow>
            </Grid>
        </Grid>
              
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="info">
                {Lang.ok}
              </Button>
            </DialogActions>
        </div>
     );
}
 
export default FavCom;