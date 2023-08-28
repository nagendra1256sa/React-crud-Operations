import  React,{ useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Add from './Task 1/Add';
import Edit from './Task 1/Edit';
import List from './Task 1/list';
import ListCard from './Task 1/listCard';
import Login from './Task 1/login';
import { deleteDetails, getData, post, putData } from './Task 1/Storage';

export interface Annotation
{
  Sku:number;
  Name:string;
  DisplayName:string;
  BasePrice:string;
  SellingPrice:string;
  Decription:string
}

const App:React.FC=()=>
{
 const[state,setState]=useState<Annotation[]|undefined>();
 const[edit,setEdit]=useState({
  Sku:"",
  Name:'',
  DisplayName:'',
  BasePrice:'',
  SellingPrice:'',
  Decription:'',
 })
 const navigate=useNavigate();
 useEffect(()=>
 {
   getDetails();
 },[])
 const getDetails=async()=>
 {
    const responce=await getData();
    setState(responce.data)
 }
 const postData=async(data:any)=>
 {
    await post(data);
    getDetails();
    navigate("/list")
 }
 const deleteData=async(id:any)=>
 {
    await deleteDetails(id);
    getDetails();
 }
 const handleData=(data:any)=>
 {
    setEdit(data);
 }
 const updateData=async(data:any)=>
 {
    await putData(data,data.Sku);
    getDetails();
    navigate("/list");
 }
  return (
    <div>
       <h1 className='text-primary fixed'>Menu Items</h1>
     <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/list" element={state?<List props={state} deleteItem={deleteData} editing={handleData}/>:null}>
      <Route path="/list/add" element={<Add send={postData}/>}/>
      <Route path="/list/edit" element={<Edit update={updateData} editData={edit}/>}/>
      <Route path="/list/listCard/:Sku" element={state?<ListCard item={state}/>:null}/>
      </Route>
      </Routes>
    </div>
  );
}
export default App;