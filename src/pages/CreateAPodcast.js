import React, { useState } from 'react'
import Header from '../components/common/Header'
import CreatePodCastForm from '../components/StartAPodcast/CreatePodCastForm';


function CreateAPodcastPage() {

  return (
    <div>
        <Header/>
        <div className='input-wrapper'>
            <h1>Create A PodCast</h1>
            <CreatePodCastForm/>
        </div>
    </div>
  )
}

export default CreateAPodcastPage;