import { TableStyledIncludingDiv } from "./Table.styled"
import "./table.css"
import { getDatabase, onValue, ref, remove } from "firebase/database"
import app from "../../utils/firebase"
import { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const Table = () => {
    const [contactList, setContactList] = useState([]);

    const handleDeleteData = (id) => {
        const database = getDatabase(app);
        const dataRef = ref(database, `contacts/${id}`)
        remove(dataRef)
    }

    useEffect(()=>{
        const database = getDatabase(app)
        const contactsRef = ref(database, "contacts/")

        onValue(contactsRef, (snapshot)=> {
            const data = snapshot.val()
            const contactArray = [];

            for(let id in data) {
                contactArray.push({id, ...data[id]})
            }
            setContactList(contactArray)
        })
    },[])


  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
    <TableStyledIncludingDiv>
        <p>CONTACTS</p>
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Phone Number</th>
                    <th>Gender</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
            </thead>
            {contactList.map((item)=>{
                const {id, name, gender, phoneNumber} = item
                return(
                    <tbody>
                        <tr>
                            <td>{name}</td>
                            <td>{phoneNumber}</td>
                            <td>{gender}</td>
                            <td><DeleteIcon style={{color:"#A62B1F", cursor:"pointer"}} onClick={() => handleDeleteData(id)}/></td>
                            <td><BorderColorIcon style={{color:"gray"}}/></td>
                        </tr>
                    </tbody>
                )
            })}
        </table>
    </TableStyledIncludingDiv>
    </div>
  )
}

export default Table