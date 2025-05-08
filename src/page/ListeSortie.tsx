import TableSortie from "../component/tableSortie"

const ListeSortie = () => {
    return(
        <div className="App">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Liste des sorties</h2>
            </div>
            <TableSortie></TableSortie>
        </div>
    )
}
export default ListeSortie;