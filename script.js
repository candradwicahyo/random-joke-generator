window.onload = () => {
  
  const text = document.querySelector('.text');
  
  async function loadData() {
    try {
      // jika berhasil mengambil data, maka tampilkan data tersebut
      const data = await fetchData();
      text.textContent = `“${data}”`;
    } catch (error) {
      /*
        jika mengalami masalah saat mengambil data
        maka tampilkan error
      */
      text.parentElement.innerHTML = showError(error);
    }
  }
  
  loadData();
  
  function fetchData() {
    // API (application programming interface)
    return fetch('https://icanhazdadjoke.com/', {
      // ketentuan dari pihak penyedia API 
      headers: {
        Accept: 'application/json'
      } 
    })
    .then(response => response.json())
    .then(response => response.joke)
    .catch(error => {
      // jika mengalami error saat pengambilan data
      throw new Error(error);
    })
  }
  
  function showError(message) {
    return `
    <div class="col-md-6 mx-auto">
      <div class="alert alert-danger" role="alert">
        <h3 class="fw-normal mb-2">Error!</h3>
        <span class="fw-light">${message}</span>
      </div>
    </div>
    `;
  }
  
  // tombol generate
  const generateButton = document.querySelector('.btn-generate');
  generateButton.addEventListener('click', loadData);
  
}