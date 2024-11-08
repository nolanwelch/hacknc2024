import Cookies from "js-cookie";
import Song from "./types/Song";
import axios, { AxiosResponse } from 'axios';
import NowPlayingSong from "./types/NowPlayingSong";

const NetworkService = {
  getNowPlaying: async function(): Promise<NowPlayingSong> {
    const response = await axios.get<NowPlayingSong>(process.env.REACT_APP_API_URL + "/playing");
    return response.data;
  },
  getQueue: async function(): Promise<Array<Song>> {
    const response = await axios.get<Array<Song>>(process.env.REACT_APP_API_URL + "/queue");
    return response.data;
  },
  getRequestedSongs: async function(): Promise<Array<Song>> {
    const response = await axios.get<Array<Song>>(process.env.REACT_APP_API_URL + "/request", {
      withCredentials: true,
    });
    return response.data;
  },
  requestSong: function(song: Song) {
    return axios.post<Array<Song>>(process.env.REACT_APP_API_URL + "/request", {songId: song.songId},{
      withCredentials: true,
    })
  },
  joinSession: function() {
    return axios.put<Array<Song>>(process.env.REACT_APP_API_URL + "/join", {},{
      withCredentials: true,
    })
  },
  getSearchSong: async function(query: string): Promise<Array<Song>> {
    return axios.get<Array<Song>>(process.env.REACT_APP_API_URL + "/search", {
      params: {
        q: query
      },
      withCredentials: true,
    }).then((response: AxiosResponse<Song[], any>) => response.data)
  },
  isLoggedIn: async function(): Promise<boolean> {
    return axios.get<boolean>(process.env.REACT_APP_API_URL + "/is_authenticated", {
      withCredentials: true,
    }).then((response: AxiosResponse<boolean, any>) => response.data)
  }
}

export default NetworkService;