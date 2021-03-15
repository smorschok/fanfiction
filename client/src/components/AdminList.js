import React from 'react'

export const AdminList = ({users})=>{
    return(
        <div>
            
        
                <table>
        <thead>
          <tr>
              <th>email</th>
              <th>Админ-доступ</th>
              <th>Дата регистрации</th>

          </tr>
        </thead>

        <tbody>
        {
          users.map(user => {
             return(
          <tr key = {user._id}>
            <td>{user.email}</td>
            <td>{user.admin && <span className="material-icons" style = {{color:'green'}}>check</span>}</td>
            <td>{user.date}</td>

          </tr>
        
             )  
           })}
          </tbody>
      </table>
        </div>
    )
}