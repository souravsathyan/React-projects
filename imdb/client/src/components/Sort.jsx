const Sort = ({sort, setSort})=>{

    const onSelectChange = (inputValue)=>{
        setSort({sort:inputValue, order:sort.order})
    }

    const onArrowChange = ()=>{
        if (sort.order === "asc") {
			setSort({ sort: sort.sort, order: "desc" });
		} else {
			setSort({ sort: sort.sort, order: "asc" });
		}
    }
    console.log('qwerty')
    return(
        <>
            <div className="h-[60px] m-3 flex items-center justify-center shadow-lg bg-slate-50 rounded-lg">
                <p className="text-lg font-bold">Sort by</p>
                <select 
                onChange={(e)=>{
                    onSelectChange(e.target.value)
                }}
                className="w-[80px] h-[30px] ms-[4px] rounded-lg border outline-none cursor-pointer p-2"
                defaultValue={sort.sort} 
                >
                    <option value="year">Year</option>
                    <option value="rating">Rating</option>
                </select>
                <button className="flex items-center justify-center h-[30px] w-[30px] outline-none border ms-2px rounded-lg bg-transparent cursor-pointer" onClick={onArrowChange}>
                    <p className="text-lg font-bold text-black">&uarr;</p>
                    <p className="text-lg font-bold text-black">&darr;</p>
                </button>
            </div>
        </>
    )
}

export default Sort