import React from "react";
import AllCourses from './AllCourses/AllCourses';
import TopCategories from './TopCategories/TopCategories';
import TopNew from './TopNew/TopNew';
import TopSubscribe from './TopSubscribe/TopSubscribe';
import TopView from './TopView/TopView';
import Grid from '@material-ui/core/Grid';

import {makeStyles} from '@material-ui/core/styles';

function HomeBody() {

    return (
        <div>
        <TopSubscribe></TopSubscribe>
        </div>
    );
}

export default HomeBody;