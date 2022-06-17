function startButtonHandle(event) {
    document.getElementById("pre-quiz-view").style.display = "none";
    document.getElementById("loader-view").style.display = "block";
     setTimeout(() => {
      fetch("./question/db.json")
        .then((response) => response.json())
        .then((result) => {
          const quesId = document.getElementById("question-id").value;
          const question = result.data[quesId].question;
          const options = result.data[quesId].options;
          const [a, b, c, d] = options;
          document.getElementById("question").innerHTML = question;
          document.getElementById("0").innerHTML = a;
          document.getElementById("1").innerHTML = b;
          document.getElementById("2").innerHTML = c;
          document.getElementById("3").innerHTML = d;
        })
        .catch((error) => null);
      document.getElementById("loader-view").style.display = "none";
      document.getElementById("quiz").style.display = "block";
    }, 1000);
  }
  
  function optionHandle(event) {
    document.getElementById("submit-button").disabled = false;
    const optDivs = document.querySelectorAll("#options-container > div");
    const arrOptDivs = [...optDivs]; // nodeList converted to array, inorder to use map() on array
    arrOptDivs.map((optDiv) => {
      if (optDiv.classList.contains("user-answer"))
        optDiv.classList.remove("user-answer");
    });
    document.getElementById(event.target.id).classList.add("user-answer");
  }
  
  function submitHandle() {
    fetch("./question/db.json")
      .then((response) => response.json())
      .then((result) => {
        const answer =
          result.data[document.getElementById("question-id").value].answer;
        const usrAns = document.querySelector(".user-answer").id;
        const usrSelectedDiv = document.getElementById(usrAns);
        if (usrAns == answer) {
          usrSelectedDiv.classList.remove("user-answer");
          usrSelectedDiv.classList.add("correct-answer");
        } else {
          usrSelectedDiv.classList.remove("user-answer");
          usrSelectedDiv.classList.add("wrong-answer");
          document.getElementById(answer).classList.add("correct-answer");
        }
      })
      .catch((error) => null);
  }
  