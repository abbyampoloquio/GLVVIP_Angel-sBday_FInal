/* ===== EDIT HERE =====
   video:  path to mp4 in assets/videos/   (leave "" while empty)
   photo:  path to image in assets/photos/ (leave "" while empty)
   poster: optional thumbnail for a video
*/
const CONFIG = {
  name: "ANGEL",
  music: "assets/music/party.mp3",   // plays on the Level Up screen
  ambience: "assets/music/cute-quest-loop.mp3", // cheerful loop for Home, Screenshots, and Lobby Chat
  letter: "Thank you for being you: loud, funny, kind, and always there. Every replay and screenshot in this room is proof of how lucky we are to have you in the squad. We hope this new level brings you soft days, big wins, and people who show up for you every time. Happy birthday from all of us at GLVVIP. We love you!",
  videos: [
    { title: "MATCH 01", note: "Where it all started",   video: "assets/videos/memory-01.mp4", poster: "assets/photos/memory-01-poster.jpg", icon: "🎮", grad: "linear-gradient(135deg,#4a2f9a,#d0377f)" },
    { title: "MATCH 02", note: "The unforgettable day",  video: "assets/videos/memory-02.mp4", poster: "assets/photos/memory-02-poster.jpg", icon: "🎉", grad: "linear-gradient(135deg,#1f6a9a,#8b5cff)" },
    { title: "MATCH 03", note: "Just us being us",       video: "assets/videos/memory-03.mp4", poster: "assets/photos/memory-03-poster.jpg", icon: "😂", grad: "linear-gradient(135deg,#9a2f6a,#ff7a59)" },
    { title: "MATCH 04", note: "A day we won't forget",  video: "assets/videos/memory-04.mp4", poster: "assets/photos/memory-04-poster.jpg", icon: "🌃", grad: "linear-gradient(135deg,#1f8a8a,#5c6cff)" },
    { title: "MATCH 05", note: "Behind the scenes",      video: "assets/videos/memory-05.mp4", poster: "assets/photos/memory-05-poster.jpg", icon: "💗", grad: "linear-gradient(135deg,#6a2f9a,#ff3fa4)" }
  ],
  photos: [
    { rarity: "LEGENDARY", photo: "assets/photos/photo-01.jpg", pos: "50% 35%", alt: "Photo 1" },
    { rarity: "LEGENDARY", photo: "assets/photos/photo-02.jpg", pos: "50% 50%", alt: "Photo 2" },
    { rarity: "EPIC",      photo: "assets/photos/photo-03.jpg", pos: "50% 50%", alt: "Photo 3" },
    { rarity: "EPIC",      photo: "assets/photos/photo-04.jpg", pos: "50% 40%", alt: "Photo 4" },
    { rarity: "RARE",      photo: "assets/photos/photo-05.jpg", pos: "50% 50%", alt: "Photo 5" },
    { rarity: "RARE",      photo: "assets/photos/photo-06.jpg", pos: "50% 60%", alt: "Photo 6" }
  ],
  messages: [
    { name: "Prince", avatar: "assets/avatars/prince.jpg", color: "#35f2ff", text: "HAPPY HAPPY BIRTHDAY MOMMY KO NA PRETTY, ILOVEYOU MOMMY ANGEL!" },
    { name: "Abby", avatar: "assets/avatars/abby.jpg", color: "#ff3fa4", text: "HAPPY BIRTHDAY ENJIL YAWA DI DAW KO MO GREET SAIMOHA LETCHE ANA SI KUYAAAA GRRR LOVEYAAA!!! SO PRETTY SO CUTE MANIGGA!!!" },
    { name: "Boss Eggy", avatar: "assets/avatars/jm.jpg", color: "#ffc94a", text: "HAPPY BIRTHDAY INJIL, SANA MAKA KITA KANA NG JUMBO HOTDOG KAYA MO BATO NA 12 INCHES." },
    { name: "Dughan", avatar: "assets/avatars/dughan.jpg", color: "#4dff9d", text: "HAPPY BIRTHDAY INJILL TAGA PAGLITAS SA AKIN SA LS HAHAHAHA MORE BDAY CUM" },
    { name: "JP", avatar: "assets/avatars/jp.jpg", color: "#b57bff", text: "HAPPY BIRTHDAY SAYO, MAMI ANGEL!! LABLAB TAKA ALWAYS!!!" },
    { name: "Cesar (ex)", avatar: "assets/avatars/cesar.jpg", color: "#ff7a59", text: "angel happy bday! ex manigga, delete ni ha" },
    { name: "Khalil", avatar: "assets/avatars/khalil.jpg", color: "#35f2ff", text: "HAPPYYY BIRYHDAYY BESTIE!!!!  UNTA SOMEDAY SANA, MAO RA LABYUCH" },
    { name: "Yoshi", avatar: "assets/avatars/yoshi.jpg", color: "#ff3fa4", text: "wish a merry Christmas and happy new year and best of everything" },
    { name: "Rochelle", avatar: "assets/avatars/rochelle.jpg", color: "#ffc94a", text: "happiest birthday, my ride or die  im always here for u, i love youu dai!" },
    { name: "Kuya Rollie", avatar: "assets/avatars/rollie.jpg", color: "#4dff9d", text: "Happy birthday gel . Kabalo ko na kabalo naka so di na nako ipahibalo kai Maka balo sila lab u" },
    { name: "Kevin", avatar: "assets/avatars/kevin.jpg", color: "#b57bff", text: "Happy birthday ngl 🫶🙆‍♂️🥳" },
    { name: "Marky", avatar: "assets/avatars/marky.jpg", color: "#ff7a59", text: "HAPPY BIRTHDAY PRETTY ENJIL, WISHING YOU MORE BIRTHDAY TO COME" },
    { name: "Christian", avatar: "assets/avatars/christian.jpg", color: "#35f2ff", text: "Happy Angel Day! You have my best wishes Angel 🥳" }
  ]
};
const RARITY = { LEGENDARY: "#ffc94a", EPIC: "#b57bff", RARE: "#35f2ff" };

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h != null) e.innerHTML = h; return e; };
const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const wait = (ms) => new Promise(r => setTimeout(r, ms));

