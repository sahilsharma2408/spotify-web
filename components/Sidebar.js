import React, { useEffect, useState } from "react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BuildingLibraryIcon,
  HeartIcon,
  RssIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

function Sidebar() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    // if (spotifyApi.getAccessToken()) {
    spotifyApi.getUserPlaylists(session).then((data) => {
      setPlaylists(data.body.items);
    });
    // }
  }, [session, spotifyApi]);

  return (
    <div
      className={`text-gray-500 p-5 text-xs lg:text-sm sm:max-w-[12rem] 
                    lg:max-w-[15rem] border-r border-gray-900 overflow-y-auto 
                    h-screen scrollbar-hide hidden md:inline-flex pb-36
                `}
    >
      <div className="space-y-4">
        <button className="flex item-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex item-center space-x-2 hover:text-white">
          <MagnifyingGlassIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex item-center space-x-2 hover:text-white">
          <BuildingLibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex item-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Your Playlist</p>
        </button>
        <button className="flex item-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5" />
          <p>Liked songs</p>
        </button>
        <button className="flex item-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5" />
          <p>Your episodes</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        {/* Playlist... */}
        {playlists.map((playlist) => {
          return (
            <p
              key={playlist.id}
              onClick={() => {
                setPlaylistId(playlist.id);
                console.log("###### playlistid", playlist.id);
              }}
              className="cursor-pointer hover:text-white"
            >
              {playlist.name}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
