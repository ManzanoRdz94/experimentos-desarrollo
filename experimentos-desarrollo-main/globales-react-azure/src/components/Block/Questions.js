import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";

export default function Questions({ onChange }) {

  const [error, setError] = useState(null);
  const [loadedQuestions, setLoadedQuestions] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [answers, setAnswers] = useState([])

  const onChangeValue = e => {
    let dummyAnswers = answers

    const [questionId, answer] = (e.target.value).split("-")

    const questionIndex = dummyAnswers.findIndex(q => q.id === questionId)
    if (questionIndex !== -1) {
      dummyAnswers.splice(questionIndex, 1)
    }
    dummyAnswers.push({ id: questionId, ans: answer })

    setAnswers(dummyAnswers)
    onChange(answers)
  }

  const buildAnswers = (answers, questionId, answer) => {

    const options = [];
    if (answers) {
      for (let i = 0; i < answers.length; i++) {
        options.push(
          <>
            <input data-correct={answer} required type="radio" value={`${questionId}-${answers[i]._id}`} name={questionId} id={`${questionId}-${i + 1}`} />
            <label for={`${questionId}-${i + 1}`} style={{ marginLeft: "12px" }}>{answers[i].response}</label>
            <br />
          </>
        );
      }
    }
    return options;
  }

  const buildQuestions = (questions) => {
    const quiz = [];
    let correctAnswers = [];

    questions.forEach(q => {

      const correctAnswer = q.responses.filter(response => response.responseCorrect === true)
      correctAnswers.push(correctAnswer[0]._id)

      //let opt = buildAnswers(q.options, q.id, q.answer);
      let opt = buildAnswers(q.responses, q._id, correctAnswer[0]._id);
      quiz.push(
        <fieldset>
          {q.question}
          <div onChange={onChangeValue}>
            {opt}
          </div>
          <br></br>
        </fieldset>
      )
    });
    return quiz;
  }

  const { courseData } = useContext(UserContext)

  useEffect(() => {
    if (courseData.content) {
      let content = courseData.content || []
      content = content.filter(block => block.numberBlock === 1)
      content = content[0].examns[0].questions

      setLoadedQuestions(getNQuestions(content, 5))
      setIsLoaded(true);
    }
  }, []);

  const getNQuestions = (questions, numberQuestions) => {


    const questionTemp = [...questions]
    let questionsToShow = []
    for (let i = 0; i < numberQuestions; i++) {
      const position = Math.floor(Math.random() * questionTemp.length)
      questionsToShow.push(questionTemp[position])
      questionTemp.splice(position, 1);
    }
    return questionsToShow
  }

  //if (error) return "Error!";
  if (!isLoaded) return "Loading...";
  const list = buildQuestions(loadedQuestions);
  return <div>{list}</div>;
}