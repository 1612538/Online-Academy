import React, { useEffect, useState } from "react";
import AllCourses from './AllCourses/AllCourses';
import TopCategories from './TopCategories/TopCategories';
import TopNew from './TopNew/TopNew';
import TopSubscribe from './TopSubscribe/TopSubscribe';
import TopView from './TopView/TopView';
import axios from 'axios';

function HomeBody() {

    const [length, setLength] = useState(0);
    const getLength = ()=>{
        axios.get('http://localhost:8080/api/courseslength')
        .then( res => {
            const l = res.data.rowCount;
            setLength(l);
        })
        .catch(err=>console.log(err));
    }

    useEffect(()=>{
        getLength();
    })

    return (
        <div>
        <TopSubscribe></TopSubscribe>
        <TopView></TopView>
        <TopCategories></TopCategories>
        <TopNew></TopNew>
        <AllCourses dataLength={length}></AllCourses>
        </div>
    );
}

export default HomeBody;