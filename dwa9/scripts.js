import { BOOKS_PER_PAGE, authors, genres, books } from "./Modules/data.js";
import { html } from "./Modules/querySelectors.js";

let page = 1;
let matches = books;

/**
 * The createPreview function creates a preview element for a book. 
    It creates a <div> element with the appropriate CSS class and data-id attribute. 
    It sets the onclick event handler to showBookDescription and populates the inner HTML of the element with the 
    book's image, title, and author. Finally, it returns the created element.
 * 
 * @param {string} book 
 * @returns 
 */
const createPreview = (book) => {
  //Function used by 'populateBookItems' to create preview element
  const { author, image, title, id } = book;

  let element = document.createElement("div");
  element.classList.add("preview");
  element.dataset.id = id;

  element.onclick = showBookDescription;

  element.innerHTML = /* html */ `
    <div>
        <img class="preview__image" src="${image}"/>
    </div>
    <div class="preview__info">
        <h2 class="preview__title">${title}</h2>
        <h3 class="preview__author">${authors[author]}</h3>
    </div>
    `;
  return element;
};

/**
 * The populateBookItems function takes a filtered array of books, a start-index, and an end-index. 
    It creates a document fragment, iterates over the extracted books within the specified range, creates a preview 
    element for each book, appends the previews to the fragment, and finally adds the entire fragment to the HTML document.
 * 
 * @param {string} filterBooks 
 * @param {string} startIndex 
 * @param {string} endIndex 
 */
export const populateBookItems = (filterBooks, startIndex, endIndex) => {
  const fragment = document.createDocumentFragment();
  const extracted = filterBooks.slice(startIndex, endIndex);

  for (let book of extracted) {
    const preview = createPreview({
      author: book["author"],
      id: book["id"],
      image: book["image"],
      title: book["title"],
    });
    fragment.appendChild(preview);
  }
  html.list.items.appendChild(fragment);
};

/**
 * The updateShowMoreButton function calculates the number of remaining books based on the current page and the number 
    of books per page. It updates the content and state of the html.list.button element accordingly. 
    If there are remaining books, the button is enabled and displays the number of remaining books. 
    If there are no remaining books, the button is disabled and displays zero as the remaining count.
 * 
 * @param {string} filteredBooks 
 */
export const updateShowMoreButton = (filteredBooks) => {
  let booksRemaining = filteredBooks.length - page * BOOKS_PER_PAGE;

  if (booksRemaining > 0) {
    html.list.button.innerHTML = /* html */ [
      `<span class= show_more>Show more</span>`,
      `<span class="list__remaining"> (${booksRemaining})</span>`,
    ];
    html.list.button.removeAttribute("disabled");
  } else {
    html.list.button.innerHTML = /* html */ [
      `<span class= show_more>Show more</span>`,
      `<span class="list__remaining"> (0)</span>`,
    ];

    html.list.button.setAttribute("disabled", "disabled");
  }
};

/**
 * The populateDropdownSearchGenres function creates a document fragment and appends an initial <option> element 
    with the value 'any' and the text 'All Genres'. Then, for each entry in the genres object, 
    it creates a new <option> element with the corresponding id as the value and the name as the text content. 
    Finally, it appends the entire fragment, with all the <option> elements, to the genres element in the HTML. 
    This function is used to populate a dropdown list of genres in a search feature.
 */
export const populateDropdownSearchGenres = () => {
  const fragment = document.createDocumentFragment();
  let element = document.createElement("option");
  element.value = "any";
  element.innerText = "All Genres";
  fragment.appendChild(element);

  for (const [id, name] of Object.entries(genres)) {
    const option = document.createElement("option");
    option.value = id;
    option.innerText = name;
    fragment.appendChild(option);
  }

  html.search.genres.appendChild(fragment);
};

/**
 * The populateDropdownSearchAuthors function creates a document fragment and 
    appends an initial <option> element with the value 'any' and the text 'All Authors'. Then, 
    for each entry in the authors object, it creates a new <option> element with the corresponding id as the value and the value as the text content. 
    Finally, it appends the entire fragment, with all the <option> elements, to the authors element in the HTML. 
    This function is used to populate a dropdown list of authors in a search feature.
 */
export const populateDropdownSearchAuthors = () => {
  let fragment = document.createDocumentFragment();
  let element = document.createElement("option");
  element.value = "any";
  element.innerText = "All Authors";
  fragment.appendChild(element);

  for (const [id, value] of Object.entries(authors)) {
    const option = document.createElement("option");
    option.value = id;
    option.innerText = value;
    fragment.appendChild(option);
  }

  html.search.authors.appendChild(fragment);
};

