import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { API_URL, IMDB_URL } from '../config/Constants';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';

const Home = () => {
    const [state, setState] = useState({ year: '', yearErr: '', movieData: [] });

    const onYearChange = (e) => {
        setState({ ...state, year: e.target.value });
    }

    const getMovies = () => {
        let currentYear = new Date().getFullYear();
        let isFourDigit = /^\d{4}$/.test(state.year);
        if (state.year === '' || state.year === null || state.year >= currentYear || !isFourDigit) {
            setState({ ...state, yearErr: 'Please enter valid year' });
        }
        else {
            setState({ ...state, yearErr: '' });
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                },
            };
            axios.get(API_URL + state.year, axiosConfig).then(res => {
                let response = res.data.data;
                setState({ ...state, movieData: response });
            }).catch(error => {
                console.log({ error });
                return error;
            });
        }
    }
    const goToMovie = (value, row) => {
        return <a href={IMDB_URL + row.imdbID} target='_blank' rel="noreferrer">{value}</a>
    }

    const columns = [
        { dataField: 'Title', text: 'List of movies', formatter: goToMovie, headerClasses: 'd-flex justify-content-center bg-secondary' }
    ];

    return (
        <div className="container mt-5">
            <Form>
                <Form.Row>
                    <Form.Control type="number"
                        id="year"
                        placeholder="Enter the year you want to search"
                        value={state.year}
                        onChange={onYearChange}
                        aria-describedby="yearHelpBlock"
                        required
                    />
                    <Form.Text id="yearHelpBlock" className="text-danger" muted>{state.yearErr}</Form.Text>
                </Form.Row>
                <div className="d-flex justify-content-center">
                    <Button onClick={getMovies} size="md" variant="primary" className="text-light mt-3 mb-5">Submit</Button>
                </div>
            </Form>
            {state.movieData.length >= 1 &&
                <BootstrapTable
                    keyField='imdbID'
                    data={state.movieData}
                    columns={columns}
                    headerClasses="table-header-class"
                    bodyClasses="table-body-class"
                    striped
                    hover
                    bordered={false}
                    bootstrap4={true}
                />
            }
        </div>
    )
}

export default Home;