import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Auth from '../../utils/auth';
import axios from "axios";
import { ADD_ACTIVITY } from '../../utils/mutations';
import { category, skiResorts } from "../../utils/allCategories";

export default function Playground({ profileId }) {
  const [parkNames, setParkNames] = useState([]);

  useEffect(() => {
    axios.get("/natParkSearch").then((res) => {
      setParkNames(res.data);
    });
  }, []);

  const options = [].concat(parkNames, skiResorts);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [addActivity, { error }] = useMutation(ADD_ACTIVITY);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const activityData = { title: title, description: description }
    try {
      const data = await addActivity({
        variables: { profileId, activityData },
      });

      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <form
          onSubmit={handleFormSubmit}
        >
          <Stack spacing={2}>
            <Autocomplete
              id="disable-close-on-select"
              disableCloseOnSelect
              autoComplete={(parkNames, skiResorts)}
              options={options}
              value={description}
              onChange={(event, newValue) => { setDescription(newValue) }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="National Park or Ski Resort Visited"
                  variant="standard"
                />
              )}
            />
            <Autocomplete
              id="clear-on-escape"
              clearOnEscape
              autoComplete={category}
              options={category}
              value={title}
              onChange={(event, newValue) => { setTitle(newValue) }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Activities"
                  variant="standard"
                />
              )}
            />
            <Button className="btn btn-info btn-block py-3" type="submit">
              Submit
            </Button>
          </Stack>
        </form>
      ) : (
        <p>
          You need to be logged in to add an adventure. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
}
