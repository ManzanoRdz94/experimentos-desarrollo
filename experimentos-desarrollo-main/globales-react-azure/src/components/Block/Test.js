import "./static/Test.css";
import TestIcon from "../../images/test_icon.png";
import Modal from "react-modal";
import Questions from "./Questions";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";


import axios from 'axios';

Modal.setAppElement('#root');

export default function Test() {

  const [calification, setCalification] = useState(0)

  const { userData } = useContext(UserContext)

  useEffect(() => {
    if (userData.courses) {

      let courses = userData.courses || []

      courses = courses.filter(course => course.courseId === "61046d964bb0a20036cfd06c")

      let block = courses[0].blocks.filter(block => block.numberBlock === 1)

      setCalification(block[0].grades[block[0].grades.length - 1].grade || 0)
    }

  }, [userData, calification])

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const [answers, setAnswers] = useState([])
  const [grade, setGrade] = useState(0)

  const { courseData, callUser } = useContext(UserContext)

  const submit = async (e) => {
    e.preventDefault()

    let responses = courseData.content || []
    responses = responses.filter(block => block.numberBlock === 1)
    responses = responses[0].examns[0].questions

    const correct = []
    const wrong = []
    answers.forEach(answer => {
      let responseSelected = responses.filter(response => response._id === answer.id)
      responseSelected = responseSelected[0].responses.filter(response => response._id === answer.ans)

      if (responseSelected[0].responseCorrect) {
        correct.push(responseSelected[0]._id)
      } else {
        wrong.push(responseSelected[0]._id)
      }
    })

    const grade = (100 / answers.length) * correct.length

    console.log(grade)
    const response = await axios.post("https://cima-dev.azure-api.net/api-progress/users/610873b20ced2a33d78fed16/61046d964bb0a20036cfd06c/1", {
      correct,
      wrong,
      grade
    }, { validateStatus: false })
    console.log('resp', response)
    debugger
    if (response.data.code === 1) {
      setCalification(grade)
      setModalIsOpen(false)
      callUser()
    }

  }

  return (
    <div>
      <div className="bg-grey" id="test">
        <div className="container w-60 text-center">
          <div className="titles d-flex" style={{ maxWidth: "60%" }}>
            <img src={TestIcon} alt="#" />
            <h2 className="icon-title">Test</h2>
          </div>
          <div className="section">
            <p>Resultado {grade || calification}</p>
            <button
              onClick={() => {
                setModalIsOpen(true);
              }}
              className="btn btn-success"
            >
              Tomar otra vez
            </button>
            <div
              className="text-center"
              style={{ paddingBottom: "50px" }}
            ></div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={() => setModalIsOpen(false)}
              style={{
                overlay: {
                  position: "fixed",
                  backgroundColor: "grey",
                  zIndex: "1",
                },
                content: {
                  zIndex: "2",
                },
              }}
              preventScroll={false}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h2>Examen</h2>
                <button onClick={() => setModalIsOpen(false)}>x</button>
              </div>
              <form>
                <Questions onChange={setAnswers} />
                <button className="btn btn-success" type="submit" onClick={submit}>
                  Terminar
                </button>
              </form>
            </Modal>
          </div>
        </div>

        <div>
          <div className="line" />
          <div className="container w-60 next">
            <a href type="button" className="btn btn-outline-success">
              Siguiente
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
