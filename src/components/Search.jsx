import React, {useState} from 'react'

const Search = props => {

    const [val, setVal] = useState('')

    const valHandler = event => {
        setVal(event.target.value)
    }

    return (
        <div className="input-group mb-3 mt-3">
            <div className="input-group-prepend">
                <button className="btn btn-outline-secondary" type="button" id="button-addon1" onClick={() => props.onSearch(val)}>Найти</button>
            </div>
            <input type="text" className="form-control" value={val} onChange={valHandler} />
        </div>
    )
}

export default Search