import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import Button from "../components/common/Button";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { TiEdit } from "react-icons/ti";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { setPodcasts } from "../slices/podcastSlice";
import PodcastCard from "../components/Podcasts/PodcastCard";
import Header from "../components/common/Header";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [userDetails, setUserDetails] = useState({});
  const [profileDetails, setProfileDetails] = useState({});
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicSrc, setProfilePicSrc] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [myPodcasts, setMyPodcasts] = useState("");
  const nameRef = useRef(null);

  useEffect(() => {
    const getDetails = async () => {
      const details = await getDoc(doc(db, "users", user.uid));
      if (details.exists()) {
        const data = details.data();
        setUserDetails(data);
        setProfileDetails(data);
      }

      onSnapshot(
        query(collection(db, "podcasts"), where("createdBy", "==", user.uid)),
        (querySnapshot) => {
          const podcastsData = [];
          querySnapshot.forEach((doc) => {
            podcastsData.push({ id: doc.id, ...doc.data() });
          });
          dispatch(setPodcasts(podcastsData));
          setMyPodcasts(podcastsData);
        },
        (error) => {
          console.error("Error fetching podcasts:", error);
        }
      );
    };
    user?.uid && getDetails();
  }, [dispatch, user]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        toast.success("User Logged Out!");
      })
      .catch((error) => {
        // An error happened.
        toast.error(error.message);
      });
  };

  const handleChange = (e) => {
    setProfileDetails({ ...profileDetails, [e.target.name]: e.target.value });
  };

  const handleEdit = async () => {
    if (!isEdit) {
      nameRef?.current.focus();
    } else {
      setLoading(true);
      let newProfileImageUrl = null;
      if (profilePic !== null) {
        const profileImageRef = ref(
          storage,
          `users/${profileDetails.email}/${Date.now()}`
        );
        await uploadBytes(profileImageRef, profilePic);
        newProfileImageUrl = await getDownloadURL(profileImageRef);
      }
      await setDoc(doc(db, "users", user.uid), {
        name: profileDetails.name,
        email: profileDetails.email,
        uid: user.uid,
        profileImage: newProfileImageUrl ?? profileDetails.profileImage,
      });
      setLoading(false);
      toast.success("Profile updated successfully");
    }
    setIsEdit(!isEdit);
  };

  const handleProfilePicChange = (e) => {
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        setProfilePicSrc(reader.result);
      },
      false
    );
    reader.readAsDataURL(e.target.files[0]);
    setProfilePic(e.target.files[0]);
  };

  return (
    <>
    <Header />
      <div
        style={{
          padding: "50px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "-40px",
          }}
        >
          <div
            style={{
              position: "relative",
            }}
          >
            <img
              style={{
                objectFit: "cover",
                borderRadius: "15%",
                height: "150px",
                width: "150px",
              }}
              src={profilePicSrc ?? userDetails?.profileImage}
              alt={user?.name}
            />
            {isEdit ? (
              <>
                <label
                  htmlFor="profilePic"
                  style={{ position: "absolute", fontSize: "1.5rem" }}
                >
                  <TiEdit />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="profilePic"
                  style={{ display: "none" }}
                  onChange={handleProfilePicChange}
                />
              </>
            ) : (
              false
            )}
          </div>

          <div style={{}}>
            <div>
              <p>
                Name:{" "}
                <input
                  type="text"
                  value={profileDetails.name}
                  ref={nameRef}
                  onChange={handleChange}
                  name="name"
                  className="readable-input"
                  style={{ borderBottom: isEdit ? "1px solid #fff" : "none" }}
                />
              </p>
            </div>
            <div>
              <p>
                Email:{" "}
                <input
                  type="email"
                  value={profileDetails.email}
                  onChange={handleChange}
                  name="email"
                  disabled
                  className="readable-input"
                />
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              text={
                loading
                  ? "Updating..."
                  : isEdit
                  ? "Update Profile"
                  : "Edit Profile"
              }
              onClick={handleEdit}
              className="profile-btn"
              disabled={loading}
            />
            <Button
              text={"Logout"}
              onClick={handleLogout}
              className="profile-btn"
            />
          </div>
        </div>

        {myPodcasts.length > 0 && (
          <>
            <div style={{ marginTop: "40px" }}>
              <h2 style={{ width: "100%", margin: "auto" }}>
                {profileDetails.name}'s Podcasts
              </h2>
            </div>
            <div
              className="podcasts-flex-profile"
              style={{ marginTop: "1.5rem" }}
            >
              {myPodcasts.map((data, i) => {
                return (
                  <PodcastCard
                    key={i}
                    title={data.title}
                    id={data.id}
                    displayImage={data.displayImage}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;