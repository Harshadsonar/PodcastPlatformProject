import React from 'react';
import Header from '../components/common/Header'
import CreatePodCastForm from '../components/StartAPodcast/CreatePodCastForm';


function CreateAPodcastPage() {

  return (
    <div>
        <Header/>
        <div className='input-wrapper'>
            <CreatePodCastForm/>
        </div>
    </div>
  )
}

export default CreateAPodcastPage;