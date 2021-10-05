import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import axios from "axios";
import { category, skiResorts } from "../../utils/allCategories";
export default function Playground() {
  const [parkNames, setParkNames] = useState([]);

  useEffect(() => {
    axios.get("/natParkSearch").then((res) => {
      setParkNames(res.data);
    });
  }, []);

  const options = [].concat(parkNames, skiResorts);

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        id="disable-close-on-select"
        disableCloseOnSelect
        autoComplete={(parkNames, skiResorts)}
        options={options}
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
        renderInput={(params) => (
          <TextField {...params} label="Activities" variant="standard" />
        )}
      />
      <Button className="btn btn-info btn-block py-3" type="submit">
        Submit
      </Button>
    </Stack>
  );
}
