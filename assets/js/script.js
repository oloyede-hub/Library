

class Book {
    constructor(
    image,
    pages = '0',
    title = 'Unknown',
    author = 'Unknown',
    isRead = false
    ) {
        this.image = image;
        this.pages = pages;
        this.title = title;
        this.author = author;
        this.isRead = isRead;
    }
}


class Library {
    constructor() {
        this.books = [];
    }
    addNewBook(newBook) {
        this.books.push(newBook)
    }
    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title);
    }
}


const library = new Library();

console.log(library)



// Custom Event Listener

const addEventonElem = (elem, type, callback) => {
    if (elem.length > 1) {
        for (let i = 0; i < elem.length; i++) {
            elem[i].addEventListener(type, callback)
        }
    } else {
        elem.addEventListener(type, callback)
    }
}



const login_toggle = document.querySelector("[data-login-toggle]");
const addNewBookBtn = document.querySelector("[data-addNewBook]");
const overlay = document.querySelector("[data-overlay]");
const modal = document.querySelector("[data-modal]");
const content = document.querySelector("[data-content]");
const submitBtn = document.querySelector("[data-submit-book]");
const form = document.querySelector("[data-form]");

const toggleLogin = () => {
    login_toggle.classList.toggle("active")
}


login_toggle.addEventListener("click", toggleLogin)



const addNewBookToggle = () => {
    overlay.classList.add("active");
    modal.classList.add("active");
}


addNewBookBtn.addEventListener("click", addNewBookToggle);


const cancelOverLay = () => {
    modal.classList.remove("active");
    overlay.classList.remove("active");
}

overlay.onclick = cancelOverLay;

// Book Card

const createBookCard = (book) => {
    const BookCard = document.createElement("div");
    const BookContainer = document.createElement("div");
    const titleElement = document.createElement("h4");
    const pageElement = document.createElement("p")
    const imageElement = document.createElement("img");
    const authorElement = document.createElement("p");
    const readButton = document.createElement("button");
    const removeButton = document.createElement("button");
    const deleIcon = document.createElement("span");

    BookCard.classList.add("book-card")
    BookContainer.classList.add("book-container")
    imageElement.classList.add("book-img")
    titleElement.classList.add("title")
    authorElement.classList.add("author")
    pageElement.classList.add("pages")
    readButton.classList.add("btn")
    removeButton.classList.add("btn")
    deleIcon.classList.add("material-symbols-outlined");
    
    titleElement.textContent = `Title: ${book.title}`;
    // if(book.image.length > 1){
    //     for (let i = 0; i < book.image.length; i++) {
    //         const image = book.image[i];
    //         imageElement.src = URL.createObjectURL(image);
            
    //     }
    // }else {
    // }
    if(book.image) {
        imageElement.src = window.URL.createObjectURL(book.image);
    }else {
        imageElement.src = "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn1.vectorstock.com%2Fi%2F1000x1000%2F50%2F20%2Fno-photo-or-blank-image-icon-loading-images-vector-37375020.jpg&imgrefurl=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fno-photo-or-blank-image-icon-loading-images-vector-37375020&tbnid=b5-4hKfVwh-z0M&vet=12ahUKEwikmtuS_cD5AhVYgc4BHRGqB2EQMygEegUIARDuAQ..i&docid=GF-jQq9zrRm4dM&w=1000&h=976&q=blank%20image&ved=2ahUKEwikmtuS_cD5AhVYgc4BHRGqB2EQMygEegUIARDuAQ"
    }
    authorElement.textContent = `Title: ${book.author} `;
    pageElement.textContent = `Pages: ${book.pages} pages`;
    deleIcon.textContent = "delete";
    removeButton.onclick = library.removeBook;

    if(book.isRead) {
        readButton.textContent = "Read"
        readButton.style.backgroundColor = "lightgreen";

    }else {
        readButton.textContent = "Not Read"
        readButton.style.backgroundColor = "red";
        readButton.style.color = "white";
    }



    BookCard.appendChild(BookContainer);
    BookContainer.appendChild(imageElement)
    BookContainer.appendChild(titleElement)
    BookContainer.appendChild(authorElement)
    BookContainer.appendChild(pageElement)
    BookContainer.appendChild(readButton);
    BookContainer.appendChild(removeButton)
    removeButton.appendChild(deleIcon);
    content.appendChild(BookCard)
}


const getInputData = () => {
    const ImageInput = document.querySelector("[data-image]").files[0];
    const titleInput = document.querySelector("[data-title]").value || "Unkown";
    const authorInput = document.querySelector("[data-author]").value || "Unkown";
    const pagesInput = document.querySelector("[data-pages]").value || "0";
    const isReadInput = document.querySelector("[data-isRead]").checked || false;
    return new Book(ImageInput, pagesInput, titleInput, authorInput, isReadInput);
}


  
  const resetBooksGrid = () => {
    content.innerHTML = ''
  }

  
const updateBooksGrid = () => {
    resetBooksGrid();
    for (let book of library.books) {
        createBookCard(book);
    }
}


const addCurrentNewBook = (e) => {
    e.preventDefault();
    
    const newBook = getInputData();
    if(!newBook.pages && !newBook.title && !newBook.author){
        return;
    }

    console.log(newBook)
    library.addNewBook(newBook);
    updateBooksGrid();
    cancelOverLay();
    form.reset();
}



submitBtn.addEventListener("click", addCurrentNewBook);





