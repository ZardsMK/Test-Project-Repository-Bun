import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="main">
    <div class="text-input">
      <h1>Hello World!</h1>
      <h3>Put the key word on the label</h3>
      <input id="keywordInput" placeholder="Key-Word" type='text'/>
    </div>
    <button class="button-send" id="sendBtn">Send</button>
     <div id="results"></div>
     <div id="toast"></div>
  </div>
`
// a toast to recieve success and error message
function showToast(message, type) {
  const toast = document.getElementById("toast");
  toast.className = "show " + type;
  toast.innerText = message;

  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

function showSuccess(msg) {
  showToast(msg, "success");
}

function showError(msg) {
  showToast(msg, "error");
}

// create HTML to the product recieve

function showResults(products) {
  const resultsDiv = document.querySelector('#results')

  if (!products.length) {
    resultsDiv.innerHTML = '<p>No products found.</p>'
    return
  }

  resultsDiv.innerHTML = products.map(product => `
    <div class="product">
      <img src="${product.image || ''}" alt="${product.title || 'No image'}" />
      <h3>${product.title || 'No title'}</h3>
      <p>Star: ${product.rating || 'No rating'} | ${product.reviews || 'No reviews'}</p>
    </div>
  `).join('')
}

// a botton to do the call of the route when its clicked
document.querySelector('#sendBtn').addEventListener('click', async () => {
  const keyword = document.querySelector('#keywordInput').value.trim()
  if (!keyword) {
    showError('Please enter a keyword');
    return
  }
  
  try {
    const response = await fetch(`http://localhost:2000/api/scrape?keyword=${encodeURIComponent(keyword)}`)
    if (!response.ok) throw new Error('Network response was not ok')
    const data = await response.json()
    showResults(data)

    if (data.length) {
      showSuccess(`${data.length} products found!`);
    } else {
      showError('No products found.');
    }

  } catch (error) {
    showError('Error fetching data.');
  }
})