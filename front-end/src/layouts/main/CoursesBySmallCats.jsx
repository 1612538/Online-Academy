import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import SearchBody from "../../components/PageBody/SearchBody/SearchBody";
import axios from "axios";
import { useParams } from "react-router-dom";
import ChatBox from "../../components/ChatBot/ChatBox";

const CoursesBySmallCats = () => {
  const [courses, setCourses] = React.useState([]);
  const [length, setLength] = React.useState(0);
  const [catName, setCatName] = React.useState("");
  const [currPage, setCurrPage] = React.useState(1);
  const [sort, setSort] = React.useState(0);
  const smallcatID = useParams().id;
  const getCoursesByID = () => {
    let tmp1 = 0,
      tmp2 = 0;
    if (sort === 1) tmp1 = 1;
    else if (sort === 2) tmp2 = 1;
    axios
      .all([
        axios.get(
          `http://localhost:8080/api/coursesByCatID/${smallcatID}?page=${currPage}&isratedesc=${tmp1}&ispriceasc=${tmp2}`
        ),
        axios.get(`http://localhost:8080/api/coursesByCatID/${smallcatID}`),
        axios.get(`http://localhost:8080/api/smallcategories/${smallcatID}`),
      ])
      .then(
        axios.spread((res1, res2, res3) => {
          const data1 = res1.data;
          const data2 = res2.data.length;
          const data3 = res3.data;
          setCourses(data1);
          setLength(data2);
          setCatName(data3.name);
        })
      )
      .catch((err) => console.log(err));
  };
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    getCoursesByID();
    return () => {};
  }, [currPage, sort]);

  return (
    <div>
      <PageHeader></PageHeader>
      <SearchBody
        courses={courses}
        dataLength={length}
        setCurrPage={setCurrPage}
        keyword={catName}
        handleChange={handleChange}
        sort={sort}
        setSort={setSort}
      ></SearchBody>
      <ChatBox></ChatBox>
    </div>
  );
};

export default CoursesBySmallCats;
