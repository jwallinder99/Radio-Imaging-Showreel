'use client'
import React from 'react'
import { useRef, useEffect, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'


import { 
    Play, 
    Pause, 
    VolumeX,
    Volume1,
    Volume2,
    Volume
} from 'lucide-react'
import { Slider } from './ui/slider'


const formWaveSurferOptions = (ref: any) => ({
    container: ref,
    waveColor: '#ccc',
    progressColor: '#16A34A',
    cursorColor: 'transparent',
    responsive: true,
    height: 80,
    normalize: true,
    backend: 'WebAudio' as 'WebAudio' | 'MediaElement' | undefined,
    barWidth: 2,
    barGap: 3
})


interface AudioPlayerProps {
    currentTrack: string
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ currentTrack }) => {

    const waveformRef = useRef(null);
    const wavesurfer = useRef<WaveSurfer | null>(null);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [muted, setMuted] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0)
    const [audioFileName, setAudioFileName] = useState('')

    const handlePlayPause = () => {
        setPlaying(!playing)
        wavesurfer.current?.playPause();
    }

    const handleMute = () => {
        setMuted(!muted)
        wavesurfer.current?.setVolume(muted ? volume : 0)
    }

    const formatTime = (seconds: number) => {
        let date = new Date(0);
        date.setSeconds(seconds);
        return date.toISOString().substr(11, 8)
    }

    const handleSliderChange = (newValue: number[]) => {
        setVolume(newValue[0]);
        // Update volume based on slider value here

        wavesurfer.current?.setVolume(newValue[0]);
    }

    //Initialize wavesurfer

   

    useEffect(() => {
       //create wavesurfer instance with options
        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options)
        //load the audio file(s)
        wavesurfer.current.load(`/assets/${currentTrack}.wav`)
        wavesurfer.current.on('ready', () => {
            setVolume(wavesurfer.current?.getVolume()?? 0);
            setDuration(wavesurfer.current?.getDuration()?? 0)
        });

        wavesurfer.current.on('audioprocess', () => {
            
            if (wavesurfer.current){
                setCurrentTime(wavesurfer.current.getCurrentTime())
            }
            
            
        })

        

        return () => {
            wavesurfer.current?.un('audioprocess', () => {setPlaying(false)})
            wavesurfer.current?.un('ready', () => {setPlaying(false)})
            try {
                wavesurfer.current?.destroy()
            } catch (error) {
                console.log(error)
            }
            
        }
    }, [currentTrack])
    
  return (
    <div ref={waveformRef} className="border-2 border-primary p-5 sm: w-full">
        <div className='controls'>
            <div className='flex flex-row gap-5 justify-around
            mb-2'
            >
                <button onClick={handlePlayPause}>
                    {playing ? <Pause /> : <Play />}
                </button>
                <button onClick={handleMute}>
                    {muted ?  <Volume /> : <VolumeX />}
                </button>
            </div>
            <div className="flex justify-center items-center">
                <div className="mx-2">
                    <Volume1 /></div><Slider value={muted ? [0] : [volume]} onValueChange={handleSliderChange} max={10} /><div className="mx-2"><Volume2 />
                </div>
            </div>
            <div className="flex flex-row gap-5 my-5">
                <div>
                Playing: {currentTrack}
                </div>
                <div>
                    {formatTime(duration)} {' '}
                    {formatTime(currentTime)}
                </div>
                <div>Volume: {Math.round(volume) * 10}%</div>
            </div>
        </div>
    </div>
  )
}

export default AudioPlayer