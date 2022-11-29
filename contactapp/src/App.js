import './App.css';
import Form from './components/form/Form';
import Table from './components/table/Table';
import { createContext, useState } from 'react';

//! Creating
export const ContactContext = createContext();

function App() {
  const [userContact, setUserContact] = useState({
    name:"",
    phoneNumber:"",
    gender:""
  })

  return (
    <ContactContext.Provider value={{userContact, setUserContact}}>
      <Form />
      {/* <Table /> */}
    </ContactContext.Provider>
  );
}

export default App;
