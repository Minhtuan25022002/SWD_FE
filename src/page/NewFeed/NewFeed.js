import React, { useEffect, useState } from "react";
import "./NewFeed.scss";

import {
  createPostInSlot,
  UserJointSlot,
  getNumberOfSlot,
  getSlotNotJoined,
  getWalletByMemberId
} from "../../services/userService";
import { useParams } from "react-router-dom";
import ModalCreatePost from "../../component/modal/ModalCreatePost";
import { showErrorToast, showSuccessToast } from "../../component/toast/toast";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CountdownTimer from "../../component/countDownTime";
import ComponentHeader from "../../component/Header/ComponentHeader";

function NewFeed({  tranPoint, yards, setActiveTab, clubDetail }) {
  const { id } = useParams();
  const { idclubmem } = useParams();
  
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numberOfSlot, setNumberOfSlot] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [slotNotJoined, setSlotNotJoined] = useState([]);
  async function fetchData() {
    try {
      const [slotNotJoinedRes] = await Promise.all([
        getSlotNotJoined(idclubmem, id),
      ]);

      const slotNotJoinFilter = slotNotJoinedRes.result.filter((item) => {
        return (
          item.memberPostId != idclubmem &&
          !isPassTime(item.date, item.startTime)
        );
      });

      setSlotNotJoined(slotNotJoinFilter);

      const promises = slotNotJoinedRes.result.map(async (item) => {
        const response = await getNumberOfSlot(item.id);
        return { itemId: item.id, numberOfSlot: response.result };
      });

      const results = await Promise.all(promises);
      const numberOfSlotMap = {};
      results.forEach((result) => {
        numberOfSlotMap[result.itemId] = result.numberOfSlot;
      });
      setNumberOfSlot(numberOfSlotMap);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCreatePost = async (postData) => {
    postData.memberPostName = userInfo.name;
    postData.clubId = id;
    postData.memberPostId = idclubmem;
    try {
      console.log(postData);
      await createPostInSlot(postData);
      showSuccessToast("Tạo bài đăng thành công");
      setIsModalOpen(false);
      setIsLoading(true);
      fetchData();
    } catch (error) {
      console.log(error);
      showErrorToast("Tạo bài đăng thất bại");
      console.error("Error creating post:", error);
    }
  };

  async function handleJoinSlot(slotId) {
    try {
      const walletRes = await getWalletByMemberId(userInfo.id);
      await UserJointSlot({
        tranPoint: tranPoint,
        inforWallet: walletRes?.result,
        newClubMemSlot: {
          clubMemberId: idclubmem,
          slotId: slotId,
          transactionPoint: tranPoint.point,
        },
      });

      setActiveTab("myJoinPost");
      showSuccessToast("Bạn đã đăng kí tham gia hoạt động thành công!");
    } catch (error) {
      showErrorToast("Tham gia thất bại");
      console.error("Error joining slot:", error);
    }
  }

  function isPassTime(date, hour) {
    const time = date + "T" + hour + ":00";
    const targetTime = new Date(time).getTime();
    const currentTime = new Date().getTime();

    if (targetTime < currentTime) {
      return true;
    } else {
      false;
    }
  }

  const date = new Date(clubDetail.dateTime);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const timePost = ` ${day}-${month}-${year}`;

  return (
    <>
      <ComponentHeader />
      <div className="new-feed-container">
        <div className="post-container">
          <img alt="avatar" src={userInfo.image} />
          <button className="write-btn" onClick={toggleModal}>
            <span className="btn-post-title">
              {userInfo.name} ơi! Hãy rủ thêm đồng đội chơi thể thao cùng nhé!
            </span>
          </button>
        </div>

        <h5 style={{ fontSize: '28px' }}>Bài viết mới nhất</h5>

        {isLoading && (
          <FontAwesomeIcon icon={faSpinner} className="loading-icon" />
        )}

        {slotNotJoined.map((item, index) => {
          const time = item.date + "T" + item.startTime + ":00";

          const date = new Date(item.dateTime);

          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const hours = date.getHours();
          const minutes = date.getMinutes();
          const timePost = ` ${hours}:${minutes} ${day}-${month}-${year}`;

          const remainingSlots =
            parseInt(item.requiredMember) -
            parseInt(numberOfSlot[item.id] || 0);
          const isFull = remainingSlots <= 0;

          const yardDetails = yards.find((yard) => {
            return yard.id === item.yardId;
          });

          return (
            <div key={item.id} className="main-post-container">
              <div className="poster-name">
                <div>
                  <p
                    style={{
                      fontSize: "31px",
                    }}
                  >
                    {item.memberPostName}
                  </p>
                  <div style={{ fontSize: "18px" }}>{timePost}</div>
                </div>
                <div>
                  <CountdownTimer targetTime={time} />
                </div>
              </div>
              <div className="caption">{item.description}</div>
              <div className="post-content-container">
                <img className="post-img" src={item.image} alt="avatar" />
                <div className="post-infor">
                  <h3>Thông tin trận đấu</h3>
                  <div>
                    <div className="item-infor">

                      Khu: <span>{yardDetails?.areaName}</span>{" "}

                    </div>
                    <div className="item-infor">

                      Sân:{" "}
                      <span>
                        {yardDetails?.sportName} - {item.yardName}
                      </span>

                    </div>
                    <div className="item-infor">

                      Thời gian:{" "}
                      <span>
                        {item.startTime} - {item.endTime}
                      </span>

                    </div>
                    <div className="item-infor">

                      Ngày: <span>{item.date}</span>

                    </div>
                    <div className="item-infor">

                      Tổng số người chơi:{" "}
                      <span>
                        {parseInt(item.requiredMember) +
                          parseInt(item.currentMember)}
                      </span>

                    </div>
                    <div className="item-infor">

                      Còn thiếu:{" "}
                      <span>
                        {parseInt(item.requiredMember) -
                          parseInt(numberOfSlot[item.id] || 0)}
                      </span>{" "}
                      người
                    </div>
                  </div>
                  {isFull ? (
                    <button
                      className="btn-join"
                      disabled
                      style={{ backgroundColor: "gray" }}
                    >
                      Đã đủ người
                    </button>
                  ) : (
                    <button
                      className="btn-join"
                      onClick={() => {
                        handleJoinSlot(item.id);
                      }}
                    >
                      Tham gia
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <ModalCreatePost
          clubDetail={clubDetail}
          isOpen={isModalOpen}
          toggle={toggleModal}
          createPost={handleCreatePost}
          setActiveTab={setActiveTab}
        />
      </div>
    </>
  );
}

export default NewFeed;
