import { getAuth, deleteUser } from "firebase/auth";
import TopNav from "./TopNav";

function AccountDetail() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const handleDeleteAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      try {
        await deleteUser(user);
        console.log("계정이 성공적으로 삭제되었습니다.");
        // 추가 작업 수행
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
        <button style={{}} onClick={handleDeleteAccount}>
          계정 탈퇴
        </button>
      </div>
    </div>
  );
}

export default AccountDetail;
