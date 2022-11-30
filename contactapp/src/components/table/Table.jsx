import { TableStyledIncludingDiv } from "./Table.styled"
import "./table.css"
import { getDatabase, onValue, ref, remove } from "firebase/database"
import app from "../../utils/firebase"
import { useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditTableData from "./EditTableData"

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
        <table className="text-center table table-striped table-hover" style={{width:"100%"}}>
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
                            <td><BorderColorIcon data-bs-toggle="modal" data-bs-target="#editData" style={{color:"gray", cursor:"pointer"}}/></td>
                        </tr>
                    </tbody>
                )
            })}
        </table>
    </TableStyledIncludingDiv>
    <EditTableData />
    </div>
  )
}

export default Table
