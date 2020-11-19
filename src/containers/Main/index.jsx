import React, { memo, useState, useCallback, useEffect } from 'react';
import Api from '../../api';
import Board from './components/Board';
import Panel from './components/Panel';
import {ContainerStyled} from './styles'

function Main() {
    const [data, setData] = useState({});
    const [country, setCountry] = useState('brazil');
    const updateAt = new Date().toLocaleString();

    const getCovidData = useCallback((country) => {
        Api.getCountry(country)
            .then(data =>setData(data));
    }, []);

    useEffect(() => {
        getCovidData(country)
    }, [getCovidData, country]);


    const onChange = ({target}) => {
        const country = target.value;
        setCountry(country);
    }

    return (
        <ContainerStyled>
            <div className="mb-2">
                <Panel 
                    data={data}
                    updateAt={updateAt}
                    onChange={onChange}
                    country={country}
                    getCoviddata={getCovidData}
                />
            </div>
            <Board data={data} />
        </ContainerStyled>
    )
}

export default memo(Main);