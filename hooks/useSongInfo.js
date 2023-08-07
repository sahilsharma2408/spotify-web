import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSpotify from "@/hooks/useSpotify";
import { currentTrackIdState } from "@/atoms/songAtom";

function useSongInfo() {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [songInfo, setSongInfo] = useState(null);

  useEffect(() => {
    const fetchTrackInfo = async () => {
      if (currentTrackId) {
        const trackInfo = await fetch(
          `https://api.spotify.com/v1/tracks/${currentTrackId}`,
          {
            headers: { Authorization: "Bearer " + spotifyApi.getAccessToken() },
          }
        ).then((response) => response.json());

        setSongInfo(trackInfo);
      }
    };
    fetchTrackInfo();
  }, [currentTrackId, spotifyApi]);
  return songInfo;
}

export default useSongInfo;
