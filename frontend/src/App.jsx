import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home.jsx';
import ShowBook from './components/ShowBook.jsx';
import CreateBook from './components/CreateBook.jsx';
import EditBook from './components/EditBook.jsx';
import DeleteBook from './components/DeleteBook.jsx';
//import Spinner from './components/Spinner.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
      {/* <Route path='/spinner' element={<Spinner />} /> */}
    </Routes>
  )
}

export default App