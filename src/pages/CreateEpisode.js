import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputComponent from "../components/common/Input";
import FileInput from "../components/common/Input/FileInput";
import Button from "../components/common/Button";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import Header from "../components/common/Header";

function CreateAnEpisodePge() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const audioFileHandle = (file) => {
    setAudioFile(file);
  };
  const handleSubmit = async () => {
    if ((title, desc, audioFile, id)) {
      try {
        const audioRef = ref(
          storage,
          `podcast-episode/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef, audioFile);
        const audioURL = await getDownloadURL(audioRef);
        const episodeData = {
          title: title,
          description: desc,
          audioFile: audioURL,
        };

        await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);
        toast.success("Episode Created Succesfully");
        navigate(`/podcast/${id}`);
        setAudioFile("");
        setTitle("");
        setDesc("");
        setIsSubmitted(true);
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("All Files Should Be Uploaded");
      setLoading(false);
    }
  };
  return (
    <>
      <Header />
      <div className="common">
      <div className="input-wrapper">
        <h1>Create An Episode</h1>
        <InputComponent
          state={title}
          setState={setTitle}
          placeholder="Episode Title"
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
        <FileInput
          accept={"audio/*"}
          id="audio-file-input"
          fileHandleFnc={audioFileHandle}
          text={"Audio File Upload"}
          isSubmitted = {isSubmitted}
        />
        <Button
          text={loading ? "Loading..." : "Create Episode"}
          disabled={loading}
          onClick={handleSubmit}
        />
      </div>
    </div>
    </>
  );
}

export default CreateAnEpisodePge;
