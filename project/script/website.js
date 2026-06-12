// ------------------------------
//  UGANDA UNTAMED - FINAL SCRIPT (template literals everywhere)
// ------------------------------

function getStoredItinerary() {
  const stored = localStorage.getItem("ugandaWildPlan");
  return stored ? JSON.parse(stored) : [];
}

function saveItinerary(arr) {
  localStorage.setItem("ugandaWildPlan", JSON.stringify(arr));
  updateAllItineraryDisplays();
}

function updateAllItineraryDisplays() {
  const itinerary = getStoredItinerary();
  const countSpan = document.getElementById("itineraryCount");
  if (countSpan) countSpan.textContent = itinerary.length;
  const miniCount = document.getElementById("miniCount");
  if (miniCount) miniCount.textContent = `(${itinerary.length})`;

  const savedList = document.getElementById("savedList");
  const emptyMsg = document.getElementById("emptyMessage");
  if (savedList) {
    if (itinerary.length === 0) {
      savedList.innerHTML = ``;
      if (emptyMsg) emptyMsg.style.display = `block`;
    } else {
      if (emptyMsg) emptyMsg.style.display = `none`;
      savedList.innerHTML = itinerary.map(item => `<li>${item.name} (${item.location})</li>`).join(``);
    }
  }

  const miniContainer = document.getElementById("miniSavedList");
  if (miniContainer) {
    if (itinerary.length === 0) {
      miniContainer.innerHTML = `<p>✨ No attractions saved yet. Go to Home or Attractions page and save some!</p>`;
    } else {
      const ul = document.createElement(`ul`);
      ul.style.listStyleType = `none`;
      ul.style.paddingLeft = `0`;
      itinerary.forEach(att => {
        const li = document.createElement(`li`);
        li.textContent = `📍 ${att.name}`;
        ul.appendChild(li);
      });
      miniContainer.innerHTML = ``;
      miniContainer.appendChild(ul);
    }
  }
}

function addToItinerary(attractionObj) {
  let current = getStoredItinerary();
  const alreadyExists = current.some(item => item.id === attractionObj.id);
  if (alreadyExists) {
    alert(`⚠️ "${attractionObj.name}" is already in your itinerary.`);
    return false;
  }
  current.push(attractionObj);
  saveItinerary(current);
  alert(`✅ Added "${attractionObj.name}" to your travel plan!`);
  return true;
}

function clearItinerary() {
  if (confirm(`Are you sure you want to remove all saved attractions?`)) {
    saveItinerary([]);
    alert(`🗑️ Itinerary cleared.`);
  }
}

const attractionsData = [
  { id: `bwindi`, name: `Bwindi Impenetrable Forest`, location: `Southwest Uganda`, desc: `Half of the world's mountain gorillas — lifetime trekking.`, img: `image/bwindi-np.webp` },
  { id: `murchison`, name: `Murchison Falls`, location: `Northwest`, desc: `The Nile explodes through a 7m gorge; boat safaris.`, img: `image/murchison.webp` },
  { id: `lakebunyonyi`, name: `Lake Bunyonyi`, location: `Kabale`, desc: `Canoeing, island hopping and stunning terraces.`, img: `image/lake-bunyonyi.webp` },
  { id: `queenelizabeth`, name: `Queen Elizabeth NP`, location: `Western Uganda`, desc: `Tree-climbing lions, Kazinga Channel.`, img: `image/queen-elizabeth.webp` }
];

function renderAttractionCards() {
  const container = document.getElementById(`attractionsGrid`);
  if (!container) return;
  container.innerHTML = attractionsData.map(att => `
    <div class="card">
      <img src="${att.img}" alt="${att.name}" loading="lazy" class="card-img">
      <div class="card-body">
        <h3>${att.name}</h3>
        <p class="location">📍 ${att.location}</p>
        <p>${att.desc}</p>
        <button class="btn-save" data-id="${att.id}" data-name="${att.name}" data-location="${att.location}">🗺️ Save to my plan</button>
      </div>
    </div>
  `).join(``);
}

document.body.addEventListener(`click`, (e) => {
  const btn = e.target.closest(`.btn-save`);
  if (!btn) return;
  const id = btn.dataset.id;
  const name = btn.dataset.name;
  const location = btn.dataset.location;
  const img = btn.getAttribute(`data-img`) || ``;
  if (!id || !name) {
    console.warn(`Save button missing data-id or data-name`, btn);
    return;
  }
  addToItinerary({ id, name, location, img, desc: `` });
});

document.addEventListener(`click`, (e) => {
  if (e.target.id === `clearMiniBtn`) clearItinerary();
});

function setupPlanForm() {
  const form = document.getElementById(`tripForm`);
  if (!form) return;
  form.addEventListener(`submit`, (e) => {
    e.preventDefault();
    const name = document.getElementById(`name`).value.trim();
    const email = document.getElementById(`email`).value.trim();
    const travelers = document.getElementById(`travelers`).value;
    const interests = Array.from(document.querySelectorAll(`input[name='interests']:checked`)).map(cb => cb.value);
    const message = document.getElementById(`message`).value;
    if (!name || !email) {
      document.getElementById(`formFeedback`).innerHTML = `<span style='color:#c00'>Please fill name and email.</span>`;
      return;
    }
    const savedItinerary = getStoredItinerary();
    const interestsText = interests.length ? interests.join(`, `) : `None selected`;
    const confirmation = `
      <div style="background:#e0f0e8; padding:1rem; border-radius:20px;">
        ✅ <strong>Thanks ${name}!</strong> Your request has been saved locally.<br>
        📧 We'll contact you at ${email}.<br>
        👥 Travelers: ${travelers}<br>
        🎯 Interests: ${interestsText}<br>
        📝 Extra: ${message || `—`}<br>
        🧳 You have ${savedItinerary.length} saved attractions on your plan.
      </div>
    `;
    document.getElementById(`formFeedback`).innerHTML = confirmation;
    localStorage.setItem(`lastTripRequest`, JSON.stringify({ name, email, travelers, interests, message, timestamp: new Date().toISOString() }));
    form.reset();
  });
}

const funFacts = [
  `Uganda is home to over 1,060 bird species — over 50% of Africa's bird species!`,
  `The Nile River starts its 6,650km journey from Lake Victoria in Uganda.`,
  `Bwindi forest shelters more than half of the world's remaining mountain gorillas.`,
  `Uganda's local 'Rolex' is a delicious rolled chapati with eggs and veggies.`,
  `The Kasubi Tombs are built entirely with vegetal materials: wood, thatch, reeds.`
];

function showRandomFact() {
  const factEl = document.getElementById(`randomFact`);
  if (factEl) {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    factEl.textContent = funFacts[randomIndex];
  }
}

function setupContactFacts() {
  const btn = document.getElementById(`newFactBtn`);
  if (btn) {
    showRandomFact();
    btn.addEventListener(`click`, showRandomFact);
  }
}

function setFooterDates() {
  const yearSpan = document.getElementById(`currentYear`);
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  const lastModSpan = document.getElementById(`lastModified`);
  if (lastModSpan) lastModSpan.textContent = document.lastModified;
}

document.addEventListener(`DOMContentLoaded`, () => {
  renderAttractionCards();
  updateAllItineraryDisplays();
  setupPlanForm();
  setupContactFacts();
  setFooterDates();
});