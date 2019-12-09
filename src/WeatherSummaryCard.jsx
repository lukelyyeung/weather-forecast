import React from 'react';
import { useStyles } from "./styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import { getWeekday, getCelsiusFromKelvin } from './helpers';

export default function WeatherSummaryCard({ summary, onActionClick }) {
  const styles = useStyles();
  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <div>
          <h3 className={styles.textCenter}>{`${summary.day} ${getWeekday(summary.weekday)}`}</h3>
          <Divider />
          <Grid container spacing={1} justify="center" className={styles.weatherIconGroups}>
            {summary.weathers.map(weather => {
              return (
                <Grid item xs={3} key={weather.icon}>
                  <Avatar className={styles.smallAvatar} src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
                </Grid>
              );
            })}
          </Grid>
          <Typography className={styles.textCenter}>
            <span>{`${getCelsiusFromKelvin(summary.minTemp)}°C`} - </span>
            <span className={styles.emphasize}>{`${getCelsiusFromKelvin(summary.maxTemp)}°C`}</span>
          </Typography>
          <Typography className={styles.textCenter}>
            <span>{`${summary.minHumidity}%`} - </span>
            <span className={styles.emphasize}>{`${summary.maxHumidity}%`}</span>
          </Typography>
          <Typography className={styles.textCenter}>
            <span>{`${summary.minWindSpeed} km/h`} - </span>
            <span className={styles.emphasize}>{`${summary.maxWindSpeed} km/h`}</span>
          </Typography>
          <div>
            <Divider />
            <Typography>Weathers:</Typography>
            {summary.weathers.map(({ description }) => (<p className={styles.capitalize} key={description}>{description}</p>))}
          </div>
        </div>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onActionClick(summary)}>Learn More</Button>
      </CardActions>
    </Card>
  )
}