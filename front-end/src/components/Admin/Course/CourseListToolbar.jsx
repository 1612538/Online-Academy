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

const CourseListToolbar = (props) => (
  <Box>
    <Box
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
    ></Box>
    <Box style={{ marginTop: 30 }}>
      <Card>
        <CardContent>
          <Box style={{ width: 500, display: "inline-block", marginRight: 15 }}>
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
              placeholder="Search course"
              variant="outlined"
              onChange={(e) => {
                props.setName(e.target.value);
              }}
            />
          </Box>
          <Box style={{ width: 500, display: "inline-block" }}>
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
              onChange={(e) => {
                props.setTeacher(e.target.value);
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);

export default CourseListToolbar;
