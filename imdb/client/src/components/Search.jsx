const Search = ({setSearch})=>{
    return (
        <>
            <input 
            type="text"
            className="me-[15px] h-[40px] outline-none border-none ps-2 text-lg rounded-lg"
            placeholder="search"
            onChange={(e)=>{
                setSearch(e.target.value)
                
            }}
            />
        </>
    )
}

export default Search