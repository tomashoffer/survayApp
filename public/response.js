// GET USER FOR WELCOME
const renderWelcome = (name) => {
  const root = document.querySelector(".root");

  const renderIt = `<h5 style='margin-right: 10rem; color: white;'>Survey conducted by user ${name}</h5>`;
  root.innerHTML = renderIt;
};
renderWelcome();

window.onload = function () {
  var params = new URLSearchParams(window.location.search);
  const myUrl = window.location.href;
  const id = params.get("id");
  // Prueba con Yoni
  // const idIndex = myUrl.indexOf('id')
  // let hola = myUrl.slice(idIndex + 3)
  // console.log(hola);
  getSurvey(id);
};
async function getSurvey(id) {
  const getServ = await axios.get(`/response?id=${id}`);
  render(getServ.data);
  renderWelcome(getServ.data.admin);
}
async function getResp() {
  const gerServ = await axios.get(`/response/getResp`);
}
getResp();

const render = (survey) => {
  const rootTtile = document.querySelector(".rootTitle");
  const rootQuestion = document.querySelector(".rootQuestion");

  let html = "";
  html += `<h1 class"suvery_title">Survey: ${survey.title}</h1>`;

  rootTtile.innerHTML = html;
  const preguntas = survey.question;
  const arrPregs = Object.values(preguntas);
  let htmlQuestions = "";
  arrPregs.forEach((preg) => {
    htmlQuestions += `
        <div class="questions">
        <h3 class="questions_title">${preg}</h3>
        <select name="responds" class="form-select" id="respondses">
            <option class="form-option" value="1">1</option>
            <option class="form-option" value="2">2</option>
            <option class="form-option" value="3">3</option>
            <option class="form-option" value="4">4</option>
            <option class="form-option" value="5">5</option>
        </select>
        </div>`;
  });
  rootQuestion.innerHTML = htmlQuestions;
};
const handleSubmit =  (event) => { 
  event.preventDefault();
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const arr = []
  const responds = event.target.elements.responds;
  responds.forEach(element => {
    arr.push(+(element.value))
  });
  
  axios({
    method: "post",
    url: `/response/postResponds`,
    data: {id, arr},
  }).then(({ data }) => {
      return data;
    }).catch((err) => {
      console.log(err);
    });
};
async function sendRes(newRes){
  const response = await axios.post(`/response/postResponds`, newRes);
}
const btn = document.querySelector('.btnSubmit');
btn.addEventListener('click', alertSubmit)

function alertSubmit(){
  const root = document.querySelector('.alert');
  let html = '<div class="alert alert-info" role="alert">Thank you, your survey was sent!</div>';
  root.innerHTML = html;
  setTimeout(() =>{
    html = '';
    root.innerHTML = html;
  }, 3000)
}
