import React from 'react'

const Table = props => {
    
    return (
        <table className="table">
            <thead>
                <tr>
                    <th onClick={props.sortData.bind(null, "id")}>
                    id {props.sortField === "id" ? <small>{props.sortType}</small> : null}</th>
                    <th onClick={props.sortData.bind(null, "firstName")}>
                    First name {props.sortField === "firstName" ? <small>{props.sortType}</small> : null}</th>
                    <th onClick={props.sortData.bind(null, "lastName")}>
                    Last name {props.sortField === "lastName" ? <small>{props.sortType}</small> : null}</th>
                    <th onClick={props.sortData.bind(null, "phone")}>
                    Phone {props.sortField === "phone" ? <small>{props.sortType}</small> : null}</th>
                    <th onClick={props.sortData.bind(null, "email")}>
                    Email {props.sortField === "email" ? <small>{props.sortType}</small> : null}</th>
                </tr>
            </thead>

            <tbody>
                {props.data.map((user, num) => (
                    <tr key={num} onClick={props.onFullInfo.bind(null, user)}>
                        <td>{user.id}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.phone}</td>
                        <td>{user.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default Table;