import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import countries from './countries.json';
import AutoComplete from '@material-ui/lab/Autocomplete';
import { Button, Card, CardContent } from '@material-ui/core';

function CityForm({ onSubmit, className }) {

  const [formData, setFormData] = useState({});

  const onCityNameChanged = ({ currentTarget: { value } }) => setFormData((state) => ({ ...state, city: value }));
  const onCountryCodeChanged = ({ currentTarget: { value } }) => setFormData((state) => ({ ...state, countryCode: value }));
  const onButtonClicked = () => onSubmit(formData);

  return (
    <Card className={className}>
      <CardContent>
        <form style={{display: 'flex', flexDirection: 'column'}}>
          <TextField name="city" onChange={onCityNameChanged} id='city-name-input' label='City' />
          <AutoComplete
            options={countries}
            getOptionLabel={option => option}
            renderInput={params => (
              <TextField {...params} onChange={onCountryCodeChanged} label="Country Code" fullWidth />
            )}
          />

          <Button onClick={onButtonClicked}>Tell me the Weather!</Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default CityForm;
