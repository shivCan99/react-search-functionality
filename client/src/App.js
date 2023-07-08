import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./components/Table";
import Sort from "./components/Sort";
import Genre from "./components/Genre";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import "./App.css";

const base_url = "http://localhost:3333/api/movies";

function App() {
	const [obj, setObj] = useState({});
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
				const { data } = await axios.get(url);
				setObj(data);
			} catch (err) {
				console.log(err);
			}
		};

		getAllMovies();
	}, [sort, filterGenre, page, search]);

	return (
		<div className="wrapper">
			<div className="container">
				<div className="head">
					{/* <img src="" alt="Shivam" className="logo" /> */}
					<div className="headline">
						<h1>SHIVAM SHARMA</h1>
					</div>
					<div className="search">
						<Search setSearch={(search) => setSearch(search)} />
					</div>
				</div>
				<div className="filter_container">
					<div className="left">
					<Genre
							filterGenre={filterGenre}
							genres={obj.genres ? obj.genres : []}
							setFilterGenre={(genre) => setFilterGenre(genre)}
						/>
					</div>
					<div className="right">
						<Sort sort={sort} setSort={(sort) => setSort(sort)}/>
					</div>
					
				</div>
				<div className="body">
					<div className="table_container">
						<Table movies={obj.movies ? obj.movies : []} />
						<Pagination
							page={page}
							limit={obj.limit ? obj.limit : 0}
							total={obj.total ? obj.total : 0}
							setPage={(page) => setPage(page)}
						/>
					</div>
						{/* <div className="filter_container">
							<Sort sort={sort} setSort={(sort) => setSort(sort)} />
							<Genre
								filterGenre={filterGenre}
								genres={obj.genres ? obj.genres : []}
								setFilterGenre={(genre) => setFilterGenre(genre)}
							/>
						</div> */}
				</div>
			</div>
		</div>
	);
}

export default App;
