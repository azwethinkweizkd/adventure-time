import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function Playground() {
  // const defaultProps = {
  //   options: top100Films,
  //   getOptionLabel: (option) => option.title,
  // };

  // const flatProps = {
  //   options: top100Films.map((option) => option.title),
  // };

  // const [value, setValue] = React.useState(null);

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        // {...defaultProps}
        id="disable-close-on-select"
        disableCloseOnSelect
        options={parkNames}
        renderInput={(params) => (
          <TextField
            {...params}
            label="National Park Visited"
            variant="standard"
          />
        )}
      />
      <Autocomplete
        // {...defaultProps}
        id="clear-on-escape"
        clearOnEscape
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
