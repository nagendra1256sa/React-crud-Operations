import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Annotation } from '../App';
import '../App.css';

interface Properties {
  props: Annotation[];
  deleteItem: (id: number) => void;
  editing: (data: any) => void;
  [key:string]:any
}

type AnnotationKey = 'Sku' | 'Name' | 'SellingPrice';


const List: React.FC<Properties> = ({ props, deleteItem, editing }) => {
  const [sortConfig, setSortConfig] = useState<{ key: AnnotationKey; direction: 'asc' | 'desc' } | null>(null);

  const navigate = useNavigate();

  const sortAnnotations = (annotations: Annotation[], key: AnnotationKey, direction: 'asc' | 'desc') => {
    return [...annotations].sort((a, b) => {
        console.log(a,b);
        
      if (a[key] < b[key]) {
        console.log(a[key],b[key]);
        
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
         console.log(a[key],b[key]);
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  const handleSort = (key:any) => {
    console.log(key);
    
    if (sortConfig && sortConfig.key === key) {
      const direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
      setSortConfig({ key, direction });
    } else {
      setSortConfig({ key, direction: 'asc' });
    }
  };

  const sortedProps = sortConfig ? sortAnnotations(props, sortConfig.key, sortConfig.direction) : props;

  const handleEditing = (item: Annotation, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    editing(item);
    navigate('/list/edit');
    e.stopPropagation();
  };

  const handleDeleteItem = (Sku: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    deleteItem(Sku);
    e.stopPropagation();
  };

  const itemDetails = (Sku: number) => {
    navigate(`/list/listcard/${Sku}`);
  };

  return (
    <div className='table-container'>
      <table className='table'>
        <thead>
          <tr>
            <th onClick={() => handleSort('Sku')}>Sku</th>
            <th onClick={() => handleSort('Name')}>Name</th>
            <th onClick={() => handleSort('SellingPrice')}>SellingPrice</th>
          </tr>
        </thead>
        <tbody>
          {sortedProps.map((each) => {
            const { Sku, Name, SellingPrice } = each;
            return (
              <tr key={Sku} onClick={() => itemDetails(Sku)}>
                <td>{Sku}</td>
                <td>{Name}</td>
                <td>{SellingPrice}</td>
                <td>
                  <button className='btn btn-primary' onClick={(e) => handleEditing(each, e)}>
                    Edit
                  </button>
                  </td>
                  <td>
                  <button className='btn btn-danger ' onClick={(e) => handleDeleteItem(each.id, e)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to='/list/add'>
        <button className='btn btn-primary float-end'>Add Item</button>
      </Link>
      <Outlet />
    </div>
  );
};

export default List;