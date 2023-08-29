import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Annotation } from '../App';
import '../App.css'
// import RowDetails from './RowDetails'

interface Properties
{
    props:Annotation[];
    deleteItem:(id:number)=>void
    editing:(data:any)=>void
}

const List:React.FC<Properties>=({props,deleteItem,editing})=>
{
    const navigate=useNavigate();
    const handleEditing=(item:Annotation,e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>
    {
        editing(item);
        navigate('/list/edit');
        e.stopPropagation();
    }
    const handleDeleteItem=(Sku:number,e:React.MouseEvent<HTMLButtonElement,MouseEvent>)=>
    {
        deleteItem(Sku);
        e.stopPropagation();
    }
    const itemDetails=(Sku:number)=>
    {
        navigate(`/list/listcard/${Sku}`);
    }
    return(<div className='table-container'>
         <table className='table'>
        <thead>
            <tr>
                <th>
                    Sku
                </th>
                <th>Name</th>
                <th>SellingPrice</th>

            </tr>
        </thead>
        <tbody>
        
                {props.map((each)=>
                {
                    const{Sku,Name,SellingPrice}=each;
                    return(
                    <tr key={Sku} onClick={()=>itemDetails(Sku)}>
                          <td>{Sku}</td>
                            <td>{Name}</td>
                            <td>{SellingPrice}</td> 
                        <td> <button className="btn btn-primary"onClick={(e)=>handleEditing(each,e)}>Edit</button></td>
                        <td><button  className='btn btn-danger' onClick={(e)=>handleDeleteItem(each.id,e)}>Delete</button></td>
                    </tr>)
                })}
            
        </tbody>
     </table>
     <Link to="/list/add">
        <button className='btn btn-primary float-end'>Add Item</button>
        </Link>
        <Outlet/>
    </div>)
}
export default List;