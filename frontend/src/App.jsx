import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Memberdashboard from './components/Memberdashboard'
import Admindashboard from './components/Admindashboard'
import AdminMembers from './components/AdminMembers'
import AdminEvents from './components/AdminEvents'
import AdminAnno from './components/AdminAnno'
import AdminReports from './components/AdminReports'
import Announcements from './components/Announcements'
import Profile from './components/Profile'
import Events from './components/Events'
import Clubs from './components/Clubs'
import Login from './components/Login'
import SuperAdmin from './components/SuperAdmin'
import ProtectedRoutes from './components/ProtectedRoutes'
import Footer from './components/Footer'
import ContactUs from './components/ContactUs'


import './index.css'

const App = () => {
  const [role, setRole] = useState(localStorage.getItem('userRole'));

  // Update role when localStorage changes (after login)
  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('userRole'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  return (
    <Router>
      {role=== 'Admin' && <Sidebar/>}
      {role === 'Member' && <Header />}

      <Routes>   
      
        <Route path="/" element={<Login />} />
        {role === 'Admin' && (
          <>
          <Route path="/admindashboard" element={<Admindashboard />} />
          <Route path="/adminmembers" element={<ProtectedRoutes><AdminMembers /></ProtectedRoutes>} />
          <Route path="/adminevents" element={<ProtectedRoutes><AdminEvents /></ProtectedRoutes>} />
          <Route path="/adminanno" element={<ProtectedRoutes><AdminAnno /></ProtectedRoutes>} />
          {/*<Route path="/adminreports" element={<ProtectedRoutes><AdminReports /></ProtectedRoutes>} />*/}
          <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
          </>
        )}        
        {role === 'Member' && (
          <>
            <Route path="/memberdashboard" element={<Memberdashboard />} />
            <Route path="/events" element={<ProtectedRoutes><Events /></ProtectedRoutes>} />
            <Route path="/announcements" element={<ProtectedRoutes><Announcements /></ProtectedRoutes>} />
            <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
            <Route path="/clubinfos/:clubId" element={<ProtectedRoutes><Clubs /></ProtectedRoutes>} />            
          </>
        )}

         
        {role === 'Super Admin' && (
          <>
            <Route path="/superadmin" element={<ProtectedRoutes><SuperAdmin /></ProtectedRoutes>} />
            <Route path="/profile" element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
          </>
        )}
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App