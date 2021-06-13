import { useState } from "react";
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

import Addteacher from "./Addteacher";

const TeacherListToolbar = ({ setUpdate, update }) => {
  const [addform, setAddForm] = useState(false);

  const AddClose = () => {
    setAddForm(false);
  };
  return (
    <Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          color="primary"
          style={{ marginRight: 10 }}
          variant="contained"
          onClick={() => {
            setAddForm(true);
          }}
        >
          Add teacher
        </Button>
      </Box>
      <Addteacher
        AddClose={AddClose}
        open={addform}
        setUpdate={setUpdate}
        update={update}
      ></Addteacher>
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
};

export default TeacherListToolbar;
