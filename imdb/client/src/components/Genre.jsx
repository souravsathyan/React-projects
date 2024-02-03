const Genre = ({ genres, filterGenre, setFilerGenre }) => {

    const onChange = (inputValue)=>{
        if(inputValue){
            const state = [...filterGenre, inputValue]
            setFilerGenre(state)
        }else{
            const state = filterGenre.filter((val)=>val!==inputValue)
            setFilerGenre([...state])
        }
    }

  return (
    <>
      <div className="m-3 items-start py-3 px-5 shadow-lg bg-slate-50 rounded-lg">
        <h1 className="text-lg m-3 text-center">Filter By Genre</h1>
        <div className="flex flex-col flex-wrap">
          {genres.map((genre) => {
            return (
              <div
                className="min-w-[90px] flex items-center mx-0 my-1"
                key={genre}
              >
                <input type="checkbox" value={genre} onChange={(e)=>{
                    return onChange(e.target.value)
                }} />
                <p className="ms-2">{genre}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Genre
