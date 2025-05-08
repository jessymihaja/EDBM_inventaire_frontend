import TableAddNumSerie from "../component/TableAddNumSerie";

const ListeAddNum = () => {


    return(
        <div className="App">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Liste des Articles en détail sans numero de serie</h2>
            </div>
            <TableAddNumSerie></TableAddNumSerie>
        </div>
    )
}
export default ListeAddNum;