/* UI sound effects: HOME, SCREENSHOTS, and LOBBY CHAT only. */
let sfxContext = null;
function playSfx(kind = "click") {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    if (!sfxContext) sfxContext = new AudioCtx();
    if (sfxContext.state === "suspended") sfxContext.resume();
    const now = sfxContext.currentTime;
    const osc = sfxContext.createOscillator(), gain = sfxContext.createGain();
    const sounds = {
      click: [640, 420, 0.055, "square", 0.035],
      open: [520, 880, 0.12, "sine", 0.045],
      photo: [880, 1180, 0.09, "sine", 0.045],
      close: [500, 300, 0.08, "sine", 0.035],
      ping: [1040, 760, 0.14, "triangle", 0.04],
      typing: [360, 430, 0.045, "square", 0.018]
    };
    const [from, to, duration, wave, volume] = sounds[kind] || sounds.click;
    osc.type = wave;
    osc.frequency.setValueAtTime(from, now);
    osc.frequency.exponentialRampToValueAtTime(to, now + duration);
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain); gain.connect(sfxContext.destination);
    osc.start(now); osc.stop(now + duration);
  } catch (_) { /* Sound is optional; never interrupt the birthday page. */ }
}

/* ---- upbeat birthday quest loop ----
   Plays on Home, Screenshots, Lobby Chat, and the Replays lobby when no video is playing.
   It always ducks out while a memory video or Level Up music is playing. */
