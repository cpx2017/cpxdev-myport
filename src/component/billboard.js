import React from 'react';
import { Typography, CardContent, Card, CardActionArea } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';

const BillCom = ({item, classes, i, slideInc}) => {
    const [loaded, setLoaded] = React.useState(false)
    const handleImageLoad = () => {
        setLoaded(true);
    }

    return ( 
     
         <Card key={i}>
           {item.lnk != undefined ? (
              <a href={item.lnk} target='_blank'>
                <CardActionArea>
            <img src={item.src} alt={item.title} className="slide" onLoad={handleImageLoad} width="100%" />
                {!loaded && (
                  <div className={classes.loader}>
                    <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="70px" alt="load" />
                  </div>
                )}
                <CardContent>
                    <div className="carousel-text">
                      <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1000 : 0}>
                        <Typography variant="h5">{item.title}</Typography>
                      </Grow>
                        <br />
                      <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1500 : 0}>
                        <Typography variant="subtitle1">{item.desc}</Typography>
                      </Grow>
                        <hr />
                      <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 2000 : 0}>
                        <Typography variant="subtitle2">
                          {localStorage.getItem('langconfig') != null && localStorage.getItem('langconfig') == 'th' ? 'มีลิงก์อ้างอิง กรุณาคลิกที่นี' : 'This slide include link. Click here'}
                        </Typography>
                      </Grow>
                    </div>   
                </CardContent>
        </CardActionArea>
              </a>
           ) : (
            <CardActionArea>
            <img src={item.src} alt={item.title} className="slide" onLoad={handleImageLoad} width="100%" />
                {!loaded && (
                  <div className={classes.loader}>
                    <img src="https://cdn.jsdelivr.net/gh/cpx2017/cpxcdnbucket@main/main/cpx-circular.svg" width="70px" alt="load" />
                  </div>
                )}
                <CardContent>
                    <div className="carousel-text">
                      <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1000 : 0}>
                        <Typography variant="h5">{item.title}</Typography>
                      </Grow>
                        <br />
                      <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1500 : 0}>
                        <Typography variant="subtitle2">{item.desc}</Typography>
                      </Grow>
                    </div>   
                </CardContent>
        </CardActionArea>
           )}
        
    </Card>
       
    );
}
 
export default BillCom;