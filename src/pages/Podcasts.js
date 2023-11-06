import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import PodcastCard from "../components/Podcasts/PodcastCard";
import InputComponent from "../components/common/Input/index";

function PodcastsPage() {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const poscastsData = [];
        querySnapshot.forEach((doc) => {
          poscastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(poscastsData));
      },
      (error) => {
        console.log("errer fetching podcasts", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  let filteredPodcasts = podcasts.filter((item) =>
    item.title.trim().toLowerCase().includes(search.toLowerCase())
  );
 
  const deletePodcastFromFirestore = async (podcastId) => {
    try {
      const podcastDocRef = doc(db, "podcasts", podcastId);
      await deleteDoc(podcastDocRef);
      console.log("Podcast deleted successfully");
      // Optionally, you can update your Redux state or local state to reflect the deletion
    } catch (error) {
      console.error("Error deleting podcast:", error);
      // Handle the error as needed
    }
  };


  const handleDeletePodcast = async (podcastId) => {
    try {
      // Implement the deletePodcastFromFirestore function here
      await deletePodcastFromFirestore(podcastId);
    } catch (error) {
      console.error("Error deleting podcast:", error);
      // Handle the error as needed
    }
  };
  

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>My Podcasts</h1>
        <InputComponent
          state={search}
          setState={setSearch}
          placeholder="Search By Title..."
          type="text"
        />
        {filteredPodcasts.length > 0 ? (
          <div className="podcasts-flex" style={{ marginTop: "2rem" }}>
            {filteredPodcasts.map((item, index) => {
              return (
                <PodcastCard
                  key={index}
                  id={item.id}
                  title={item.title}
                  displayImage={item.displayImage}
                  onDelete={handleDeletePodcast}
                />
              );
            })}
          </div>
        ) : (
          <p>{search ? "Podcast Not Found" : "NO Podcasts"}</p>
        )}
      </div>
    </div>
  );
}

export default PodcastsPage;
