import React from 'react'

const UserDetails = props => {
    return (
        <ul className="list-group">
            <li className="list-group-item">Выбран пользователь: <b>{props.people.firstName + " " + props.people.lastName}</b></li>
            <li className="list-group-item">Описание: {props.people.description}</li>
            <li className="list-group-item">Адрес проживания: {props.people.address.streetAddress}</li>
            <li className="list-group-item">Город: {props.people.address.city}</li>
            <li className="list-group-item">Провинция: {props.people.address.state}</li>
            <li className="list-group-item">Индекс: {props.people.address.zip}</li>
        </ul>
    )

}

export default UserDetails