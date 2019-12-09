import React from 'react';
import dayjs from 'dayjs';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import { useStyles } from './styles';
import { getCelsiusFromKelvin, getDirectionFromDegree } from './helpers';

const createIconLink = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

function WeatherExpansionPanel({ data }) {
  const classes = useStyles();

  const startTime = dayjs(data.dt_txt);
  const endTime = startTime.add(179, 'minute').format('HH:mm');
  return (
    <Grid item xs={4}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            {`${startTime.format('HH:mm')} - ${endTime}`}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container alignItems="center">
            <Grid item xs={6} container justify="center">
              <Avatar className={classes.bigAvatar} src={createIconLink(data.weather[0].icon)} />
            </Grid>
            <Grid
              xs={6}
              item
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Typography>
                {`${getCelsiusFromKelvin(data.main.temp)}°C`}
              </Typography>
              <Typography>
                {`${data.wind.speed} km/h - ${getDirectionFromDegree(data.wind.deg)}`}
              </Typography>
              <Typography>
                {`${data.main.humidity}%`}
              </Typography>
              <Typography className={classes.capitalize}>
                {data.weather[0].description}
              </Typography>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Grid>
  );
}

export default WeatherExpansionPanel;