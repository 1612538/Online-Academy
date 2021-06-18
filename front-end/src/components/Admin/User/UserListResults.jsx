import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const UserListResults = () => {
  const [limit, setLimit] = useState(10);
  const [start, setStart] = useState(0);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [show, setShow] = useState(-1);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

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

  const handleDelete = async (id) => {
    const data = await axios.delete(
      `http://localhost:8080/api/users/${id}`,
      config
    );
    if (data.data.success === true) {
      let tmp = users;
      tmp = tmp.filter((obj) => obj.iduser !== id);
      setUsers([...tmp]);
    }
  };

  const handleUpdate = async (id) => {
    const data = {
      email: email,
      firstname: firstName,
      lastname: lastName,
      username: username,
    };
    const returnData = await axios.put(
      `http://localhost:8080/api/users/${id}`,
      data,
      config
    );
    if (returnData.data.success === true) {
      let tmp = users;
      let i = tmp.findIndex((obj) => obj.iduser === id);
      tmp[i].email = email;
      tmp[i].firstname = firstName;
      tmp[i].lastname = lastName;
      tmp[i].username = username;
      setUsers([...tmp]);
    }
  };

  const handleLock = async (id, isBlock) => {
    const data = {
      isBlocked: isBlock === 0 ? 1 : 0,
    };
    const returnData = await axios.put(
      `http://localhost:8080/api/users/${id}`,
      data,
      config
    );
    if (returnData.data.success === true) {
      let tmp = users;
      let i = tmp.findIndex((obj) => obj.iduser === id);
      tmp[i].isBlocked = data.isBlocked;
      setUsers([...tmp]);
    }
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
            {users.length > 0
              ? users.slice(start, limit).map((user, key) => (
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
                        {show !== key ? (
                          <Typography color="textPrimary" variant="body1">
                            {user.firstname + " " + user.lastname}
                          </Typography>
                        ) : (
                          <>
                            <TextField
                              label="First name"
                              variant="outlined"
                              defaultValue={user.firstname}
                              style={{
                                height: "40px",
                                width: "120px",
                                marginRight: "10px",
                              }}
                              onChange={(e) => {
                                setFirstName(e.target.value);
                              }}
                            />
                            <TextField
                              label="Last name"
                              variant="outlined"
                              defaultValue={user.lastname}
                              style={{ height: "40px", width: "120px" }}
                              onChange={(e) => {
                                setLastName(e.target.value);
                              }}
                            />
                          </>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      {show !== key ? (
                        user.email
                      ) : (
                        <TextField
                          label="Email"
                          variant="outlined"
                          defaultValue={user.email}
                          style={{ height: "40px" }}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      {show !== key ? (
                        user.username
                      ) : (
                        <TextField
                          label="Username"
                          variant="outlined"
                          defaultValue={user.username}
                          style={{ height: "40px" }}
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                        />
                      )}
                    </TableCell>
                    <TableCell>{user.occupation}</TableCell>
                    <TableCell>
                      {user.isVerify === 0 ? "Not verify" : "Verified"}
                    </TableCell>
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
                              setUsername(user.username);
                              setFirstName(user.firstname);
                              setLastName(user.lastname);
                              setEmail(user.email);
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
                              handleDelete(user.iduser);
                            }}
                          >
                            <DeleteIcon></DeleteIcon>
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
                              backgroundColor: "#f44336",
                            }}
                            onClick={() => {
                              handleLock(user.iduser, user.isBlocked);
                            }}
                          >
                            {user.isBlocked === 0 ? (
                              <LockOpenIcon></LockOpenIcon>
                            ) : (
                              <LockIcon></LockIcon>
                            )}
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
                              handleUpdate(user.iduser);
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
        count={users.length > 0 ? users.length : 0}
        onChangePage={handlePageChange}
        page={page}
        rowsPerPage={10}
        rowsPerPageOptions={[10]}
      />
    </Card>
  );
};

export default UserListResults;
