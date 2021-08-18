const iconDelete = document.querySelector(".icon_delete");

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

let arrSurv = [];
// GET SURVAYS
const getLogInUser = async () => {
  const getUser = await axios.get("/survey/logUser");
  const dataUser = getUser.data;
  const surveyData = dataUser.createSurvey;
  const surveyDataTitle = dataUser.createSurvey[1].title;
  renderSurvay(surveyData)
  arrSurv.push(surveyData);
  console.log(surveyDataTitle);
};
window.onload = getLogInUser();

function renderSurvay(surveyData){
  const root = document.querySelector(".render_survey");
  let html = "";
  surveyData.forEach((survey) => {
    html += `   <div class="survey_info">
    <a class="title_survey" onclick='selectedSurv("${survey.id}")' href="selectedSurvey.html"><h4 class="title_surveys">Title: ${survey.title}</h4></a>
    <div class="survey_icons">
      <a style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#exampleModal"><i onclick='shareId("${survey.id}")' class="icon_share fas fa-share-alt-square fa-lg" style="cursor: pointer; color: black;"></i></a>
      <a class="iconDelete" style="cursor: pointer; color: black;"><i onclick='deleteSurvey("${survey.id}")' class="icon_delete fas fa-trash fa-lg"></i></a>
    </div>
  </div>`;
  });root.innerHTML = html;
}  

function deleteSurvey(id){
  const getUser = axios.post(`/survey/deleteSurvey/${id}`);
  getLogInUser()
  const root = document.querySelector('.alert_delete');
  let html = '<div style="width: 30%; text-align: center; margin-top: 2rem;" class="container alert alert-danger" role="alert">Survey deleted!</div>';
  root.innerHTML = html;
  setTimeout(() =>{
    html = '';
    root.innerHTML = html;
  }, 3000)
  
}

async function selectedSurv(id){
  const getUser = axios.get(`/survey/saveSurvey/${id}`);
}


async function shareId(id){
  const gerServ = await axios.get(`/response?id=${id}`);
  const idServShare = gerServ.data.id;
  modalRender(idServShare);
}

function modalRender(id){
  const root = document.querySelector(".modal-body");
  let html = "";
  html += `<h5>Share this link:</h5>
  <a href="http://localhost:3500/response.html?id=${id}">http://localhost:3500/response.html?id=${id}</a><br><br>
    <a class="icon_wpp" href="https://api.whatsapp.com/send?text=http://localhost:3500/response.html?id=${id}" data-action="share/whatsapp/share">Share by Whatssapp</a>`;
  root.innerHTML = html;
}

async function resultsId(id){
  const gerServ = await axios.get(`/survey/results`, id);
}


// LOGOUT
async function logOut(){
   const logOut = await axios(`/logIn/logOut`);
  window.location.href = "http://localhost:3500/";
}

// SEARCH BAR 

async function regExSurvey(searchBar){
  try {
    const getUser = await axios.get("/survey/logUser");
    const dataUser = getUser.data;
    const surveyData = dataUser.createSurvey;
    let newArray = [];
    for(let i = 0; i < surveyData.length; i++){
      const regExp = `^${searchBar}`;
      const searchTermReg= new RegExp(regExp, 'g');  
      newArray = surveyData.filter(elem => searchTermReg.test(elem.title));

    }
    renderSurvay(newArray)
  } catch (e) {
      console.error(e)
  }
}

const searchSurvey = (ev) => {
    try {
        ev.preventDefault();
        const searchBar = ev.target.parentElement.elements.searchBar.value;
        regExSurvey(searchBar);
        console.log(searchBar);
    } catch (e) {
        console.error(e)
    }
}


// EVENTLISTENERS
const searchBar = document.getElementById('searchBar');
searchBar.addEventListener('keyup', searchSurvey);