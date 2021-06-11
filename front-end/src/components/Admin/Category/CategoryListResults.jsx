import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import axios from "axios";

const CategoryListResults = (props) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [cats, setCats] = useState([]);

  const getCats = async () => {
    const data = await axios.get(
      `http://localhost:8080/api/smallcategories/byCatID/${props.match.params.id}`
    );
    if (data.data) setCats(data.data);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCats();
    };
    fetchData();
    return () => {
      setCats([]);
    };
  }, [props.match]);

  return (
    <Card>
      <Box style={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Searched times</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cats.slice(0, limit).map((cat, key) => (
              <TableRow hover key={key}>
                <TableCell>
                  <Box
                    style={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Avatar
                      src={"http://localhost:8080" + cat.img}
                      style={{ marginRight: "20px" }}
                    >
                      {cat.name}
                    </Avatar>
                    <Typography color="textPrimary" variant="body1">
                      {cat.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{cat.count}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={cats ? cats.length : 0}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default CategoryListResults;
