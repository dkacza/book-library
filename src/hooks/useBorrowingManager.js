import { useEffect, useState } from 'react';
import axios from 'api/axios';
import flattenBookAuthors from 'utils/flattenBookAuthors';
import useDebounce from 'hooks/useDebounce';

const API_CALL_DELAY = 600;

const UseBorrowingManager = (selectedUser, setSelectedUser) => {
  const [returnSelected, setReturnSelected] = useState(true); // True -> returning books, False -> borrowing books
  const [currentBorrowings, setCurrentBorrowings] = useState([]); // Array of book objects
  const [bookSearchQuery, setBookSearchQuery] = useState(); // Search query for books
  const [books, setBooks] = useState(); // Books to rent

  // Fetch books to borrow from search query
  const fetchBooks = () => {
    console.log('fetching')
    axios
      .get(`/books?currentStatus=available&search=${bookSearchQuery}`)
      .then((res) => {
        const books = flattenBookAuthors(res.data.data.books);
        console.log(books)
        setBooks(books);
      })
      .catch((err) => console.log(err));
  };

  // Fetch books which have been borrowed by users
  const fetchBorrowedBooks = async () => {
    const borrowingIds = selectedUser.rentals;
    const promises = borrowingIds.map(async (id) => {
      const response = await axios.get(`rentals/${id}`);
      return response.data.data.rental;
    });
    const data = await Promise.all(promises);
    setCurrentBorrowings(data);
  };

  // Make API request when book search query changes
  useDebounce(fetchBooks, API_CALL_DELAY, [bookSearchQuery]);

  // Fetch data about borrowed books when current user object changes
  useEffect(() => {
    fetchBorrowedBooks();
  }, [selectedUser]);

  // Switch action between returns and borrowings
  const toggleAction = () => {
    const newAction = !returnSelected;
    setReturnSelected(newAction);
  };

  // Handle input change on book search query
  const handleQueryChange = (e) => {
    if (e.target.value === '') {
      setBooks(undefined);
      return;
    }
    setBookSearchQuery(e.target.value);
  };

  // Handle book return
  // Modify selected users rental array, exclude borrowing id -> triggers useEffect
  const handleBookReturn = (e, borrowingId) => {
    axios
      .patch(`/rentals/${borrowingId}`, { currentStatus: 'returned' })
      .then(() => {
        setSelectedUser({
          ...selectedUser,
          rentals: selectedUser.rentals.filter((rental) => rental !== borrowingId),
        });
      })
      .catch((err) => console.log(err));
  };

  // Handle book return
  // Modify selected user rental array, append borrowing id -> triggers useEffect
  const handleBookBorrow = (e, bookId) => {
    axios
      .post('/rentals', { user: selectedUser._id, book: bookId })
      .then((res) => {
        const rentalId = res.data.data.rental._id;
        const newRentals = [...selectedUser.rentals, rentalId];
        setSelectedUser({
          ...selectedUser,
          rentals: newRentals,
        });
        // Update book data
        fetchBooks();
      })
      .catch((err) => console.log(err));
  };

  return {
    books,
    currentBorrowings,
    toggleAction,
    handleBookBorrow,
    handleBookReturn,
    bookSearchQuery,
    handleQueryChange,
    returnSelected,
  }
};

export default UseBorrowingManager;
