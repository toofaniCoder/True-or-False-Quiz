import { Container, Stack, Pagination, Button } from "@mui/material";
import useSWR from "swr";
import axios from "axios";
import qs from "qs";
import {
  useActionData,
  useNavigate,
  useParams,
  useSubmit,
} from "react-router-dom";
import Question from "../compoennts/question";
import { useState, useEffect } from "react";
import _ from "lodash";

// Pagination function
const paginate = (items, currentPage, pageSize) => {
  const startIndex = (currentPage - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
};
const fetcher = async (url) => await axios.get(url);

const Quiz = () => {
  const navigate = useNavigate();
  const actionData = useActionData();
  const [userAnswerSheet, setUserAnswerSheet] = useState({});
  const [page, setPage] = useState(1);
  const submit = useSubmit();
  const handleChange = (event, value) => {
    setPage(value);
  };
  const params = useParams();
  const query = qs.stringify(
    {
      fields: ["id"],
      populate: "questions",
    },
    { encodeValuesOnly: true }
  );

  const {
    data: response,
    error,
    isLoading,
  } = useSWR(`/api/quizzes/${params.id}?${query}`, fetcher);
  console.log(userAnswerSheet);

  useEffect(() => {
    if (actionData) {
      navigate("/result", { state: actionData.data, replace: true });
    }
  }, [actionData]);

  if (error) return <div>failed to load data.</div>;
  if (isLoading) return <div>Loading...</div>;
  //   console.log(response);

  return (
    <Container sx={{ py: 4 }}>
      <Stack spacing={3} alignItems="flex-start">
        <Stack spacing={2.5}>
          {paginate(response.data.data.attributes.questions, page, 5).map(
            (item, index) => (
              <Question
                userAnswerSheet={userAnswerSheet}
                setUserAnswerSheet={setUserAnswerSheet}
                key={item.id}
                item={item}
                index={index + (page - 1) * 5}
              />
            )
          )}
        </Stack>
        <Pagination count={5} page={page} onChange={handleChange} />

        <Button
          variant="contained"
          size="large"
          onClick={() => {
            submit(userAnswerSheet, {
              method: "POST",
              encType: "application/x-www-form-urlencoded",
            });
          }}
        >
          Submit Your Quiz
        </Button>
      </Stack>
    </Container>
  );
};

export default Quiz;
