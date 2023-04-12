const logged_user= checkLogin();
console.log(logged_user);
let x,y,z
const form = document.querySelector('form');
const genderRadios = document.getElementsByName('gender');
      
      form.addEventListener('submit', (event) => {
        event.preventDefault(); // prevent form submission
        
        let selectedGender = null;
        genderRadios.forEach(radio => {
          if (radio.checked) {
            selectedGender = radio.value;
          }
        });
        
        const passengerName = document.getElementById('name').value;
        const passengerAge = document.getElementById('age').value;
        const flightPath = document.getElementById('flightpath').value;
        const date=document.getElementById('date').value;
        if (selectedGender && passengerName && passengerAge && flightPath) {
          alert(`Passenger Name: ${passengerName}\nAge: ${passengerAge}\nGender: ${selectedGender}\nFlight Path: ${flightPath}`);
        } else {
          alert('Please fill in all fields');
        }
        const url = 'https://durdlyf8ki.execute-api.us-east-1.amazonaws.com/prod/transactions';

        if(flightPath=="New York to London"){
          x="New York";
          y="london";
          z="9AM DPART 2PM ETA";
        }else if(flightPath=="London to Paris"){
          x="London";
          y="Paris";
          z="11AM DPART 2PM ETA";
        }else if(flightPath=="Paris to Tokyo"){
          x="Paris";
          y="Tokyo";
          z="9AM DPART 11PM ETA";          
        }
    const data = {
        username: logged_user,
        name:passengerName,
        age: passengerAge,
        origin:x,
        destination:y,
        gender: selectedGender,
        date:date,
        time:z
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
    

    });
