import React from 'react';
import { 
  Card, CardActionArea, CardContent, Typography, Button, CardActions,
  Divider,
  Dialog,
  Grid,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Grow,
  TextField,
} from '@material-ui/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.min.css'
import axios from 'axios';
import Fet from '../fetch'


const Home = ({Load, setLoadIco, col, setCol}) => {
  const [ Req, setReq] = React.useState(false);
  const [ stat, setstat] = React.useState(null);
  const mailpat = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
    const APITest = () => {
      axios.get('https://api.cpxdev.tk/Home/status')
      .then(function () {
          setstat(true)
      }).catch(function () {
        // handle error
        setstat(false)
      });
    }
    React.useEffect(() => {
      APITest();
    }, [])

    const getinput = (id) => {
      return document.getElementById(id).value;
    }
    const getAccess = () => {
      if (getinput('apiname') !== '' && getinput('apiemail') !== '' && mailpat.test(getinput('apiemail'))) {
        setCol(true)
        setReq(false)
        setLoadIco(true)
        fetch(Fet().ul + `/myportsite/getapi?Name=${document.getElementById('apiname').value}&Email=${document.getElementById('apiemail').value}`, {method: 'POST'})
          .then(response => response.json())
          .then(data => {
            setLoadIco(false)
            Swal.fire({
                title: 'Client ID and Secret Pass has been generated successfully.',
                html: 'Your Client ID is <b>' + data.id + "</b>. Don't be forget to check your Secret Pass in your E-mail <b>" + data.email + "</b> to get access key.",
                icon: 'success',
            }).then((result) => {
              setCol(false)
            })
          })
          .catch(error => {
            setLoadIco(false)
            Swal.fire({
              title: 'Something went wrong',
              text: 'Unknown error when try to get request to region server. Please conact agent.',
              icon: 'error',
            }).then((result) => {
              setCol(false)
            })
          })
      } else {
        setReq(false)
        Swal.fire({
          title: 'Value is null or incorrect format',
          text: 'Please check inputbox is not blank and correct format Email address.',
          icon: 'warning',
        }).then((result) => {
          setReq(true)
        })
      }
    };

    return ( 
      <div>
         <Card>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h4" component="h2">
                  Welcome to MyPort API (A Part of CPX API Service)
              </Typography>
              <hr />
            </CardContent>
            <CardContent>
              <Typography component="p" variant="body1">
                  MyPort API is public API which access my profile for Job researching or learning for free. But for commercial usaged, you need to contact us because system resource is limited feature and maybe unstable.
              </Typography>
              <br />
              <Typography component="p" variant="body1">
                  First, click below button to get new Client ID and Secret Pass.
              </Typography>
              <Typography component="p" variant="body1">
                  Notes: Given CPX API Auth profile also can use with another API service under CPX API Service (CPX Covid19 and Unofficial BNK48 Members Public API etc.).
              </Typography>
              <br />
              <CardActions>
                <Button color="secondary" href="https://apicenter.cpxdev.tk/myport" variant="text" target="_blank">
                  Get CPX API Auth profile (ClientID and Secretpass)
                </Button>
                <Button color="secondary" href="https://documenter.getpostman.com/view/13721881/Tzz7Py3t" variant="text" target="_blank">
                  See API Documentation here
                </Button>
              </CardActions>
            </CardContent>
            <Card>
            <CardContent>
              <Typography className={stat === true ? 'green' : stat === false ? 'red' : ''} component="p" variant="body1">
                  API Service Status: {stat === true ? 'Systems are great.' : stat === false ? 'Systems is temporary down or under maintenance.' : 'Checking API status'}
              </Typography>
            </CardContent>
            </Card>
          </CardActionArea>
        </Card>
            
      </div>
    );
}
 
export default Home;
