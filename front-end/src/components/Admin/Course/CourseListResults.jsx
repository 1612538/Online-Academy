import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  Button,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const CourseListResults = ({ match }) => {
  const [limit, setLimit] = useState(10);
  const [start, setStart] = useState(0);
  const [page, setPage] = useState(0);
  const [courses, setCourses] = useState([]);

  const config = {
    headers: {
      "x-access-token": localStorage.getItem("accessToken"),
    },
  };

  const getCourse = async () => {
    let url = "http://localhost:8080/api/coursesByAdmin";
    if (match) url = url + `/${match.params.id}`;
    const data = await axios.get(url, config);
    let tmp = data.data;
    if (tmp) {
      const teacher = await axios.get(
        "http://localhost:8080/api/teacherslist",
        config
      );
      if (teacher.data) {
        for (let course of tmp) {
          let tutor = teacher.data.find((obj) => obj.iduser === course.teacher);
          course.tutor = tutor.firstname + " " + tutor.lastname;
        }
        setCourses(tmp);
      }
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    setLimit(newPage * 10 + 10);
    setStart(newPage * 10);
  };

  const handleLock = async (id, isBlock) => {
    const data = {
      isBlocked: isBlock === 0 ? 1 : 0,
    };
    const returnData = await axios.put(
      `http://localhost:8080/api/courses/${id}`,
      data,
      config
    );
    if (returnData.data.success === true) {
      let tmp = courses;
      let i = tmp.findIndex((obj) => obj.idcourses === id);
      tmp[i].isBlocked = data.isBlocked;
      setCourses([...tmp]);
    }
  };

  const handleDelete = async (id) => {
    const data = await axios.delete(
      `http://localhost:8080/api/courses/${id}`,
      config
    );
    if (data.data.success === true) {
      let tmp = courses;
      tmp = tmp.filter((obj) => obj.idcourses !== id);
      setCourses([...tmp]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCourse();
    };
    fetchData();
    return () => {
      setCourses([]);
    };
  }, [match]);

  return (
    <Card>
      <Box style={{ minWidth: 1050 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ width: "30%" }}>Name</TableCell>
              <TableCell style={{ width: "10%" }}>Teacher</TableCell>
              <TableCell style={{ width: "5%" }}>Price</TableCell>
              <TableCell style={{ width: "5%" }}>Rating</TableCell>
              <TableCell style={{ width: "5%" }}>Votes</TableCell>
              <TableCell style={{ width: "10%" }}>Progress</TableCell>
              <TableCell style={{ width: "5%" }}>Enroll</TableCell>
              <TableCell style={{ width: "5%" }}>View</TableCell>
              <TableCell style={{ width: "13%" }}>Last Update</TableCell>
              <TableCell style={{ width: "12%" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses.slice(start, limit).map((course, key) => (
              <TableRow hover key={key}>
                <TableCell style={{ width: "30%" }}>
                  <Box
                    style={{
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Avatar
                      src={"http://localhost:8080" + course.img}
                      style={{ marginRight: "20px" }}
                    >
                      {course.name}
                    </Avatar>
                    <Typography
                      color="textPrimary"
                      variant="body1"
                      style={{
                        width: "300px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {course.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell style={{ width: "10%" }}>{course.tutor}</TableCell>
                <TableCell style={{ width: "5%" }}>{course.price}$</TableCell>
                <TableCell style={{ width: "5%" }}>{course.rate}</TableCell>
                <TableCell style={{ width: "5%" }}>
                  {course.ratevotes}
                </TableCell>
                <TableCell style={{ width: "7%" }}>
                  {course.isCompleted === 0 ? "Not completed" : "Completed"}
                </TableCell>
                <TableCell style={{ width: "5%" }}>
                  {course.subscribes}
                </TableCell>
                <TableCell style={{ width: "5%" }}>{course.views}</TableCell>
                <TableCell style={{ width: "13%" }}>
                  {course.lastupdate}
                </TableCell>
                <TableCell style={{ width: "15%" }}>
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
                      handleDelete(course.idcourses);
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
                      handleLock(course.idcourses, course.isBlocked);
                    }}
                  >
                    {course.isBlocked === 0 ? (
                      <LockOpenIcon></LockOpenIcon>
                    ) : (
                      <LockIcon></LockIcon>
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={courses ? courses.length : 0}
        onChangePage={handlePageChange}
        page={page}
        rowsPerPage={10}
        rowsPerPageOptions={[10]}
      />
    </Card>
  );
};

export default CourseListResults;
