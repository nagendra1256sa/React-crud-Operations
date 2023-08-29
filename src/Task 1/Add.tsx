import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

interface dataTypes {
  send: (data: any) => void;
}

const Add: React.FC<dataTypes> = (props) => {
  const [Item, setItem] = useState({
    Sku: "",
    Name: '',
    DisplayName: '',
    BasePrice: '',
    SellingPrice: '',
    Decription: '',
  });
  const [submitted, setSubmit] = useState(false);
  const navigate = useNavigate();
  const storeData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setItem({ ...Item, [name]: value })
  }
  const isValidString=(Name:string):boolean=>
  {
    const pattern = /^[A-Za-z][A-Za-z\s]*$/;

    return pattern.test(Name);
  }
  return (<section>
    <form className='Add-form'>
      <h3>Add Item</h3>
      <div className='form-details'>
        <div className='form-group mt-2'>
          <label>Sku:</label>
          <input className="form-control mt-2" type="number" name="Sku" value={Item.Sku}
            onChange={storeData} placeholder='Enter Sku' />
          {
            submitted && Item.Sku === ""  ? (<span className='text-danger'>Sku required</span>):
             (parseInt(Item.Sku)<=0 && <span className='text-danger'>Invalid Inputs</span>)
          }
        </div>
        <div className='form-group mt-2'>
          <label>Name:</label>
          <input className='form-control mt-2' type="text" name="Name" value={Item.Name}
            onChange={storeData} placeholder='Enter Name' />
          {
            submitted && Item.Name === "" ?(<span className='text-danger'>Name required</span>):
            (Item.Name.length>0 && !isValidString(Item.Name) && <span className='text-danger'>Invalid input</span>)
          }
        </div>
        <div className='form-group mt-2'>
          <label>Display Name:</label>
          <input className='form-control mt-2' type="text" name="DisplayName" value={Item.DisplayName}
            onChange={storeData} placeholder='Enter Display Name' />
          {
            submitted && Item.DisplayName === "" ? <span className='text-danger'>Display Name required</span>:
             Item.DisplayName.length>0 && !isValidString(Item.DisplayName) && <span className='text-danger'>Invalid Input</span>
          }
        </div>
        <div className='form-group mt-2'>
          <label>Base Price:</label>
          <input className='form-control mt-2' type="number" name="BasePrice" value={Item.BasePrice}
            onChange={storeData} placeholder='Enter Base Price' />
          {
            submitted && Item.BasePrice === "" ? <span className='text-danger'>Base Price required</span>:
            parseInt(Item.BasePrice)<=0 && <span className='text-danger'>Invalid Inputs</span>
          }
        </div>
        <div className='form-group mt-2'>
          <label>Selling Price:</label>
          <input className='form-control mt-2' type="number" name="SellingPrice" value={Item.SellingPrice    }
            onChange={storeData} placeholder='Enter Selling Price' />
          {
            submitted && Item.SellingPrice === "" ? <span className='text-danger'>Selling Price required</span>:
            parseInt(Item.SellingPrice)<=0 && <span className='text-danger'>Invalid Inputs</span>
          }
        </div>
        <div className='form-group mt-2'>
          <label>Decription:</label>
          <input className='form-control mt-2' type="text" name="Decription" value={Item.Decription}
            onChange={storeData} placeholder='Enter Decription' />
            {
              Item.Decription.charAt(0)===" "&&<span className='text-danger'>Invalid Input</span>
            }
        </div>
        <button className='btn btn-primary float-end' onClick={(e) => {
          e.preventDefault()
          setSubmit(true);
          if (Item.Sku !== "" && Item.Name !== '' && Item.DisplayName !== "" && Item.BasePrice !== '' && Item.SellingPrice !== "")
            props.send(Item)
        }}>Send</button>
        <button className='btn btn-danger float-end' style={{ marginRight: "6px" }} onClick={() => navigate("/list")}>Close</button>
      </div>
    </form>
  </section>)
}
export default Add;