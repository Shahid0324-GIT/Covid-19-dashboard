import './index.css'

const TotalStats = props => {
  const {total, isLoading} = props
  const {confirmed, deceased, recovered} = total
  const active = confirmed - (deceased + recovered)
  //   console.log(confirmed, deceased, recovered, active)

  return (
    <>
      {!isLoading && (
        <ul className="total-stats-container">
          <div className="number-container">
            <li className="stat">
              <p className="confirmed">Confirmed</p>
              <img
                src="https://res.cloudinary.com/dyfejmsph/image/upload/v1641157955/covid-dashboard-ccbp/check-mark_1_vey284.svg"
                alt="country wide confirmed cases pic"
                className="stat-image"
              />
              <p className="confirmed">{confirmed}</p>
            </li>
          </div>{' '}
          <div className="number-container">
            <li className="stat">
              <p className="active">Active</p>
              <img
                src="https://res.cloudinary.com/dyfejmsph/image/upload/v1641157951/covid-dashboard-ccbp/protection_1_gxobgm.svg"
                alt="country wide confirmed cases pic"
                className="stat-image"
              />
              <p className="active">{active}</p>
            </li>
          </div>{' '}
          <div className="number-container">
            <li className="stat">
              <p className="recovered">Recovered</p>
              <img
                src="https://res.cloudinary.com/dyfejmsph/image/upload/v1641157945/covid-dashboard-ccbp/recovered_1_aenxht.svg"
                alt="country wide confirmed cases pic"
                className="stat-image"
              />
              <p className="recovered">{recovered}</p>
            </li>
          </div>{' '}
          <div className="number-container">
            <li className="stat">
              <p className="deceased">Deceased</p>
              <img
                src="https://res.cloudinary.com/dyfejmsph/image/upload/v1641157949/covid-dashboard-ccbp/breathing_1_mgwh7s.svg"
                alt="country wide confirmed cases pic"
                className="stat-image"
              />
            </li>
            <p className="deceased">{deceased}</p>
          </div>
        </ul>
      )}
    </>
  )
}

export default TotalStats
