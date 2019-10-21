// Write your JavaScript code here!
window.addEventListener("load", function() {
      let form = document.querySelector("form");
      fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
         response.json().then (function(json) {
            const mission = document.getElementById("missionTarget");
            var randomMis = Math.floor(Math.random() * json.length);

            mission.innerHTML = `
            <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[randomMis].name}</li>
                  <li>Diameter: ${json[randomMis].diameter}</li>
                  <li>Star: ${json[randomMis].star}</li>
                  <li>Distance from Earth: ${json[randomMis].distance}</li>
                  <li>Number of Moons: ${json[randomMis].moons}</li>
               </ol>
            <img src="${json[randomMis].image}">
            `;
         });
      });
      form.addEventListener("submit", function(event) {
         
         let pilotNameInput = document.getElementById("pilotName").value;
         let copilotNameInput = document.getElementById("copilotName").value;
         let fuelLevelInput = document.getElementById("fuelLevel").value;
         let cargoMassInput = document.getElementById("cargoMass").value;

         let fuelReady = false
         let fuelResponse = 'invalid fuel level'
         let cargoReady = false
         let cargoResponse = 'invalid cargo level'

         if (pilotNameInput === "" || copilotNameInput=== "" || fuelLevelInput === "" || cargoMassInput === "" ) {
            alert("All fields are required!");
            event.preventDefault();
         } 
         
         if (!/^[a-zA-Z]+$/.test(pilotNameInput) || !/^[a-zA-Z]+$/.test(copilotNameInput)) {
            alert("Names must be strings!");
            event.preventDefault();
         
         } else {
            document.getElementById("pilotStatus").innerHTML = `Pilot, ${pilotNameInput}, is ready!`;
            document.getElementById("copilotStatus").innerHTML = `Copilot, ${copilotNameInput}, is ready!`;
         }
         
         if (isNaN(fuelLevelInput) || isNaN(cargoMassInput)) {
            alert("Fuel Level & Cargo Mass must be numbers!")
            event.preventDefault();
         }

         if (fuelLevelInput < 10000) {
            fuelReady = false;
            fuelResponse = 'Fuel level too low for launch';
         } else if (fuelLevelInput > 10000) {
            fuelReady = true;
            fuelResponse = 'Fuel level high enough for launch';
         }

         if (cargoMassInput > 10000) {
            cargoReady = false;
            cargoResponse = 'Cargo level too high for launch';
         } else if (cargoMassInput < 10000) {
            cargoReady = true;
            cargoResponse = 'Cargo level low enough for launch';
         }

         
         if (!fuelReady && !cargoReady){
            document.getElementById("fuelStatus").innerHTML = fuelResponse;
            document.getElementById("cargoStatus").innerHTML = cargoResponse;
            document.getElementById("launchStatus").innerHTML = "NOT READY!";
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("faultyItems").style.visibility = "visible";
            event.preventDefault();

         } else if (!fuelReady && cargoReady) {
            document.getElementById("fuelStatus").innerHTML = fuelResponse
            document.getElementById("cargoStatus").innerHTML = cargoResponse
            document.getElementById("launchStatus").innerHTML = "NOT READY!";
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("faultyItems").style.visibility = "visible";
            event.preventDefault();
         
         } else if (!cargoReady && fuelReady) {
            document.getElementById("cargoStatus").innerHTML = cargoResponse;
            document.getElementById("fuelStatus").innerHTML = fuelResponse;
            document.getElementById("launchStatus").innerHTML = "NOT READY!";
            document.getElementById("launchStatus").style.color = "red";
            document.getElementById("faultyItems").style.visibility = "visible";
            event.preventDefault();
            

         
         } else if (fuelReady && cargoReady){
            document.getElementById("launchStatus").innerHTML = 'Shuttle is ready for launch.';
            document.getElementById("launchStatus").style.color = "green";
            document.getElementById("fuelStatus").innerHTML = 'Fuel level high enough for launch';
            document.getElementById("cargoStatus").innerHTML = 'Cargo level low enough for launch';
            document.getElementById("faultyItems").style.visibility = "visible";
            event.preventDefault();
            
         
         }


            
      
         
      });

         
   });



/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
