import { useContext } from 'react';
import AuthContext from 'providers/AuthProvider';
import { useForm } from 'react-hook-form';
import BorrowingsContext from 'providers/BorrowingsProvider';

// For regular user, display only table
// For admin or librarian, display table and filters



const buildQuery = (data) => {
  let query = '';
  // Start date from
  if (data.startDateFrom) query += `startDate[gte]=${data.startDateFrom}&`;
  if (data.startDateTo) query += `startDate[lte]=${data.startDateTo}&`;
  // Return date
  if (data.returnDateFrom) query += `returnDate[gte]=${data.returnDateFrom}&`;
  if (data.returnDateTo) query += `returnDate[lte]=${data.returnDateTo}&`;

  // Statuses
  const statusArr = [];
  for (const [key, val] of Object.entries(data.status)) {
    if (val) statusArr.push(key);
  }
  if (statusArr.length > 0) query += `currentStatus=${statusArr.join(',')}&`;

  // Search query on the title
  if (data.bookSearchQuery) query += `bookSearch=${data.bookSearchQuery}&`;
  if (data.userSearchQuery) query += `userSearch=${data.userSearchQuery}&`;

  // Delete the last & sign
  return query.substring(0, query.length - 1);
};

const useHistory = (initialFormValues) => {
  const { auth } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm({ defaultValues: initialFormValues });
  const { history, paginationData, authorizedHistory, errorMsg, setHistoryQuery, setCurrentPage } =
    useContext(BorrowingsContext);

  const onSubmit = (data) => {
    const query = buildQuery(data);
    setHistoryQuery(query);
  };

  // TODO - do something meaningfully here
  const onError = (err) => {
    reset();
  };
  const submitWithPrevent = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit, onError)();
  };
  const handlePageChange = (newPage) => {
    if (newPage > paginationData.totalPages || newPage < 1) return;
    setCurrentPage(newPage);
  };

  return {
    authorizedHistory,
    history,
    paginationData,
    register,
    handlePageChange,
    submitWithPrevent,
  };
};

export default useHistory;
