import React, {useEffect, useState} from "react";
import PageHeader from "../../components/PageHeader/PageHeader"
import SearchBody from "../../components/PageBody/SearchBody/SearchBody"
import axios from 'axios';
import {useParams} from "react-router-dom";

const CoursesBySmallCats = () => {
    const [courses, setCourses] = React.useState([]);
    const [length, setLength] = React.useState(0);
    const [catName, setCatName] = React.useState('');
    const [currPage, setCurrPage] = React.useState(1);
    const smallcatID =  useParams().id;
    const getCoursesByID = () => {
        axios.all([
            axios.get(`http://localhost:8080/api/coursesByCatID/${smallcatID}?page=${currPage}`),
            axios.get(`http://localhost:8080/api/coursesByCatID/${smallcatID}`),
            axios.get(`http://localhost:8080/api/smallcategories/${smallcatID}`),
        ])
        .then(axios.spread((res1, res2, res3) => {
            const data1 = res1.data;
            const data2 = res2.data.length;
            const data3 = res3.data;
            setCourses(data1);
            setLength(data2);
            setCatName(data3.name);
        }))
        .catch(err => console.log(err));
    }

    useEffect(() => {
        getCoursesByID();
        return () => {
            setCourses([]);
            setLength(0);
            setCatName('')
        }
    }, [currPage])

    return (
        <div>
        <PageHeader>
            
        </PageHeader>
        <SearchBody courses={courses} dataLength={length} setCurrPage={setCurrPage} keyword = {catName}>

        </SearchBody>
        </div>
    );
}

export default CoursesBySmallCats;