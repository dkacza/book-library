import { useContext, useEffect, useState } from 'react';
import AuthContext from 'providers/AuthProvider';
import axios from 'api/axios';
import useWidowDimensions from 'hooks/useWidowDimensions';
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

const useHistory = (initialFormValues, initialPage, columnCodes) => {
  const { width } = useWidowDimensions();
  const { auth } = useContext(AuthContext);
  const [historyRecords, setHistoryRecords] = useState([]);
  const [pages, setPages] = useState({});
  const [currentUserHistorySelected, setCurrentUserHistorySelected] = useState();
  const [limitPerPage, setLimitPerPage] = useState(10);

  const { register, handleSubmit, reset } = useForm({ defaultValues: initialFormValues });

  const prepareObject = (obj, columnCodes) => {
    obj = flattenObjectForTable(obj, columnCodes);
    obj = shortenDates(obj, columnCodes);
    return obj;
  };

  const fetchLoggedInUsersHistory = (page, limit) => {
    axios.get(`users/me/history?page=${page}&limit=${limit}`).then((res) => {
      const history = res.data.data.rentals.map((record) => prepareObject(record, columnCodes));
      const pagination = res.data.data.pagination;
      setPages(pagination);
      setHistoryRecords(history);
    });
  };
  const fetchAllHistory = (page, limit) => {
    axios.get(`users/${auth._id}/history?page=${page}&limit=${limit}`).then((res) => {
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

    console.log(data);
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
      setCurrentUserHistorySelected(true);
      fetchLoggedInUsersHistory(initialPage, limitPerPage);
    } else {
      setCurrentUserHistorySelected(true);
      fetchAllHistory();
    }
  }, [auth, limitPerPage]);

  return {
    currentUserHistorySelected,
    historyRecords,
    pages,
    register,
    handlePageChange,
    submitWithPrevent,
  };
};

export default useHistory;
