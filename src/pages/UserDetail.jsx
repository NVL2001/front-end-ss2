import { useState } from "react";
import "./user.css";

const UserProfile = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [phone, setPhone] = useState("555-555-5555");
  const [address, setAddress] = useState("123 Main St.");
  const [shoppingHistory, setShoppingHistory] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  return (
    <div className="user-profile">
      <h2>My Information</h2>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>Address: {address}</p>
      <h3>Shopping History</h3>
      {shoppingHistory.length > 0 ? (
        <ul>
          {shoppingHistory.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No shopping history available.</p>
      )}
      <h3>Vouchers</h3>
      {vouchers.length > 0 ? (
        <ul>
          {vouchers.map((voucher) => (
            <li key={voucher.id}>
              {voucher.code} - {voucher.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No vouchers available.</p>
      )}
    </div>
  );
};

export default UserProfile;
