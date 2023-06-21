function init() {
  getStates();
}

let firstChars = ["ALLE"];

async function getStates(char) {
  let url = "./b-land.json";
  let [response, err] = await resolve(fetch(url));
  let responseJson = await response.json();

  showFirstChar(responseJson);

  rendertateList(responseJson, char);
}

function rendertateList(response, char) {
  document.getElementById("state-list").innerHTML = "";

  for (let i = 0; i < response.length; i++) {
    if (char == null || char == "" || char == "ALLE") {
      renderStates(response, i);
    }
    if (response[i]["name"].charAt(0) == char) {
      renderStates(response, i);
    }
  }
}

function renderStates(response, index) {
  document.getElementById("state-list").innerHTML += `
    <a class="state-item" id="state-${index}" href='${
    response[index]["url"]
  }' target='_blank'>
    <div>${response[index]["name"]}</div>
    <div>${response[index]["population"]
      .toString()
      .replace(".", ",")} Millionen Einwohner</div>
    </a>
    `;
  document.getElementById("state-" + index).classList.add("show");
}

function showFirstChar(response) {
  for (let i = 0; i < response.length; i++) {
    let char = response[i]["name"].charAt(0);
    if (!firstChars.includes(char)) {
      firstChars.push(char);
    }
  }
  document.querySelector(".char-filter").innerHTML = "";
  firstChars.forEach((element) => {
    document.querySelector(".char-filter").innerHTML += `
    <div class='btn-char' onclick='getStates("${element}")'>
    ${element}
    </div>
    `;
  });
}

async function resolve(promise) {
  try {
    let resp = await promise;
    return [resp, null];
  } catch (e) {
    console.log(e);
    return [null, e];
  }
}
