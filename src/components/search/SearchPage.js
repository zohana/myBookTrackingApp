import React, { Component } from "react";
import "../../styles/App.css";
import { Link } from "react-router-dom";
import imageUnavailable from "../../images/image-unavailable.gif";
import * as BooksAPI from "../../utils/BooksAPI";
import EachBookDetails from "../books/EachBookDetails";
//"./utils/BooksAPI";

class SearchPage extends Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    booksRead: [],
    query: "",
    showNotFound: false,
    optionValue: "",
    searchBooks: [],
    isOptionSelected: false
  };

  //function called when the user clears the input field
  clearQuery = () => {
    this.updateQuery("");
  };

  searchBook = query => {
    this.setState(() => ({
      query: query
    }));
    BooksAPI.search(query, 20)
      .then(data => {
        console.log(data);
        if (data.error) return null;
        if (data === null || data === undefined) return null;
        this.setState(state => ({
          searchBooks: data,
          showNotFound: false
        }));
      })
      .catch(function(e) {
        console.log("e");
        console.log(e);
      });
  };

  onBookUpdate = book => event => {
    console.log(book);
    this.setState({
        optionValue: event.target.value,
        isOptionSelected: true
      },
      () => {
        console.log("optionValue " + this.state.optionValue);

        if (this.state.optionValue === "wantToRead") {
          // book.push({"shelf": "wantToRead"})
          this.setState({
            wantToRead: this.props.wantToRead.concat(book),
            optionValue: "wantToRead"
          });
          //BooksAPI.update(book, book.shelf);
          BooksAPI.update(book, this.props.wantToRead);
        }
        if (this.state.optionValue === "read") {
          //book.push({"shelf": "read"})
          this.setState({
            booksRead: this.props.booksRead.concat(book),
            optionValue: "read"
          });
          //BooksAPI.update(book, book.shelf);
          BooksAPI.update(book, this.props.wantToRead);
        }

        if (this.state.optionValue === "currentlyReading") {
          //book.push({"shelf": "currentlyReading"})
          this.setState({
            currentlyReading:  this.props.currentlyReading.concat(book),
            optionValue: "currentlyReading"
          });
          //BooksAPI.update(book, book.shelf);

          BooksAPI.update(book,  this.props.currentlyReading);
        }
      }
    );
  };

  render() {
    const { query, searchBooks, showNotFound } = this.state;
    if (searchBooks.errors === true) {
      alert("ooo");
    }
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.searchBook(event.target.value)}
            />
          </div>
        </div>

        <div className="search-books-results">
          {this.state.query === "" || searchBooks.errors ? (
            <div>query cannot be empty</div>
          ) : (
            <div>
              <ol className="books-grid">
                {searchBooks.map((book, i) => {
                  return (
                    <div
                      key={Math.random()
                        .toString(16)
                        .slice(2)}
                    >
                      <EachBookDetails
                        key={"book_" + i + "_s"}
                        imagePath={
                          book.imageLinks === undefined
                            ? imageUnavailable
                            : book.imageLinks.thumbnail
                        }
                        optionSelected={this.state.optionValue}
                        handleBookShelfUpdate={this.onBookUpdate(book)}
                        nameOfTheBook={book.title}
                        authorOfTheBook={book.authors}
                        bookId={book.id}
                        index={i}
                        isOptionSelected={this.state.isOptionSelected}
                        bookShelfName={this.state.optionValue}
                      />
                    </div>
                  );
                })}
              </ol>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchPage;
