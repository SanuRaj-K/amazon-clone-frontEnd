import axios from "axios";
import React, { useEffect, useState } from "react";
import userImg from "../../../Assets/Images/Icons/icons8-user-32.png";
import { Link } from "react-router-dom";
function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://amazon-clone-backend-fz8l.onrender.com/admin/getusers")
      .then((res) => {
        const data = res.data;
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="w-full">
      <div>
        {users.map((user) => {
          return (
            <div key={user._id} className="flex items-center justify-center">
              <Link
                to={`/admin/users/${user.email}`}
                className=" no-underline text-black"
              >
                <div className="w-[300px] border mb-[10px] rounded-xl text-center hover:text-[#3f95cbbe]">
                  <img src={userImg} alt="user" className="mx-auto" />
                  <h4>{user.username}</h4>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Users;
