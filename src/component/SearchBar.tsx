import React from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';

const SearchBar = () => {
    return (
        <Form className="d-flex justify-content-left mt-3">
            <InputGroup style={{ maxWidth: '500px' }}>
                <InputGroup.Text style={{color:"brown"}}>
                    <BsSearch />
                </InputGroup.Text>
                <FormControl
                    type="search"
                />
            </InputGroup>
        </Form>
    );
};

export default SearchBar;
