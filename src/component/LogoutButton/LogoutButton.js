import logout from "../../utils/logout"; 

function logoutButton() {
  return (
    <nav>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default logoutButton;
