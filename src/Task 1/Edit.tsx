import React, { ChangeEvent, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import '../App.css'

interface EditTypes{
   update:(data:any)=>void
   editData:any
}
const Edit:React.FC<EditTypes>=({update,editData})=>
{
   const navigate=useNavigate();
    const[editStorage,setEditStorage]=useState(editData);
    const[submitted,setSubmit]=useState(false); 
    const updateDetails=(e:ChangeEvent<HTMLInputElement>)=>
   {
     const{name,value}=e.target;
     setEditStorage({...editStorage,[name]:value});
   }
    return(<section>
        <form className='Add-form'>
         <h3>Edit Item</h3>
         <div className='form-group mt-2'>
            <label>Sku:</label>
            <input className="form-control mt-2" type="number" name="Sku" value={editStorage.Sku}
            onChange={updateDetails} placeholder='Enter Sku'/>  
            {
                submitted&&editStorage.Sku==="" &&<span className='text-danger'>Sku required</span>
            }
         </div>
         <div className='form-group mt-2'>
            <label>Name:</label>
            <input className='form-control mt-2' type="text" name="Name" value={editStorage.Name} 
             onChange={updateDetails} placeholder='Enter Name'/>  
              {
                submitted&&editStorage.Name==="" &&<span className='text-danger'>Name required</span>
            }
         </div>
         <div className='form-group mt-2'>
            <label>Display Name:</label>
            <input className='form-control mt-2' type="text" name="DisplayName" value={editStorage.DisplayName} 
             onChange={updateDetails} placeholder='Enter Display Name'/>  
              {
                submitted&&editStorage.DisplayName==="" &&<span className='text-danger'>Name required</span>
            }
         </div>
         <div className='form-group mt-2'>
            <label>Base Price:</label>
            <input className='form-control mt-2' type="text" name="BasePrice" value={editStorage.BasePrice} 
             onChange={updateDetails} placeholder='Enter Base Price'/>  
              {
                submitted&&editStorage.BasePrice==="" &&<span className='text-danger'>Base Price required</span>
            }
         </div>
         <div className='form-group mt-2'>
            <label>Selling Price:</label>
            <input className='form-control mt-2' type="number" name="SellingPrice" value={editStorage.SellingPrice} 
             onChange={updateDetails} placeholder='Enter Selling Price'/>  
              {
                submitted&&editStorage.SellingPrice==="" &&<span className='text-danger'>Selling Price required</span>
            }
         </div>
         <div className='form-group mt-2'>
            <label>Decription:</label>
            <input className='form-control mt-2' type="text" name="Decription" value={editStorage.Decription} 
             onChange={updateDetails} placeholder='Enter Decription'/>  
         </div>
         <button className='btn btn-primary float-end m-2' onClick={(e)=>{e.preventDefault()
           setSubmit(true);
          if(editStorage.Sku!==""&&editStorage.Name!==''&&editStorage.DisplayName!==""&&editStorage.BasePrice!==''&&editStorage.SellingPrice!=="")
          update(editStorage)
          }}>Update</button>
          <button className='btn btn-danger float-end m-2'onClick={()=>navigate("/list")}>Cancel</button>
        </form>
    </section>);
}
export default Edit;