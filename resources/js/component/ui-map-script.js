document.addEventListener("DOMContentLoaded", function () {
  /*패널 */
  const rightPanel = document.getElementById("rightWrap");
  const leftPanel = document.getElementById("leftWrap");
  const toggleBtn = document.getElementById("rightToggleBtn");
  const leftToggleBtn = document.getElementById("leftToggleBtn");
  const moveTargets = document.querySelectorAll(".index-map, .map-btnlist, .legend-list");
  const rightPanelWidth = 49.6;
  const leftPanelWidth = 49.6;
  const extraGap = 10; 

  toggleBtn.addEventListener("click", () => {
    const isOpen = rightPanel.classList.toggle("open"); // 패널 열기/닫기 토글

    moveTargets.forEach(el => {
      if (isOpen) {
        el.classList.add("shifted"); 
      } else {
        el.classList.remove("shifted"); 
      }
    });
  });

  leftToggleBtn.addEventListener("click", () => {
    const isOpen = leftPanel.classList.toggle("open");

    moveTargets.forEach(el => {
      if (isOpen) {
        el.classList.add("shifted-left");
      } else {
        el.classList.remove("shifted-left");
      }
    });
  });

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
