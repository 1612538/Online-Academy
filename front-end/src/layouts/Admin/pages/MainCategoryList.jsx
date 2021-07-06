import { useEffect, useState } from "react";
import { Box, Container } from "@material-ui/core";
import MainCategoryListResults from "../../../components/Admin/MainCategory/MainCategoryListResults";
import MainCategoryListToolbar from "../../../components/Admin/MainCategory/MainCategoryListToolbar";

const CategoryList = (props) => {
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    props.setUpdate(!props.update);
  }, [update]);

  return (
    <>
      <Box>
        <Container maxWidth={false}>
          <MainCategoryListToolbar
            match={props.match}
            setUpdate={setUpdate}
            update={update}
          ></MainCategoryListToolbar>
          <Box style={{ paddingTop: 30 }}>
            <MainCategoryListResults
              match={props.match}
              update={update}
              update2={props.update}
              setUpdate={props.setUpdate}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CategoryList;
