 function createPromise(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const randomNumber = Math.floor(Math.random() * 10) + 1;
            resolve(randomNumber);
        }, delay * 1000);
    });
}

const promises = [
    createPromise(1),
    createPromise(2),
    createPromise(3)
];

Promise.all(promises)
    .then(results => {
        const sum = results.reduce((total, num) => total + num, 0);
        document.getElementById("result").textContent = `Сума: ${sum}`;
    })
    .catch(error => {
        console.error("Помилка:", error);
    });