import React, { useEffect } from "react";
import "./user.css";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function UserProfile() {
  // const [name, setName] = useState('John Doe');
  // const [email, setEmail] = useState('johndoe@example.com');
  // const [phone, setPhone] = useState('555-555-5555');
  // const [address, setAddress] = useState('123 Main St.');
  // const [shoppingHistory, setShoppingHistory] = useState([]);
  // const [vouchers, setVouchers] = useState([]);
  const history = useHistory();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user]);

  if (!user) {
    return <div />;
  }

  return (
    <div className="user-profile">
      <h2>My Information</h2>
      <p>
        Name:
        {user.name}
      </p>
      <p>
        Email:
        {user.email}
      </p>
      <p>
        Phone:
        {user.phone}
      </p>
      <p>
        Address:
        {user.address}
      </p>
      <h3>Shopping History</h3>
      {user.shoppingHistory.length > 0 ? (
        <ul>
          {user.shoppingHistory.map((item) => (
            <li key={item.id}>
              {item.name} -{item.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No shopping history available.</p>
      )}
      <h3>Vouchers</h3>
      {user.vouchers.length > 0 ? (
        <ul>
          {user.vouchers.map((voucher) => (
            <li key={voucher.id}>
              {voucher.code} -{voucher.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No vouchers available.</p>
      )}
    </div>
  );
}

export default UserProfile;
