import './App.css';
import Form from './components/form/Form';
import Table from './components/table/Table';
import { createContext, useState } from 'react';
import { ToastContainer } from 'react-toastify';

//! Creating
export const ContactContext = createContext();

function App() {
  const [userContact, setUserContact] = useState({
    name:"",
    phoneNumber:"",
    gender:"Male"
  })

  return (
    <ContactContext.Provider value={{userContact, setUserContact}}>
      <ToastContainer />
      <Form />
      <Table />
      </ContactContext.Provider>
  );
}

export default App;
