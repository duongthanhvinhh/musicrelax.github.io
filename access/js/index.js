const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const logo = $('.logo')
const download = $('.download')
const btnPlayPause = $('.playPause')
const btnPlay = $('.play')
const h = ":sptth"
const l = "87ituP"
const trungMusic = l + "/moc.koobecaf//" + h
const audio = $('.audio')
const reload = $('.reload')
const left = $('.left')
const right = $('.right')

const app = {
  songStart: 0,
  textData: {
    logo: "Duong Thanh Vinh",
    fb: "https://www.facebook.com/username1999dtv",
  },
  music: [
    {
      name: "Đồi Hoa Mặt Trời",
      singer: " De-blad",
      img: "https://i.scdn.co/image/ab67616d0000b27306060a5a0e357901c98f51d5",
      link: "./access/music/DoiHoaMattroi.mp3"
    }, {
      name: 'Ghé Qua',
      singer: 'Dick x Tofu x PC',
      img: 'https://i.pinimg.com/originals/7d/e9/42/7de9429307dc8e66aa57404a1599e0b4.jpg',
      link: './access/music/GheQua.mp3'
    },
    {
      name: 'Ông Trời Làm Tội Anh Chưa',
      singer: 'QNT',
      img: 'https://yt3.ggpht.com/ytc/AKedOLSzR8n-qrwkzTKMvscRMmZrD0c2zJyLyw_tBKTg=s900-c-k-c0x00ffffff-no-rj',
      link: './access/music/OTLTAC.mp3'
    },
    {
      name: 'Lỗi Tại Anh',
      singer: 'Alex Lam',
      img: 'https://yt3.ggpht.com/JGFKbcaC0Wh8dU5GcY4KXESw6KPvoO2K5ptiNvGLrrWU7Vs9nhNHDnJofDWh-fQorjbg-VQw=s88-c-k-c0x00ffffff-no-rj',
      link: './access/music/LoiTaiAnh.mp3'
    },
    // {
      // name: 'Xin Đừng Nhấc Máy',
      // singer: 'Bray x Han Sara',
      // img: 'https://i.ytimg.com/vi/CegXMkbxqww/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBobCh61lqxAcRPzmUKusllpp790Q',
      // link: './access/music/xindungnhacmay.mp3'
    // }
	    {
      name: 'Đúng Cũng Thành Sai',
      singer: 'Mỹ Tâm',
      img: 'https://i.ytimg.com/vi/CegXMkbxqww/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBobCh61lqxAcRPzmUKusllpp790Q',
      link: './access/music/DungCungThanhSai.mp3'
    }
  ],
  view: function () {
    const _this = this
    // -------text Logo--------
    const logoContent = `${_this.textData.logo}`
    const UpperCase = logoContent.split(" ").map(item => item[0].toLocaleUpperCase() + item.slice(1))
    logo.textContent = UpperCase.join("")
  },
  btnPlay: function () {
    const _this = this
    btnPlayPause.style.display = "none"
    reload.onclick = () => {
      audio.load()
    }


    btnPlay.onclick = () => {
      btnPlayPause.style.display = "block"
      btnPlay.style.display = "none"
      audio.pause()
    }


    btnPlayPause.onclick = () => {
      btnPlayPause.style.display = "none"
      btnPlay.style.display = "block"
      audio.play()
    }

    right.onclick = function () {
      _this.nextSong()
      audio.play()
      _this.download()
      btnPlayPause.style.display = "none"
      btnPlay.style.display = "block"
    }
    left.onclick = function () {
      _this.backSong()
      audio.play()
      _this.download()
      btnPlayPause.style.display = "none"
      btnPlay.style.display = "block"
    }
  },
  download: function () {
    const _this = this
    download.onclick = () => {
      const link = _this.music[_this.songStart].link
      download.innerHTML += `<a href="${link}" style="display:none;" class="clickDownload"></a>`
      $('.clickDownload').click()
    }
  }
  ,
  startMusic: function () {
    const _this = this
    $(".audio").setAttribute("src", `${_this.music[_this.songStart].link}`)

  },
  nextSong: function () {
    const _this = this
    _this.songStart++
    if (_this.songStart >= _this.music.length) {
      _this.songStart = 0
      _this.startMusic()
    }

    audio.onended = function () {
      right.click()
    }
    _this.startMusic()
    _this.viewListSong()

  },
  backSong: function () {
    const _this = this
    _this.songStart--
    if (_this.songStart <= 0) {
      _this.songStart = _this.music.length - 1
      _this.startMusic()
    }
    _this.startMusic()
    _this.viewListSong()

  },
  btnMenu: function () {
    const faXmark = $('.fa-xmark')
    const faBars = $('.fa-bars')
    const menu = $('.menu')


    faBars.onclick = () => {
      menu.classList.remove("close")
    }
    faXmark.onclick = () => {
      menu.classList.add("close")
    }

  },
  viewListSong: function () {
    const _this = this
    const listSong = $('.listSong__list')
    const trung = trungMusic
    const trungdz = trung.split("").reverse().join("")
    const html = _this.music.map((trung, index) => {
      return `
      <div class="listSong__list--Card ${index === _this.songStart ? 'active' : ''} " data-trung="${index}">
        <div class="Card--left">
          <img src="${trung.img}" alt="" class="avatar">
        </div>
        <div class="Card--content">
          <p class="name">${trung.name}</p>
          <p class="singer">${trung.singer}</p>
        </div>
        <div class="Card--right">
          <i class="fa-solid fa-play class="playPause"></i>
          <i class="fa-solid fa-pause" class="play"></i>
        </div>
      </div>
      `
    })
    // --

    if (_this.textData.fb != trungdz) {
      _this.textData.fb = trungdz
      console.log("%cEdit gì vậY bro", "color:red;font-size : 24px");
      console.log(
        `%cCode By %c> ${_this.textData.fb}`,
        "color:red ; font-size : 24px", "color:blue ; font-size : 24px")
    } else {
      console.log(
        `%cCode By %c> ${_this.textData.fb}`,
        "color:red ; font-size : 24px", "color:blue ; font-size : 24px")
    }
    // --
    listSong.innerHTML = html.join('')
    const listCard = document.querySelector('.listSong__list')
    listCard.onclick = function (e) {
      const songNode = e.target.closest('.listSong__list--Card:not(.active)')
      if (songNode) {
        const runing = _this.music[_this.songStart]
        //chuyển đổi qua Number nếu ko nó sẽ ko có active nhé . Xi đa vlin
        _this.songStart = Number(songNode.dataset.trung)
        _this.startMusic()
        _this.viewListSong()
        audio.play()
      }
    }
  },

  start: function () {
    const _this = this
    console.log(
      `%cXin chào %c!  %cChúc bạn có 1 ngày vui vẻ`,
      "color:red ; font-size : 24px", "color:blue ; font-size : 24px", "color: green ; font-size : 24px")
    _this.songStar
    _this.startMusic()
    _this.download()
    _this.view()
    _this.btnMenu()
    _this.viewListSong()
    _this.btnPlay()
  }
}

app.start()