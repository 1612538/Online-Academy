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
  Typography,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import CheckIcon from "@material-ui/icons/Check";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import TeacherDetail from "./TeacherDetail";

const TeacherListResults = ({ update }) => {
  const [limit, setLimit] = useState(10);
  const [start, setStart] = useState(0);
  const [page, setPage] = useState(0);
  const [show, setShow] = useState(-1);
  const [teachers, setTeachers] = useState([]);
  const [occupation, setOccupation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [openD, setOpenD] = useState(false);
  const [clickUser, setClickUser] = useState({});

  const config = {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
  };

  const DialogClose = () => {
    setOpenD(false);
  };

  const getTeacher = async () => {
    const data = await axios.get(
      "http://localhost:8080/api/teacherslist",
      config
    );
    if (data.data) setTeachers(data.data);
  };

  const handleDelete = async (id) => {
    const data = await axios.delete(
      `http://localhost:8080/api/users/${id}`,
      config
    );
    if (data.data.success === true) {
      let tmp = teachers;
      tmp = tmp.filter((obj) => obj.iduser !== id);
      setTeachers([...tmp]);
    }
  };

  const handleUpdate = async (id) => {
    const data = {
      email: email,
      firstname: firstName,
      lastname: lastName,
      occupation: occupation,
    };
    const returnData = await axios.put(
      `http://localhost:8080/api/users/${id}`,
      data,
      config
    );
    if (returnData.data.success === true) {
      let tmp = teachers;
      let i = tmp.findIndex((obj) => obj.iduser === id);
      tmp[i].email = email;
      tmp[i].firstname = firstName;
      tmp[i].lastname = lastName;
      tmp[i].occupation = occupation;
      setTeachers([...tmp]);
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
      let tmp = teachers;
      let i = tmp.findIndex((obj) => obj.iduser === id);
      tmp[i].isBlocked = data.isBlocked;
      setTeachers([...tmp]);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    setLimit(newPage * 10 + 10);
    setStart(newPage * 10);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getTeacher();
    };
    fetchData();
    return () => {
      setTeachers([]);
    };
  }, [update]);

  return (
    <Card>
      <Box style={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Occupation</TableCell>
              <TableCell>Verify</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.slice(start, limit).map((teacher, key) => (
              <TableRow hover key={key}>
                <TableCell
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setOpenD(true);
                    setClickUser({ ...teacher });
                  }}
                >
                  <Box
                    style={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Avatar
                      src={"http://localhost:8080" + teacher.img}
                      style={{ marginRight: "20px" }}
                    >
                      {teacher.name}
                    </Avatar>
                    {show !== key ? (
                      <Typography color="textPrimary" variant="body1">
                        {teacher.firstname + " " + teacher.lastname}
                      </Typography>
                    ) : (
                      <>
                        <TextField
                          label="First name"
                          variant="outlined"
                          defaultValue={teacher.firstname}
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
                          defaultValue={teacher.lastname}
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
                    teacher.email
                  ) : (
                    <TextField
                      label="Email"
                      variant="outlined"
                      defaultValue={teacher.email}
                      style={{ height: "40px" }}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>{teacher.username}</TableCell>
                <TableCell>
                  {show !== key ? (
                    teacher.occupation
                  ) : (
                    <TextField
                      label="Occupation"
                      variant="outlined"
                      defaultValue={teacher.occupation}
                      style={{ height: "40px" }}
                      onChange={(e) => {
                        setOccupation(e.target.value);
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {teacher.isVerify === 0 ? "Not verify" : "Verified"}
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
                          setOccupation(teacher.occupation);
                          setFirstName(teacher.firstname);
                          setLastName(teacher.lastname);
                          setEmail(teacher.email);
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
                          handleDelete(teacher.iduser);
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
                          handleLock(teacher.iduser, teacher.isBlocked);
                        }}
                      >
                        {teacher.isBlocked === 0 ? (
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
                          handleUpdate(teacher.iduser);
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
            ))}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={teachers ? teachers.length : 0}
        onChangePage={handlePageChange}
        page={page}
        rowsPerPage={10}
        rowsPerPageOptions={[10]}
      />
      <TeacherDetail
        openD={openD}
        DialogClose={DialogClose}
        user={clickUser}
      ></TeacherDetail>
    </Card>
  );
};

export default TeacherListResults;
