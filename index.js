//Axios Global

axios.defaults.headers.common["X-Auth-Token"] = "someToken";

// GET REQUEST
function getTodos() {
    axios({
        method:"get",
        url:"https://jsonplaceholder.typicode.com/todos",
        params:{
            _limit:5
        }
    })
    .then(res=>showOutput(res))
    .catch(error=>console.error(error));
  }
  
  // POST REQUEST
  function addTodo() {
    axios.post("https://jsonplaceholder.typicode.com/todos",{title:"MY TODO",completed:false})
    .then(res => showOutput(res))
    .catch(err =>console.error(err))
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    axios.put("https://jsonplaceholder.typicode.com/todos/1",{title:"UPDATED TODO",
    completed:true})
    .then(res => showOutput(res))
    .catch(err =>console.error(err))
  }
  
  // DELETE REQUEST
  function removeTodo() {
    axios.delete("https://jsonplaceholder.typicode.com/todos/1")
    .then(res => showOutput(res))
    .catch(err =>console.error(err))
    
  }
  
  // SIMULTANEOUS DATA
  function getData() {
    axios.all([
        axios.get("https://jsonplaceholder.typicode.com/todos"),
        axios.get("https://jsonplaceholder.typicode.com/posts")
    ]
    )
    .then(res => {console.log(res[0]);
                    console.log(res[1]);
                    showOutput(res[1])})
    .catch(err => console.error(err))
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
    const config= {
      headers : {
        "Content-Type":"Application/JSON",
        Authorization:"someToken"
      }
    }
    axios.post("https://jsonplaceholder.typicode.com/todos",{title:"MY TODO",completed:false},config)
    .then(res => showOutput(res))
    .catch(err =>console.error(err))
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    console.log('Transform Response');
  }
  
  // ERROR HANDLING
  function errorHandling() {
    axios({
      method:"get",
      url:"https://jsonplaceholder.typicode.com/todoss",
      params:{
          _limit:5
      }
  })
  .then(res=>showOutput(res))
  .catch(error=>{
    if(error.response){
      // server responded with status other than 200 range
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers)
    }
  });
  }
  
  // CANCEL TOKEN
  function cancelToken() {
    console.log('Cancel Token');
  }
  
  // INTERCEPTING REQUESTS & RESPONSES
  axios.interceptors.request.use(
    config => {
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`)
    return config;
},error => {Promise.reject(error)}
);
  
  // AXIOS INSTANCES
  
  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
  
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);
  