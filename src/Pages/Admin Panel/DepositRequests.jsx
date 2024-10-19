import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../../Hooks/useAuthContext'
import axios from 'axios'
import { FaAlignLeft, FaSignOutAlt, FaTimes, FaUserAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import AdminConfirm from './AdminConfirm'
import { Link, useNavigate } from 'react-router-dom'
import AdminSidebar from './AdminSideBar'
import Invoice from '../../Component/Invoice/Invoice'


function DepositRequest() {
const {user}=useAuthContext()
const navigate=useNavigate()
const [sidemenu,setSideMenu]=useState(false)
const[data,setData]=useState([])
const [btnState,setBtnState]=useState("Change Deposit Status")
const [edit,setEdit]=useState(false)
const [depositId,setDepositId]=useState(null)
const [confirm,setConfirm]=useState(false)
const [updateData,setUpdateData]=useState(null)
const [shouldMenuSlide,setShouldMenuSlide]=useState(false)
const [dashUser,setdashUser]=useState(false)
const [printInvoice,setPrintInvoice]=useState(false)
const [invoiceData,setInvoiceData]=useState(null)
const [formData, setFormData] = useState({
    status:"",
});

useEffect(()=>{
   console.log(formData)
},[formData])

const onConfirm=()=>{
    axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/delete-deposit/${depositId}`,{
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

const handleInvoice=(data)=>{
   setInvoiceData(data)
   setPrintInvoice(true)
}

const handleDelete=(id)=>{
   setDepositId(id)
   setConfirm(true)

}
useEffect(()=>{

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/deposits`,{
        headers:{
            Authorization:`Bearer ${user.token}`
        }  
    }).then(response=>{
      console.log(response.data)
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
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/deposit/${depositId}`,{
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
              <th>Amount</th>
              <th>Email</th>
              <th>Method</th>
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
                <td>{data.amount} {data.currency}</td>
                <td>{data.userEmail}</td>
                <td>{data.method}</td>
                <td>{data.status}</td>
                <td>{data.note}</td>
             
                    <td className='action-tb'>
                    <button onClick={()=>{
                       handleEditClick(data._id,data.balance)
                    }}>Edit</button>
                       <button onClick={()=>{
                        handleInvoice(data)
                    }}>Print Invoice</button>
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
                                    <option value="Successful">Successful</option>
                                    <option value="Failed">Failed</option>
                                 
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

      {
        printInvoice&&(
          <div className="print-invoice">
             <div className="cancel-invoice">
              <FaTimes onClick={() => {
                setPrintInvoice(false);
              }} />
            </div>
            <Invoice data={invoiceData}/>
          </div>
        )
      }
    </div>
  )
}

export default DepositRequest
