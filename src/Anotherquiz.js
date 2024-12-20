import { useState } from "react";
import { data } from "./data";

export default function Anotherquiz() {
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState(data[index]);
    const [correctOptions, setCorrectOption] = useState(data[index].correctOption);
    const [selectedOption, setSelectedOption] = useState({});

    const checkCorrectAns = (option) => {
        const checkCorrectOption = correctOptions;
        if (option === checkCorrectOption) {
            // console.log("");
        } else {
            // console.log("");
        }
    };

    const submitQuiz = (e) => {
        let correctCount = 0;
        const newIndex = index + 1;
        if (newIndex === 5) {
            window.alert("Are you sure you want to submit?")
        }

        data.forEach((question, i) => {
            if (selectedOption[i] === question.correctOption) {
                correctCount += 1;
            }
        });
        
        const question = document.querySelector('.question');
        const removeControls = document.querySelector('.controls-left-right');

        question.innerHTML = "";
        removeControls.innerHTML = "";


        if (correctCount < 3 ) {
            const redCheck = document.createElement('p')
        redCheck.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
</svg>`;
        redCheck.style.textAlign = "center";
        redCheck.style.color = "red";
        question.appendChild(redCheck);

        const score = document.createElement('P');
        score.textContent = `You score ${correctCount} out of ${data.length} (${correctCount / data.length * 100 }%)`;
        score.style.textAlign = 'center';
        
        question.appendChild(score);
        score.style.color = "red";
        score.style.fontSize = " 35px";
        score.style.fontFamily = "sans-serif"; 
        } else { 
            const greenCheck = document.createElement('p')
        greenCheck.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
</svg>`;
        greenCheck.style.textAlign = "center";
        greenCheck.style.color = "green";
        question.appendChild(greenCheck);

        const score = document.createElement('P');
        score.textContent = `You score ${correctCount} out of ${data.length} (${correctCount / data.length * 100 }%)`;

        
        score.style.textAlign = 'center';
        
        question.appendChild(score);
        score.style.color = "green";
        score.style.fontSize = " 35px";
        score.style.fontFamily = "sans-serif"; 
        }
        
        
        
        console.log("Quiz Submitted!");
        
        const label = document.querySelector('.option-parent');
        label.innerHTML = "";
    };

    //This is a functionality that retains the previous selected option when the next or prev or pagination is clicked. A user will be able to check their previous selected option.
    const handleOptionChange = (e) => {
        const newSelectedOptions = { ...selectedOption, [index]: parseInt(e.target.value, 10) };
        setSelectedOption(newSelectedOptions);
        checkCorrectAns(parseInt(e.target.value, 10));
    };

    const questionPagination = (e, indexNumber) => {
        if (indexNumber >= 1 && indexNumber <= 5) {
            const newIndex = indexNumber - 1;
            setIndex(newIndex);
            setQuestion(data[newIndex]);
            setCorrectOption(data[newIndex].correctOption);
            

            // Remove the highlight class from all pagination buttons
            const paginationButtons = document.querySelectorAll('.pagination-check-btn');
            paginationButtons.forEach(button => button.classList.remove('pagination-check-btn-highlight'));

            const firstBtnHighlight = document.querySelector('.first-btn-highlight');
            if (firstBtnHighlight) {
                firstBtnHighlight.classList.remove('first-btn-highlight');
            }

            // Add the highlight class to the clicked button
            e.target.classList.add('pagination-check-btn-highlight');
        }
    };

    const updatePaginationHighlight = (newIndex) => {
        const paginationButtons = document.querySelectorAll('.pagination-check-btn');
        paginationButtons.forEach(button => button.classList.remove('pagination-check-btn-highlight'));

        if (newIndex >= 0 && newIndex < paginationButtons.length) {
            paginationButtons[newIndex].classList.add('pagination-check-btn-highlight');
        }

        const firstBtnHighlight = document.querySelector('.first-btn-highlight');
        if (firstBtnHighlight) {
            firstBtnHighlight.classList.remove('first-btn-highlight');
        }
    };

    const nextQuestion = () => {
        const newIndex = index + 1;
        if (newIndex < data.length) {
            setIndex(newIndex);
            setQuestion(data[newIndex]);
            setCorrectOption(data[newIndex].correctOption);
            updatePaginationHighlight(newIndex);
        } 
    };

    const prevQuestion = () => {
        const newIndex = index - 1;
        if (newIndex >= 0) {
            setIndex(newIndex);
            setQuestion(data[newIndex]);
            setCorrectOption(data[newIndex].correctOption);
            updatePaginationHighlight(newIndex);
        } else {
            console.log('End of quiz'); 
        }
    };

    return (
        <div className="container p-5">
            <div className="col-md-6">
                <div className="quiz-container">
                    <p className="quiz-heading text-start mt-3">Quiz App</p>
                    <hr style={{marginLeft: "15px"}}/>
                    <div className="margin-left mt-4">
                    <p className="text-start question">{index + 1}. {question.question}</p>
                        <div className="option-parent">
                            <label className="checkbox-label text-start">
                                <input 
                                    type="radio" 
                                    name="checkbox1" 
                                    value={1} 
                                    onChange={handleOptionChange} 
                                    checked={selectedOption[index] === 1}
                                />
                                {question.options1}
                            </label>
                            <label className="checkbox-label text-start">
                                <input 
                                    type="radio" 
                                    name="checkbox1" 
                                    value={2} 
                                    onChange={handleOptionChange} 
                                    checked={selectedOption[index] === 2}
                                />
                                {question.options2}
                            </label>
                            <label className="checkbox-label text-start">
                                <input 
                                    type="radio" 
                                    name="checkbox1" 
                                    value={3} 
                                    onChange={handleOptionChange} 
                                    checked={selectedOption[index] === 3}
                                />
                                {question.options3}
                            </label>
                            <label className="checkbox-label text-start">
                                <input 
                                    type="radio" 
                                    name="checkbox1" 
                                    value={4} 
                                    onChange={handleOptionChange} 
                                    checked={selectedOption[index] === 4}
                                />
                                {question.options4}
                            </label>
                        </div>
                    </div>
                    <div className="controls-left-right mt-4">
                        <button type="button" onClick={prevQuestion} className="btn-left">Prev</button>
                        <div className="pagination-btn">
                            <button type="button" className="pagination-check-btn first-btn-highlight" onClick={(e) => questionPagination(e, 1)}>1</button>
                            <button type="button" className="pagination-check-btn" onClick={(e) => questionPagination(e, 2)}>2</button>
                            <button type="button" className="pagination-check-btn" onClick={(e) => questionPagination(e, 3)}>3</button>
                            <button type="button" className="pagination-check-btn" onClick={(e) => questionPagination(e, 4)}>4</button>
                            <button type="button" className="pagination-check-btn" onClick={(e) => questionPagination(e, 5)}>5</button>
                        </div>
                        {index < 5 - 1 ? (<button onClick={nextQuestion} type="button" className="btn-right">Next</button>) : (<button onClick={submitQuiz} type="button" className="btn-right">Submit</button>)}
                    </div>
                </div>
            </div>
        </div>
    );
}
