// ===== 自习室模块：写死数据 + 楼层/开放状态筛选 =====

// 自习室数据（写死在 JS 数组中）
const rooms = [
  { name: '图书馆101自习室', building: '图书馆', floor: 1, open: true,  free: 28, total: 60, hours: '07:00 - 22:30' },
  { name: '主教学楼A102自习室', building: '主教学楼', floor: 1, open: true,  free: 12, total: 45, hours: '08:00 - 21:30' },
  { name: '图书馆203自习室', building: '图书馆', floor: 2, open: true,  free: 5,  total: 50, hours: '07:00 - 22:30' },
  { name: '主教学楼A205自习室', building: '主教学楼', floor: 2, open: false, free: 0,  total: 40, hours: '08:00 - 21:30' },
  { name: '图书馆305自习室', building: '图书馆', floor: 3, open: true,  free: 33, total: 70, hours: '07:00 - 22:30' },
  { name: '主教学楼B301自习室', building: '主教学楼', floor: 3, open: false, free: 0,  total: 35, hours: '08:00 - 21:30' },
  { name: '主教学楼B402自习室', building: '主教学楼', floor: 4, open: true,  free: 8,  total: 38, hours: '08:00 - 21:30' },
  { name: '图书馆401自习室', building: '图书馆', floor: 4, open: true,  free: 19, total: 55, hours: '07:00 - 22:30' }
];

// DOM 引用
const $floor  = document.getElementById('filter-floor');
const $status = document.getElementById('filter-status');
const $reset  = document.getElementById('filter-reset');
const $list   = document.getElementById('room-list');
const $count  = document.getElementById('room-count');

// 初始化楼层下拉（按数据自动去重生成）
function initFloorOptions() {
  const floors = [...new Set(rooms.map(r => r.floor))].sort((a, b) => a - b);
  floors.forEach(f => {
    const opt = document.createElement('option');
    opt.value = f;
    opt.textContent = `${f} 楼`;
    $floor.appendChild(opt);
  });
}

// 渲染自习室列表
function renderRooms() {
  const floor  = $floor.value;            // '' 或楼层字符串
  const status = $status.value;           // 'all' | 'open' | 'closed'

  const filtered = rooms.filter(r => {
    const okFloor  = floor === '' || String(r.floor) === String(floor);
    const okStatus =
      status === 'all' ||
      (status === 'open'   && r.open)  ||
      (status === 'closed' && !r.open);
    return okFloor && okStatus;
  });

  $count.textContent = `${filtered.length} 间`;

  if (filtered.length === 0) {
    $list.innerHTML = `
      <div class="col-12 text-center text-muted py-5">
        没有符合条件的自习室，试试调整筛选。
      </div>`;
    return;
  }

  $list.innerHTML = filtered.map(r => {
    const occRate = r.total === 0 ? 0 : Math.round((1 - r.free / r.total) * 100);
    const occBar  = r.open ? occRate : 100;
    const occColor = r.open
      ? (occRate >= 80 ? 'bg-danger' : occRate >= 50 ? 'bg-warning' : 'bg-success')
      : 'bg-secondary';
    const statusBadge = r.open
      ? '<span class="badge bg-success">开放中</span>'
      : '<span class="badge bg-secondary">已关闭</span>';

    return `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 shadow-sm room-card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start">
              <h6 class="card-title mb-0">${r.name}</h6>
              ${statusBadge}
            </div>
            <p class="text-muted small mb-2">${r.building} · ${r.floor} 楼 · ${r.hours}</p>

            <div class="d-flex justify-content-between small mb-1">
              <span>剩余座位</span>
              <span class="fw-bold">${r.free} / ${r.total}</span>
            </div>
            <div class="progress" style="height: 6px;">
              <div class="progress-bar ${occColor}" style="width: ${occBar}%"></div>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');
}

// 事件绑定
$floor.addEventListener('change', renderRooms);
$status.addEventListener('change', renderRooms);
$reset.addEventListener('click', () => {
  $floor.value  = '';
  $status.value = 'all';
  renderRooms();
});

// 初始化（默认楼层显示"全部"）
$floor.innerHTML = '<option value="">全部</option>';
initFloorOptions();
renderRooms();
