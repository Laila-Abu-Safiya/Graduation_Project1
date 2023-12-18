import "./rightbar.css"

import Calendar from '../calendar/Calendar'
export default function Rightbar({profile}){
  const PF =process.env.REACT_APP_PUBLIC_FOLDER;


  const HomeRightbar = () => {
    return(<>
    
            <Calendar className="rightbarAd"/>
     
    </>)
  };

  const ProfileRightbar =() =>{
    return(<>
    <h4 className="rightbarTitle">User Information</h4>
    <div className="rightbarInfo">
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">City:</span>
        <span className="rightbarInfoValue">Nablus</span>

      </div>

      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">From:</span>
        <span className="rightbarInfoValue">Palusten</span>

      </div>

      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">Relationship:</span>
        <span className="rightbarInfoValue">Single</span>

      </div>

    </div>
    <Calendar className="rightbarAd"/>


    </>)
  }

    return(
        <div className="rightbar">
          <div className="rightbarWrapper">
           {profile ? <ProfileRightbar/> : <HomeRightbar/>}
          </div>
        </div>
    )
} 