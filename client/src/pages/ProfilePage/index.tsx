import { FC } from "react";
import "./ProfilePage.scss";
import Blog from "../../components/Blog";

interface UserProps {
  user: { name: string; email: string; id: number };
}

const ProfilePage: FC<UserProps> = ({ user }) => {
  return (
    <div>
      <Blog user={user} />
    </div>
  );
};

export default ProfilePage;
