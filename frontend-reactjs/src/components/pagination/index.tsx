import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

const PaginatedData = ({ data }: any) => {
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 3;
  const queryParams = new URLSearchParams(window.location.search);
  const page: any = queryParams?.get("page");

  console.log("page", page)
  const navigate = useNavigate();

  const handlePageChange = (selectedPage: any) => {
    setCurrentPage(selectedPage.selected);
    navigate(`?page=${selectedPage.selected + 1}`);
  };

  // Calculate start and end index for current page
  const startIndex = currentPage * perPage;
  const endIndex = Math.min(startIndex + perPage, data.length);
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className='react-pagination-wrapper mt-3'>
     

      {/* Pagination component */}
      <ReactPaginate
        pageCount={Math.ceil(data.length / perPage)}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={
          "active"
        }
        forcePage={currentPage} // Highlight active page
      />
    </div>
  );
};

export default PaginatedData;
