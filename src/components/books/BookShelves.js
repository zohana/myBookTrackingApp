import React from "react";
import { Link } from "react-router-dom";
import SearchIcon from "../../images/search.png";
import PropTypes from "prop-types";

const BookShelves = props => {
  const {
    currentlyReadingTitle,
    displayCurrentlyReadingBooks,
    wantToReadTitle,
    displayWantToReadBooks,
    readTitle,
    displayTheBooksRead
  } = props;
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{currentlyReadingTitle}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid" key="dcrb">
                {displayCurrentlyReadingBooks}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{wantToReadTitle}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid" key="dwrb">
                {" "}
                {displayWantToReadBooks}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{readTitle}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid" key="drb">
                {displayTheBooksRead}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search" className="search-icon">
          <img src={SearchIcon} alt="searchIcon" />
        </Link>
      </div>
    </div>
  );
};

BookShelves.propTypes = {
  currentlyReadingTitle: PropTypes.string.isRequired,
  displayCurrentlyReadingBooks: PropTypes.array.isRequired,
  wantToReadTitle: PropTypes.string.isRequired,
  displayWantToReadBooks: PropTypes.array.isRequired,
  readTitle: PropTypes.string.isRequired,
  displayTheBooksRead: PropTypes.array.isRequired
};

export default BookShelves;
