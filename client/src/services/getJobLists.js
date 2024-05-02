const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
 "limit": 10,
 "offset": 0
});

const requestOptions = {
 method: "POST",
 headers: myHeaders,
};

fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
 .then((response) => response.text())
 .then((result) => console.log(result))
 .catch((error) => console.error(error));