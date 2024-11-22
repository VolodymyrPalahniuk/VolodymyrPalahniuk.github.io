const loader = document.getElementById('loader');
const result = document.getElementById('result');


function fetchData() {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
        if (success) {
        resolve("Дані успішно завантажено!");
      } else {
        reject("Виникла помилка під час завантаження даних.");
      }
    }, 2000);
  });
}

function loadWithLoader() {
    loader.style.display = "block";
    result.textContent = "";

    fetchData()
    .then((data) => {
      result.textContent = data;
    })
    .catch((error) => {
      result.textContent = error; 
    })
    .finally(() => {
      loader.style.display = "none";
    });
}

loadWithLoader();
