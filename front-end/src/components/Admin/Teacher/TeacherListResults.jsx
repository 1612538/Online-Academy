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

const TeacherListResults = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [teachers, setTeachers] = useState([]);

  const config = {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
  };

  const getTeacher = async () => {
    const data = await axios.get(
      "http://localhost:8080/api/teacherslist",
      config
    );
    if (data.data) setTeachers(data.data);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchData = async () => {
      await getTeacher();
    };
    fetchData();
    return () => {
      setTeachers([]);
    };
  }, []);

  return (
    <Card>
      <Box style={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Occupation</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.slice(0, limit).map((teacher, key) => (
              <TableRow hover key={key}>
                <TableCell>
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
                    <Typography color="textPrimary" variant="body1">
                      {teacher.firstname + " " + teacher.lastname}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{teacher.email}</TableCell>
                <TableCell>{teacher.username}</TableCell>
                <TableCell>{teacher.occupation}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={teachers ? teachers.length : 0}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default TeacherListResults;
