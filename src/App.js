import React, {useState} from 'react'
import axios from 'axios'
import _ from 'lodash'
import ReactPaginate from 'react-paginate'

import Table from './components/Table'
import UserDetails from './components/UserDetails'
import DataModeSelector from './components/DataModeSelector'
import Search from './components/Search'



const App = (props) => {

  const [peoples, setPeoples] = useState([]);
  const [sortType, setSType] = useState("asc");
  const [sortField, setSField] = useState("id");
  const [userDetails, setUDetails] = useState(null);
  const [dataMode, setDataMode] = useState(false)
  const [curPage, setCurPage] = useState(0)
  const [isLoading, setLoading] = useState(true)
  const [searchedUser, setSUser] = useState("");

  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("");


  const fetchData = async (url) => {
    const result = await axios(url)
    const sortedData = await _.orderBy(result.data, sortField, sortType)
      setPeoples(sortedData)
      setLoading(false)
  }

  const handleChange = event => {
    console.log(event.target.value)
    setDataMode(true)

    fetchData(event.target.value)
    
  }

  const onDataSort = field => {
      const data = peoples.concat()
      const type = sortType === 'asc' ? 'desc' : 'asc'

      const sortedData = _.orderBy(data, field, type)

      setPeoples(sortedData)
      setSType(type)
      setSField(field)
  }

  const onFullInfo = user => {
    setUDetails(user)
    setCurPage(0)
  }

  const handlePageClick = ({selected}) => {
    setCurPage(selected)
  }

  const onSearch = user => {
    setSUser(user)

  }

  const onAddUser = event => {
    event.preventDefault()
      const users_data = peoples
      const new_user = {
        id: id, 
        firstName: firstName, 
        lastName: lastName, 
        email: email, 
        phone: phone,
        address: {
          streetAddress: "",
          city: "",
          state: "",
          zip: ""
        }
      }
      users_data.unshift(new_user)
      console.log(new_user)
      setPeoples(users_data)
      console.log(peoples)
  }

  const onInputChange = event => {
    switch (event.target.name){
      case "id":
        setId(event.target.value)
        break
      case "firstname":
        setFirstName(event.target.value)
        break
      case "lastname":
        setLastName(event.target.value)
        break
      case "email":
        setEmail(event.target.value)
        break
      case "phone":
        setPhone(event.target.value)
        break
      default:
        break

    }

  }

  const getFilteredData = () => {
    if(!searchedUser){ 
      return peoples 
    }

    return peoples.filter(user => {
      return user['firstName'].toLowerCase().includes(searchedUser.toLowerCase())
            || user['lastName'].toLowerCase().includes(searchedUser.toLowerCase())
            || user['email'].toLowerCase().includes(searchedUser.toLowerCase())
            || user['phone'].toLowerCase().includes(searchedUser.toLowerCase())
    })
  }

  if(!dataMode){
      return (
        <div className="container">
          <DataModeSelector
            handleChange={handleChange} />
        </div>
      )
  } else {


    const filteredData = getFilteredData()
    const pageCount = Math.ceil(filteredData.length / 50)
    const partiesData = _.chunk(filteredData, 50)[curPage];

    return (
      <div className="container">
          
          {
              isLoading 
                ? <h1 className="loading">Loading...</h1>
                : <React.Fragment>
                    <form className="form-inline" onSubmit={onAddUser}>
                    <h4 className="adduser">Добавить пользователя </h4>
                        <div className="form-group mb-3">
                            <label className="sr-only">ID</label>
                            <input type="text" value={id} onChange={onInputChange} name="id" className="form-control" placeholder="ID" />
                        </div>
                        <div className="form-group mx-sm-3 mb-3">
                            <label className="sr-only">First Name</label>
                            <input type="text" value={firstName} onChange={onInputChange} name="firstname" className="form-control" placeholder="Имя" />
                        </div>
                        <div className="form-group mx-sm-3 mb-3">
                            <label className="sr-only">Last Name</label>
                            <input type="text" value={lastName} onChange={onInputChange} name="lastname" className="form-control" placeholder="Фамилия" />
                        </div>
                        <div className="form-group mx-sm-3 mb-3">
                            <label className="sr-only">Email</label>
                            <input type="text" value={email} onChange={onInputChange} name="email" className="form-control" placeholder="Эл. почта" />
                        </div>
                        <div className="form-group mx-sm-3 mb-3">
                            <label className="sr-only">Phone</label>
                            <input type="text" value={phone} onChange={onInputChange} name="phone" className="form-control" placeholder="Телефон" />
                        </div>
                        <input type="submit" className={id!=="" && firstName!=="" && lastName!=="" && phone!=="" && email!=="" ? "active": "dis"} value="Добавить" />
                    </form>
                    <Search onSearch={onSearch} />
                    <Table 
                        data={partiesData}
                        sortData={onDataSort}
                        sortType={sortType}
                        sortField={sortField}
                        onFullInfo={onFullInfo} />
                  </React.Fragment>

            }
            {
              userDetails ? <UserDetails people={userDetails} /> : null
            }

            {
              peoples.length > 50 ? 
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    pageClassName='page-item'
                    pageLinkClassName='page-link'
                    previousClassName='page-item'
                    previousLinkClassName='page-link'
                    nextClassName='page-item'
                    nextLinkClassName='page-link'
                    forcePage={curPage}
                    />
              : null
            }
      </div>
    )
  }
}


export default App
