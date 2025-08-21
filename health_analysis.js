
xhr = new XMLHttpRequest();
xhr.open("GET", "/.health_analysis.json", true);
xhr.onload = function() {
    if(xhr.status >= 200 && xhr.status < 300) {

    }
}

const addPatientButton = document.getElementById("addPatient");
const report = document.getElementById("report");
const btnSearch = document.getElementById("btnSearch");
const patients = [];

function addPatient() {
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const condition = document.getElementById("condition").value;

    if (name && gender && age && condition) {
        patients.push({ name, gender: gender.value, age, condition});
        resetForm();
        generateReport();
    } else {
        alert("Please fill in all fields.");
    }
}

function resetForm() {
    document.getElementById("name").value = "";
          document.querySelector('input[name="gender"]:checked').checked = false;
          document.getElementById("age").value = "";
          document.getElementById("condition").value = "";
}

function generateReport() {
    const numPatients = patients.length;
    const conditionsCount = {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Preasure": 0,
    }
    const genderConditionsCount = {
        Male: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Preasure": 0,
        },
        Female: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Preasure": 0,
        },
    };

for (const patient of patients) {
    conditionsCount[patient.contidion]++;
    genderConditionsCount[patient.gender][patient.condition]++;
}
 report.innerHTML += `<br>Gender-Based Conditions:<br>`;
report.innerHTML = `Number of patients: ${numPatients}<br><br>`
report.innerHTML += `Conditions Breakdown:<br>`;
for (const condition in conditionsCount) {
    report.innerHTML += `${condition}: ${conditionsCount[condition]}`;

    report.innerHTML += `<br>Gender-Based Conditions:<br>`;
for (const gender in genderConditionsCount) {
    report.innerHTML += `${gender}: <br>`;
    report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
    }
  }
};

addPatientButton.addEventListener("click", addPatient);

function searchConttion() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous results

    fetch('health_alanysis.json')
    .then(response => response.json())
    .then(data => {
        const condition = data.conditions.find(item => item.name.toLowerCase() === input);
        
        if(condition) {
            const sypmptoms = condition.symptoms.join(', ');
            const prevention = condition.preventions.join(', ');
            const treatment = condition.treatment;
        

        resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
        resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh" />`;

        resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
        resultDiv.innerHTML += `<p><strong>Prevention:</strong>${prevention}</p>`;
        resultDiv.innerHTML += `<p><strong>Treatment:</strong>${treatment}</p>`
        } else {
            resultDiv.innerHTML = `Condition not found.`;
        }
    })
    .catch(error => {
        console.log('Error', error);
        resultDiv.innerHTML = `An error ocurred while fetching te data.`;
    });

}

btnSearch.addEventListener("click", searchConttion);