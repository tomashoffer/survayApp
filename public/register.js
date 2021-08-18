



const handleSubmit = async (event) => {
  event.preventDefault();
  const name = event.target.elements.name.value;
  const email = event.target.elements.email.value;
  const password = event.target.elements.password.value;

 

  axios({
    method: "post",
    url: `/signUp/registerUser`,
    data: {
      name,   
      email,
      password
    },
  })
 
  .then(({ data }) =>{
    window.location.href ='index.html';
    return data

  } )

  .catch((err) => {
  console.log(err);
  });
   
 
} 




 


