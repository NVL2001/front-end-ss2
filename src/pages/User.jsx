import React from 'react';
import UserProfile from './UserDetail';
import { PublicLayout } from "../layout/PublicLayout";

function User() {
  return (
    <PublicLayout>
      <UserProfile />
    </PublicLayout>
  );
}

export default User;
