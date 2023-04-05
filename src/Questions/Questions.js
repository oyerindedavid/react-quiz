import './Questions.css';
import { useState, useEffect } from 'react';
import Options from './Options/Options';
import { nanoid } from 'nanoid';
import shuffle from '../logic';
import Review from '../Review/Review';

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [submitQuiz, setSubmitQuiz] = useState(false)
  const [score, setScore] = useState(0)
  const [newQuiz, setNewQuiz] = useState(false)

  useEffect(() =>{
    fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple")
      .then(res => res.json())
      .then(data => setQuestions(allNewQuiz(data.results)))
  }, [newQuiz])

  function allNewQuiz(res) {
    let allQuestions = [];
    res.forEach(question => {
      let allOptions = question.incorrect_answers
                      .concat(question.correct_answer)
      question.isSelected = false;
      question.id = nanoid();
      question.options = shuffle(allOptions)
        .map((option) => {
          return {
            value: option,
            isSelected: false,
            id: nanoid(),
          };
        })
        
      allQuestions.push(question)
    });
    setNewQuiz(false)
    return allQuestions
  }

  function handleSelection(currentQuestionId, currentOptionId) {

    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {

        //Update options
        let newOptions = question.options.map((option) => {
          return option.id === currentOptionId
            ? { ...option, isSelected: !option.isSelected }
            //Undo previously selected value from this question
            : question.id === currentQuestionId 
            ? { ...option, isSelected: false } 
            : option
        })

        //Update the question
        return {...question, options: newOptions}
      })
    })
  }

  function verifyCorrectness(correctAnswer, selectedAnswer){
    //console.log(correctAnswer, selectedAnswer)
    return correctAnswer === selectedAnswer ? true : false
  }

  function handleSubmit(){
    setSubmitQuiz(prevData => !prevData)
    //setQuestions(prevData => prevData) //Will show correct and incorrect answers
    calculateScore()  //Will calculate score
  }

  function startNewQuiz(){
    setNewQuiz(true)
    setSubmitQuiz(prevData => !prevData)
    setScore(0)
  }

  function calculateScore(){
    let mark = 0;
    questions.forEach(question => {
         let selectedAnswer;
         question.options.map(option => option.isSelected ? selectedAnswer = option.value : "")
         console.log(selectedAnswer);
         //If selected option is correct, add to mark
         //console.log(question.correct_answer, selectedAnswer)
         mark = verifyCorrectness(question.correct_answer, selectedAnswer) ? mark + 1 : mark 
    })
    setScore(mark)
  }

  function optionsComponent(question) {
    return question.options.map(option =>
      <Options
          key={nanoid()}
          option={option}
          isSubmit={submitQuiz}
          isSelectionCorrect={verifyCorrectness(question.correct_answer,option.value)}
          handleSelection={() => handleSelection(question.id, option.id)}
        />
    )
  }

  const questionComponent = questions.map(q => {
    return (
      <div key={nanoid()}>
        <div className='question'>
          {q.question}
        </div>
        <div className="options">{optionsComponent(q)}</div>
        <hr />
      </div>
    )
  })

  return (
    <>
      {questions.length !== 0 ?
        <div className='question-box'>
          {questionComponent}
          <div className='complete'>
            <Review 
              totalScore={score}
              totalQuestion={questions.length}
            />
            <button onClick={!submitQuiz ? handleSubmit : startNewQuiz} 
              className='button-complete'>{!submitQuiz ? "Check answers" : "Play again"}
            </button>
          </div>
        </div>

        : <div className='no-question'>
          <div className='caption'>Questions not available</div>
          <div className='messge'>
            We currently dont have any question available in the
            selected category.
          </div>
        </div>
      }
    </>

  );
}