"use client";

import { useCurrentUser } from "@/app/lib/queries/useCurrentUser";

const Profile = () => {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !user) return <div>Error loading user</div>;

  return (
    <div>
      <h2>{user.data.name}</h2>
      <p>{user.data.email}</p>
      <p>{user.data.createdAt}</p>
    </div>
  );
};

export default Profile;
