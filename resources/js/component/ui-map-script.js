document.addEventListener("DOMContentLoaded", function () {

  // ==========================
  // 1️⃣ DOM 요소 가져오기
  // ==========================
  const rightPanel = document.getElementById("rightWrap");
  const leftPanel = document.getElementById("leftWrap");
  const rightToggleBtn = document.getElementById("rightToggleBtn");
  const leftToggleBtn = document.getElementById("leftToggleBtn");
  const moveTargets = document.querySelectorAll(".index-map, .map-btnlist, .legend-list");
  const searchGroup = document.querySelector(".search-group");
  const resultGroup = document.querySelector(".result-group");
  const todayText = document.querySelector(".todaytext");
  const centerList = document.querySelector(".center-list");
  const weatherGroup = document.querySelector(".weather-group");

  // ==========================
  // 2️⃣ todayText / centerList 반응형 표시
  // ==========================
  function updateTodayText() {
    if (!todayText) return;

    if (window.innerWidth <= 1024) {
      if (leftPanel.classList.contains("open") || rightPanel.classList.contains("open")) {
        todayText.style.display = "none";
        if (centerList) centerList.style.display = "none";
      } else {
        todayText.style.display = "flex";
        if (centerList) centerList.style.display = "block";
      }
    } else {
      todayText.style.display = "flex";
      if (centerList) centerList.style.display = "none";
    }
  }
  window.addEventListener("resize", updateTodayText);
  updateTodayText();

  // ==========================
  // 3️⃣ 오른쪽 패널 토글
  // ==========================
  function toggleRightPanel() {
    let isOpen;
    if (window.innerWidth <= 1024) {
      isOpen = rightPanel.classList.toggle("open");
      rightPanel.classList.toggle("fullscreen", isOpen);
    } else {
      rightPanel.classList.remove("fullscreen");
      isOpen = rightPanel.classList.toggle("open");
      moveTargets.forEach(el => el.classList.toggle("shifted", isOpen));
    }

    if (resultGroup) resultGroup.classList.toggle("active", isOpen);
    updateTodayText();
  }

  // ==========================
  // 4️⃣ 왼쪽 패널 토글
  // ==========================
  function toggleLeftPanel() {
    let isOpen;
    if (window.innerWidth <= 1024) {
      isOpen = leftPanel.classList.toggle("open");
      leftPanel.classList.toggle("fullscreen", isOpen);
    } else {
      leftPanel.classList.remove("fullscreen");
      isOpen = leftPanel.classList.toggle("open");
      moveTargets.forEach(el => el.classList.toggle("shifted-left", isOpen));
    }

    if (searchGroup) searchGroup.classList.toggle("active", isOpen);
    updateTodayText();
  }

  // ==========================
  // 5️⃣ weather-group 클릭 시 center-list 슬라이드 + 색상 유지
  // ==========================
  if (weatherGroup && centerList) {
    weatherGroup.addEventListener("click", function () {
      const isActive = weatherGroup.classList.toggle("active");
      if (isActive) {
        centerList.classList.add("slide-down");
        centerList.classList.remove("slide-up");
      } else {
        centerList.classList.add("slide-up");
        centerList.classList.remove("slide-down");
      }
    });
  }

  // ==========================
  // 6️⃣ 버튼 이벤트 등록
  // ==========================
  if (rightToggleBtn) rightToggleBtn.addEventListener("click", toggleRightPanel);
  if (resultGroup) resultGroup.addEventListener("click", toggleRightPanel);
  if (leftToggleBtn) leftToggleBtn.addEventListener("click", toggleLeftPanel);
  if (searchGroup) searchGroup.addEventListener("click", toggleLeftPanel);

  // 날짜/시간 그룹
  document.querySelectorAll(".date-group, .time-group").forEach(group => {
    const toggleBtn = group.querySelector("button");
    if (!toggleBtn) return;
    toggleBtn.addEventListener("click", () => group.classList.toggle("open"));
  });

  // legend-list
  document.querySelectorAll(".legend-list").forEach(legend => {
    const toggleBtn = legend.querySelector(".map-btnbox-bottom button");
    if (!toggleBtn) return;
    toggleBtn.addEventListener("click", () => legend.classList.toggle("open"));
  });

  // 날짜 버튼 그룹
  document.querySelectorAll('.date-list > button').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 시간 버튼 그룹
  document.querySelectorAll('.time-list > button').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // 헤더 맵 버튼 그룹
  document.querySelectorAll(".headermap-list > button").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  // ==========================
  // 7️⃣ main-row 클릭 시 detail-row 슬라이드
  // ==========================
  document.querySelectorAll('.main-row').forEach(row => {
  row.addEventListener('click', () => {
    const nextRow = row.nextElementSibling;

    // detail-row 맞는지 확인
    if (!nextRow || !nextRow.classList.contains('detail-row')) return;

    // 이미 열려있으면 닫기
    if (nextRow.classList.contains('show')) {
      nextRow.classList.remove('show');
    } else {
      // 다른 열려있는 detail-row 닫기
      document.querySelectorAll('.detail-row.show').forEach(r => r.classList.remove('show'));
      // 클릭한 row의 detail-row 열기
      nextRow.classList.add('show');
    }
  });
});

});