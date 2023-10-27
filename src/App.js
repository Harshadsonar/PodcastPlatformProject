import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUpPage from "./pages/SignUpPage";
import Profile from "./pages/Profile";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "./slices/userSlice";
import { useDispatch } from "react-redux";
import PrivateRoutes from "./components/common/PrivateRoutes";
import CreateAPodcastPage from "./pages/CreateAPodcast";
import PodcastsPage from "./pages/Podcasts";
import PodcastDetailsPage from "./pages/PodcastDetails";
import CreateAnEpisodePge from "./pages/CreateAnEpisode";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const unsubscribeSnaphsort = onSnapshot(
          doc(db, "users", user.uid),
          (userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              dispatch(
                setUser({
                  name: userData.name,
                  email: userData.email,
                  uid: user.uid,
                  profilePic: userData.profilePic,
                })
              );
            }
          },
          (error) => {
            console.log("Error Fetching Data");
          }
        );
        return () => {
          unsubscribeSnaphsort();
        };
      }
    });

    return () => {
      unsubscribeAuth();
    };
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-a-podcast" element={<CreateAPodcastPage />} />
            <Route path="/podcasts" element={<PodcastsPage />} />
            <Route path="/podcast/:id" element={<PodcastDetailsPage />} />
            <Route
              path="/podcast/:id/create-episode"
              element={<CreateAnEpisodePge />}
            />
          </Route>

          {/* <Route path='/podcasts' element={<Podcasts/>}/>
          <Route path='/create-podcast' element={<CreatePodcast/>}/>
          <Route path='/podcast/:podcastId' element={<PodcastDetails/>}/>
          <Route path='/podcast/:podcastId/create-episode' element={<CreateEpisode/>}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
