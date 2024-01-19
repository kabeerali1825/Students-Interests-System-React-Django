import { useState } from 'react'
import './App.css'
import FrontPage from './Components/homePage'
import { Route, Routes } from 'react-router-dom'
import StudentsPage from './Components/students'
import Users from './Components/Users'
import ViewStudentPage from './Components/ViewStudentPage'
import EditStudentPage from './Components/EditStudentPage'
import StudentsDashboard from './Components/DashBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    
      <div>
       <Routes>
          <Route path='/' element={<Users/>} />
          <Route path='/users' element={<Users/>} />
          <Route path='/students' element={<StudentsPage/>} />
          <Route path='/students' element={<button><StudentsPage/></button>} />
          <Route path='/dashboard' element={<StudentsDashboard/>} />
          <Route path="/students/get_student/:id" element={<ViewStudentPage/>} />
          <Route path="/students/update_student/:id" element={<EditStudentPage/>} />
          <Route path="/addStudent" element={<FrontPage/>}/>
        </Routes>
      </div>
  )
}
export default App
