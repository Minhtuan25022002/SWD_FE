import React, { useRef, useState } from "react";
import "../StaffPage/StaffPage.scss";
import { handleLogoutStaff } from "../../services/staffService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCircleNodes,
  faMedal,
  faGroupArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";
import MyClub from "./MyClub/MyClub";
import SportsManageStaff from "./Sports/SportsManage";

function StaffPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("my-club");

  const handleLogout = async () => {
    try {
      await handleLogoutStaff();
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="staff-container">
      <div className="side-bar-staff">
        <h2><FontAwesomeIcon icon={faGroupArrowsRotate} />Trang quản lí của Staff</h2>

      </div>
      <div className="content-container">
        <div className="header-staff">
          <div className="col-6 header-logo" style={{ width: '12%' }}></div>

          <div className="header-title-staff">

            <div
              className={`child-content-staff ${activeTab === "my-club" ? "active" : ""
                }`}
              onClick={() => handleTabClick("my-club")}
            >
              <div>
                <b><FontAwesomeIcon icon={faCircleNodes} />Câu lạc bộ</b>
              </div>
            </div>
            <div
              className={`child-content-staff ${activeTab === "sports" ? "active" : ""
                }`}
              onClick={() => handleTabClick("sports")}
            >
              <div>
                <b><FontAwesomeIcon icon={faMedal} />Môn thể thao</b>
              </div>


            </div>
          </div>
          <button onClick={handleLogout} className="btn-logout-staff">
            Đăng xuất{" "}
            <FontAwesomeIcon
              className="logout-icon"
              icon={faArrowRightFromBracket}
            />
          </button>
        </div>

        {activeTab === "my-club" && <MyClub />}
        {activeTab === "sports" && <SportsManageStaff />}
      </div>
    </div>
  );
}

export default StaffPage;
