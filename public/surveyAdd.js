  // QUERYSELECTORS
  const addQuest = document.getElementById('addQuest');
  const rootQuestions = document.getElementById('rootQuestions');
  const subBtn = document.getElementById('subBtn');
  
  // GET USER FOR WELCOME
const getUser = async () => {
    const getUser = await axios.get("/users/getUsers");
    const { name } = getUser.data;
    render(name);
  };
  const render = (name) => {
    const root = document.querySelector(".root");
  
    const renderIt = `<h5 style="color: white;">Welcome ${name}!</h5>`;
    root.innerHTML = renderIt;
  };
  getUser();


  function addSurvey(){
      
      const questionForm = document.getElementById('questionForm');
      const container = document.querySelector('.container_form');
  
      const arrQuestions = [];
      const length = questionForm.children.length;
      
      for (let i = 0; i < length; i++) {
          const questions = questionForm.children[i].children[0].value;
          arrQuestions.push(questions);
          
      }    
      const title = container.children[2].value;
      const newSurv = {
          "title": title,
          "questions": {...arrQuestions}
      }

      sendSurvey(newSurv)
  }
  async function sendSurvey(newSurv){
      const response = await axios.post('/survey/addSurvey', newSurv);
  }
  
  
  let cont = 0;
  function dispayFormQuestions(){   
      const questionForm = document.getElementById('questionForm');
      let html = "";
      
      html = `<div> 
      <input type="text" name="question" class="form-control question_input" id="question${cont}" placeholder="Make your question...">
      </div`
      
      questionForm.insertAdjacentHTML("beforeend",html);
      cont++;
  }

  // LOGOUT
async function logOut(){
    const logOut = await axios(`/logIn/logOut`);
   window.location.href = "http://localhost:3500/";
 } 

  // EVENT LISTENERS
  subBtn.addEventListener('click', addSurvey);
  addQuest.addEventListener('click', dispayFormQuestions);

