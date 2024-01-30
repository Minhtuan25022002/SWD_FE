import SportSlide from "../../page/MemberPage/Section/Sport";
import image from '../../assets/LogoHeaderMember/logo.jpg'

import image1 from '../../assets/Sport/badminton.jpg'
import image2 from '../../assets/Sport/football.jpg'
import image3 from '../../assets/Sport/ball.jpg'

function HomeContent() {
    return ( 
        <div>
            <div className='home-header-banner'>
                    <div className='content-up'>
                        <img src={image} />
                    </div>
                    <div className='content-down'>
                        <div className="content-1"><b>What is this website used for?</b></div>
                        <div className="content-2">Hiện nay, tại các tòa chung cư Vinhome có các sân thể thao như cầu lông, bóng rổ, bóng đá.Khi mọi người muốn dùng các sân này cần phải đặt trước để giữ chỗ.Nhưng vì người sử dụng đông nên đôi lúc việc đặt sân rất khó khăn.</div>
                        <div className="content-2">Bên cạnh đó, một số người ở tại Vinhome đặt được sân nhưng lại thiếu người chơi.Do đó chúng tôi đã phát triển một app  các câu lạc bộ thể thao , mỗi môn thể thao sẽ tương ứng với một câu lạc bộ. </div>
                        <div className="content-2">Với nền tảng này những người đặt được sân có thể vào mời gọi mọi người tham gia chơi cùng......</div>
                    </div>
                </div>
                <SportSlide />
    
                <div className="img-club">
                    <h2 className="join-title">Join with us?</h2>
                    <div className="content-middle">
                        <img src={image1} />
                        <img src={image2} />
                        <img src={image3} />
                    </div>
                </div>
        </div>
    );
}

export default HomeContent;