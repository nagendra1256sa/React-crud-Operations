import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Annotation } from '../App';

interface itemType{
   item:Annotation[];
}

const ListCard:React.FC<itemType>=({item})=>
{
  const navigate=useNavigate();
    const {Sku}=useParams();
    const userid=Sku? parseInt(Sku):NaN;
    console.log(userid);
    console.log(item);
    const Item=item.find((each)=>{return each.Sku===userid})
    console.log(Item);
    return(<div className="card">
      <h3>Details Of Item</h3>
      {
        Item?(<><div className="card-item">
          <label>Sku:</label>
          <div>{Item.Sku}</div>
        </div><div className="card-item">
            <label>Name:</label>
            <div>{Item.Name}</div>
          </div><div className="card-item">
            <label>Display Name:</label>
            <div>{Item.DisplayName}</div>
          </div><div className="card-item">
            <label>Base Price:</label>
            <div>{Item.BasePrice}</div>
          </div><div className="card-item">
            <label>Selling Price:</label>
            <div>{Item.SellingPrice}</div>
          </div><div className="card-item">
            <label>Description:</label>
            <div>{Item.Decription}</div>
          </div></>):(<h4>No data</h4>)
      }
      <button className='btn btn-danger'onClick={()=>navigate("/list")}>Close</button>
  </div>
  

      )
}
export default ListCard;