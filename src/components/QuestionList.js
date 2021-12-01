import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
  }, [])

  function handleDelete(event) {
    const idToDelete = event.target.id.split("-")[1]

    fetch(`http://localhost:4000/questions/${idToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then( data => {
        const updatedQuestions = questions.filter((question) => question.id.toString() !== idToDelete)
        setQuestions(updatedQuestions)
      })
  }

  const questionItems = questions.map((question) => {
    return <QuestionItem
      key={question.id}
      question={question}
      handleDelete={handleDelete}
    />
  })

  console.log(questions)

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
