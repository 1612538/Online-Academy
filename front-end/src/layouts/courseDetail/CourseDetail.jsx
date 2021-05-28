import React, {useEffect, useState} from 'react'

import PageHeader from '../../components/PageHeader/PageHeader';
import CourseBody from '../../components/PageBody/CourseBody/CourseBody';

const CourseDetail = (props) => {
    
    return (
        <div>
            <PageHeader>

            </PageHeader>
            <CourseBody match={props.match}></CourseBody>
        </div>
    )
}

export default CourseDetail;