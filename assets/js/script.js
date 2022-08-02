
function Book(image, pages, title , author , isRead) {
    this.image = image;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}


function Library() {
    this.books = [];
    this.addNewBook = function (newBook) {
        this.books.push(newBook)
    }
    this.removeBook = function (title) {
        this.books = this.books.filter((book) => book.title !== title)
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
    
    titleElement.textContent = book.title;
    // if(book.image.length > 1){
    //     for (let i = 0; i < book.image.length; i++) {
    //         const image = book.image[i];
    //         imageElement.src = URL.createObjectURL(image);
            
    //     }
    // }else {
    // }
    imageElement.src = window.URL.createObjectURL(book.image);
    authorElement.textContent = book.author;
    pageElement.textContent = `${book.pages} pages`;
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
    BookContainer.appendChild(readButton);
    BookContainer.appendChild(removeButton)
    removeButton.appendChild(deleIcon);
    content.appendChild(BookCard)
}


const getInputData = () => {
    const ImageInput = document.querySelector("[data-image]").files[0];
    const titleInput = document.querySelector("[data-title]").value;
    const authorInput = document.querySelector("[data-author]").value;
    const pagesInput = document.querySelector("[data-pages]").value;
    const isReadInput = document.querySelector("[data-isRead]").checked;
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
    library.addNewBook(newBook);
    updateBooksGrid();
    cancelOverLay();
    form.reset();
}



submitBtn.addEventListener("click", addCurrentNewBook);





