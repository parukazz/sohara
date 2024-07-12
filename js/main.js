const menuToggle = document.querySelector("#menu-toggle");
const navbar = document.querySelector(".navbar-responsive");

menuToggle.addEventListener("change", () => {
  menuToggle.checked
    ? navbar.classList.add("active")
    : navbar.classList.remove("active");
});

const shortlinkBtn = document.getElementById('shortlinkbtn');
const resultURL = document.getElementById('resultURL');
const oriURL = document.getElementById('oriURL');
const resultBox = document.getElementById('result-url');
const copyBTN = document.getElementById('copybtn');
const closeBTN = document.getElementById('closebtn');

shortlinkBtn.addEventListener('click', async() => {
  const longURL = document.getElementById('shortlinkinput').value;
  const accessToken = "d7cc3f217dce28672f2e6a628a0c758fd6e6f1b0";

  try {
    const shortURL = await shortenURL(longURL, accessToken);
    resultURL.innerHTML = `<a href="${shortURL}" target="_blank">${shortURL}</a>`;
    oriURL.innerText = sliceURL(longURL);
    resultBox.classList.add("active-flex");
    copyBTN.onclick = () => copyToClipboard(shortURL);
    closeBTN.onclick = () => resultBox.classList.remove('active-flex');
  } catch (error) {
    resultURL.innerText = error.message;
  }
});

async function shortenURL(longURL, accessToken) {
  const apiURL = "https://api-ssl.bitly.com/v4/shorten";

  const response = await fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ long_URL: longURL }),
  });

  if (response.ok) {
    const data = await response.json();
    return data.link;
  } else {
    const error = await response.json();
    throw new Error(error.message);
  }
}

function sliceURL (url) {
  const maxLength = 20;
  if (url.length > maxLength) {
    return url.substring(0, maxLength) + '...';
  } else {
    return url;
  }
}

function copyToClipboard(url) {
  const tempInput = document.createElement('input');
  tempInput.value = url;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);
  alert('URL copy on clipboard');
}