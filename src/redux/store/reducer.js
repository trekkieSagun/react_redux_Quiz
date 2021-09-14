import {
  LOADCATEGORY,
  LOADQUESTION,
  SETCATEGORY,
  SETDIFFICULTY,
  SETNUMBER,
  SETQUESTION,
  SETQUESTIONTYPE,
  SETISLOADING,
  RESETSTATE,
} from "../actions";

const initialState = {
  category: "",
  difficulty: "easy",
  questionType: "multiple",
  noOfQuestions: "3",
  questions: null,
  categoryList: null,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADCATEGORY:
      return { ...state, categoryList: action.payload };

    case SETDIFFICULTY:
      return { ...state, difficulty: action.payload };

    case SETQUESTIONTYPE:
      return { ...state, questionType: action.payload };
    case SETCATEGORY:
      return { ...state, category: action.payload };
    case SETNUMBER:
      return { ...state, noOfQuestions: action.payload };

    case LOADQUESTION:
      return { ...state, questions: action.payload };

    case SETQUESTION:
      return { ...state, questions: action.payload };

    case SETISLOADING:
      return { ...state, isLoading: action.payload };

    case RESETSTATE:
      return { ...initialState };

    default:
      return state;
  }
};

export default reducer;
