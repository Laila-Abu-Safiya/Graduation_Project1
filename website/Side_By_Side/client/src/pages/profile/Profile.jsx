// import { useContext } from 'react';
// import { useLocation } from 'react-router-dom';
// import './profile.css';
// import Feed from '../../components/feed/Feed';
// import Rightbar from "../../components/rightbar/Rightbar";
// import Sidebar from '../../components/sidebar/Sidebar';
// import Topbar from '../../components/topbar/Topbar';
// import { AuthContext } from '../../components/context/authContext';
// import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
// import { makeRequest } from '../../axios';
// import sbs from '../.././sbs.png';

// export default function Profile() {
//   const { currentUser } = useContext(AuthContext);
//   console.log(currentUser.Location);
//   const queryClient = new QueryClient();



//   return (
//     <>
//       <QueryClientProvider client={queryClient}>
//         <Topbar />
//         <div className="profile">
//           <Sidebar />
//           <div className="profileRight">
//             <div className="profileRightTop">
//               <div className="profileCover">

//                 <img src={"/upload/" +currentUser.Photo} alt="" className="profileCoverImg" />
//                 <img src={"/upload/" +currentUser.Photo} alt="" className="profileUserImg" />
//               </div>
//               <div className="profileInfo">
//                 <h4 className="profileInfoName">{currentUser.Name}</h4>
//                 <span className="profileInfoDesc">An employee of the ICRC</span>
//               </div>
//             </div>
//             <div className="profileRightBottom">
//               <Feed />
//               <Rightbar profile />
//             </div>
//           </div>
//         </div>
//       </QueryClientProvider>
//     </>
//   );
// }

import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import './profile.css';
import Feedprofile from '../../components/feed/Feedprofile';
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { AuthContext } from '../../components/context/authContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from '../../axios';
import sbs from '../.././sbs.png';
import Updateadmin from '../../components/updateadmin/Updateadmin';

export default function Profile() {
  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();

  const [openUpdate, setOpenUpdate] = useState(false);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Topbar />
        <div className="profile">
          <Sidebar />
          <div className="profileRight">
            <div className="profileRightTop">
              <div className="profileCover">
                <img src={"/upload/" + currentUser.CoverPage} alt="" className="profileCoverImg" />
                <img src={"/upload/" + currentUser.Photo} alt="" className="profileUserImg" />
              </div>
              <div className="profileInfo">
                <h4 className="profileInfoName">{currentUser.Name}</h4>
                <span className="profileInfoDesc">An employee of the ICRC</span>
                <button onClick={() => setOpenUpdate(true)} className='shareButton'>Update</button>
              </div>
            </div>
            <div className="profileRightBottom">
              <Feedprofile userId={currentUser.ID} />
              <Rightbar profile />
            </div>
          </div>
          {openUpdate && <Updateadmin setOpenUpdate={setOpenUpdate} user={currentUser} />}
        </div>
      </QueryClientProvider>
    </>
  );
}
