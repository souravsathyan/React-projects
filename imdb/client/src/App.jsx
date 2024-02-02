import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { REACT_APP_API_URL } from "../constants";
import Search from "./components/Search"
import Table from "./components/Table"

const base_url = REACT_APP_API_URL;

function App() {
  const [obj, setObj] = useState([]);
  const [sort, setSort] = useState({ sort: "rating", order: "desc" });
  const [filterGenre, setFilterGenre] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const url = `${base_url}?page=${page}&sort=${sort.sort},${
          sort.order
        }&genre=${filterGenre.toString()}&search=${search}`;

        const response = await axios.get(url);
        const {data} = response
        setObj(data)
      } catch (error) {
        console.log(error);
      }
    };getAllMovies();
  },
   [sort, filterGenre, page, search]);
  console.log(obj?.response?.movies)
  return (
    <>
      {/* wrapper */}
      <div className="w-100 min-h-[100vh] flex items-center justify-center">
        {/* container */}
        <div className="w-[1000px] rounded-lg shadow-lg flex flex-col overflow-hidden bg-slate-50">
          {/* head */}
          <div className="flex items-center h-[80px] bg-black justify-between">
            <h1 className="text-2xl font-bold text-slate-50 ms-8">IMDB</h1>
            <Search setSearch={setSearch} />
          </div>
          {/* body */}
          <div className="h-[500px] flex">
            {/* table container */}
            <div className="flex relative">
            <Table movies={obj?.response?.movies ? obj?.response?.movies : []} />

            </div>
            {/* filter container */}
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
