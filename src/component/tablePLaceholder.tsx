import { Placeholder, Table } from "react-bootstrap"

const TablePlaceholder = () => {
    return(
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>valeurs</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={12} />
                        </Placeholder>
                    </tr>
                    <tr>
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={12} />
                        </Placeholder>
                    </tr>
                    <tr>
                        <Placeholder as="p" animation="glow">
                            <Placeholder xs={12} />
                        </Placeholder>
                    </tr>
                </tbody>
            </Table>
        </div>
        
    )
}
export default TablePlaceholder;