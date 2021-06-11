import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import axios from "axios";

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
    let url = "http://localhost:8080/api/courses";
    if (match) url = url + `ByCatID/${match.params.id}`;
    const data = await axios.get(url);
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

  useEffect(() => {
    const fetchData = async () => {
      await getCourse();
    };
    fetchData();
    return () => {
      setCourses([]);
    };
  }, []);

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
                <TableCell style={{ width: "15%" }}></TableCell>
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
