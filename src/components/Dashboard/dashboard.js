import React, { Component } from "react";
import "./dashboard.css";
import axios from "axios";
import Questions from "../Questions/question";
import rocket from "../Rocket.gif";
import { connect } from "react-redux";
import {
  LOADCATEGORIES,
  SETCATEGORYTYPE,
  SETQUESTIONTYPES,
  SETDIFFICULTYLEVEL,
  SETNUMBEROFQUESTION,
  LOADQUESTIONS,
  SETQUESTIONS,
  RESETALL,
} from "../../redux/store/action-creator";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasClickedView: false,
      isLoading: false,
      disabledButton: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNewStart = this.handleNewStart.bind(this);
  }

  handleNewStart = (e) => {
    this.props.resetAll();
    this.setState({
      hasClickedView: false,
      isLoading: false,
      disabledButton: false,
    });
  };

  componentDidMount() {
    this.props.setCategories();
  }

  // getCategories = () => {
  //   axios.get("https://opentdb.com/api_category.php").then((res) => {
  //     if (res.status === 200) {
  //       this.props.setCategories(res.data.trivia_categories);
  //     }
  //   });
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      hasClickedView: false,
      disabledButton: false,
      isLoading: true,
    });

    this.props.loadQuestions(
      this.props.category,
      this.props.questionType,
      this.props.noOfQuestions,
      this.props.difficulty
    );
  };

  handleClickedView = () => {
    this.setState(() => {
      return { ...this.state, hasClickedView: true };
    });
  };

  handleDisabledButton = () => {
    this.setState((prevState) => {
      return { ...prevState, disabledButton: true };
    });
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "difficulty") {
      this.props.setDifficulty(value);
    }
    if (name === "questionType") {
      this.props.setQuestionType(value);
    }
    if (name === "category") {
      this.props.setCategory(value);
    }
    if (name === "noOfQuestions") {
      this.props.setNumberOfQuestions(value);
    } else {
      this.setState({ [name]: value });
    }
  };

  render() {
    return (
      <>
        <div className="question-generator">
          <form
            className="row gy-2 gx-3 align-items-center"
            onSubmit={this.handleSubmit}
          >
            <div className="col-auto">
              <h4>Categories</h4>
              <select
                className="form-select"
                name="category"
                onChange={this.handleChange}
              >
                <option defaultValue>Choose category...</option>
                {this.props.categoryList?.map((cat, index) => {
                  return (
                    <option key={index + "xyz"} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-auto">
              <h4>Difficulty Level</h4>
              <select
                className="form-select"
                name="difficulty"
                onChange={this.handleChange}
                value={this.props.difficulty}
              >
                <option defaultValue>Choose...</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="col-auto">
              <h4>Questions Type</h4>
              <select
                value={this.props.questionType}
                className="form-select"
                name="questionType"
                onChange={this.handleChange}
              >
                <option defaultValue>Choose...</option>
                <option value="multiple">Multiple Choice Question</option>
                <option value="boolean">True/False</option>
              </select>
            </div>
            <div className="col-auto">
              <h4>No. of Questions</h4>
              <input
                value={this.props.noOfQuestions}
                className="form-control"
                type="number"
                name="noOfQuestions"
                onChange={this.handleChange}
              />
            </div>
            <div className="row-auto row-button">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>

        {this.props.questions?.length > 0 ? (
          <div>
            <div className="btn-reload">
              <button onClick={this.handleNewStart}>Start new game</button>
            </div>
          </div>
        ) : null}
        <Questions
          hasClickedView={this.state.hasClickedView}
          handleClickedView={this.handleClickedView}
          disabledButton={this.state.disabledButton}
          handleDisabledButton={this.handleDisabledButton}
        />
      </>
    );
  }
}

const mapStateToProps = (state, props) => ({
  categoryList: state.categoryList,
  difficulty: state.difficulty,
  questionType: state.questionType,
  category: state.category,
  noOfQuestions: state.noOfQuestions,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setCategories: () => {
      dispatch(LOADCATEGORIES());
    },

    setDifficulty: (difficulty) => {
      dispatch(SETDIFFICULTYLEVEL(difficulty));
    },

    setQuestionType: (questionType) => {
      dispatch(SETQUESTIONTYPES(questionType));
    },

    setCategory: (category) => {
      dispatch(SETCATEGORYTYPE(category));
    },

    setNumberOfQuestions: (noOfQuestions) => {
      dispatch(SETNUMBEROFQUESTION(noOfQuestions));
    },

    loadQuestions: (category, questionType, noOfQuestions, difficulty) => {
      dispatch(
        LOADQUESTIONS(category, questionType, noOfQuestions, difficulty)
      );
    },

    setQuestions: (questions) => {
      dispatch(SETQUESTIONS(questions));
    },

    resetAll: () => {
      dispatch(RESETALL());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
