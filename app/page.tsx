
import Player from "@/components/Player";


export default function Home() {
    return (
        <main>
            <div
                className="container flex 
                    flex-col items-center justify-center
                    gap-5 h-screen"
            >
                <Player />
                
            </div>
        </main>
    );
}
