import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'

class CourseDetails extends Component {
  state = {course: {}, view: 'LOADING'}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    const {match} = this.props
    const {params} = match
    const id = params
    const courseItemDetailsApiUrl = `https://apis.ccbp.in/te/courses/${id.id}`
    const response = await fetch(courseItemDetailsApiUrl)
    if (response.ok) {
      const each = await response.json()
      const data = each.course_details
      const updateData = {
        id: data.id,
        name: data.name,
        imageUrl: data.image_url,
        description: data.description,
      }
      this.setState({course: updateData, view: 'SUCCESS'})
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
    const {course} = this.state
    const {imageUrl, name, description} = course
    return (
      <div className="card">
        <img src={imageUrl} alt={name} className="course-img" />
        <div className="content">
          <h1>{name}</h1>
          <p>{description}</p>
        </div>
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
    return <div className="course-cont">{this.finalView()}</div>
  }
}

export default CourseDetails
