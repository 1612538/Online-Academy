import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";

const CategoryListResults = (props) => {
  const [limit, setLimit] = useState(10);
  const [start, setStart] = useState(0);
  const [page, setPage] = useState(0);
  const [cats, setCats] = useState([]);
  const [show, setShow] = useState(-1);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const config = {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
  };

  const getCats = async () => {
    const data = await axios.get(`http://localhost:8080/api/categories/`);
    let tmp = data.data;
    if (tmp) {
      for (let cat of tmp) {
        const data2 = await axios.get(
          `http://localhost:8080/api/smallcategories/byCatID/${cat.idcategory}`
        );
        if (data2) cat.count = data2.data.length;
        else cat.count = 0;
      }
      setCats(tmp);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    setLimit(newPage * 10 + 10);
    setStart(newPage * 10);
  };

  const handleDelete = async (id, count) => {
    if (count > 0) setOpen(true);
    else {
      const data = await axios.delete(
        `http://localhost:8080/api/categories/${id}`,
        config
      );
      if (data.data.success === true) {
        let tmp = cats;
        tmp = tmp.filter((obj) => obj.idcategory !== id);
        setCats([...tmp]);
      }
    }
  };

  const handleUpdate = async (id) => {
    const data = {
      name: name,
    };
    const returnData = await axios.put(
      `http://localhost:8080/api/categories/${id}`,
      data,
      config
    );
    if (returnData.data.success === true) {
      let tmp = cats;
      let i = tmp.findIndex((obj) => obj.idcategory === id);
      tmp[i].name = name;
      setCats([...tmp]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCats();
    };
    fetchData();
    return () => {
      setCats([]);
    };
  }, [props.match, props.update]);

  return (
    <Card>
      <Box style={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Number of categories</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cats.length > 0
              ? cats.slice(start, limit).map((cat, key) => (
                  <TableRow hover key={key}>
                    <TableCell>
                      <Box
                        style={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {show !== key ? (
                          <Typography color="textPrimary" variant="body1">
                            {cat.name}
                          </Typography>
                        ) : (
                          <TextField
                            label="Category name"
                            variant="outlined"
                            defaultValue={cat.name}
                            style={{ height: "40px" }}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>{cat.count}</TableCell>
                    <TableCell>
                      {show !== key ? (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{
                              maxWidth: "35px",
                              maxHeight: "35px",
                              minWidth: "35px",
                              minHeight: "35px",
                            }}
                            onClick={() => {
                              setShow(key);
                              setName(cat.name);
                            }}
                          >
                            <EditIcon></EditIcon>
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{
                              marginLeft: "10px",
                              maxWidth: "35px",
                              maxHeight: "35px",
                              minWidth: "35px",
                              minHeight: "35px",
                            }}
                            onClick={() => {
                              handleDelete(cat.idcategory, cat.count);
                            }}
                          >
                            <DeleteIcon></DeleteIcon>
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{
                              maxWidth: "35px",
                              maxHeight: "35px",
                              minWidth: "35px",
                              minHeight: "35px",
                            }}
                            onClick={() => {
                              handleUpdate(cat.idcategory);
                              setShow(-1);
                            }}
                          >
                            <CheckIcon></CheckIcon>
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{
                              marginLeft: "10px",
                              maxWidth: "35px",
                              maxHeight: "35px",
                              minWidth: "35px",
                              minHeight: "35px",
                            }}
                            onClick={() => {
                              setShow(-1);
                            }}
                          >
                            <ClearIcon></ClearIcon>
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              : undefined}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={cats.length > 0 ? cats.length : 0}
        onChangePage={handlePageChange}
        page={page}
        rowsPerPage={10}
        rowsPerPageOptions={[10]}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          You cannot delete main categories that contain categories!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default CategoryListResults;
