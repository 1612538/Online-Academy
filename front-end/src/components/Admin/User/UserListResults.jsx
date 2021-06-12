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

const UserListResults = () => {
  const [limit, setLimit] = useState(10);
  const [start, setStart] = useState(0);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);

  const config = {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
  };

  const getUser = async () => {
    const data = await axios.get("http://localhost:8080/api/userslist", config);
    if (data.data) setUsers(data.data);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    setLimit(newPage * 10 + 10);
    setStart(newPage * 10);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
    };
    fetchData();
    return () => {
      setUsers([]);
    };
  }, []);

  return (
    <Card>
      <Box style={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Occupation</TableCell>
              <TableCell>Verify</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(start, limit).map((user, key) => (
              <TableRow hover key={key}>
                <TableCell>
                  <Box
                    style={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Avatar
                      src={"http://localhost:8080" + user.img}
                      style={{ marginRight: "20px" }}
                    >
                      {user.name}
                    </Avatar>
                    <Typography color="textPrimary" variant="body1">
                      {user.firstname + " " + user.lastname}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.occupation}</TableCell>
                <TableCell>
                  {user.isVerify === 0 ? "Not verify" : "Verified"}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={users ? users.length : 0}
        onChangePage={handlePageChange}
        page={page}
        rowsPerPage={10}
        rowsPerPageOptions={[10]}
      />
    </Card>
  );
};

export default UserListResults;
