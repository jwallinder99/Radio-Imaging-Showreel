'use client'
import React from 'react'
import AudioPlayer from './AudioPlayer'
import { wavs } from '@/public/assets'
import List from "@/components/List";
import { useState } from 'react';


const Player: React.FC =  () => {
  const [currentTrack, setCurrentTrack] = useState("CACR_APP_12_ENG");

  return (
    <div className="p-5 w-fit flex flex-col items-center"
    >
      <AudioPlayer currentTrack={currentTrack}/>
      <List SetCurrentTrack={setCurrentTrack}/>
    </div>
  )
}

export default Player