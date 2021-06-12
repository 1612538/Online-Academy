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

const UserListToolbar = () => (
  <Box>
    <Box
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Button color="secondary" style={{ marginRight: 10 }} variant="contained">
        Delete user
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
              placeholder="Search user"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default UserListToolbar;
