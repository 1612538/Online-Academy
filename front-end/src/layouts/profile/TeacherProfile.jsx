import React, {useEffect, useState} from 'react'

import PageHeader from '../../components/PageHeader/PageHeader';
import ProfileBody from '../../components/PageBody/ProfileBody/ProfileBody';

const TeacherProfile = (props) => {

    return (
        <div>
            <PageHeader>

            </PageHeader>
            <ProfileBody match={props.match}></ProfileBody> :
        </div>
    )
}

export default TeacherProfile;