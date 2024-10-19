
import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../Hooks/useAuthContext'
import axios from 'axios'
import { FaAlignLeft, FaSignOutAlt, FaTimes, FaUserAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import AdminConfirm from './AdminConfirm'
import { Link, useNavigate } from 'react-router-dom'
import AdminSidebar from './AdminSideBar'


function GiftCard() {
const {user}=useAuthContext()
const [sidemenu,setSideMenu]=useState(false)
const[data,setData]=useState([])
const [btnState,setBtnState]=useState("Change Deposit Status")
const [edit,setEdit]=useState(false)
const [depositId,setDepositId]=useState(null)
const [confirm,setConfirm]=useState(false)
const [updateData,setUpdateData]=useState(null)
const [shouldMenuSlide,setShouldMenuSlide]=useState(false)
const [dashUser,setdashUser]=useState(false)
const navigate=useNavigate()
const [formData, setFormData] = useState({
    status:"",
});

useEffect(()=>{
   console.log(formData)
},[formData])
useEffect(()=>{

  axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/isadmin`,{
      headers:{
          Authorization:`Bearer ${user.token}`
      }  
  }).then(response=>{
      console.log(response.data)
     if(response.data.admin){
      console.log("OK")
     }else if(response.data.user){
      navigate(`/admin-panel`)
     }else{
      navigate('/')
     }

  }).catch(error=>{
      console.log(error)
  })
 },[user.token])
const onConfirm=()=>{
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/delete-card/${depositId}`,{
        headers:{
            Authorization:`Bearer ${user.token}`
        }  
    }).then(response=>{
       toast.success("Deleted Successfully")
       setConfirm(false)
       setUpdateData(response.data)
    }).catch(error=>{
        console.log(error)
    })
}
const onCancel=()=>{
    setConfirm(false)
}

const handleDelete=(id)=>{
   setDepositId(id)
   setConfirm(true)

}
useEffect(()=>{

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/gift-card`,{
        headers:{
            Authorization:`Bearer ${user.token}`
        }  
    }).then(response=>{
       setData(response.data)
    }).catch(error=>{
        console.log(error)
    })
},[user.token,updateData]

)

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData)
};

const handleEditClick=(id,balance)=>{
    setEdit(true)
    setDepositId(id)
    // setFormData({ ...formData, depositId: id });


}
const handleSubmit=(e)=>{
    e.preventDefault()
    setBtnState("Processing...")
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/gift-card-status/${depositId}`,{
        action:formData.status
    },{
        headers:{
            Authorization:`Bearer ${user.token}`
        }  
    }).then(response=>{
        setBtnState("Change Deposit Status")
       toast.success("Status Updated Successfully")
       setConfirm(false)
       setUpdateData(response.data)
       setEdit(false)
    }).catch(error=>{
        toast.error(error.response.data)
        setBtnState("Change Deposit Status")
        console.log(error)
    })

}
  return (
    <div className='admin dashboard'>
            <div className="dashboard-header">
       <div className="rights-side">
           <p>{process.env.REACT_APP_APP_NAME}</p>
           <FaAlignLeft onClick={()=>{
               setShouldMenuSlide(true)
               setSideMenu(!sidemenu)
           }} />
       </div>
       <div className="left-side">
                <FaUserAlt onClick={()=>{
                    setdashUser(!dashUser)
                }}/>
             </div>
             {
                    dashUser&&(
                        <div className="user-menu">
                            
                           
                            <p className='logout' onClick={()=>{
                                // logout()
                            }}><FaSignOutAlt />Logout</p>
                        </div>
                    )
                }
   </div>
        {
           sidemenu&&(
              <AdminSidebar shouldMenuSlide={shouldMenuSlide} />
           )
       }
               <div className=" main-admin-dash loan-container">
     <div className="table-head">
     <h2>Deposit Requests</h2>
     {/* <button><FaPlus/>Add New</button> */}
     </div>
      <div className="loan-table">
        <table className='equal-table'>
          <thead>
            <tr>
              <th>User Email</th>
              <th>Code</th>
              <th>Status</th>
              <th>Note</th>
              <th>Action</th>
               
            </tr>
          </thead>
          <tbody>
            {data.length>0?(
             data.map((data,index)=>(
                <tr>
                <td>{data.userEmail}</td>
               
                <td>{data.code}</td>
                <td>{data.status}</td>
                <td>{data.note||"null"}</td>
             
                    <td className='action-tb'>
                    <button onClick={()=>{
                       handleEditClick(data._id,data.balance)
                    }}>Edit</button>
                       {/* <button onClick={()=>{
                        handleDelete(data._id)
                    }}>Print Invoice</button> */}
                    <button onClick={()=>{
                        handleDelete(data._id)
                    }}>Delete</button>
                </td>
                
              
              </tr>
             ))
            ) : (
              <tr>
                <td colSpan="6" className="no-loan-message">
                  No Deposit Requests
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    {
        edit&&(
            <div className='deposits-form'>
            <div className="cancel-depo">
              <FaTimes onClick={() => {
                setEdit(false);
              }} />
            </div>
            <div className="send-money-container">
              <form className="send-money-form" onSubmit={(e)=>{
                handleSubmit(e)
              }}>
                <h2>Edit Deposit Status</h2>


                <div className="send-money-form-group">
                                <label htmlFor="status">Status<span>*</span></label>
                                <select
                                    id="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select One</option>
                                    <option value="Approve">Approve</option>
                                    <option value="Reject">Reject</option>
                                 
                                </select>
                            </div>

           


               

                
        {
          btnState=='Change Deposit Status'&&(
            <button type="submit" className="send-money-send-btn">{btnState}</button>
          )
        }

        {
          btnState=='Processing...'&&(
            <button type="submit"  disabled className="send-money-send-btn">{btnState}</button>
          )
        }
              </form>
            </div>
          </div>
        )
    }
      {
        confirm&&(
            <div>
                <AdminConfirm message='Are you sure you want to delete?' onConfirm={onConfirm} onCancel={onCancel}/>
            </div>
        )
      }
    </div>
  )
}

export default GiftCard
