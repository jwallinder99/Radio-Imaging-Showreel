'use client'
import React, {useContext} from 'react'

import { wavs } from '@/public/assets'
//TODO Make list component
import { PlayIcon } from 'lucide-react'
import { Button } from './ui/button'

interface ListProps {
  SetCurrentTrack: (trackName: string) => void;
}

const List: React.FC<ListProps> = ({SetCurrentTrack}) => {
  
  const handleClick= (trackName: string) => {
    SetCurrentTrack(trackName)
    
  }

  const wavsArr = Object.values(wavs)

  return (
    <div className="text-2xl border-2 border-primary rounded-sm p-5 w-fit mt-5">
      {wavsArr.map((wav) => (
        <div key={wav} className="flex flex-col justify-center items-center cursor-pointer">
          <Button variant="ghost" onClick={() => handleClick(wav)}>{wav}</Button>
        </div>
      ))}
      </div>
  )
}

export default List