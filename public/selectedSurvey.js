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
  
// GET SURVAYS
async function getSurv(){
    const getSurv = await axios(`/survey/getSurvey`);
    const selected = getSurv.data
    renderSurvey(selected);
    renderForm(selected)
}
getSurv()

// RENDER
function renderSurvey(survey){
    const root = document.querySelector(".renderTitle");
    const rootQuestions = document.querySelector(".questions");
    let html = "";
      html +=           `<div class="render_surv_title"><h3 class="title_surv">Title: ${survey.title}</h3>
                        <a class="icon_edit" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="far fa-edit fa-lg"></i></a></div>
                        <h5>Questions:</h5>`;
   root.innerHTML = html;

    const preguntas = survey.question;
    const arrPregs = Object.values(preguntas);
    let htmlQuestions = "";
    arrPregs.forEach((preg) => {
        htmlQuestions += `
                            <h5>- ${preg}</h5>
                         `
       })
    rootQuestions.innerHTML = htmlQuestions;
  }  

function renderForm(survey){
    const root = document.querySelector(".form_title");
    const rootQuestions = document.querySelector(".form_questions");
    let html = "";
    html += `<label for="">Title:</label>
            <input type="text" class="titleInput" placeholder="${survey.title}">
            <label for="">Questions:</label>`;
    root.innerHTML = html;

    const preguntas = survey.question;
    const arrPregs = Object.values(preguntas);
    let htmlQuestions = "";
    arrPregs.forEach((preg) => {
        htmlQuestions += `<input type="text" placeholder="${preg}"> `
       })
    rootQuestions.insertAdjacentHTML("afterbegin",htmlQuestions);
}

function submitForm(e){
    e.preventDefault();
}
function getModal(){
    const arrQuestions = [];
    const titleInput = document.querySelector(".titleInput");
    const rootQuestions = document.querySelector(".form_questions");

    const title = titleInput.value;
    const length = rootQuestions.children.length;
    for (let i = 0; i < length; i++) {
          const questions = rootQuestions.children[i].value;
          arrQuestions.push(questions);
      }    
      const editSurv = {

        "title": title,
        "question": {...arrQuestions}
    }
    console.log(editSurv);
    editSurvey(editSurv);
}

async function editSurvey(editSurv){
    const response = await axios.post('/survey/editSurvey', editSurv);
    window.location.reload();
    getSurv();
}
const subBtn = document.querySelector('#subBtn');
subBtn.addEventListener('click', getModal);

// lOGOUT
async function logOut(){
  const logOut = await axios(`/logIn/logOut`);
 window.location.href = "http://localhost:3500/";
}

