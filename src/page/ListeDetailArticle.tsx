
import TableDetailArticles from "../component/tableDetailArticles";
import CountButton from "../component/countButton";
import SearchBar from "../component/SearchBar";


const ListeDetailArticle = () => {

    return(
        <div className="App">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Liste des Articles en détail</h2>
                <CountButton></CountButton>
            </div>
            <SearchBar></SearchBar>
            <TableDetailArticles></TableDetailArticles>
        </div>
    )
}
export default ListeDetailArticle;