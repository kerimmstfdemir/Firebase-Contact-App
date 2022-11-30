import { getDatabase, ref, update } from "firebase/database";
import { useContext } from "react";
import { ContactContext } from "../../App";
import app from "../../utils/firebase";

const EditTableData = ({ dataId }) => {
    const { userContact, setUserContact } = useContext(ContactContext)

    const handleUpdate = (userContact) => {
        const database = getDatabase(app);
        const dataRef = ref(database, `contacts/${dataId}`)
        update(dataRef, userContact)
    }
    console.log(userContact);
    return (
        <div className="modal fade" id="editData" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Contact</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="contactName" className="form-label"><b>Name :</b></label>
                                <input type="text" className="form-control" id="contactName" value={userContact.name} onChange={(e) => setUserContact({...userContact, name:e.target.value})}/>
                                <label htmlFor="contactPhone" className="form-label mt-2"> <b>Phone Number :</b></label>
                                <input type="tel" className="form-control" id="contactPhone" value={userContact.phoneNumber} onChange={(e) => setUserContact({...userContact, phoneNumber:e.target.value})}/>
                                <label htmlFor="contactGender" className="form-label mt-2"><b>Gender :</b></label>
                                <select id="contactGender" class="form-select form-select-md mb-1" aria-label=".form-select-md example" value={userContact.gender} onChange={(e) => setUserContact({...userContact, gender:e.target.value})}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            Close
                        </button>
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleUpdate(userContact)}>
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditTableData;
