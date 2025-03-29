import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster, toast } from 'sonner'
import { Provider } from 'react-redux';
import store from './features/store';
import UserRouter from './Router/userRouter';
import AdminRouter from './Router/adminRouter';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Toaster position="bottom-center" richColors />
     <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/*' element={<UserRouter />} />
          <Route path='/admin/*' element={<AdminRouter/>} />
          

        </Routes>

      </Router>

     </Provider>
    
     </>
  )
}

export default App
