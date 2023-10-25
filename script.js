// Example array of songs
const songs = [
  {
    title: "Bhul gaya jag sara",
    source: "songs/Bhul Gaya Jag sara.mp3",
  },
  {
    title: "Dur Tujhse Me Rehke",
    source: "songs/Dur Tujhse Me Rehke.mp3",
  },
  {
    title: "Ore piya",
    source: "songs/Ore piya.mp3"
  },
  {
    title: "Tujhko hi dulhan",
    source: "songs/Tuhko hi dulhan.mp3"
  },
  {
    title: "Jaise aankho ki nindiya",
    source: "songs/Jaise aankho ki nindiya.mp3",
  },
  {
    title: "Remix",
    source: "songs/Remix.mp3",
  },
  {
    title: "Shaam Gulabi",
    source: "songs/Shaam Gulabi.mp3",
  },
  {
    title: "Tere naal pyar hai",
    source: "songs/Bhul Gaya Jag sara.mp3",
  },
  {
    title: "Suna suna hai jahan",
    source: "songs/Dur Tujhse Me Rehke.mp3",
  },
  {
    title: "Mera safar",
    source: "songs/Mera safar.mp3"
  },
  {
    title: "Ankho ki nindiya",
    source: "songs/Jaise aankho ki nindiya.mp3",
  },
  {
    title: "Saazish me shamil",
    source: "songs/Saazish me shamil.mp3"
  },
  {
    title: "Mashup",
    source: "songs/Remix.mp3",
  },
  {
    title: "Zindagi ke safar me",
    source: "songs/Zindagi ke safar me.mp3"
  },
  {
    title: "Tujhko hi dulha",
    source: "songs/Thujko hi dulha.mp3"
  },
  {
    title: "Sheher Gulabi",
    source: "songs/Shaam Gulabi.mp3",
  },
  {
    title: "Mera jo safar hai",
    source: "songs/Mera safar.mp3"
  },
  {
    title: "Tujhko hi (male version)",
    source: "songs/Tuhko hi dulhan.mp3"
  },
  {
    title: "Guzar jate hain jo",
    source: "songs/Zindagi ke safar me.mp3"
  },
  {
    title: "Tujhko hi (female version)",
    source: "songs/Thujko hi dulha.mp3"
  },
  {
    title: "Saazish me shamil",
    source: "songs/Saazish me shamil.mp3"
  }
];


const songTitleElement = document.getElementById("songTitle");
const playButton = document.getElementById("playButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const searchBox = document.getElementById("searchBox");
const searchButton = document.getElementById("searchButton");
const resetButton = document.getElementById("resetButton");


let currentSongIndex = 0;
let audioPlayer = new Audio();
let isSearching = false;
let filteredSongs = [];


function initializePlayer() {
  updateCurrentSong();
}


function updateCurrentSong() {
  const arr = isSearching ? filteredSongs : songs;
  if (arr.length > 0) {
    currentSongIndex = Math.max(0, Math.min(currentSongIndex, arr.length - 1));
    const currentSong = arr[currentSongIndex];
    songTitleElement.textContent = currentSong.title;
    audioPlayer.src = currentSong.source;
    audioPlayer.preload = "auto";
  } else {
    songTitleElement.textContent = "";
    audioPlayer.pause();
  }
  playButton.textContent = "Play";
}


function playSong() {
  const arr = isSearching ? filteredSongs : songs;
  if (arr.length > 0) {
    if (audioPlayer.paused) {
      playButton.textContent = "Pause";
      audioPlayer.play();
    } else {
      playButton.textContent = "Play";
      audioPlayer.pause();
    }
  }
}


function playNextSong() {
  currentSongIndex++;
  updateCurrentSong();
}


function playPreviousSong() {
  currentSongIndex--;
  updateCurrentSong();
}


function searchSongs() {
  document.getElementById("filtered-songs").innerHTML = "";
  if (searchBox.value.trim() != "") {
    const searchTerm = searchBox.value.toLowerCase();
    filteredSongs = songs.filter((song) =>
      song.title.toLowerCase().includes(searchTerm)
    );
  
    if (filteredSongs.length > 0) {
      isSearching = true;
      currentSongIndex = 0;
    }
    else {
      isSearching = false;
      // currentSongIndex = 0;
      filteredSongs = [];
    }
  }
  else {
    filteredSongs = [];
  }

  // updateCurrentSong();
  searchBox.value = "";
  isSearching = false;

  for(var i=0; i<filteredSongs.length; i++) {
    var filteredSongsObj = filteredSongs[i];
    let song = document.createElement('li');
    song.innerHTML = `<button id="btn" onclick="playCurrentSong(this)">▶️</button> ${filteredSongsObj.title}`;
    song.style.color = "white";
    song.style.listStyle = "none";
    document.getElementById('filtered-songs').appendChild(song);
  }
  
  // document.querySelector('.search-div').style.display = 'block';
  document.querySelector('.search-div').classList.add('block');
  // document.getElementById("filtered-songs").classList.add('block');
}


function resetSearch() {
  searchBox.value = "";
  isSearching = false;
  filteredSongs = [];
  // updateCurrentSong();
  document.getElementById("filtered-songs").innerHTML = "";
  // let searchDiv = document.querySelector('.search-div');
  // searchDiv.classList.add('clear');
  // searchDiv.style.display = 'none';
  document.querySelector('.search-div').classList.remove('block');
  // document.getElementById("filtered-songs").classList.remove('block');
}


playButton.addEventListener("click", playSong);
prevButton.addEventListener("click", playPreviousSong);
nextButton.addEventListener("click", playNextSong);
searchButton.addEventListener("click", searchSongs);
resetButton.addEventListener("click", resetSearch);


// searchBox.addEventListener("input", () => {
//   if (searchBox.value == "") {
//     resetSearch();
//   }
//   console.log('input event called!');
// });


initializePlayer();


// render list
for(var i=0; i<songs.length; i++) {
  var songsObj = songs[i];
  var song = document.createElement('li');
  song.innerHTML = `<button id="btn" onclick="playCurrentSong(this)">▶️</button> ${songsObj.title}`;
  song.style.color = "white";
  document.getElementById('songs-list').appendChild(song);
}


function playCurrentSong(button) {
  if(button.innerText == "▶️") {
    button.innerText = "⏸️";
    const songTitle = button.nextSibling.textContent.trim();
    const arr = isSearching ? filteredSongs : songs;
    const index = arr.findIndex((song) => song.title === songTitle);

    if (index !== -1) {
      currentSongIndex = index;
      updateCurrentSong();
      playSong();
    }
  }
  else {
      button.innerText = "▶️";
      audioPlayer.pause();
      playButton.textContent = "Play";
    }
 }

