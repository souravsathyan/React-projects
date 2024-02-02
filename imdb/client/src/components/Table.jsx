const Table = ({ movies }) => {
  return (
    <>
      <div className="w-[1000px] rounded-lg shadow-lg flex flex-col overflow-hidden bg-slate-50">
        <div className="flex items-center justify-between h-[60px] text-center text-lg font-bold shadow-lg m-3 bd-slate-50 rounded-lg">
          {/* title */}
          <p className="text-lg font-bold text-black flex-2 text-left ms-3">
            Title
          </p>
          {/* genre */}
          <p className="text-lg font-bold text-black flex-1">Genre</p>
          {/* rating */}
          <p className="text-lg font-bold text-black flex-1">Rating</p>
        </div>
        {movies.map((movie) => {
            console.log(movie)
          return (
            <div
              className="flex items-center h-[70px] my-2 mx-[10px] shadow-lg cursor-pointer bg-slate-50 rounded-lg transition-all ease-in duration-75 hover:scale-105"
              key={movie.id}
            >
                <div className="flex-2 flex items-center object-cover">
                    <img src={movie.img} alt="movie" className="w-[40px] h-[60px] object-cover mx-[10px]" />
                    <p className="text-lg font-bold">{movie.name}({movie.year})</p>
                </div>
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-lg font-semibold">{movie.genre.join('/')}</p>
                </div>
                <div className="felx-1 flex items-center justify-center">
                    <p className="text-lg font-semibold">{movie.rating}</p>
                </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Table
