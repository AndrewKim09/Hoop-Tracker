import { deleteDoc , doc} from 'firebase/firestore';
import React from 'react'
import { FaTrash } from "react-icons/fa";
import { db } from '../firebase';

export const ChartDetails = ({stats, type, getStats}) => {
  const handleDelete = async (docId) => {
    const docRef =  doc(db, type, docId);
    deleteDoc(docRef);
    getStats();
  }
  return (
    <div className="ChartDetails-generic">
      {stats.length === 0 ? <h3>No data inputted</h3> :
      <table className='ChartDetails'>
              <tbody className = "table-column-titles">
                <tr >
                  
                    <td>Date</td>
                    <td>Successes</td>
                    <td>Failures</td>

                </tr>
              </tbody>
              <tbody>
                {stats?.map((stat) => {

                    return (<tr key = {stat.time}> 
                          <td>{stat.time.toLocaleString()}</td>
                          <td>{stat.successes}</td>
                          <td>{stat.attempts}</td>
                          <td>
                          <button className='trash-button' onClick={() => {console.log(stat); handleDelete(stat.id)}}><FaTrash /></button>
                          </td>
                      </tr>)
                    
                      
                })}
              </tbody>
      </table>}
    </div>
  )
}
