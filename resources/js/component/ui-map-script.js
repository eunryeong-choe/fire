document.addEventListener("DOMContentLoaded", function () {
  const rightPanel = document.getElementById("rightWrap");
  const leftPanel = document.getElementById("leftWrap");
  const toggleBtn = document.getElementById("rightToggleBtn");
  const leftToggleBtn = document.getElementById("leftToggleBtn");
  const moveTargets = document.querySelectorAll(".index-map, .map-btnlist, .legend-list");
  const searchGroup = document.querySelector(".search-group");
  const resultGroup = document.querySelector(".result-group");
  const todayText = document.querySelector(".todaytext");
  const centerList = document.querySelector(".center-list");

function updateTodayText() {
  if (window.innerWidth <= 1024) {
    if (leftPanel.classList.contains("open") || rightPanel.classList.contains("open")) {
      todayText.style.display = "none";
      if (centerList) centerList.style.display = "none"; // ✅ 패널 열리면 숨김
    } else {
      todayText.style.display = "flex"; // 원래 flex였으면 flex
      if (centerList) centerList.style.display = "block"; // ✅ 패널 닫히면 보이기
    }
  } else {
    todayText.style.display = "flex"; // 1024px 이상이면 항상 보이게
    if (centerList) centerList.style.display = "none"; // ✅ 1024 초과에서는 항상 숨김
  }
}

// ✅ 창 크기 변경 시에도 즉시 반영되도록 이벤트 등록
window.addEventListener("resize", updateTodayText);

// ✅ 초기 실행
updateTodayText();

  // ----- 오른쪽 패널 토글 -----
  function toggleRightPanel() {
    if (window.innerWidth <= 1024) {
      const isOpen = rightPanel.classList.toggle("open");
      rightPanel.classList.toggle("fullscreen", isOpen);
    } else {
      rightPanel.classList.remove("fullscreen");
      const isOpen = rightPanel.classList.toggle("open");
      moveTargets.forEach(el => {
        el.classList.toggle("shifted", isOpen);
      });
    }
    updateTodayText();
  }

  // ----- 왼쪽 패널 토글 -----
  function toggleLeftPanel() {
    if (window.innerWidth <= 1024) {
      const isOpen = leftPanel.classList.toggle("open");
      leftPanel.classList.toggle("fullscreen", isOpen);
    } else {
      leftPanel.classList.remove("fullscreen");
      const isOpen = leftPanel.classList.toggle("open");
      moveTargets.forEach(el => {
        el.classList.toggle("shifted-left", isOpen);
      });
    }
    updateTodayText();
  }

  // ----- 이벤트 리스너 -----
  if (toggleBtn) toggleBtn.addEventListener("click", toggleRightPanel);
  if (resultGroup) resultGroup.addEventListener("click", toggleRightPanel);
  if (leftToggleBtn) leftToggleBtn.addEventListener("click", toggleLeftPanel);
  if (searchGroup) searchGroup.addEventListener("click", toggleLeftPanel);


  const dateGroups = document.querySelectorAll(".date-group, .time-group");

  dateGroups.forEach(group => {
    const toggleBtn = group.querySelector("button");
    const dateList = group.querySelector("div");

    if (toggleBtn && dateList) {
      toggleBtn.addEventListener("click", () => {
        group.classList.toggle("open");
      });
    }
  });

  const legendLists = document.querySelectorAll(".legend-list");

  legendLists.forEach(legend => {
    const toggleBtn = legend.querySelector(".map-btnbox-bottom button");

    toggleBtn.addEventListener("click", () => {
      legend.classList.toggle("open");
    });
  });

  const dateButtons = document.querySelectorAll('.date-list > button');
  dateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      dateButtons.forEach(b => b.classList.remove('active')); // 그룹 내에서만 제거
      btn.classList.add('active');
    });
  });

  // time-list 버튼 그룹
  const timeButtons = document.querySelectorAll('.time-list > button');
  timeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      timeButtons.forEach(b => b.classList.remove('active')); // 그룹 내에서만 제거
      btn.classList.add('active');
    });
  });  
});





