import React, { useState } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import StarsOutlinedIcon from '@material-ui/icons/StarsOutlined';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import 'react-vertical-timeline-component/style.min.css';
import '../TimelineBorder.css';
import en from '../lang/en/jobex.json';
import th from '../lang/th/jobex.json';

import Grow from '@material-ui/core/Grow';

const Job = () => {
    const [Lang, setLang] = useState(th);

    const syncpage = () => {
      if (localStorage.getItem('langconfig') !== null) {
        if (localStorage.getItem('langconfig') === 'th') {
          setLang(th);
        } else {
          setLang(en);
        }
      }
    };
    
    React.useEffect(() => {
      syncpage();
    });

    return ( 
        <div>
          <Slide direction="right" in={true} timeout={localStorage.getItem('graphic') === null ? 600 : 0}>
            <Typography variant="h5">{Lang.title}</Typography>
          </Slide>
            <hr/>
          <Grow in={true} timeout={localStorage.getItem('graphic') === null ? 1400 : 0}>
            <VerticalTimeline className="vertical-timeline.vertical-timeline-custom-line">
            {Lang.list.map((item, i) => (
                <VerticalTimelineElement
                    key={i+1}
                    className="vertical-timeline-element--work"
                    date={(<Typography variant="subtitle1">{item.start + ' - ' + item.end}</Typography>)}
                    iconStyle={item.presentjob ? { background: "rgb(0, 224, 56)", color: '#fff' } :{ background: item.color, color: '#fff' }}
                    icon={item.presentjob ? <StarsOutlinedIcon /> : <WorkOutlineIcon />}
                >
                    <Typography variant="h6">{item.title}</Typography>
                    <hr/>
                    <Typography variant="subtitle2">{item.locate}</Typography>
                    <Typography variant="body1">{item.desc}</Typography>
                </VerticalTimelineElement>
            ))}
            </VerticalTimeline>
          </Grow>
        </div>
     );
}
 
export default Job;