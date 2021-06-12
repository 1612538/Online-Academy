import { useState } from "react";
import { Box, Container } from "@material-ui/core";
import CategoryListResults from "../../../components/Admin/Category/CategoryListResults";
import CategoryListToolbar from "../../../components/Admin/Category/CategoryListToolbar";

const CategoryList = (props) => {
  const [update, setUpdate] = useState(false);

  return (
    <>
      <Box>
        <Container maxWidth={false}>
          <CategoryListToolbar
            match={props.match}
            setUpdate={setUpdate}
            update={update}
          ></CategoryListToolbar>
          <Box style={{ paddingTop: 30 }}>
            <CategoryListResults match={props.match} update={update} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default CategoryList;
