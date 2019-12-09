import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import LinearProgress from '@material-ui/core/LinearProgress';
import dayjs from 'dayjs';

import { getWeather } from './reducers/weatherReducer';
import CityForm from './CityForm';
import { useStyles } from './styles';
import { getWeekday } from './helpers';
import WeatherSummaryCard from './WeatherSummaryCard';
import WeatherExpansionPanel from './WeatherExpansionPanel';
import { Typography } from '@material-ui/core';


function App() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [currentDayWeather, setCurrentDayWeather] = React.useState({});

  const handleOpen = (data) => {
    setCurrentDayWeather(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const weatherState = useSelector((state) => {
    const weatherForecastData = state.weather.data || {};
    const data = Object.values(weatherForecastData)
      .sort((previousItem, currentItem) => dayjs(previousItem.day).valueOf() - dayjs(currentItem.day).valueOf());

    return {
      isLoading: state.weather.isLoading,
      data,
      error: state.weather.error,
    };
  }, shallowEqual);

  const getTitleComponent = () => {
    if (weatherState.isLoading) {
      return <LinearProgress />;
    }

    if (weatherState.error) {
      const message = <span className={classes.errorMessage}>{weatherState.error.message}</span>;
      return <Typography className={classes.textCenter}>{message}</Typography>;
    }

    if (weatherState.data.length > 0) {
      const summary = weatherState.data[0];
      const message = `Weather of ${summary.city} in ${summary.country}`;
      return <Typography className={classes.textCenter}>{message}</Typography>;
    }

    return null;

  }

  const onSubmit = ({ city, countryCode }) => dispatch(getWeather(city, countryCode));

  const modalTitle = `Weather of ${currentDayWeather.city} on ${currentDayWeather.day} ${getWeekday(currentDayWeather.weekday)}`;

  return (
    <div className={classes.root}>
      <Grid container justify="center">
        <CityForm onSubmit={onSubmit} className={classes.cityForm} />
      </Grid>
      {getTitleComponent()}
      <div>
        <Grid
          container
          spacing={1}
          justify="center"
          alignItems="stretch"
        >
          {weatherState.data.length > 0 && weatherState.data.map(summary => (
            <Grid key={`${summary.city}-${summary.day}`} item lg={2} md={3} sm={4} xs={6} justify="center" container>
              <WeatherSummaryCard summary={summary} onActionClick={handleOpen} />
            </Grid>
          ))}
        </Grid>
        <Modal
          disableAutoFocus
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 className={classes.textCenter}>{modalTitle}</h2>
              <Grid container spacing={1} alignItems="stretch" justify="center">
                {
                  currentDayWeather.threeHoursForecasts
                  && currentDayWeather.threeHoursForecasts.map(dayData => <WeatherExpansionPanel data={dayData} />)
                }
              </Grid>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default App;
