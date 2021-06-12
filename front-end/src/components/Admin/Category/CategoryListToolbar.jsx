import React, { useEffect, useState } from "react";
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
import Addcategory from "./Addcategory";

const CategoryListToolbar = ({ match, setUpdate, update }) => {
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
          color="secondary"
          style={{ marginRight: 10 }}
          variant="contained"
        >
          Delete category
        </Button>
        <Button
          color="primary"
          style={{ marginRight: 10 }}
          variant="contained"
          onClick={() => {
            setAddForm(true);
          }}
        >
          Add category
        </Button>
      </Box>
      <Addcategory
        match={match}
        AddClose={AddClose}
        open={addform}
        setUpdate={setUpdate}
        update={update}
      ></Addcategory>
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
                placeholder="Search category"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
export default CategoryListToolbar;
