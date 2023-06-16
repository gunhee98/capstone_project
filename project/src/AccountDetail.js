import { getAuth, deleteUser } from "firebase/auth";
import TopNav from "./TopNav";
import { useNavigate } from "react-router-dom";

function AccountDetail() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const navigate = useNavigate();
  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      try {
        await deleteUser(user);
        alert("계정이 성공적으로 삭제되었습니다.");
        navigate('/')
      } catch (error) {
        console.log("계정 삭제 오류:", error);
      }
    } else {
      console.log("사용자가 로그인되어 있지 않습니다.");
    }
  };

  return (
    <div>
      <TopNav></TopNav>
      <div style={containerStyle}>
        {" "}
        <button onClick={handleDeleteAccount}>
          계정 탈퇴
        </button>
      </div>
    </div>
  );
}

export default AccountDetail;