const ambience = new Audio(CONFIG.ambience);
ambience.loop = true;
ambience.volume = 0.62;
ambience.preload = "auto";
let ambienceEnabled = true;
let activeTab = "home";
function startAmbience() {
  if (!ambienceEnabled) return;
  ambience.play().catch(() => { /* Browser may require a direct user click. */ });
}
function stopAmbience() { ambience.pause(); }
function syncAmbience(tabId) {
  const shouldPlay = ["home", "shots", "chat"].includes(tabId) || (tabId === "replays" && player.paused);
  if (shouldPlay) startAmbience();
  else stopAmbience();
}

/* ---- login ---- */
(async function typePw() {
  const pw = $("#pw"); pw.classList.add("typing");
  for (let i = 1; i <= 8; i++) { pw.textContent = "•".repeat(i); await wait(120); }
})();
$("#login-btn").onclick = async () => {
  playSfx("open");
  startAmbience();
  $("#login-btn").disabled = true; $("#loading").hidden = false;
  const steps = ["Connecting to GLVVIP server...", "Loading our memories...", "Checking if you're loved... yes", "Welcome back, " + CONFIG.name + "!"];
  for (let i = 0; i < steps.length; i++) {
    $("#load-text").textContent = steps[i];
    $("#bar-fill").style.width = ((i + 1) / steps.length * 100) + "%";
    await wait(650);
  }
  $("#boot").hidden = true; $("#app").hidden = false;
  playSfx("ping");
  toast("SESSION STARTED. HAVE FUN!");
};

/* ---- tabs + quests ---- */
const visited = new Set();
const QUEST_TABS = ["replays", "shots", "chat"];
let unlocked = false, chatPlayed = false, danced = false, muted = false;
function updateQuests() {
  $$(".quests li").forEach(li => li.classList.toggle("done", visited.has(li.dataset.q)));
  $("#xp").textContent = QUEST_TABS.filter(t => visited.has(t)).length;
  if (!unlocked && QUEST_TABS.every(t => visited.has(t))) {
    unlocked = true;
    const tab = $("#tab-levelup"); tab.classList.remove("locked"); tab.querySelector("i").textContent = "🏆";
    $("#lock-msg").hidden = true; $("#final").hidden = false;
    toast("ACHIEVEMENT UNLOCKED: SECRET LEVEL!");
  }
}
function go(id) {
  activeTab = id;
  if (id !== "replays" && typeof player !== "undefined" && !player.paused) player.pause();
  syncAmbience(id);
  $$(".tab").forEach(t => t.classList.toggle("active", t.dataset.tab === id));
  $$(".panel").forEach(p => p.classList.toggle("active", p.id === id));
  $(".view").scrollTo({ top: 0 });
  if (id !== "home" && id !== "levelup") visited.add(id);
  if (id === "levelup" && unlocked) visited.add("levelup");
  if (id === "chat" && !chatPlayed) playChat();
  updateQuests();
  if (id === "levelup" && unlocked) {
    requestAnimationFrame(layoutStage);
    if (!danced) { danced = true; setTimeout(confetti, 500); }
    playMusic();
  } else stopMusic();
}
$$(".tab").forEach(t => t.onclick = () => {
  if (t.dataset.tab === "home") playSfx("open");
  go(t.dataset.tab);
});
$$("[data-go]").forEach(b => b.onclick = () => {
  if (b.closest("#home")) playSfx("click");
  go(b.dataset.go);
});

