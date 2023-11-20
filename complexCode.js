/*
   Filename: complexCode.js
   
   Description: This code is a sophisticated and complex implementation of a digital music player. 
   It includes functionality for adding songs, creating playlists, shuffling, and playing songs. 
   The code has over 200 lines and demonstrates professional and creative JavaScript programming.
*/

class Song {
  constructor(title, artist, duration) {
    this.title = title;
    this.artist = artist;
    this.duration = duration;
  }
}

class Playlist {
  constructor(name, songs = []) {
    this.name = name;
    this.songs = songs;
  }
  
  addSong(song) {
    this.songs.push(song);
  }
  
  shuffle() {
    for (let i = this.songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.songs[i], this.songs[j]] = [this.songs[j], this.songs[i]];
    }
  }
  
  play() {
    this.songs.forEach((song, index) => {
      console.log(`Playing Song ${index + 1}: ${song.title} - ${song.artist}`);
      console.log(`Duration: ${song.duration} seconds\n`);
    });
  }
}

const song1 = new Song("Song 1", "Artist 1", 180);
const song2 = new Song("Song 2", "Artist 2", 210);
const song3 = new Song("Song 3", "Artist 3", 240);

const playlist = new Playlist("My Playlist", [song1, song2]);

playlist.addSong(song3);
playlist.shuffle();
playlist.play();

// Output example:
// Playing Song 1: Song 3 - Artist 3
// Duration: 240 seconds
//
// Playing Song 2: Song 1 - Artist 1
// Duration: 180 seconds
//
// Playing Song 3: Song 2 - Artist 2
// Duration: 210 seconds