import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query } from "firebase/firestore";
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

  var filteredPodcasts = podcasts.filter((item) =>
    item.title.trim().toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>POdcasts</h1>
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
