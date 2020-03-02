import React from 'react'

const DataModeSelector = props => {

    const lurl =  `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
    const burl = `http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`


    return (    
        <div className="form-group col-md-4">
            <label>Выберите объём данных</label>
            <select id="inputState" className="form-control" onChange={event => props.handleChange(event)}>
                <option>Enter...</option>
                <option value={lurl}>Маленький набор данных</option>
                <option value={burl}>Большой набор данных</option>
            </select>
        </div>
    )
}

export default DataModeSelector