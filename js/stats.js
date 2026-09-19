// ===== 统计模块：加载 data.json 并用 ECharts 渲染使用量柱状图 =====

const CHART_DOM = document.getElementById('usage-chart');
const ERROR_DOM = document.getElementById('chart-error');

// fetch 失败时显示提示（file:// 下会被 CORS 拦截，正可作为"断网提示"自查点）
function showError(msg) {
  if (ERROR_DOM) {
    ERROR_DOM.textContent = msg;
    ERROR_DOM.classList.remove('d-none');
  }
  if (CHART_DOM) CHART_DOM.style.display = 'none';
}

// ECharts 未加载兜底
if (typeof echarts === 'undefined') {
  showError('图表库未加载，请检查网络或本地 ECharts 资源。');
} else {
  const chart = echarts.init(CHART_DOM);

  fetch('data.json')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(data => {
      CHART_DOM.style.display = '';
      ERROR_DOM.classList.add('d-none');

      const names  = data.rooms.map(r => r.name);
      const usages = data.rooms.map(r => r.usage);
      const unit   = data.unit || '人次';

      chart.setOption({
        title: {
          text: `${data.week || '本周'} 自习室使用量`,
          left: 'center',
          textStyle: { fontSize: 16 }
        },
        tooltip: {
          trigger: 'axis',
          formatter: p => `${p[0].name}<br/>使用量: <b>${p[0].value}</b> ${unit}`
        },
        grid: { left: 50, right: 20, top: 60, bottom: 60 },
        xAxis: {
          type: 'category',
          data: names,
          axisLabel: { rotate: 30, interval: 0 }
        },
        yAxis: {
          type: 'value',
          name: unit
        },
        series: [{
          type: 'bar',
          data: usages,
          itemStyle: {
            color: '#0d6efd',
            borderRadius: [6, 6, 0, 0]
          },
          barWidth: '50%',
          label: {
            show: true,
            position: 'top',
            color: '#333'
          }
        }]
      });

      window.addEventListener('resize', () => chart.resize());
    })
    .catch(err => {
      showError(`加载 data.json 失败：${err.message}。请通过本地服务器（如 python -m http.server）访问，避免 file:// 协议的 CORS 限制。`);
    });
}
