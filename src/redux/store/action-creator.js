import axios from "axios";
import {
  LOADCATEGORY,
  SETQUESTIONTYPE,
  SETDIFFICULTY,
  SETCATEGORY,
  SETNUMBER,
  LOADQUESTION,
  SETQUESTION,
  SETISLOADING,
  RESETSTATE,
} from "../actions";

export const LOADCATEGORIES = () => {
  return async (dispatch) => {
    await axios.get("https://opentdb.com/api_category.php").then((res) => {
      if (res.status === 200) {
        const categoryList = res.data.trivia_categories;
        dispatch({
          type: LOADCATEGORY,
          payload: categoryList,
        });
      }
    });
  };
};

export const LOADQUESTIONS = (
  category,
  questionType,
  noOfQuestions,
  difficulty
) => {
  return async (dispatch) => {
    dispatch(SETLOADER(true));
    await axios
      .get(
        `https://opentdb.com/api.php?amount=${noOfQuestions}&category=${category}&difficulty=${difficulty}&type=${questionType}&encode=base64`
      )
      .then((res) => {
        const newQuestions = res.data.results;
        newQuestions.forEach((q) => {
          q.answers = [q.correct_answer, ...q.incorrect_answers];
          q.answers = shuffle(q.answers);
        });
        dispatch({
          type: LOADQUESTION,
          payload: newQuestions,
        });
        dispatch(SETLOADER(false));
      });
  };
};

export const SETDIFFICULTYLEVEL = (difficulty) => {
  return {
    type: SETDIFFICULTY,
    payload: difficulty,
  };
};

export const SETQUESTIONTYPES = (questionType) => {
  return {
    type: SETQUESTIONTYPE,
    payload: questionType,
  };
};

export const SETNUMBEROFQUESTION = (noOfQuestions) => {
  return {
    type: SETNUMBER,
    payload: noOfQuestions,
  };
};

export const SETCATEGORYTYPE = (category) => {
  return {
    type: SETCATEGORY,
    payload: category,
  };
};

export const SETQUESTIONS = (questions) => {
  return {
    type: SETQUESTION,
    payload: questions,
  };
};

export const SETLOADER = (isLoading) => {
  return {
    type: SETISLOADING,
    payload: isLoading,
  };
};

export const RESETALL = () => {
  return async (dispatch) => {
    dispatch({
      type: RESETSTATE,
    });

    dispatch(LOADCATEGORIES());
  };
};

//utils function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
