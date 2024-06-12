import { IPagination } from "@interface/global.interface";
import { useState } from "react";
import { MdOutlineFirstPage, MdOutlineLastPage } from "react-icons/md";

interface PaginationProps {
    totalPages: IPagination,
    setTotalPages: React.Dispatch<React.SetStateAction<IPagination>>;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    rowsPerPage: number;
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, setTotalPages, setRefresh, rowsPerPage, setRowsPerPage }) => {
    const [inputRowPerPage, setInputRowPerPage] = useState(rowsPerPage);

    const handlePrevious = () => {
        if (totalPages.currentPage > 1) {
            setTotalPages(prev => ({
                ...prev,
                currentPage: prev.currentPage - 1,
            }));
            setRefresh(prev => !prev);
        }
    };

    const handleNext = () => {
        if (totalPages.currentPage < totalPages.totalPages) {
            setTotalPages(prev => ({
                ...prev,
                currentPage: prev.currentPage + 1,
            }));
            setRefresh(prev => !prev);
        }
    };

    const handleFirst = () => {
        setTotalPages(prev => ({
            ...prev,
            currentPage: 1,
        }));
        setRefresh(prev => !prev);
    };

    const handleLast = () => {
        setTotalPages(prev => ({
            ...prev,
            currentPage: totalPages.totalPages,
        }));
        setRefresh(prev => !prev);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputRowPerPage(parseInt(e.target.value));
    };

    const handleRowsPerPageChange = () => {
        setRowsPerPage(inputRowPerPage);
        setRefresh(prevRefresh => !prevRefresh);
    };

    const handlePages = (pageNumber: number) => {
        setTotalPages({ ...totalPages, currentPage: pageNumber });
        setRefresh(prevRefresh => !prevRefresh);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const siblingCount = 1;
        const totalPageCount = totalPages.totalPages;
        const currentPage = totalPages.currentPage;

        const startPage = Math.max(1, currentPage - siblingCount);
        const endPage = Math.min(totalPageCount, currentPage + siblingCount);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`px-1 ${i === currentPage ? 'font-bold' : ''}`}
                    onClick={() => handlePages(i)}
                >
                    {i}
                </button>
            );
        }

        if (startPage > 1) {
            pageNumbers.unshift(
                <span key="start" className="px-1">...</span>
            );
            pageNumbers.unshift(
                <button
                    key={1}
                    className={`px-1 ${1 === currentPage ? 'font-bold' : ''}`}
                    onClick={() => handlePages(1)}
                >
                    1
                </button>
            );
        }

        if (endPage < totalPageCount) {
            pageNumbers.push(<span key="end" className="px-1">...</span>);

            pageNumbers.push(
                <button
                    key={totalPageCount}
                    className={`px-1 ${totalPageCount === currentPage ? 'font-bold' : ''}`}
                    onClick={() => handlePages(totalPageCount)}
                >
                    {totalPageCount}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="flex justify-between items-center px-2 py-2">
            {/* Rows per page input */}
            <div className="space-x-2">
                <input
                    type="number"
                    value={inputRowPerPage}
                    className="border rounded-lg p-1 w-10 text-center"
                    onChange={handleInputChange}
                />
                <button
                    onClick={handleRowsPerPageChange}
                    className="bg-blue-500 text-white px-2 py-1 rounded-lg"
                >
                    RowsPerPage
                </button>
            </div>

            {/* Pagination controls */}
            <div className="flex flex-col justify-center items-center">
                <div className="space-x-2 flex">
                    <button onClick={handleFirst} className={`border-2 border-black px-2 ${totalPages.currentPage === 1 ? 'cursor-not-allowed' : ''} `}><MdOutlineFirstPage /></button>
                    <button onClick={handlePrevious} className={`border-2 border-black px-2 ${totalPages.currentPage === 1 ? 'cursor-not-allowed' : ''} `}>-</button>
                    {renderPageNumbers()}
                    <button onClick={handleNext} className={`border-2 border-black px-2 ${totalPages.currentPage === totalPages.totalPages ? 'cursor-not-allowed' : ''} `}>+</button>
                    <button onClick={handleLast} className={`border-2 border-black px-2 ${totalPages.currentPage === totalPages.totalPages ? 'cursor-not-allowed' : ''} `}><MdOutlineLastPage /></button>
                </div>
                <div>
                    <span>{`Page ${totalPages.currentPage} of ${totalPages.totalPages}`}</span>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
