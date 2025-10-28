document.addEventListener("DOMContentLoaded", function () {

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



  if (rightToggleBtn) rightToggleBtn.addEventListener("click", toggleRightPanel);
  if (resultGroup) resultGroup.addEventListener("click", toggleRightPanel);
  if (leftToggleBtn) leftToggleBtn.addEventListener("click", toggleLeftPanel);
  if (searchGroup) searchGroup.addEventListener("click", toggleLeftPanel);


  document.querySelectorAll(".date-group, .time-group").forEach(group => {
    const toggleBtn = group.querySelector("button");
    if (!toggleBtn) return;
    toggleBtn.addEventListener("click", () => group.classList.toggle("open"));
  });


  document.querySelectorAll(".legend-list").forEach(legend => {
    const toggleBtn = legend.querySelector(".map-btnbox-bottom button");
    if (!toggleBtn) return;
    toggleBtn.addEventListener("click", () => legend.classList.toggle("open"));
  });


  document.querySelectorAll('.date-list > button').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });


  document.querySelectorAll('.time-list > button').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  
  document.querySelectorAll(".headermap-list > button").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.parentElement.querySelectorAll('button').forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });


  // document.querySelectorAll('.main-row').forEach(row => {
  //   row.addEventListener('click', () => {
  //     const nextRow = row.nextElementSibling;

  //     if (!nextRow || !nextRow.classList.contains('detail-row')) return;

  //     const isActive = nextRow.classList.contains('active');

  //     // 모든 행 초기화
  //     document.querySelectorAll('.detail-row').forEach(r => r.classList.remove('active'));
  //     document.querySelectorAll('.main-row').forEach(r => r.classList.remove('active'));

  //     // 클릭한 행만 열기
  //     if (!isActive) {
  //       nextRow.classList.add('active');
  //       row.classList.add('active'); 
  //     }
  //   });
  // });

  document.querySelectorAll('.main-row').forEach(row => {
    row.addEventListener('click', () => {
      const list = [];
      let nextRow = row.nextElementSibling;

      while (nextRow && nextRow.classList.contains('detail-row')) {
        list.push(nextRow);
        
        nextRow = nextRow.nextElementSibling;
      }
      const isOpen = list.every((detailRow) => detailRow.classList.contains('active'));
      document.querySelectorAll('.detail-row.active').forEach(r => r.classList.remove('active'));
      document.querySelectorAll('.main-row.active').forEach(r => r.classList.remove('active'));

      if (!isOpen) {
        list.forEach(detailRow => {
          detailRow.classList.add('active');
        });
        row.classList.add('active');
      }
      
    });
  });
});