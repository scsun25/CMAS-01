import { Button } from "primereact/button";
import { Sidebar } from "primereact/sidebar";
import { useState } from "react";
import { useAuth } from "../../context/authProvider";
import { buttonLogInList, buttonSignInList } from "./layoutSideBarConfig";
import { Avatar } from "primereact/avatar";
import { useNavigate } from "react-router-dom";

const LayoutSideBar = () => {
  // Hook
  const { user } = useAuth();
  const navigate = useNavigate();

  // State
  const [visible, setVisible] = useState(false);

  let buttonList = user
    ? buttonSignInList(navigate)
    : buttonLogInList(navigate);

  return user ? (
    <>
      <Avatar
        className="mr-4 mt-1"
        onClick={() => setVisible(true)}
        image={user?.user_metadata.avatar_url}
        shape="circle"
      />
      <Sidebar
        header={
          <>
            <Avatar
              onClick={() => setVisible(true)}
              image={user?.user_metadata.avatar_url}
              shape="circle"
            />
            <p>{`Welcome ${user?.user_metadata.name}`}</p>
          </>
        }
        visible={visible}
        position="right"
        onHide={() => setVisible(false)}
      >
        <div className="py-2">
          {buttonList.map(
            (btn: { icon: string; label: string; onClick: () => void }) => (
              <Button
                key={btn.label}
                icon={btn.icon}
                text
                severity="secondary"
                label={btn.label}
                className="w-full"
                onClick={() => {
                  setVisible(false);
                  btn.onClick();
                }}
              />
            )
          )}
        </div>
      </Sidebar>
    </>
  ) : (
    <></>
  );
};

export default LayoutSideBar;
