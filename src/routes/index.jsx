import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import useSWR from "swr";
import axios from "axios";
import qs from "qs";
import { useLocation, Link } from "react-router-dom";

const fetcher = async (url) => await axios.get(url);

const Index = () => {
  const location = useLocation();
  const parsedObj = qs.parse(location.search);
  const query = qs.stringify(
    {
      populate: "*",
      filters: {
        category: {
          $eq: parsedObj.category,
        },
      },
    },
    { encodeValuesOnly: true }
  );
  const { data, error, isLoading } = useSWR(`/api/quizzes?${query}`, fetcher);

  if (error) return <div>failed to load data.</div>;
  if (isLoading) return <div>Loading...</div>;
  // console.log(data);

  return (
    <div>
      <Grid spacing={4} container>
        {data.data.data.map((quiz) => (
          <Grid item sm={4} key={quiz.id}>
            <Card>
              <CardMedia
                sx={{ height: 380 }}
                image={`${axios.defaults.baseURL}${quiz.attributes.thumbnail.data.attributes.url}`}
              />
              <CardContent>
                <Stack justifyContent={"space-between"} direction="row">
                  <Typography gutterBottom variant="body1">
                    {quiz.attributes.name}
                  </Typography>
                  <Chip label={quiz.attributes.category} />
                </Stack>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={`quiz/${quiz.id}`}
                  fullWidth
                  size="large"
                >
                  Play Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Index;