/* ---- replays (memory videos) ---- */
const player = $("#player"), tvEmpty = $("#tv-empty");
let cur = 0;
function selectMatch(i, autoplay) {
  cur = i; const v = CONFIG.videos[i];
  $("#tv-title").textContent = v.title;
  $$(".match").forEach((m, k) => m.classList.toggle("active", k === i));
  if (v.video) {
    player.src = v.video; player.poster = v.poster || ""; player.hidden = false; tvEmpty.hidden = true;
    if (autoplay) { stopAmbience(); player.play().catch(() => {}); }
    else if (activeTab === "replays") startAmbience();
  } else {
    player.pause(); player.removeAttribute("src"); player.hidden = true; tvEmpty.hidden = false;
    $("#tv").classList.remove("portrait");
    $("#tv").style.background = v.grad;
    $("#tv-hint").textContent = v.title + " video goes here";
  }
}
CONFIG.videos.forEach((v, i) => {
  const li = el("li"), b = el("button", "match",
    `<div class="m-ico" style="--grad:${v.grad}">${v.poster ? `<img src="${esc(v.poster)}" alt="">` : v.icon}</div><div><b>${esc(v.title)}</b><span>${esc(v.note)}</span><em>VICTORY</em></div>`);
  b.onclick = () => selectMatch(i, true);
  li.append(b); $("#matches").append(li);
});
$("#play-big").onclick = () => selectMatch(cur, true);
/* fit the TV frame to each video's real shape (portrait phone clips vs landscape) */
player.addEventListener("loadedmetadata", () => {
  const r = player.videoWidth / player.videoHeight, tv = $("#tv");
  tv.style.setProperty("--vr", r);
  tv.classList.toggle("portrait", r < 1);
});
player.addEventListener("play", stopAmbience);
player.addEventListener("pause", () => {
  if (activeTab === "replays" && !player.ended) startAmbience();
});
player.addEventListener("ended", () => {
  if (cur < CONFIG.videos.length - 1) selectMatch(cur + 1, true);
  else if (activeTab === "replays") startAmbience();
});
selectMatch(0, false);

/* ---- screenshots (photos) ---- */
const lb = $("#lightbox"), fig = $("#lb-fig");
let li = 0;
const rarChip = (p) => `<i class="rar" style="--c:${RARITY[p.rarity] || "#35f2ff"}">${esc(p.rarity)}</i>`;
CONFIG.photos.forEach((p, i) => {
  const b = el("button", "shot", `<div class="ph"><img src="${esc(p.photo)}" alt="${esc(p.alt || "")}" style="object-position:${p.pos || "50% 50%"}" loading="lazy"></div><div class="shot-bar">${rarChip(p)}</div>`);
  b.onclick = () => { playSfx("photo"); openLb(i); }; $("#shot-grid").append(b);
});
function openLb(i) {
  li = (i + CONFIG.photos.length) % CONFIG.photos.length; const p = CONFIG.photos[li];
  fig.innerHTML = `<img src="${esc(p.photo)}" alt="${esc(p.alt || "")}"><figcaption>${rarChip(p)}</figcaption>`; lb.hidden = false;
}
$("#lb-close").onclick = () => { playSfx("close"); lb.hidden = true; };
$("#lb-prev").onclick = () => { playSfx("photo"); openLb(li - 1); };
$("#lb-next").onclick = () => { playSfx("photo"); openLb(li + 1); };
lb.addEventListener("click", e => { if (e.target === lb) { playSfx("close"); lb.hidden = true; } });
addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") { playSfx("close"); lb.hidden = true; }
  if (e.key === "ArrowLeft") { playSfx("photo"); openLb(li - 1); }
  if (e.key === "ArrowRight") { playSfx("photo"); openLb(li + 1); }
});

/* ---- lobby chat (messages) ---- */
$("#online-n").textContent = CONFIG.messages.length + 1;
async function playChat() {
  chatPlayed = true;
  const log = $("#chat-log");
  for (const m of CONFIG.messages) {
    if (m.text) {
      const dots = el("div", "typing-dots", `${esc(m.name)} is typing...`); log.append(dots);
      playSfx("typing"); await wait(550); dots.remove();
    }
    log.append(el("div", "msg", `<div class="avatar" style="--c:${m.color}"><img src="${esc(m.avatar)}" alt="${esc(m.name)}"></div><div><div class="msg-name" style="--c:${m.color}">${esc(m.name)}<small>GLVVIP</small></div><div class="msg-text">${esc(m.text)}</div></div>`));
    if ($("#chat").classList.contains("active")) playSfx("ping");
    if ($("#chat").classList.contains("active")) $(".view").scrollTo({ top: 99999, behavior: "smooth" });
    await wait(m.text ? 250 : 100);
  }
}

