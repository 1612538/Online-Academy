import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const TeacherListToolbar = () => (
  <Box>
    <Box
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button>Import</Button>
      <Button style={{ marginLeft: 10, marginRight: 10 }}>Export</Button>
      <Button color="primary" variant="contained">
        Add teacher
      </Button>
    </Box>
    <Box style={{ marginTop: 30 }}>
      <Card>
        <CardContent>
          <Box style={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon fontSize="small" color="action">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder="Search teacher"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default TeacherListToolbar;
