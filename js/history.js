const logged_user= checkLogin();
console.log(logged_user);
fetch(`https://durdlyf8ki.execute-api.us-east-1.amazonaws.com/prod/transactions?partition_key=${logged_user}`)
.then(res => res.json())
.then((data)=>{
    console.log(data);
    let tabledata="";
    data.map((values) => {
        tabledata+=`<tr>
        <td>${values.name}</td>
        <td>${values.transaction_id}</td>
        <td>${values.origin}</td>
        <td>${values.destination}</td>
        <td>${values.date}</td>
        <td>${values.time}</td>
      </tr>`;
    });
    document.getElementById("table_body").innerHTML=tabledata;
})

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const transaction_id = document.getElementById('Transaction_ID').value;
  const url = 'https://durdlyf8ki.execute-api.us-east-1.amazonaws.com/prod/cancellation';

    const data = {
      username : logged_user,
      transaction_id : transaction_id
    };

    fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
          console.log('Success:', data);
          location.href = "history.html";
      })
      .catch(error => {
          console.error('Error:', error);
      }); 

})