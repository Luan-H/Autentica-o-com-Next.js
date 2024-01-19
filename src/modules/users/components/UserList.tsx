'use client';

import { users } from "@prisma/client";
import React from "react";

export default function UserList() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data.users)
      })
  }, []);

  return (
    <ul className="my-10">
      {users.map((user: users) => (
        <li key={user.id}>
          {user.name} / {user.email}
        </li>
      ))}
    </ul>)
}