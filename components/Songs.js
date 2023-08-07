import React from "react";
import { useRecoilValue } from "recoil";
import { playlistState } from "../atoms/playlistAtom";
import Song from "./Song";

export default function Songs() {
  const playlist = useRecoilValue(playlistState);

  return (
    <div className="px-0 flex flex-col pb-28 space-y-1 text-white">
      {playlist?.tracks?.items?.map((track, i) => {
        return <Song key={track.track.id} track={track} order={i} />;
      })}
    </div>
  );
}
