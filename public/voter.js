const handleUser=  (event) => {
    event.preventDefault();
const name = event.target.elements.nameVoter.value;
const email= event.target.elements.emailVoter.value;
try {

    
  axios({
    method: "POST",
    url: `/voter/addVoter`,
    data: {
      name,   
      email
    
    },
  })
 
  .then(({ data }) =>{
    // window.location.href ='index.html';
    return data

  } )

  .catch((err) => {
  console.log(err);
  });

  event.target.reset();
    // const settings={
    //     method: 'POST',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     data: {
    //         name,
    //         email
    //     }
    // }
    // const response = await fetch('/voter/addVoter',settings);
    // const data = await response.json();
    // return data
    //!PREGUNTAR PORQUE NO ME DEJA CON ASYNC AWAIT
} catch (error) {
    return error
}

}