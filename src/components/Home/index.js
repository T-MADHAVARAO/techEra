import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CourseItem from '../CourseItems'

import './index.css'

class Home extends Component {
  state = {courses: [], view: 'LOADING'}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const updateData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      this.setState({courses: updateData, view: 'SUCCESS'})
    } else {
      this.setState({view: 'FAILURE'})
    }
  }

  loadingView = () => (
    <div data-testid="loader" className="loader-cont">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  successView = () => {
    const {courses} = this.state
    return (
      <div>
        <h1>Courses</h1>
        <ul className="courses-cont">
          {courses.map(each => (
            <CourseItem key={each.id} item={each} />
          ))}
        </ul>
      </div>
    )
  }

  failureView = () => (
    <div className="loader-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button onClick={this.getCourses} type="button">
        Retry
      </button>
    </div>
  )

  finalView = () => {
    const {view} = this.state
    let final
    switch (view) {
      case 'SUCCESS':
        final = this.successView()
        break
      case 'FAILURE':
        final = this.failureView()
        break
      case 'LOADING':
        final = this.loadingView()
        break
      default:
        break
    }
    return final
  }

  render() {
    return <div className="home">{this.finalView()}</div>
  }
}

export default Home
