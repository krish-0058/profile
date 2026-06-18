import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./Components/Home"
import Skills from "./Components/Skills"
import AboutMe from "./Components/AboutMe"
import Projects from "./Components/Projects"
import Contacts from "./Components/Contacts"

import AdminHome from "./Components/AdminHome"
import AdminSkills from "./Components/AdminSkills"
import AdminAbout from "./Components/AdminAbout"
import AdminProjects from "./Components/AdminProjects"
import AdminContacts from "./Components/AdminContacts"
import AdminSettings from "./Components/AdminSettings"
import Password from "./Components/Password"
import ProtectedRoute from "./Components/ProtectedRoute"


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="*" element={<Navigate to='/home'/>}></Route>

            <Route path="/home" element={<Home/>}></Route>
            <Route path="/skills" element={<Skills/>}></Route>
            <Route path="/aboutMe" element={<AboutMe/>}></Route>
            <Route path="/projects" element={<Projects/>}></Route>
            <Route path="/contactMe" element={<Contacts/>}></Route>

            <Route path="/auth/" element={<Password/>}></Route>

            <Route path="/auth/home" element={<ProtectedRoute><AdminHome/></ProtectedRoute>}></Route>
            <Route path="/auth/skills" element={<ProtectedRoute><AdminSkills/></ProtectedRoute>}></Route>
            <Route path="/auth/aboutMe" element={<ProtectedRoute><AdminAbout/></ProtectedRoute>}></Route>
            <Route path="/auth/projects" element={<ProtectedRoute><AdminProjects/></ProtectedRoute>}></Route>
            <Route path="/auth/contactMe" element={<ProtectedRoute><AdminContacts/></ProtectedRoute>}></Route>
            <Route path="/auth/settings" element={<ProtectedRoute><AdminSettings/></ProtectedRoute>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
