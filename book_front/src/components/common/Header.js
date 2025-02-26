import { Link } from "react-router-dom";
import "./default.css";

import { useState } from "react";
const Header = () => {
  return (
    <header className="header">
      <div>
        <div className="logo">
          <Link to="/">Book</Link>
        </div>
        <MainNavi />
        <HeaderLink />
      </div>
    </header>
  );
};

const MainNavi = () => {
  return (
    <nav className="nav">
      <ul>
        <Link to="/">도서 현황</Link>
      </ul>
    </nav>
  );
};

const HeaderLink = () => {
  const [loginId, setLoginId] = useState("테스트");
  const [memberType, setMemberType] = useState(1);
  const [isLogin, setIsLogin] = useState(true);

  const logout = () => {
    setLoginId("");
    setMemberType(0);
    setIsLogin(false);
  };

  return (
    <ul className="user-menu">
      {isLogin ? ( // ? true : false
        <>
          <li>
            <Link to="/">{loginId}</Link>
          </li>
          <li>
            <Link to="#" onClick={logout}>
              로그아웃
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/join">회원가입</Link>
          </li>
        </>
      )}
    </ul>
  );
};
export default Header;
