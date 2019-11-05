import React from "react";
import CoverUnavailable from "../../images/image-unavailable.gif";
import PropTypes from "prop-types";

const EachBookDetails = props => {
  const {
    imagePath,
    optionSelected,
    handleBookShelfUpdate,
    nameOfTheBook,
    authorOfTheBook,
    bookId,
    bookShelfName,
    selected,
    index
  } = props;
  let imagePathAvailabilty =
    imagePath === undefined || imagePath === null
      ? `url(${CoverUnavailable})`
      : `url(${imagePath})`;

  return (
    <li key={"book_" + index}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: imagePathAvailabilty
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={selected ? optionSelected : bookShelfName}
              onChange={handleBookShelfUpdate}
              //this.onBookUpdate(book)}
              id={bookId}
            >
              <option value="" defaultValue disabled hidden id="option0">
                {bookShelfName}
              </option>
              <option value="currentlyReading" id="option1">
                Currently Reading
              </option>
              <option value="wantToRead" id="option2">
                Want to Read
              </option>
              <option value="read" id="option3">
                Read
              </option>
              <option value="none" id="option4">
                None
              </option>
            </select>
          </div>
        </div>
        <div className="book-title">{nameOfTheBook}</div>
        <div className="book-authors">
          {authorOfTheBook === null || authorOfTheBook === undefined ? (
            <span>author unavailable</span>
          ) : (
            authorOfTheBook.map((author, i) => {
              return <span key={author + "_" + i}>{author}</span>;
            })
          )}
        </div>
      </div>
    </li>
  );
};

EachBookDetails.propTypes = {
  imagePath: PropTypes.string.isRequired,
  optionSelected: PropTypes.string.isRequired,
  handleBookShelfUpdate: PropTypes.func.isRequired,
  nameOfTheBook: PropTypes.string.isRequired,
  authorOfTheBook: PropTypes.array.isRequired,
  bookId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired
  //selected: PropTypes.bool.isRequired
};

export default EachBookDetails;
