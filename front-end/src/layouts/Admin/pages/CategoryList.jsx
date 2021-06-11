import { Box, Container } from "@material-ui/core";
import CategoryListResults from "../../../components/Admin/Category/CategoryListResults";

const CategoryList = (props) => (
  <>
    <Box>
      <Container maxWidth={false}>
        <Box style={{ paddingTop: 30 }}>
          <CategoryListResults match={props.match} />
        </Box>
      </Container>
    </Box>
  </>
);

export default CategoryList;
