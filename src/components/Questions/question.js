import React, { Component } from "react";
import { connect } from "react-redux";
import { SETQUESTIONS } from "../../redux/store/action-creator";
import "./question.css";
import loading from "../loading.gif";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAnswers: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.viewResult = this.viewResult.bind(this);
  }

  handleClick(e, questionIndex, ansIndex) {
    let newQuestions = [...this.props.questions];
    newQuestions[questionIndex].chosenAnswer = e.target.value;

    newQuestions[questionIndex].changeColor = false;
    this.props.SETQUESTIONS(newQuestions);

    this.setState({
      changeColor: true,
    });
  }

  viewResult = (e) => {
    window.scrollTo(0, 0);
    let results = [...this.props.questions];
    let resultsLength = 0;
    let correctAnswers = 0;
    results.forEach((data, index) => {
      if (data.chosenAnswer !== undefined) {
        resultsLength++;
      }
    });
    if (resultsLength !== results.length) {
      alert("Answer all questions first.");
      return;
    } else {
      results.forEach((data, index) => {
        if (data.chosenAnswer === data.correct_answer) {
          correctAnswers++;
        }
      });
    }
    this.props.handleDisabledButton();

    this.setState(
      {
        correctAnswers: correctAnswers,
      },
      () => {
        this.props.handleClickedView();
      }
    );
  };

  render() {
    const { questions } = this.props;
    return (
      <div className="container">
        {this.props.isLoading && (
          <div className="loading">
            <img src={loading} className="loading-rocket" />
            <p>Your questions are loading</p>
          </div>
        )}
        <div className="score">
          {" "}
          {this.props.hasClickedView ? (
            <h1>
              Score: {this.state.correctAnswers} out of {questions?.length}
            </h1>
          ) : null}
        </div>

        {!this.props.isLoading &&
          questions?.map((questionData, questionIndex) => (
            <div key={questionIndex + "abc"} className="question-box">
              <div className="question-heading">
                <h2>{window.atob(questionData.question)}</h2>
              </div>

              <div className="answer-buttons">
                {questionData.answers.map((ans, ansIndex) => (
                  <>
                    <div key={ansIndex + "cde"}>
                      <button
                        disabled={this.props.disabledButton}
                        onClick={(e) =>
                          this.handleClick(e, questionIndex, ansIndex)
                        }
                        value={ans}
                        style={
                          this.props.hasClickedView &&
                          questionData.correct_answer === ans
                            ? { backgroundColor: "green" }
                            : questionData.correct_answer !==
                                questionData.chosenAnswer &&
                              questionData.chosenAnswer === ans &&
                              this.props.hasClickedView
                            ? { backgroundColor: "red" }
                            : !this.props.hasClickedView &&
                              questionData.chosenAnswer === ans
                            ? { backgroundColor: "rgb(183, 6, 253)" }
                            : null
                        }
                      >
                        {window.atob(ans)}
                      </button>
                    </div>
                  </>
                ))}
              </div>
            </div>
          ))}

        {this.props.questions && !this.props.isLoading ? (
          <div className="results-btn">
            <button onClick={this.viewResult}>View Result</button>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  questions: state.questions,
  isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    SETQUESTIONS: (questions) => {
      dispatch(SETQUESTIONS(questions));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
