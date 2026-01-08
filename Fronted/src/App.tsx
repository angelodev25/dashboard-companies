import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectRoutes'
import LayaoutAuth from './auth/sign-in-up'
import Companies from './pages/Companies'
import Header from './pages/MainStruct'
import Home from './pages/Home'
import EditCompany from './pages/EditCompany'
import ErrorPage from './pages/Error'
import Tasks from './pages/Tasks'
import Faqs from './pages/Faqs'
import Analytics from './pages/Analytics'

function App() {
   return (
      <Routes>
         <Route path='/sign-in' element={<LayaoutAuth />} />

         <Route path='/' element={
            <ProtectedRoute> 
               <Header>
                  <Home />
               </Header>
            </ProtectedRoute>
         } />

         <Route path='/companies' element={
            <ProtectedRoute> 
               <Header>
                  <Companies /> 
               </Header>
            </ProtectedRoute>
         } />

         <Route path='/company/:id' element={
            <ProtectedRoute> 
               <Header>
                  <EditCompany /> 
               </Header>
            </ProtectedRoute>
         } />

         <Route path='/tasks' element={
            <ProtectedRoute> 
               <Header>
                  <Tasks /> 
               </Header>
            </ProtectedRoute>
         } />

         <Route path='/faqs' element={
            <ProtectedRoute> 
               <Header>
                  <Faqs /> 
               </Header>
            </ProtectedRoute>
         } />

         <Route path='/analytics' element={
            <ProtectedRoute> 
               <Header>
                  <Analytics /> 
               </Header>
            </ProtectedRoute>
         } />

         <Route path="*" element={<ErrorPage />} />
      </Routes>
   )
}


export default App
