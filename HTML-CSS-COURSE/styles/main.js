console.log("main.js is connected");
document.addEventListener("DOMContentLoaded", () => {
  // ====== VIDEO DATA ======
  const videos = [
    {
      id: 1,
      title: "Talking Tech and AI with Google CEO Sundar Pichai!",
      author: "Marques Brownlee",
      stats: "3.4M views · 6 months ago",
      thumbnail: "thumbnails/thumbnail-1.webp",
      channelPic: "channel-pictures/channel-1.jpeg",
      duration: "14:20",
      category: "Tech",
      videoUrl: "https://www.youtube.com/embed/GBAAtZVjY5A",
    },
    {
      id: 2,
      title: "Try Not To Laugh Challenge #9",
      author: "Markiplier",
      stats: "19M views · 4 years ago",
      thumbnail: "thumbnails/thumbnail-2.webp",
      channelPic: "channel-pictures/channel-2.jpeg",
      duration: "8:22",
      category: "Gaming",
      videoUrl: "https://www.youtube.com/embed/2S24-y0Ij3E",
    },
    {
      id: 3,
      title: "Crazy Tik Toks Taken Moments Before DISASTER",
      author: "SSSniperWolf",
      stats: "12M views · 1 year ago",
      thumbnail: "thumbnails/thumbnail-3.webp",
      channelPic: "channel-pictures/channel-3.jpeg",
      duration: "9:13",
      category: "Comedy",
      videoUrl: "https://www.youtube.com/embed/fNVa1q0-PuE",
    },
    // ... add the rest of your 12 videos here. Just copy the pattern and add a youtube embed link
  ];

  const videoGrid = document.getElementById("videoGrid");
  const chips = document.querySelectorAll(".chip");
  const searchBar = document.querySelector(".search-bar");
  const hamburger = document.querySelector(".hamburger-menu");
  const sidebar = document.getElementById("sideBar");

  // ====== 1. RENDER VIDEOS FUNCTION ======
  function renderVideos(videoList) {
    videoGrid.innerHTML = "";

    videoList.forEach((video) => {
      const videoHTML = `
        <div class="video-preview" data-video-url="${video.videoUrl}">
          <div class="thumbnail-row">
            <img class="thumbnail" src="${video.thumbnail}" alt="${video.title}" />
            <div class="video-time">${video.duration}</div>
          </div>
          <div class="video-info-grid">
            <div class="channel-picture">
              <img class="profile-picture" src="${video.channelPic}" alt="${video.author}" />
            </div>
            <div class="video-info">
              <p class="video-title">${video.title}</p>
              <p class="video-author">${video.author}</p>
              <p class="video-stats">${video.stats}</p>
            </div>
          </div>
        </div>
      `;
      videoGrid.innerHTML += videoHTML;
    });

    // Add click event to all new videos to play them
    document.querySelectorAll(".video-preview").forEach((card) => {
      card.addEventListener("click", () => {
        openVideoPlayer(
          card.dataset.videoUrl,
          card.querySelector(".video-title").innerText,
        );
      });
    });
  }

  // ====== 2. SIDEBAR TOGGLE ======
  hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("active");
  });

  // ====== 3. CHIP BAR FILTERING + ACTIVE STATE ======
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");

      const filter = chip.innerText;
      if (filter === "All") {
        renderVideos(videos);
      } else {
        const filtered = videos.filter(
          (v) =>
            v.category === filter ||
            v.title.toLowerCase().includes(filter.toLowerCase()),
        );
        renderVideos(filtered);
      }
    });
  });

  // ====== 4. SEARCH BAR FILTERING ======
  searchBar.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = videos.filter(
      (v) =>
        v.title.toLowerCase().includes(searchTerm) ||
        v.author.toLowerCase().includes(searchTerm),
    );
    renderVideos(filtered);
  });

  // ====== 5. VIDEO PLAYER MODAL ======
  function openVideoPlayer(videoUrl, title) {
    // Create modal if it doesn't exist
    let modal = document.getElementById("videoModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "videoModal";
      modal.innerHTML = `
        <div class="modal-content">
          <span class="close-btn">&times;</span>
          <h3 id="modalTitle"></h3>
          <iframe id="youtubePlayer" width="100%" height="500" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      `;
      document.body.appendChild(modal);
    }

    document.getElementById("modalTitle").innerText = title;
    document.getElementById("youtubePlayer").src = videoUrl + "?autoplay=1";
    modal.style.display = "flex";

    // Close modal
    modal.querySelector(".close-btn").onclick = () => {
      modal.style.display = "none";
      document.getElementById("youtubePlayer").src = ""; // stop video
    };
    modal.onclick = (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        document.getElementById("youtubePlayer").src = "";
      }
    };
  }

  // Initial load
  renderVideos(videos);
});
