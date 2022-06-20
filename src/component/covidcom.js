import React, { useState } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Skeleton from '@material-ui/lab/Skeleton';
import Grow from '@material-ui/core/Grow';
import Fet from '../fetch'

const CovidApi = ({ Lang, setReady }) => {
    const [Load, setLoad] = useState(true);
    const [covidobj, setCovidobj] = useState({
            "updated": 631126800,
            "country": "Unknown error",
            "cases": 0,
            "todayCases": 0,
            "deaths": 0,
            "todayDeaths": 0,
            "recovered": 0,
            "todayRecovered": 0
    });
    const [country, setCountry] = useState(null);
    const thousandpat = /\B(?=(\d{3})+(?!\d))/g;
    function FetchCovid() {
        var wait = setInterval(function(){ 
            if (Fet().ul !== '') {
                clearInterval(wait);
                axios.post(Fet().ul + '/Home/getcovid')
                    .then(function (response) {
                    // handle success
                    setCovidobj(response.data);
                    setCountry(response.data.country);
                    setLoad(false);
                    setReady(true)
                }).catch(function () {
                    // handle error
                    setLoad(false);
                    setReady(true);
                })
            }
        }, 1);
    }
    React.useEffect(()=> {
        var de = setInterval(function(){ 
            if (country === null && Fet().ul !== '') {
                clearInterval(de)
                FetchCovid()
            }
        }, 1);
    }, [])
    return (
        <div>
            {Load === false ? (
            <TableContainer>
                <Table aria-label="simple table">
                      <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1500 : 0}>
                    <caption>Metadata from your location: {covidobj.country}<br/>Updated date: {new Date(covidobj.updated).toLocaleString()}</caption>
                      </Grow>
                   <TableBody>
                      <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 500 : 0}>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {Lang.coviddata[0].detail} {covidobj.todayCases.toString().replace(thousandpat, ",")} {Lang.coviddata[0].unit} ({Lang.coviddata[0].overall} {covidobj.cases.toString().replace(thousandpat, ",")} {Lang.coviddata[0].unit})
                            </TableCell>
                        </TableRow>
                      </Grow>
                      <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 700 : 0}>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {Lang.coviddata[1].detail} {covidobj.todayRecovered.toString().replace(thousandpat, ",")} {Lang.coviddata[1].unit} ({Lang.coviddata[1].overall} {covidobj.recovered.toString().replace(thousandpat, ",")} {Lang.coviddata[1].unit})
                            </TableCell>
                        </TableRow>
                      </Grow>
                      <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 900 : 0}>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                {Lang.coviddata[2].detail} {covidobj.todayDeaths.toString().replace(thousandpat, ",")} {Lang.coviddata[2].unit} ({Lang.coviddata[2].overall} {covidobj.deaths.toString().replace(thousandpat, ",")} {Lang.coviddata[2].unit})
                            </TableCell>
                        </TableRow>
                      </Grow>
                </TableBody>
              </Table>
           </TableContainer>
            ) : (
                <TableContainer>
                <Table aria-label="simple table">
                    <caption><Skeleton/></caption>
                   <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <Skeleton/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <Skeleton/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">
                                <Skeleton/>
                            </TableCell>
                        </TableRow>
                </TableBody>
              </Table>
           </TableContainer>
            )}
        </div>
    );
};
 
export default CovidApi;