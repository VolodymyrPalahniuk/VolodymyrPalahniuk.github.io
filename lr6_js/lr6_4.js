function compareNumbers(num1, num2) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num1 > num2) {
                resolve("Перше число більше");
            } else if (num1 < num2) {
                resolve("Друге число більше");
            } else {
                reject("Числа рівні");
            }
        }, 1000);
    });
}

compareNumbers(5, 3)
    .then(message => console.log(message))
    .catch(error => console.error(error));

compareNumbers(2, 8)
    .then(message => console.log(message))
    .catch(error => console.error(error));

compareNumbers(4, 4)
    .then(message => console.log(message))
    .catch(error => console.error(error)); 