import React, { useEffect, useState } from "react";

interface TypePaginate {
    page?: number;
    setPage?: React.Dispatch<React.SetStateAction<number>>;
    showItem?: number;
    total?: number;
    limit?: number;
}

const CustomPagination = ({
    page = 1,
    setPage = () => {},
    showItem,
    total = 10,
    limit = 5,
}: TypePaginate) => {
    const [lastPage, SetLastPage] = useState(Math.ceil(total / limit));

    const clickPage = (value: number) => {
        setPage(value);
    };

    const previusPage = () => {
        setPage(page - 1);
    };

    const nextPage = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        SetLastPage(Math.ceil(total / limit));
    }, [total, showItem]);

    return (
        <div className="w-full h-fit flex flex-col md:flex-row mt-4 justify-center items-center md:justify-between gap-2 mb-4 text-base">
            <div>
                Showing <span className="font-medium">{showItem}</span> From{" "}
                <span className="font-semibold">{total}</span> Data
            </div>
            <div className="flex flex-row gap-1">
                {page > 1 ? (
                    <div
                        onClick={previusPage}
                        className="flex px-3 py-1 bg-white hover:bg-gray-100 cursor-pointer rounded-md border-[2px]"
                    >
                        {"<"}
                    </div>
                ) : undefined}

                {lastPage <= 1
                    ? undefined
                    : Array.from({ length: lastPage }, (_, index) => {
                          const pageNumber = index + 1;

                          if (pageNumber === 1 || pageNumber === lastPage) {
                              return (
                                  <div
                                      onClick={() => clickPage(pageNumber)}
                                      key={index}
                                      className={`flex px-3 py-1 ${
                                          page === pageNumber
                                              ? "bg-primary text-white dark:text-black"
                                              : "hover:bg-gray-200 bg-background dark:hover:bg-background"
                                      } rounded-md border-[2px] cursor-pointer`}
                                  >
                                      {pageNumber}
                                  </div>
                              );
                          } else if (Math.abs(page - pageNumber) <= 1) {
                              return (
                                  <div
                                      onClick={() => clickPage(pageNumber)}
                                      key={index}
                                      className={`flex px-3 py-1 ${
                                          page === pageNumber
                                              ? "bg-primary text-white dark:text-white"
                                              : "hover:bg-gray-200 bg-background dark:hover:bg-background"
                                      } rounded-md border-[2px] cursor-pointer`}
                                  >
                                      {pageNumber}
                                  </div>
                              );
                          }
                      })}

                {page < lastPage ? (
                    <div
                        onClick={nextPage}
                        className="flex px-3 py-1 bg-background dark:hover:bg-background hover:bg-gray-100 cursor-pointer rounded-md border-[2px]"
                    >
                        {">"}
                    </div>
                ) : undefined}
            </div>
        </div>
    );
};

export default CustomPagination;
