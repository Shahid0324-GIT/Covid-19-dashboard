import {BsSearch} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'

import {Link} from 'react-router-dom'
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import TotalStats from '../TotalStats'

import './index.css'
import StateWiseTable from '../StateWiseTable'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    isLoading: true,
    stateWiseData: [],
    searchInput: '',
    totalData: {total: {confirmed: 0, deceased: 0, recovered: 0}},
  }

  componentDidMount() {
    this.getStateWiseData()
  }

  getStateWiseData = async () => {
    this.setState({
      isLoading: true,
    })

    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    const responseJson = await response.json()

    const updatedData = this.convertObjectsDataIntoListItemsUsingForInMethod(
      responseJson,
    )

    const totalKey = 'TT'
    const totalData = responseJson[totalKey]

    // console.log(totalData)

    this.setState({
      stateWiseData: updatedData,
      totalData,
      isLoading: false,
    })

    // console.log(totalData)
  }

  onChangeSearchInput = e => {
    this.setState({
      searchInput: e.target.value,
    })
  }

  convertObjectsDataIntoListItemsUsingForInMethod = data => {
    const resultList = []
    // getting keys of an object object
    const keyNames = Object.keys(data)
    // console.log(keyNames)

    keyNames.forEach(keyName => {
      // console.log(keyName)
      if (data[keyName] && keyName !== 'TT') {
        const {total} = data[keyName]
        // if the state's covid data is available we will store it or we will store 0
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        resultList.push({
          stateCode: keyName,
          name: statesList.find(state => state.state_code === keyName)
            .state_name,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList
  }

  sortList = val => {
    const {stateWiseData} = this.state

    stateWiseData.sort((a, b) => {
      if (a.name > b.name) {
        return val
      }
      return -1 * val
    })
    this.setState({stateWiseData})
  }

  render() {
    const {isLoading, searchInput, totalData, stateWiseData} = this.state
    const filteredStates = statesList.filter(item =>
      item.state_name.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const {total} = totalData

    return (
      <>
        <Header />
        <div className="search-container">
          {isLoading && (
            <div className="loader">
              <Loader type="Oval" color="#007BFF" height={40} width={40} />
            </div>
          )}
          {!isLoading && (
            <div className="search-bar-container">
              <button className="search-btn" type="button">
                <BsSearch className="search-icon" />
              </button>
              <input
                onChange={this.onChangeSearchInput}
                value={searchInput}
                placeholder="Enter the State"
                className="input-bar"
                type="search"
              />
            </div>
          )}
          {searchInput !== '' && (
            <ul className="search-results-ul">
              {filteredStates.map(item => (
                <Link
                  key={item.state_code}
                  to={`/state/${item.state_code}`}
                  className="link-to-state"
                >
                  <p>{item.state_name}</p>
                  <button type="button">
                    {item.state_code}{' '}
                    <BiChevronRightSquare className="chevron-icon" />
                  </button>
                </Link>
              ))}
            </ul>
          )}
          <TotalStats total={total} isLoading={isLoading} />
          {stateWiseData.length !== 0 && (
            <StateWiseTable
              sortList={this.sortList}
              stateWiseData={stateWiseData}
            />
          )}
        </div>
        <Footer />
      </>
    )
  }
}

export default Home

//  testid="homeRouteLoader", testid="searchResultsUnorderedList"
