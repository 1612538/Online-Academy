import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import CoursesCard from '../../CoursesCard/CoursesCard';

const GetData = (props) => {

    return (

        <Grid container direction="row" spacing={2}>
        {
        props.courses.map((course, key) =><Fade in={true} timeout={1000} key={key}><Grid item>
            <CoursesCard course={course}></CoursesCard>
            </Grid></Fade>)
        }
        </Grid>
    );
}

export default GetData;