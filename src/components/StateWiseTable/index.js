import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import {Link} from 'react-router-dom'

import './index.css'

const StateWiseTable = props => {
  const {sortList, stateWiseData} = props
  //   console.log(stateWiseData)

  const onAscSort = () => {
    sortList(1)
  }

  const onDescSort = () => {
    sortList(-1)
  }

  return (
    <div className="table-container">
      <ul className="table">
        <li className="table-header">
          <div className="states-ut-sort">
            <p className="states-ut">States/UT</p>
            <button onClick={onAscSort} className="sort-button" type="button">
              <FcGenericSortingAsc className="sort-icon" />
            </button>
            <button onClick={onDescSort} className="sort-button" type="button">
              <FcGenericSortingDesc className="sort-icon" />
            </button>
          </div>
          <div className="table-header-title">
            <p>Confirmed</p>
          </div>
          <div className="table-header-title">
            <p>Active</p>
          </div>
          <div className="table-header-title">
            <p>Recovered</p>
          </div>
          <div className="table-header-title">
            <p>Deceased</p>
          </div>
          <div className="table-header-title">
            <p>Population</p>
          </div>
        </li>
        {stateWiseData.length !== 0 &&
          stateWiseData.map(state => (
            <li key={state.stateCode}>
              <Link
                to={`/state/${state.stateCode}`}
                className="table-row link-item"
              >
                <div className="state-name">
                  <p>{state.name}</p>
                </div>
                <div className="cases-number confirmed">
                  <p>{state.confirmed}</p>
                </div>
                <div className="cases-number active">
                  <p>{state.active}</p>
                </div>
                <div className="cases-number recovered">
                  <p>{state.recovered}</p>
                </div>
                <div className="cases-number deceased">
                  <p>{state.deceased}</p>
                </div>
                <div className="cases-number population">
                  <p>{state.population}</p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default StateWiseTable
// testid="ascendingSort"  testid="descendingSort"
