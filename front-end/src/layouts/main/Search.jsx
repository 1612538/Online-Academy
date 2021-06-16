import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import SearchBody from "../../components/PageBody/SearchBody/SearchBody";
import QueryString from "query-string";
import ChatBox from "../../components/ChatBot/ChatBox";
import axios from "axios";

const Search = (props) => {
  const [courses, setCourses] = React.useState([]);
  const [length, setLength] = React.useState(0);
  const [currPage, setCurrPage] = React.useState(1);
  const [sort, setSort] = React.useState(0);
  const parsed = QueryString.parse(props.location.search);

  const searchCourses = () => {
    let tmp1 = 0,
      tmp2 = 0;
    if (sort === 1) tmp1 = 1;
    else if (sort === 2) tmp2 = 1;
    axios
      .get(
        `http://localhost:8080/api/coursesearch?keyword=${parsed.keyword}&page=${currPage}&isratedesc=${tmp1}&ispriceasc=${tmp2}`
      )
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        setCourses([...data]);
      })
      .catch((err) => console.log(err));
  };

  const getSearchLength = () => {
    axios
      .get(`http://localhost:8080/api/coursesearch?keyword=${parsed.keyword}`)
      .then((res) => {
        const data = res.data.length;
        setLength(data);
      })
      .catch((err) => console.log(err));
  };
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    searchCourses();
    getSearchLength();
    return () => {};
  }, [currPage, props.location, sort]);

  useEffect(() => {
    setCurrPage(1);
    return () => {};
  }, [props.location, sort]);

  return (
    <div>
      <PageHeader></PageHeader>
      <SearchBody
        currPage={currPage}
        courses={courses}
        dataLength={length}
        setCurrPage={setCurrPage}
        keyword={parsed.keyword}
        handleChange={handleChange}
        setSort={setSort}
        sort={sort}
      ></SearchBody>
      <ChatBox></ChatBox>
    </div>
  );
};

export default Search;
