import DateInput from "../component/DateInput"

const Stock = () =>{

    return(
        <div className="App">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Stock entre deux dates</h2>
            </div>
            <DateInput></DateInput>
            <br></br>
        </div>
    )
}
export default Stock;