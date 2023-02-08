import {Component} from 'react'

import {
  BarChart,
  LineChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Line,
  LabelList,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'

import './index.css'
import TotalStateWiseStats from '../../TotalStateWiseStats'

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

const tabDetails = {
  confirmed: 'CONFIRMED',
  active: 'ACTIVE',
  recovered: 'RECOVERED',
  deceased: 'DECEASED',
}

class StateSpecificData extends Component {
  state = {
    isLoading: true,
    stateCaseDetails: null,
    timeLine: null,
    activeTabId: tabDetails.confirmed,
    stateName: '',
  }

  componentDidMount() {
    this.getStateDetails()
  }

  getStateDetails = async () => {
    this.setState({
      isLoading: true,
    })
    // console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(apiUrl)
    const data = await response.json()
    // console.log(data)

    const nameOfState = statesList.find(state => state.state_code === id)
      .state_name
    // console.log(nameOfState)

    const specificState = data[id]
    // console.log(specificState)

    const timelineApiUrl = `https://apis.ccbp.in/covid19-timelines-data/${id}`
    const timelineResponse = await fetch(timelineApiUrl)
    const timelineData = await timelineResponse.json()
    // console.log(timelineData)

    this.setState({
      timeLine: timelineData,
      stateCaseDetails: specificState,
      isLoading: false,
      stateName: nameOfState,
    })
  }

  setCurrActiveTabId = id => {
    this.setState({
      activeTabId: id,
    })
  }

  renderTestedAndState = () => {
    const {stateCaseDetails, stateName} = this.state

    if (stateCaseDetails === null) {
      return null
    }

    const {meta, total} = stateCaseDetails
    const lastUpdated = new Date(meta.last_updated)
    const {tested} = total
    // console.log(stateName)

    return (
      <div className="state-specific-state-test-container">
        <div className="state=specific-state-last-updated-container">
          <div className="state-specific-state-name">
            <p>{stateName}</p>
          </div>
          <p className="last-updated">
            Last update on {lastUpdated.toDateString()}
          </p>
        </div>
        <div className="state-specific-tested-container">
          <p className="tested">Tested</p>
          <p className="total-tested">{tested}</p>
        </div>
      </div>
    )
  }

  renderStatsButtons = () => {
    const {stateCaseDetails, isLoading} = this.state
    const {total} = stateCaseDetails

    return (
      <div className="state-specific-stats-container">
        <TotalStateWiseStats
          total={total}
          isLoading={isLoading}
          setCurrActiveTabId={this.setCurrActiveTabId}
        />
      </div>
    )
  }

  renderTopDistricts = () => {
    const {stateCaseDetails, activeTabId} = this.state
    const districtDetails = []
    const confirmedDistrictData = []
    const activeDistrictData = []
    const recoveredDistrictData = []
    const deceasedDistrictData = []

    // if (stateCaseDetails === null) {
    //   return null
    // }

    const {districts} = stateCaseDetails
    const districtsList = Object.keys(districts)

    districtsList.forEach(district => {
      const districtName = district
      const {total} = districts[district]
      const {confirmed, deceased, recovered} = total
      const active = confirmed - (recovered + deceased)

      districtDetails.push({districtName, total})
      confirmedDistrictData.push({districtName, confirmed})
      activeDistrictData.push({districtName, active})
      recoveredDistrictData.push({districtName, recovered})
      deceasedDistrictData.push({districtName, deceased})
    })

    confirmedDistrictData.sort((a, b) => b.confirmed - a.confirmed)
    activeDistrictData.sort((a, b) => b.active - a.active)
    recoveredDistrictData.sort((a, b) => b.recovered - a.recovered)
    deceasedDistrictData.sort((a, b) => b.deceased - a.deceased)
    // console.log(districtDetails)
    // console.log(stateCaseDetails)

    return (
      <div className="state-specific-top-districts-container">
        <h1 className="state-specific-top-districts-heading">Top Districts</h1>
        {activeTabId === tabDetails.confirmed && (
          <ul className="state-specific-top-districts-list-container">
            {confirmedDistrictData.map(top => (
              <li key={top.districtName} className="list-item">
                <p className="list-item-count">{top.confirmed || 'NA'}</p>
                <p className="list-item-name">{top.districtName}</p>
              </li>
            ))}
          </ul>
        )}
        {activeTabId === tabDetails.active && (
          <ul className="state-specific-top-districts-list-container">
            {activeDistrictData.map(top => (
              <li key={top.districtName} className="list-item">
                <p className="list-item-count">{top.active || 'NA'}</p>
                <p className="list-item-name">{top.districtName}</p>
              </li>
            ))}
          </ul>
        )}
        {activeTabId === tabDetails.recovered && (
          <ul className="state-specific-top-districts-list-container">
            {recoveredDistrictData.map(top => (
              <li key={top.districtName} className="list-item">
                <p className="list-item-count">{top.recovered || 'NA'}</p>
                <p className="list-item-name">{top.districtName}</p>
              </li>
            ))}
          </ul>
        )}
        {activeTabId === tabDetails.deceased && (
          <ul className="state-specific-top-districts-list-container">
            {deceasedDistrictData.map(top => (
              <li key={top.districtName} className="list-item">
                <p className="list-item-count">{top.deceased || 'NA'}</p>
                <p className="list-item-name">{top.districtName}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )

    // console.log(confirmedDistrictData)
    // console.log(activeDistrictData)
    // console.log(recoveredDistrictData)
    // console.log(deceasedDistrictData)
  }

  renderTopDistrictsBarChart = () => {
    const {timeLine, activeTabId} = this.state

    const {match} = this.props
    const {params} = match
    const {id} = params

    const stateDetails = timeLine[id]
    // console.log(stateDetails)

    const {dates} = stateDetails
    const datesArray = Object.keys(dates)
    datesArray.sort((a, b) => new Date(b) - new Date(a))

    const lastTenDays = datesArray.slice(0, 10)

    const stateConfirmedTimeLineDetails = []
    const stateDeceasedTimeLineDetails = []
    const stateRecoveredTimeLineDetails = []
    const stateActiveTimeLineDetails = []
    const stateTestedTimeLineDetails = []

    lastTenDays.forEach(date => {
      const {total} = dates[date]
      const {confirmed, deceased, recovered, tested} = total
      const active = confirmed - (recovered + deceased)

      stateConfirmedTimeLineDetails.push({
        date,
        confirmed,
      })
      stateDeceasedTimeLineDetails.push({
        date,
        deceased,
      })
      stateRecoveredTimeLineDetails.push({
        date,
        recovered,
      })
      stateActiveTimeLineDetails.push({
        date,
        active,
      })
      stateTestedTimeLineDetails.push({
        date,
        tested,
      })
    })

    // console.log(stateActiveTimeLineDetails)
    // console.log(stateConfirmedTimeLineDetails)
    // console.log(stateDeceasedTimeLineDetails)
    // console.log(stateRecoveredTimeLineDetails)
    // console.log(stateTestedTimeLineDetails)

    const barGraphStylesandData = {
      CONFIRMED: {
        data: stateConfirmedTimeLineDetails,
        color: '#9A0E31',
        dataKey: 'confirmed',
      },
      ACTIVE: {
        data: stateActiveTimeLineDetails,
        color: '#0A4FA0',
        dataKey: 'active',
      },
      RECOVERED: {
        data: stateRecoveredTimeLineDetails,
        color: '#216837',
        dataKey: 'recovered',
      },
      DECEASED: {
        data: stateDeceasedTimeLineDetails,
        color: '#474C57',
        dataKey: 'deceased',
      },
    }

    return (
      <div className="top-district-bar-char-container">
        <ResponsiveContainer width="100%">
          <BarChart
            width={450}
            height={300}
            data={barGraphStylesandData[activeTabId].data}
            margin={{top: 15, right: 30, left: 20, bottom: 15}}
          >
            <YAxis />
            <Tooltip />
            <Bar
              dataKey={barGraphStylesandData[activeTabId].dataKey}
              fill={barGraphStylesandData[activeTabId].color}
            >
              <LabelList
                dataKey={barGraphStylesandData[activeTabId].dataKey}
                position="top"
                fill={barGraphStylesandData[activeTabId].color}
                formatter={item => {
                  if (item > 100000) {
                    return `${(item / 100000).toFixed(2)}L`
                  }
                  return `${(item / 1000).toFixed(2)}K`
                }}
              />
              <LabelList
                style={{fontSize: '14px', fontWeight: '600'}}
                dataKey="date"
                position="bottom"
                fill={barGraphStylesandData[activeTabId].color}
                formatter={item => {
                  const dateObj = new Date(item)
                  const options = {day: 'numeric', month: 'short'}

                  return dateObj.toLocaleString('en-GB', options)
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  renderLineChart = () => {
    const {timeLine} = this.state

    const {match} = this.props
    const {params} = match
    const {id} = params

    const stateDetails = timeLine[id]
    // console.log(stateDetails)

    const {dates} = stateDetails
    const datesArray = Object.keys(dates)

    const stateConfirmedTimeLineDetails = []
    const stateDeceasedTimeLineDetails = []
    const stateRecoveredTimeLineDetails = []
    const stateActiveTimeLineDetails = []
    const stateTestedTimeLineDetails = []

    datesArray.forEach(date => {
      const {total} = dates[date]
      const {confirmed, deceased, recovered, tested} = total
      const active = confirmed - (recovered + deceased)

      stateConfirmedTimeLineDetails.push({
        date,
        confirmed,
      })
      stateDeceasedTimeLineDetails.push({
        date,
        deceased,
      })
      stateRecoveredTimeLineDetails.push({
        date,
        recovered,
      })
      stateActiveTimeLineDetails.push({
        date,
        active,
      })
      stateTestedTimeLineDetails.push({
        date,
        tested,
      })
    })

    return (
      <div className="line-charts">
        <h1 className="line-chart-heading">Daily Spread Trends</h1>
        <div className="confirmed-line-chart-container">
          <p className="confirmed-text">Confirmed</p>
          <div classNam
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader">
      <Loader type="Oval" color="#007BFF" height={40} width={40} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    // const {match} = this.props
    // const {params} = match
    // const {id} = params
    // console.log(activeTabId)
    // console.log(stateCaseDetails)
    // console.log(timeLine)

    return (
      <div className="state-specific-container">
        <Header className="header" />
        {isLoading && (
          <div className="loader-container">{this.renderLoader()}</div>
        )}
        {!isLoading && this.renderTestedAndState()}
        {!isLoading && this.renderStatsButtons()}
        {!isLoading && this.renderTopDistricts()}
        {!isLoading && this.renderTopDistrictsBarChart()}
        <Footer />
      </div>
    )
  }
}

export default StateSpecificData
