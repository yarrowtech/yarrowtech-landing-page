// import React, { useState } from "react";
// import "../../styles/UsersAdmin.css";

// export default function Users() {
//   const [users, setUsers] = useState([
//     {
//       id: 1,
//       name: "Anshika",
//       email: "anshika@yarrowtech.in",
//       role: "Admin",
//       status: "active",
//       joined: "2025-10-12",
//     },
//     {
//       id: 2,
//       name: "Rohit",
//       email: "rohit@yarrowtech.in",
//       role: "User",
//       status: "inactive",
//       joined: "2025-11-01",
//     },
//   ]);

//   const deleteUser = (id) => {
//     setUsers((prev) => prev.filter((u) => u.id !== id));
//   };

//   return (
//     <div className="admin-users-container">
//       {/* HEADER */}
//       <div className="admin-header">
//         <h2>User Management</h2>
//         <p className="subtitle">Total Users: {users.length}</p>
//       </div>

//       {/* TABLE */}
//       <div className="users-table-wrapper">
//         <table className="users-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Status</th>
//               <th>Joined</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((u) => (
//               <tr key={u.id}>
//                 <td>{u.id}</td>
//                 <td>{u.name}</td>
//                 <td>{u.email}</td>

//                 {/* Role Badge */}
//                 <td>
//                   <span
//                     className={`role-badge ${
//                       u.role === "Admin" ? "role-admin" : "role-user"
//                     }`}
//                   >
//                     {u.role}
//                   </span>
//                 </td>

//                 {/* Status Badge */}
//                 <td>
//                   <span
//                     className={`status-badge ${
//                       u.status === "active" ? "status-active" : "status-inactive"
//                     }`}
//                   >
//                     {u.status}
//                   </span>
//                 </td>

//                 <td>{u.joined}</td>

//                 <td className="actions">
//                   <button className="edit-btn">Edit</button>
//                   <button
//                     className="delete-btn"
//                     onClick={() => deleteUser(u.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import "../../styles/UsersAdmin.css";
import { getERPUsers } from "../../services/adminService";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

 const loadUsers = async () => {
  const data = await getERPUsers();
  setUsers(Array.isArray(data) ? data : []);
};


  const deleteUser = (id) => {
    alert("Delete API not implemented yet.");
  };

  return (
    <div className="admin-users-container">
      <div className="admin-header">
        <h2>User Management</h2>
        <p className="subtitle">Total Users: {users.length}</p>
      </div>

      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.email}</td>

                <td>
                  <span className={`role-badge role-${u.role}`}>
                    {u.role}
                  </span>
                </td>

                <td>
                  <span className="status-badge status-active">
                    active
                  </span>
                </td>

                <td>{new Date(u.createdAt).toLocaleDateString()}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
