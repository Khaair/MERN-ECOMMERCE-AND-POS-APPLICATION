import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const PaginatedDataTable = () => {
  // State to manage data
  const [data, setData] = useState([]);
  // State to manage current page
  const [currentPage, setCurrentPage] = useState(0);
  // Items per page
  const perPage = 5;
  // Your access token (replace with your token acquisition logic)
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWIyYTFkNDA2NjMwNjBmMGI1MzZiZDgiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MTM2MDMwNjMsImV4cCI6MTcxMzYwNjY2M30.VeSbR5_iJasxpFy5XS3lPjFKHfjUP6bt65cfqsJgcVk'; // Replace with actual token retrieval

  // Function to fetch data from API
  const fetchData = async (pageNumber) => {
    const limit = perPage;
    const offset = pageNumber * perPage;
    const response = await fetch(`http://localhost:5000/api/category/show-categories?page=${pageNumber + 1}&limit=${limit}&offset=${offset}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in Authorization header
      },
    });
    const jsonData = await response.json();
    setData(jsonData.data); // Assuming data is in jsonData.data
  };

  // Function to handle page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
    fetchData(selectedPage.selected); // Fetch data for new page
  };

  // Calculate start and end index for current page
  const startIndex = currentPage * perPage;
  const endIndex = startIndex + perPage;
  const currentData = data.slice(startIndex, endIndex);

  // Fetch data on initial render
  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  console.log("data", )

  return (
    <div>
      <table>
        <thead>
          <tr>
            {/* Define your table headers here */}
            <th>Column 1</th>
            <th>Column 2</th>
            {/* ... */}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}> {/* Use a unique identifier for each item */}
              {/* Display your table data here */}
              <td>{item.name}</td>
              <td>{item.value}</td>
              {/* ... */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination component */}
      <ReactPaginate
        pageCount={Math.ceil(data.length / perPage)}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default PaginatedDataTable;
