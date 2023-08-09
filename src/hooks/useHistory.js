import { useContext, useEffect, useState } from 'react';
import AuthContext from 'providers/AuthProvider';
import axios from 'api/axios';
import useWidowDimensions from 'hooks/useWindowDimensions';
import { useForm } from 'react-hook-form';

// For regular user, display only table
// For admin or librarian, display table and filters

const shortenDates = (obj, columnCodes) => {
  columnCodes.forEach((code) => {
    if (code.endsWith('Date')) {
      if (obj[code]) obj[code] = obj[code].substring(0, 10);
    }
  });
  return obj;
};
const flattenObjectForTable = (obj, columnCodes) => {
  columnCodes.forEach((code) => {
    if (!obj[code]) {
      const keys = code.split('.');
      let destinationField = obj;
      keys.forEach((key) => {
        destinationField = destinationField[key];
      });
      obj[code] = destinationField;
    }
  });
  return obj;
};

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

const useHistory = (initialFormValues, initialPage, columnCodes) => {
  const { width } = useWidowDimensions();
  const { auth } = useContext(AuthContext);
  const [historyRecords, setHistoryRecords] = useState([]);
  const [pages, setPages] = useState({});
  const [authorizedHistoryView, setAuthorizedHistoryView] = useState();
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [query, setQuery] = useState(buildQuery(initialFormValues));

  const { register, handleSubmit, reset } = useForm({ defaultValues: initialFormValues });

  const prepareObject = (obj, columnCodes) => {
    obj = flattenObjectForTable(obj, columnCodes);
    obj = shortenDates(obj, columnCodes);
    if (obj.firstName && obj.lastName) {
      obj.fullName = obj.firstName + ' ' + obj.lastName;
    }
    return obj;
  };

  const fetchLoggedInUsersHistory = (page, limit) => {
    axios.get(`users/me/history?${query}&page=${page}&limit=${limit}`).then((res) => {
      const history = res.data.data.rentals.map((record) => prepareObject(record, columnCodes));
      const pagination = res.data.data.pagination;
      setPages(pagination);
      setHistoryRecords(history);
    });
  };
  const fetchAllHistory = (page, limit) => {
    axios.get(`rentals?${query}&page=${page}&limit=${limit}`).then((res) => {
      const history = res.data.data.rentals.map((record) => prepareObject(record, columnCodes));
      const pagination = res.data.data.pagination;
      setPages(pagination);
      setHistoryRecords(history);
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage > pages.totalPages || newPage < 1) {
      return;
    }
    fetchLoggedInUsersHistory(newPage, limitPerPage);
  };

  const onSubmit = (data) => {
    const query = buildQuery(data);
    setQuery(query);
  };
  const onError = (err) => {
    reset();
  };
  const submitWithPrevent = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit, onError)();
  };

  useEffect(() => {
    if (width <= 2000) setLimitPerPage(10);
    if (width > 2000) setLimitPerPage(15);
    if (width > 2600) setLimitPerPage(20);
  }, [width]);

  useEffect(() => {
    if (auth.role === 'user') {
      setAuthorizedHistoryView(false);
      fetchLoggedInUsersHistory(initialPage, limitPerPage);
    } else {
      setAuthorizedHistoryView(true);
      fetchAllHistory(initialPage, limitPerPage);
    }
  }, [auth, limitPerPage, query]);

  return {
    authorizedHistoryView,
    historyRecords,
    pages,
    register,
    handlePageChange,
    submitWithPrevent,
  };
};

export default useHistory;
