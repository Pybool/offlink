import React from 'react'
import CustomButton from '@/components/form/CustomButton';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

type Props = {
    page: number;
    pages: any;
    activePage: number;
    visiblePaginatedBtn: number;
    setPage: (page: number) => void;
}
  


function Pagination({ page, pages, activePage, visiblePaginatedBtn, setPage }: Props) {
  if (pages <= 1) {
    // If there's only one page or no pages, don't render pagination.
    return null;
  }

  const pageNumbers = [];
  const maxVisiblePage = Math.min(pages, visiblePaginatedBtn);

  const startPage = Math.max(1, Math.min(activePage - Math.floor(maxVisiblePage / 2), pages - maxVisiblePage + 1));

  for (let i = startPage; i < startPage + maxVisiblePage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-fit mt-3 rounded-[20px] p-1 flex items-center justify-between gap-4 bg-white-200">
      <div className=' '>
      <CustomButton
        onClick={() => setPage(Math.max(1, page - 1))}
        className={` p ${
          page <= 1 ? 'text-white' : ' text-white'
        }`}
        disabled={page <= 1}
      >
        <RiArrowLeftSLine size={30} color={page <= 1 ? '#ffff' : '#fff'} />
      </CustomButton>
      </div>

      {/* <div className=' flex gap'> */}
      {pageNumbers.map((p, idx) => (
          <div className=' flex w-[4rem] ' key={idx}>
            <CustomButton
          key={idx}
          className='w-[3rem] flex gap-3'
          onClick={() => setPage(p)}
        >
          {p}
        </CustomButton>
          </div>
      ))}
        

      <div className=' w-[3rem]'>
        <CustomButton
          onClick={() => setPage(Math.min(pages, page + 1))}
          className={`px-2 py-1 disabled:bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent rounded-md bg-transparent text-dark-100 text-[12px] ${
            page === pages ? 'text-white' : ''
          }`}
          disabled={page === pages}
        >
          <RiArrowRightSLine size={30} color={page === pages ? '#fff' : '#feef'} />
        </CustomButton>
      </div>
    </div>
  );
}

export default Pagination;
