const Pagination = ({ page, total, limit, setPage }) => {
  const totalPages = Math.ceil(total / limit);
  const pg_button =
    "outline-none text-lg font-bold rounded-lg w-[30px] h-[30px] flex items-center justify-center my-0 mx-2 shadow-lg cursor-pointer bg-slate-50";
  const active_btn = "bg-slate-300 text-slate-700";
  const handleClick = (newPage) => {
    setPage(newPage + 1);
  };
  return (
    <div className=" w-[cal(100%-20px)] my-0 mx-3 h-[45px] flex items-center justify-center z-50  ">
       {totalPages > 0 && (
        <div className="flex">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              className={`${pg_button} ${page===index+1?active_btn:""}`}
              key={index}
              onClick={() => handleClick(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Pagination;
