import React from "react";
import "./styles/App.css";
import SearchPage from "./components/search/SearchPage";
import BookShelves from "./components/books/BookShelves";
import EachBookDetails from "./components/books/EachBookDetails";
import * as BooksAPI from "./utils/BooksAPI";
import { BrowserRouter as Router, Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    booksRead: [],
    optionValue: "",
    showSearchPage: false,
    isLoading: true,
    isOptionSelected: false
  };

  componentDidMount() {
    let currentlyReading = [];
    let wantToRead = [];
    let booksRead = [];
    //get all the books when the page is loaded
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books,
        isLoading: false
      }));
      //list the books according to the shelves in an array --
      //currentlyReading,  wantToRead, booksRead
      return this.state.books.map(book => {
        //1.currently Reading shelf
        if (book.shelf === "currentlyReading") {
          currentlyReading.push(book);
          this.setState(() => ({
            currentlyReading: currentlyReading,
            isOptionSelected: false,
            bookShelfName: "currentlyReading"
          }));
        }
        //2. want to read shelf
        if (book.shelf === "wantToRead") {
          wantToRead.push(book);
          this.setState(() => ({
            wantToRead: wantToRead,
            isOptionSelected: false,
            bookShelfName: "wantToRead"
          }));
        }
        //3. books read shelf
        if (book.shelf === "read") {
          booksRead.push(book);
          this.setState(() => ({
            booksRead: booksRead,
            isOptionSelected: false,
            bookShelfName: "read"
          }));
        }

        return this.state.books;
      });
    });
  }

  //UI display for currently reading book shelf
  renderCurrentlyReadingBooks = () => {
    const { currentlyReading, optionValue } = this.state;

    return currentlyReading.map((book, i) => {
      /* if (optionValue === "wantToRead") {
        BooksAPI.update(book, book.shelf);
      } */
      return (
        <EachBookDetails
          key={"book_" + i}
          imagePath={book.imageLinks.thumbnail}
          optionSelected={optionValue}
          handleBookShelfUpdate={this.onBookUpdate(book)}
          nameOfTheBook={book.title}
          authorOfTheBook={book.authors}
          bookId={book.id}
          index={i}
          isOptionSelected={this.state.isOptionSelected}
          bookShelfName="currentlyReading"
        />
      );
    });
  };

  //UI display for want to read book shelf
  renderWantToReadBooks = () => {
    const { wantToRead } = this.state;
    return wantToRead.map((book, i) => {
      return (
        <EachBookDetails
          key={"books_" + i + i}
          imagePath={book.imageLinks.thumbnail}
          optionSelected={this.state.optionValue}
          handleBookShelfUpdate={this.onBookUpdate(book)}
          nameOfTheBook={book.title}
          authorOfTheBook={book.authors}
          bookId={book.id}
          index={i}
          isOptionSelected={this.state.isOptionSelected}
          bookShelfName="wantToRead"
        />
      );
    });
  };

  //UI display for read book shelf
  renderBooksRead = () => {
    const { booksRead } = this.state;

    return booksRead.map((book, i) => {
      return (
        <EachBookDetails
          key={"books_0" + i}
          imagePath={book.imageLinks.thumbnail}
          optionSelected={this.state.optionValue}
          handleBookShelfUpdate={this.onBookUpdate(book)}
          nameOfTheBook={book.title}
          authorOfTheBook={book.authors}
          bookId={book.id}
          index={i}
          bookShelfName="read"
          isOptionSelected={this.state.isOptionSelected}
        />
      );
    });
  };

  //function called when a book is moved from one shelf to another
  onBookUpdate = book => event => {
    this.setState(
      {
        optionValue: event.target.value,
        isOptionSelected: true
      },
      () => {
        if (
          book.shelf === "currentlyReading" &&
          this.state.optionValue === "wantToRead"
        ) {
          book.shelf = "wantToRead";
          this.setState({
            currentlyReading: this.state.currentlyReading.filter(
              c => c.id !== book.id
            ),
            wantToRead: this.state.wantToRead.concat(book),
            optionValue: "none"
          });
          BooksAPI.update(book, book.shelf);
        }
        if (
          book.shelf === "currentlyReading" &&
          this.state.optionValue === "read"
        ) {
          book.shelf = "read";
          this.setState({
            currentlyReading: this.state.currentlyReading.filter(
              c => c.id !== book.id
            ),
            booksRead: this.state.booksRead.concat(book),
            optionValue: "none"
          });
          BooksAPI.update(book, book.shelf);
        }

        if (
          book.shelf === "wantToRead" &&
          this.state.optionValue === "currentlyReading"
        ) {
          book.shelf = "currentlyReading";
          this.setState({
            wantToRead: this.state.wantToRead.filter(c => c.id !== book.id),
            currentlyReading: this.state.currentlyReading.concat(book),
            optionValue: "none"
          });
          BooksAPI.update(book, book.shelf);
        }

        if (book.shelf === "wantToRead" && this.state.optionValue === "read") {
          book.shelf = "read";
          this.setState({
            wantToRead: this.state.wantToRead.filter(c => c.id !== book.id),
            booksRead: this.state.booksRead.concat(book),
            optionValue: "none"
          });
          BooksAPI.update(book, book.shelf);
        }

        if (book.shelf === "read" && this.state.optionValue === "wantToRead") {
          book.shelf = "wantToRead";
          this.setState({
            booksRead: this.state.booksRead.filter(c => c.id !== book.id),
            wantToRead: this.state.wantToRead.concat(book),
            optionValue: "none"
          });
          BooksAPI.update(book, book.shelf);
        }

        if (
          book.shelf === "read" &&
          this.state.optionValue === "currentlyReading"
        ) {
          book.shelf = "currentlyReading";
          this.setState({
            booksRead: this.state.booksRead.filter(c => c.id !== book.id),
            currentlyReading: this.state.currentlyReading.concat(book),
            optionValue: "none"
          });
          BooksAPI.update(book, book.shelf);
        }
      }
    );
  };

  render() {
    const {
      books,
      isLoading,
      wantToRead,
      booksRead,
      currentlyReading
    } = this.state;
    return (
      <div>
        <Router>
          <Route
            key="search"
            exact
            path="/search"
            render={({ history }) => (
              <div>
                {books === null || books === undefined ? null : (
                  <SearchPage
                    books={books}
                    currentlyReading={currentlyReading}
                    wantToRead={wantToRead}
                    booksRead={booksRead}
                  />
                )}
              </div>
            )}
          />

          <Route
            key="home"
            exact
            path="/"
            render={() => (
              <div>
                {isLoading && (books === null || books === undefined) ? (
                  <div>
                    <p>Loading...</p>
                  </div>
                ) : (
                  <BookShelves
                    key={
                      "bookshelves_" +
                      Math.random()
                        .toString(16)
                        .slice(2)
                    }
                    currentlyReadingTitle="Currently Reading"
                    displayCurrentlyReadingBooks={this.renderCurrentlyReadingBooks()}
                    wantToReadTitle="Want to Read"
                    displayWantToReadBooks={this.renderWantToReadBooks()}
                    readTitle="Read"
                    displayTheBooksRead={this.renderBooksRead()}
                  />
                )}
              </div>
            )}
          />
        </Router>
      </div>
    );
  }
}
export default BooksApp;