/* ---- finale ---- */
function confetti() {
  const bits = ["♥", "✦", "★", "🎉", "💗", "✨", "🎮"], layer = $("#confetti");
  for (let i = 0; i < 60; i++) {
    const s = el("span", "bit", bits[Math.random() * bits.length | 0]);
    s.style.left = Math.random() * 100 + "vw"; s.style.fontSize = 14 + Math.random() * 18 + "px";
    s.style.animationDuration = 2.2 + Math.random() * 2 + "s"; s.style.animationDelay = Math.random() * .8 + "s";
    layer.append(s); setTimeout(() => s.remove(), 5200);
  }
}
$("#confetti-btn").onclick = () => { confetti(); toast("GLVVIP LOVES YOU. NO ARGUMENTS."); };
$("#restart").onclick = () => location.reload();

/* ---- level up: stickman dance floor (everyone's profile pic as the head) ---- */
const stageEl = $("#stage2");
CONFIG.messages.forEach((m, i) => {
  const d = el("div", "dancer m" + (i % 3),
    `<div class="rig"><img class="head" src="${esc(m.avatar)}" alt="${esc(m.name)}">` +
    `<svg class="stick" viewBox="0 0 40 64" aria-hidden="true"><line x1="20" y1="4" x2="20" y2="30"/>` +
    `<g class="armL"><line x1="20" y1="12" x2="6" y2="26"/></g><g class="armR"><line x1="20" y1="12" x2="34" y2="26"/></g>` +
    `<g class="legL"><line x1="20" y1="30" x2="10" y2="60"/></g><g class="legR"><line x1="20" y1="30" x2="30" y2="60"/></g></svg>` +
    `<b>${esc(m.name)}</b></div>`);
  d.style.setProperty("--c", m.color);
  d.style.setProperty("--dl", (-(i * 0.17)).toFixed(2) + "s");
  d.style.setProperty("--dur", (0.8 + (i % 4) * 0.08).toFixed(2) + "s");
  stageEl.append(d);
});
function layoutStage() {
  const W = stageEl.clientWidth, H = stageEl.clientHeight;
  if (!W) return;
  const k = W < 420 ? .74 : W < 520 ? .82 : 1, rx = W / 2 - 34 * k - 6, ry = H / 2 - 58 * k;
  const ds = $$("#stage2 .dancer"), N = 720, pts = [], cum = [0];
  for (let j = 0; j <= N; j++) {            // walk the ellipse, then space dancers by arc length (even gaps)
    const t = -Math.PI / 2 + j * 2 * Math.PI / N;
    pts.push([rx * Math.cos(t), ry * Math.sin(t)]);
    if (j) cum.push(cum[j - 1] + Math.hypot(pts[j][0] - pts[j - 1][0], pts[j][1] - pts[j - 1][1]));
  }
  ds.forEach((d, i) => {
    const target = cum[N] * i / ds.length; let j = 0;
    while (j < N && cum[j + 1] < target) j++;
    d.style.left = (W / 2 + pts[j][0]) + "px";
    d.style.top = (H / 2 + pts[j][1] + 4) + "px";
    d.style.setProperty("--k", k);
  });
}
addEventListener("resize", layoutStage);

/* ---- level up music (starts when the Level Up tab opens, stops when she leaves) ---- */
const bgm = new Audio(CONFIG.music);
bgm.loop = true; bgm.volume = .6; bgm.preload = "auto";
const muteBtn = $("#mute-btn");
function syncMute() { muteBtn.textContent = (muted || bgm.paused) ? "🔇 MUSIC OFF" : "🔊 MUSIC ON"; }
function playMusic() { if (muted) return syncMute(); player.pause(); bgm.play().then(syncMute).catch(syncMute); }
function stopMusic() { bgm.pause(); syncMute(); }
muteBtn.onclick = () => { muted = !muted; if (muted) stopMusic(); else playMusic(); };
