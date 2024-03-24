import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {item} = props
  const {id, name, logoUrl} = item
  return (
    <Link to={`/courses/${id}`} className="each-link">
      <li className="course-item">
        <img src={logoUrl} alt={name} className="course-logo" />
        <p>{name}</p>
      </li>
    </Link>
  )
}

export default CourseItem
