import { TableStyledIncludingDiv } from "./Table.styled"
import "./table.css"
import { getDatabase, onValue, ref, remove } from "firebase/database"
import app from "../../utils/firebase"
import { useContext, useEffect, useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import EditTableData from "./EditTableData"
import { ContactContext } from "../../App"
import { deleteSuccessNotify } from "../../utils/ToastifyNotifies"

const Table = () => {
    const [contactList, setContactList] = useState([""]);
    const { userContact, setUserContact } = useContext(ContactContext)
    const [dataId, setDataId] = useState("")

    const handleDeleteData = (id) => {
        try {
            const database = getDatabase(app);
            const dataRef = ref(database, `contacts/${id}`)
            remove(dataRef)
            deleteSuccessNotify("Deleted Contact")
        } catch (error) {
            console.log(error.message);
        }
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
        <table className="table table-hover text-center" style={{width:"100%"}}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Gender</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
            </thead>
            {contactList.length === 0 ? <td className="text-center p-2" colSpan="5">Nothing Found</td> : (contactList.map((item)=>{
                const {id, name, gender, phoneNumber} = item
                const handleEditButton = () => {
                    setUserContact({...userContact, name:name, gender:gender, phoneNumber:phoneNumber})
                    setDataId(id)
                }
                return(
                    <tbody>
                        <tr>
                            <td>{name}</td>
                            <td>{phoneNumber}</td>
                            <td>{gender}</td>
                            <td><DeleteIcon style={{color:"#A62B1F", cursor:"pointer"}} onClick={() => handleDeleteData(id)}/></td>
                            <td><BorderColorIcon data-bs-toggle="modal" data-bs-target="#editData" style={{color:"gray", cursor:"pointer"}} onClick={handleEditButton}/></td>
                        </tr>
                    </tbody>
                )
            }))}
        </table>
    </TableStyledIncludingDiv>
    <EditTableData dataId={dataId}/>
    </div>
  )
}

export default Table
