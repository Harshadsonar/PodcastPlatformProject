// import React, { useEffect, useState } from "react";
// import Header from "../components/common/Header";
// import { useDispatch, useSelector } from "react-redux";
// import { collection, onSnapshot, query, doc, deleteDoc } from "firebase/firestore";
// import { db } from "../firebase";
// import { setPodcasts } from "../slices/podcastSlice";
// import PodcastCard from "../components/Podcasts/PodcastCard";
// import InputComponent from "../components/common/Input/index";
// import GenreButton from "../components/common/GenreButton";

// function PodcastsPage() {
//   const dispatch = useDispatch();
//   const podcasts = useSelector((state) => state.podcasts.podcasts);
//   const [search, setSearch] = useState("");
//   const [genre, setGenre] = useState("All");

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       query(collection(db, "podcasts")),
//       (querySnapshot) => {
//         const poscastsData = [];
//         querySnapshot.forEach((doc) => {
//           poscastsData.push({ id: doc.id, ...doc.data() });
//         });
//         dispatch(setPodcasts(poscastsData));
//       },
//       (error) => {
//         console.log("errer fetching podcasts", error);
//       }
//     );
//     return () => {
//       unsubscribe();
//     };
//   }, [dispatch]);

  

//   let filteredPodcasts = podcasts.filter((item) =>
//   {
//     if(genre==="All"){
//       return item.title.trim().toLowerCase().includes(search.toLowerCase())
//     }
//     else {
//       return item.title.trim().toLowerCase().includes(search.toLowerCase()) && item.genre === genre
//     }
//   }
//   );

//   const handleGenreFilter = (genre) => {
//     setGenre(genre);
//   }
 
  // const deletePodcastFromFirestore = async (podcastId) => {
  //   try {
  //     const podcastDocRef = doc(db, "podcasts", podcastId);
  //     await deleteDoc(podcastDocRef);
  //     console.log("Podcast deleted successfully");
  //     // Optionally, you can update your Redux state or local state to reflect the deletion
  //   } catch (error) {
  //     console.error("Error deleting podcast:", error);
  //     // Handle the error as needed
  //   }
  // };


  // const handleDeletePodcast = async (podcastId) => {
  //   try {
  //     // Implement the deletePodcastFromFirestore function here
  //     await deletePodcastFromFirestore(podcastId);
  //   } catch (error) {
  //     console.error("Error deleting podcast:", error);
  //     // Handle the error as needed
  //   }
  // };
  

//   return (
//     <div>
//       <Header />
//       <div className="input-wrapper">
//         <h1>My Podcasts</h1>
//         <InputComponent
//           state={search}
//           setState={setSearch}
//           placeholder="Search By Title..."
//           type="text"
//         />

//         <div className="genre-btn-wrapper">
//           <GenreButton
//           text={"All"}
//           genre={genre}
//           onclick={() => setGenre("All")}
//           />
         
//           <GenreButton
//           text={"Entertainment"}
//           genre={genre}
//           onclick={() => setGenre("Entertainment")}
//           />
         
//           <GenreButton
//           text={"Philosophy"}
//           genre={genre}
//           onclick={() => setGenre("Philosophy")}
//           />
          
//           <GenreButton
//           text={"Literature"}
//           genre={genre}
//           onclick={() => setGenre("Literature")}
//           />
          
//           <GenreButton
//           text={"History"}
//           genre={genre}
//           onclick={() => setGenre("History")}
//           />
          
//           <GenreButton
//           text={"Arts"}
//           genre={genre}
//           onclick={() => setGenre("Arts")}
//           />
          
//           <GenreButton
//           text={"Career"}
//           genre={genre}
//           onclick={() => setGenre("Career")}
//           />
          
//           <GenreButton
//           text={"Sports"}
//           genre={genre}
//           onclick={() => setGenre("Sports")}
//           />
//         </div>

//         {filteredPodcasts.length > 0 ? (
//           <div className="podcasts-flex" style={{ marginTop: "2rem" }}>
//             {filteredPodcasts.map((item, index) => {
//               return (
//                 <PodcastCard
//                   key={index}
//                   id={item.id}
//                   title={item.title}
//                   displayImage={item.displayImage}
//                   onDelete={handleDeletePodcast}
//                 />
//               );
//             })}
//           </div>
//         ) : (
//           <p>{search ? "Podcast Not Found" : "NO Podcasts"}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PodcastsPage;


import { collection, onSnapshot, query, doc, deleteDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import PodcastCard from "../components/Podcasts/PodcastCard/index";
import Input from "../components/common/Input/index";
import GenreButton from "../components/common/GenreButton/index";
import Header from "../components/common/Header/index";

const CreatePodCastForm = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  // We care fetching all podcast from firebase..
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data()});
        });
        // setCurrentPodcast(podcastsData);
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.log("Error fetching podcasts:", error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  // search input filter logic..
  let filteredPodcasts = podcasts.filter((item) =>
  {
    if(genre==="All"){
      return item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
    }
    else{
    return item.title.trim().toLowerCase().includes(search.trim().toLowerCase()) && item.genre===genre
    }
  }
  );


  const handleGenreFilter = (genre) => {
    setGenre(genre);
  };

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
    <>
    <Header />
      <div className="CreatePodCastForm">
        <h1>Discover Podcasts</h1>
        <Input
          state={search}
          setState={setSearch}
          placeholder="Search By Title"
          type="text"
        />
        <div className="genre-btn-wrapper">
          <GenreButton
            text={"All"}
            genre={genre}
            onClick={() => setGenre("All")}
          />
          <GenreButton
            text={"Entertainment"}
            genre={genre}
            onClick={() => setGenre("Entertainment")}
          />
          <GenreButton
            text={"Philosophy"}
            genre={genre}
            onClick={() => setGenre("Philosophy")}
          />
          <GenreButton
            text={"Literature"}
            genre={genre}
            onClick={() => setGenre("Literature")}
          />
          <GenreButton
            text={"History"}
            genre={genre}
            onClick={() => setGenre("History")}
          />
          <GenreButton
            text={"Arts"}
            genre={genre}
            onClick={() => setGenre("Arts")}
          />
          <GenreButton
            text={"Career"}
            genre={genre}
            onClick={() => setGenre("Career")}
          />
          <GenreButton
            text={"Sports"}
            genre={genre}
            onClick={() => setGenre("Sports")}
          />
        </div>
        {filteredPodcasts.length > 0 ? (
          <div className="podcasts-flex">
            {filteredPodcasts.map((item) => {
              return (
                <PodcastCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  displayImage={item.displayImage}
                  onDelete={handleDeletePodcast}
                />
              );
            })}
          </div>
        ) : (
          <p>{search ? "No Podcast Found" : "No Podcast On The Platform"}</p>
        )}
      </div>
    </>
  );
};

export default CreatePodCastForm;
