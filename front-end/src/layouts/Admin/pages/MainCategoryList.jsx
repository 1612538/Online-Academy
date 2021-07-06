import { useState } from "react";
import { Box, Container } from "@material-ui/core";
import MainCategoryListResults from "../../../components/Admin/MainCategory/MainCategoryListResults";
import MainCategoryListToolbar from "../../../components/Admin/MainCategory/MainCategoryListToolbar";

const CategoryList = (props) => {
  const [update, setUpdate] = useState(false);

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
            <MainCategoryListResults match={props.match} update={update} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CategoryList;
