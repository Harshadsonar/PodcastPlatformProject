import React, { useState } from "react";
import InputComponent from "../common/Input";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { toast } from "react-toastify";
import FileInput from "../common/Input/FileInput";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import GenreDropdown from "../common/GenreDropdownBar";

function CreatePodCastForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (title && desc && displayImage && bannerImage) {
      setLoading(true);
      try {
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);
        const bannerImageUrl = await getDownloadURL(bannerImageRef);

        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);
        const disaplayImageUrl = await getDownloadURL(displayImageRef);

        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: disaplayImageUrl,
          createdBy: auth.currentUser.uid,
        };

        const docRef = await addDoc(collection(db, "podcasts"), podcastData);
        toast.success("Created A PodCast");
        
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        console.log(e);
        setLoading(false);
      }
      // toast.success("File Uploaded");
    } else {
      toast.error("Please Fill All Values");
      setLoading(false);
    }
  };

  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };

  const bannerImageHandle = (file) => {
    setBannerImage(file);
  };
  return (
    <>
    <h1>Create A PodCast</h1>
      <InputComponent
        state={title}
        setState={setTitle}
        placeholder="Title"
        type="text"
        required={true}
      />
      <InputComponent
        state={desc}
        setState={setDesc}
        placeholder="Description"
        type="text"
        required={true}
      />
      <GenreDropdown 
      genre={genre} setGenre={setGenre}
      />
      <FileInput
        accept={"imaege/*"}
        id="display-image-input"
        fileHandleFnc={displayImageHandle}
        text={"Display Image Upload"}
      />
      <FileInput
        accept={"image/*"}
        id="banner-image-input"
        fileHandleFnc={bannerImageHandle}
        text={"Banner Image Upload"}
      />
      
      <Button
        text={loading ? "Loading..." : "Create Podcast"}
        disabled={loading}
        onClick={() => {
          handleSubmit();
          navigate(`/podcasts`);
        }}
      />
    </>
  );
}

export default CreatePodCastForm;


