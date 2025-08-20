
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