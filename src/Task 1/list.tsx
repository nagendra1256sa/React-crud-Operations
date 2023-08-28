import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Annotation } from '../App';

interface Properties
{
    props:Annotation[];
    deleteItem:(id:number)=>void
    editing:(data:any)=>void
}

const List:React.FC<Properties>=({props,deleteItem,editing})=>
{
    return(<div>
         <table className='table m-3'>
        <thead>
            <tr>
                <th>
                    Sku
                </th>
                <th>Name</th>
                <th>BasePrice</th>

            </tr>
        </thead>
        <tbody>
        
                {props.map((each)=>
                {
                    const{Sku,Name,BasePrice}=each;
                    return(
                    <tr key={Sku}>
                        <td>{Sku}</td>
                        <td>{Name}</td>
                        <td>{BasePrice}</td>
                        <td> <Link to="/list/edit"><button className="btn btn-primary"onClick={()=>editing(each)}>Edit</button></Link></td>
                        <td><button  className='btn btn-danger' onClick={()=>deleteItem(Sku)}>Delete</button></td>
                        <td><Link to={`/list/listcard/${Sku}`}><button className='btn btn-info'>Details</button></Link></td>
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