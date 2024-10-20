import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

const UserForm = () => {
    const location = useLocation();
    const { name, address, role } = location.state || {};
  
    useEffect(() => {
      const saveUser = async () => {
        if (name && address && role) {
          try {
            const response = await axios.post('http://localhost:5000/api/users', {
              name,
              address,
              role,
            });
            console.log(response.data.message);
            // Optionally redirect or show a success message
          } catch (error) {
            console.error('Error saving user:', error);
          }
        }
      };
  
      saveUser();
    }, [name, address, role]);
  
    return (
      <div>
        <h2>User Information</h2>
        <p>Name: {name}</p>
        <p>Address: {address}</p>
        <p>Role: {role}</p>
      </div>
    );
  };
  
  export default UserForm;