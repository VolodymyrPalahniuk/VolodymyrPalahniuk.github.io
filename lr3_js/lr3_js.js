let book = {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    year: 1997,
    isRead: true,
    bookInfo() {
        console.log(`Назва: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}, Прочитана: ${this.isRead ? "Так" : "Ні"}`)
    },

    markAsRead() {
        this.isRead = true;
    }
}
book.bookInfo();

book.isRead = !book.isRead;
book.bookInfo();

let library = [
    { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", year: 1997, isRead: true },
    { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937, isRead: false },
    { title: "1984", author: "George Orwell", year: 1949, isRead: true }
]   

function displayLibrary() {
    library.forEach(book => {
        console.log(`Назва: ${book.title}. Автор: ${book.author}, Piк видання: ${book. year}. Прочитана: ${book.isRead? "Так": "Hi"}`);
    });
 }

library.push({ title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, isRead: false});
displayLibrary();


library.sort((a, b) => a.year - b.year);
console.log("Відсортовані книги за роком видання:", library);

/*let unreadBooks = library.filter(book => !book.isRead);
console.log("Непрочитані книги:", unreadBook);*/

let tolkienBook = library.find(book => book.author === "J.R.R. Tolkien");
console.log("Книга Толкіна:", tolkienBook);

function addBookToLibrary() {
    let title = prompt("Введіть назву книги:");
    let author = prompt("Введіть автора книги:");
    let year = +prompt("Введіть рік видання книги:");
    let isRead = confirm("Чи прочитана книга?");

    library.push({ title, author, year, isRead });
    displayLibrary();
}

addBookToLibrary();

function calculateAverageYear() {

    let totalYears = library.reduce((sum, book) => sum + book.year, 0); 
    let averageYear = totalYears / library.length; 

    return averageYear;
}

let averageYear = calculateAverageYear();
console.log("Середній рік видання книг:", averageYear);


let auto = {
    mark: "",
    model: "",
    year: 0,
    enginetype: "",
    isUsed: true,
    autoInfo() {
        console.log(`Марка: ${this.mark}, Модель: ${this.model}, Рік випуску: ${this.year}, Тип двигуна: ${this.enginetype}, Використовується: ${this.isUsed ? "Так" : "Ні"}`)
    },
}

let carСollection = [
    { mark: "Toyota", model: "Corolla", year: 2018, enginetype: "Бензиновий",  isUsed: true},
    { mark: "BMW", model: "X5", year: 2021, enginetype: "Дизельний",  isUsed: false},
    { mark: "Tesla", model: "Model 3", year: 2020, enginetype: "Електричний",  isUsed: true},
    { mark: "Audi", model: "A6", year: 2019, enginetype: "Гібридний",  isUsed: false},
]

function displayCarСollection() {
    carСollection.forEach(auto => {
        console.log(`Марка: ${auto.mark}, Модель: ${auto.model}, Рік випуску: ${auto.year}, Тип двигуна: ${auto.enginetype}, Використовується: ${auto.isUsed ? "Так" : "Ні"}`);
    });
 }

function addCarToСollection() {
    let mark = prompt("Введіть марку машини:");
    let model = prompt("Введіть модель машини:");
    let year = +prompt("Введіть рік випуску:");
    let enginetype = prompt("Введіть тип двигуна:");
    let isUsed = confirm("Чи використовується?");

    carСollection.push({ mark, model, year, enginetype, isUsed});
    displayCarСollection();
}

addCarToСollection();

let specificEngineTypeCar = carСollection.find(auto => auto.enginetype.toLowerCase() === "електричний".toLowerCase());
console.log("Автомобіль з електричним двигуном:", specificEngineTypeCar);