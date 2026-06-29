import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export default function NotificationFilter({
  type,
  setType,
  limit,
  setLimit,
}) {
  return (
    <Box
      display="flex"
      gap={3}
      marginBottom={3}
    >
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Notification Type</InputLabel>

        <Select
          value={type}
          label="Notification Type"
          onChange={(e) =>
            setType(e.target.value)
          }
        >
          <MenuItem value="ALL">All</MenuItem>

          <MenuItem value="PLACEMENT">
            Placement
          </MenuItem>

          <MenuItem value="EVENT">
            Event
          </MenuItem>

          <MenuItem value="RESULT">
            Result
          </MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Top N"
        type="number"
        value={limit}
        onChange={(e) =>
          setLimit(Number(e.target.value))
        }
      />
    </Box>
  );
}