//EventHandler
/**
 * The showBookDescription function is designed to handle an event (presumably triggered by clicking on a book) and 
    update various elements in the HTML document with information about the selected book. 
    It retrieves the book object based on the ID from the event, extracts relevant details such as the author and 
    publish year, and updates the appropriate elements in the HTML. 
    Finally, it calls a separate function toggleListDialog to handle the visibility or display of a dialog or modal
 * 
 * @param {any} event 
 */
const showBookDescription = (event) => {
  //this is a inline Event Listener added in 'createPreview'.
  let bookID = event.currentTarget.getAttribute("data-id");
  let book = books.find((b) => b.id === bookID);
  let publishYear = new Date(book.published).getFullYear();
  let subtitle = `${authors[book.author]} (${publishYear})`;

  html.list.image.setAttribute("src", book.image);
  html.list.title.innerHTML = book.title;
  html.list.subtitle.innerHTML = subtitle;
  html.list.description.innerHTML = book.description;

  toggleListDialog(event);
};

/**
 * The toggleListDialog function toggles the presence of the open attribute on the html.list.overlay element. 
    The open attribute is commonly used to control the visibility or display of a dialog or modal element in HTML. 
    When the function is called, it will toggle the visibility state of the specified element based on the presence or 
    absence of the open attribute.
 */
export const toggleListDialog = () => {
  html.list.overlay.toggleAttribute("open");
};

/**
 * The showMoreBooks function is designed to handle an event (presumably triggered by clicking a "Show more" button) and 
    perform the necessary actions to display the next set of books. It calculates the startIndex and endIndex based on 
    the current page, updates the page count, calls the populateBookItems function to display the books within the 
    specified range, and then calls the updateShowMoreButton function to update the UI elements related to showing more books.
 */
export const showMoreBooks = () => {
  let startIndex = BOOKS_PER_PAGE * page;
  page = page + 1;
  let endIndex = BOOKS_PER_PAGE * page;

  populateBookItems(matches, startIndex, endIndex);
  updateShowMoreButton(matches);
};

/**
 * The toggleSearchDialog function toggles the presence of the open attribute on the html.search.overlay element, 
    controlling the visibility or display of a search dialog or modal. Additionally, it focuses on the title element, 
    possibly to ensure that the user's attention is directed to the search input when the dialog is opened.
 */
export const toggleSearchDialog = () => {
  html.search.overlay.toggleAttribute("open");
  html.search.title.focus();
};

/**
 * The toggleSettingsDialog function toggles the presence of the open attribute on the html.settings.overlay element, 
    controlling the visibility or display of a settings dialog or modal. Additionally, it focuses on the title element, 
    possibly to ensure that the user's attention is directed to a specific input or element when the dialog is opened.
 */
export const toggleSettingsDialog = () => {
  html.settings.overlay.toggleAttribute("open");
};

/**
 * The handleSearchFormSubmit function handles the form submission event for a search form. 
    It extracts the form data, applies the corresponding filters to the books array, updates the UI elements to display 
    the filtered results, and performs additional actions such as showing a message, resetting the page count, 
    scrolling to the top, and toggling the visibility of the search dialog.
 * 
 * @param {any} event 
 */
export const handleSearchFormSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);

  let filteredBooks = books;

  if (filters.title !== "") {
    filteredBooks = filteredBooks.filter((b) =>
      b.title.toLowerCase().includes(filters.title.toLowerCase())
    );
  }

  if (filters.genre !== "any") {
    filteredBooks = filteredBooks.filter((b) =>
      b.genres.includes(filters.genre)
    );
  }

  if (filters.author !== "any") {
    filteredBooks = filteredBooks.filter((b) => b.author === filters.author);
  }

  if (filteredBooks.length < 1) {
    html.list.message.classList.add("list__message_show");
  } else {
    html.list.message.classList.remove("list__message_show");
  }

  page = 1;
  matches = filteredBooks;
  html.list.items.innerHTML = "";
  populateBookItems(filteredBooks, 0, BOOKS_PER_PAGE);
  updateShowMoreButton(filteredBooks);

  window.scrollTo({ top: 0, behavior: "smooth" });
  html.search.overlay.toggleAttribute("open");
};

/**
 * The handleSettingFormSubmit function handles the form submission event for a settings form. It extracts the form data, 
    accesses the appropriate color values based on the selected theme, and sets CSS custom properties on the document 
    element to update the color scheme. Finally, it closes the settings overlay or dialog.
 * 
 * @param {any} event 
 */
export const handleSettingFormSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const result = Object.fromEntries(formData);

  const day = {
    dark: "10, 10, 20",
    light: "255, 255, 255",
  };

  const night = {
    dark: "255, 255, 255",
    light: "10, 10, 20",
  };

  const css = {
    day: day,
    night: night,
  };

  document.documentElement.style.setProperty(
    "--color-light",
    css[result.theme].light
  );
  document.documentElement.style.setProperty(
    "--color-dark",
    css[result.theme].dark
  );

  html.settings.overlay.close();
};
