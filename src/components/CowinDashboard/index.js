import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const websiteLogo = 'https://assets.ccbp.in/frontend/react-js/cowin-logo.png'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    last7dayVaccination: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
  }

  componentDidMount() {
    this.getCovidData()
  }

  renderVaccinationStatus = () => {
    const {
      last7dayVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state
    return (
      <>
        <VaccinationCoverage last7dayData={last7dayVaccination} />
        <VaccinationByGender vaccinationByGenderDetails={vaccinationByGender} />
        <VaccinationByAge vaccinationByAgeDetails={vaccinationByAge} />
      </>
    )
  }

  getCovidData = async () => {
    // this.setState({apiStatus: apiStatusConstants.inProgress})
    const ApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const options = {
      method: 'GET',
    }
    const response = await fetch(ApiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const updatedLast7DaysCoverage = data.last_7_days_vaccination.map(
        eachItem => ({
          dose1: eachItem.dose_1,
          dose2: eachItem.dose_2,
          vaccineDate: eachItem.vaccine_date,
        }),
      )

      const updatedVaccinatedByAge = data.vaccination_by_age.map(eachItem => ({
        age: eachItem.age,
        count: eachItem.count,
      }))

      const updatedVaccinatedByGender = data.vaccination_by_gender.map(
        eachItem => ({
          count: eachItem.count,
          gender: eachItem.gender,
        }),
      )

      this.setState({
        vaccinationByGender: updatedVaccinatedByGender,
        vaccinationByAge: updatedVaccinatedByAge,
        last7dayVaccination: updatedLast7DaysCoverage,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        className="failure-image"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div className="loading-view" data-testid="loader">
      <Loader color="#ffffff" height={80} type="ThreeDots" width={80} />
    </div>
  )

  renderViewBasedOnApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderVaccinationStatus()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="logo-container">
            <img src={websiteLogo} alt="website logo" className="logo" />
            <h1 className="heading">Co-WIN</h1>
          </div>
          <h1 className="heading2">CoWin Vaccination in india</h1>
        </div>
        {this.renderViewBasedOnApiStatus()}
      </div>
    )
  }
}

export default CowinDashboard

//  this.setState({
//         last7dayVaccination: [data.last_7_days_vaccination],
//         vaccinationByAge: [data.vaccination_by_age],
//         vaccinationByGender: [data.vaccination_by_gender],
//       })

// console.log('1', vaccinationByAge)
// console.log('2', last7dayVaccination)
// console.log('3', vaccinationByGender)

//   console.log(
//       'aaa',
//       last7dayVaccination,
//       vaccinationByAge,
//       vaccinationByGender,
//     )
