import React from "react";
import AllCourses from './AllCourses/AllCourses';
import TopCategories from './TopCategories/TopCategories';
import TopNew from './TopNew/TopNew';
import TopSubscribe from './TopSubscribe/TopSubscribe';
import TopView from './TopView/TopView';

function HomeBody() {

    return (
        <div>
        <TopSubscribe></TopSubscribe>
        <TopView></TopView>
        <TopCategories></TopCategories>
        <TopNew></TopNew>
        <AllCourses></AllCourses>
        </div>
    );
}

export default HomeBody;