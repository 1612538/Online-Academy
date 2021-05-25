import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader/PageHeader";
import SearchBody from "../../components/SearchBody/SearchBody";
import QueryString from 'query-string';
import axios from 'axios';


function Search(props) {
    const [courses, setCourses] = React.useState([]);
    const [length, setLength] = React.useState(0);
    const [currPage, setCurrPage] = React.useState(1);
    const parsed = QueryString.parse(props.location.search);

    const searchCourses = () => {
        axios.get(`http://localhost:8080/api/coursesearch?keyword=${parsed.keyword}&page=${currPage}`)
        .then(res => {
            const data = res.data;
            setCourses(data);
        })
        .catch(err => console.log(err));
    }

    const getSearchLength = () =>{
        axios.get(`http://localhost:8080/api/coursesearch?keyword=${parsed.keyword}`)
        .then(res => {
            const data = res.data.length;
            setLength(data);
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        searchCourses();
        getSearchLength();
        return () => {
            setCourses([]);
        }
    }, [currPage])

    return (
        <div>
        <PageHeader>
            
        </PageHeader>
        <SearchBody courses={courses} dataLength={length} setCurrPage={setCurrPage}>

        </SearchBody>
        </div>
    );
}

export default Search;