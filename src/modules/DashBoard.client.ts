/* eslint-disable max-lines */
import ApexCharts from 'apexcharts';

// =============================
// 1) デモ用のAIインサイト／提案 (省略 or サンプル追加)
//    ... ここでは省略可能。本編でAI提案などをまとめている場合はそこに統合
// =============================

export const AI_INSIGHT_DATA = {
  storeName: '○○店',
  latestTrend: {
    title: '○○店の最新トレンド',
    highlight: '直近1ヶ月で当店の会員登録数が10%増加し、特に夕方(18〜20時)の混雑率が上昇傾向。',
    bulletPoints: [
      '平日夕方の予約率: 70% (先月比+8%)',
      '20〜30代女性が全体の60%に',
      '土曜朝(9〜11時)の予約率60%超',
      '夜間(21時以降)の利用率が低め',
    ],
    ctaText: '詳しく見る',
  },
  futureClasses: {
    title: 'AI提案: 店舗スタッフ対応の新クラス',
    desc: '短時間レッスンや早朝クラスの需要が増加見込み。スタッフ主導で導入できる施策を提案します。',
    bulletPoints: [
      '朝ヨガ30分コース: 平日早朝に短縮レッスンを1コマ追加',
      '夕方時短プログラム: 18時台に30分レッスンを開設し混雑を分散',
      '店頭予約サポート: スタッフによる空きクラス案内・クロスセル (アプリ不要)',
    ],
    ctaText: '詳しく見る',
  },
  shiftCampaign: {
    title: 'AI提案: シフト & キャンペーン',
    desc: '来店データをもとに、スタッフ配置や店頭キャンペーンを最適化する案を提示。',
    bulletPoints: [
      'ピーク対策: 平日18〜20時に2名のインストラクターを確保＋受付サポート要員',
      '学生割引: 土日14時台に学生が多いので店頭で学割プランを追加提案',
      '夜間帯のテコ入れ: 21時以降の利用者向けに「ナイトプラン」割引券を配布',
    ],
    ctaText: '詳しく見る',
  },
  newMembers: {
    title: 'AI提案: 新規入会促進 & イベント',
    desc: '当店では平日昼間や土曜午後に初回体験が集中。店舗レベルで行える施策を提案します。',
    bulletPoints: [
      'トライアル強化: 平日昼間の初回体験枠増設＆店頭で次回予約促進',
      '回数券の当日割引: 登録日当日のみ有効なクーポンを手渡し → リピート率UP',
      'ミニイベント開催: 店舗スペースでヨガグッズ試用会や健康相談会を実施',
    ],
    ctaText: '詳しく見る',
  },
};

// =============================
// 2) チャートオプション: 各種チャート + 時間帯別混雑率
// =============================

// =============================
// チャートオプション
// =============================

// ▼ 1) メインチャート: 「今週の入店者数」「先週の入店者数」
const getMainChartOptions = () => {
  let mainChartColors = {};

  if (document.documentElement.classList.contains('dark')) {
    mainChartColors = {
      borderColor: '#374151',
      labelColor: '#9CA3AF',
      opacityFrom: 0,
      opacityTo: 0.15,
    };
  } else {
    mainChartColors = {
      borderColor: '#F3F4F6',
      labelColor: '#6B7280',
      opacityFrom: 0.45,
      opacityTo: 0,
    };
  }

  return {
    chart: {
      height: 420,
      type: 'area',
      fontFamily: 'Inter, sans-serif',
      foreColor: mainChartColors.labelColor,
      toolbar: { show: false },
    },
    fill: {
      type: 'gradient',
      gradient: {
        enabled: true,
        opacityFrom: mainChartColors.opacityFrom,
        opacityTo: mainChartColors.opacityTo,
      },
    },
    dataLabels: { enabled: false },
    tooltip: {
      style: { fontSize: '14px', fontFamily: 'Inter, sans-serif' },
      y: {
        formatter(value) {
          return `${value} 人`;
        },
      },
    },
    grid: {
      show: true,
      borderColor: mainChartColors.borderColor,
      strokeDashArray: 1,
      padding: { left: 35, bottom: 15 },
    },
    series: [
      {
        // 今週の入店者数: 7日合計=975を想定 (例: 80,95,110,120,150,200,220)
        name: '今週の入店者数',
        data: [80, 95, 110, 120, 150, 200, 220],
        color: '#1A56DB',
      },
      {
        // 先週の入店者数: 参考値
        name: '先週の入店者数',
        data: [70, 80, 100, 110, 130, 180, 200],
        color: '#FDBA8C',
      },
    ],
    markers: {
      size: 5,
      strokeColors: '#ffffff',
      hover: { sizeOffset: 3 },
    },
    xaxis: {
      categories: [
        '2月1日',
        '2月2日',
        '2月3日',
        '2月4日',
        '2月5日',
        '2月6日',
        '2月7日',
      ],
      labels: {
        style: {
          colors: [mainChartColors.labelColor],
          fontSize: '14px',
          fontWeight: 500,
        },
      },
      axisBorder: { color: mainChartColors.borderColor },
      axisTicks: { color: mainChartColors.borderColor },
      crosshairs: {
        show: true,
        stroke: {
          color: mainChartColors.borderColor,
          width: 1,
          dashArray: 10,
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: [mainChartColors.labelColor],
          fontSize: '14px',
          fontWeight: 500,
        },
        formatter(value) {
          return `${value} 人`;
        },
      },
    },
    legend: {
      fontSize: '14px',
      fontWeight: 500,
      fontFamily: 'Inter, sans-serif',
      labels: { colors: [mainChartColors.labelColor] },
      itemMargin: { horizontal: 10 },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          xaxis: {
            labels: { show: false },
          },
        },
      },
    ],
  };
};

// ▼ 2) 時間帯別混雑率チャート
//    8時～21時(14時間枠)を棒グラフで表現
const getTimeChartOptions = () => {
  let chartColors = {};
  if (document.documentElement.classList.contains('dark')) {
    chartColors = {
      borderColor: '#374151',
      labelColor: '#9CA3AF',
    };
  } else {
    chartColors = {
      borderColor: '#F3F4F6',
      labelColor: '#6B7280',
    };
  }

  return {
    chart: {
      height: 300,
      type: 'bar',
      fontFamily: 'Inter, sans-serif',
      foreColor: chartColors.labelColor,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 3,
        columnWidth: '60%',
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: chartColors.borderColor,
      strokeDashArray: 1,
    },
    tooltip: {
      style: { fontSize: '14px', fontFamily: 'Inter, sans-serif' },
      y: {
        formatter(value) {
          return `${value}%`;
        },
      },
    },
    series: [
      {
        name: '混雑率',
        data: [5, 10, 15, 25, 40, 60, 50, 40, 30, 25, 40, 50, 25, 10],
        color: '#10B981',
      },
    ],
    xaxis: {
      categories: [
        '8時', '9時', '10時', '11時', '12時', '13時', '14時',
        '15時', '16時', '17時', '18時', '19時', '20時', '21時',
      ],
      axisBorder: { color: chartColors.borderColor },
      axisTicks: { color: chartColors.borderColor },
    },
    yaxis: {
      labels: {
        style: { colors: [chartColors.labelColor], fontSize: '14px' },
        formatter(value) {
          return `${value}%`;
        },
      },
    },
    legend: { show: false },
  };
};

// ▼ 3) 年齢分布チャート (10代～60代以上)
const getAgeChartOptions = () => {
  let chartColors = {};
  if (document.documentElement.classList.contains('dark')) {
    chartColors = {
      borderColor: '#374151',
      labelColor: '#9CA3AF',
    };
  } else {
    chartColors = {
      borderColor: '#F3F4F6',
      labelColor: '#6B7280',
    };
  }

  return {
    chart: {
      height: 300,
      type: 'bar',
      fontFamily: 'Inter, sans-serif',
      foreColor: chartColors.labelColor,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 3,
        columnWidth: '50%',
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: chartColors.borderColor,
      strokeDashArray: 1,
    },
    tooltip: {
      style: { fontSize: '14px', fontFamily: 'Inter, sans-serif' },
      y: {
        formatter(value) {
          return `${value} 人`;
        },
      },
    },
    // 例: 10代=10, 20代=200, 30代=150, 40代=80, 50代=20, 60代以上=0
    series: [
      {
        name: '人数',
        data: [10, 200, 150, 80, 20, 0],
      },
    ],
    xaxis: {
      categories: ['10代', '20代', '30代', '40代', '50代', '60代以上'],
      axisBorder: { color: chartColors.borderColor },
      axisTicks: { color: chartColors.borderColor },
    },
    yaxis: {
      labels: {
        style: { colors: [chartColors.labelColor], fontSize: '14px' },
        formatter(value) {
          return `${value} 人`;
        },
      },
    },
    legend: { show: false },
  };
};

// ▼ 4) 性別比率チャート (ドーナツ)
const getGenderChartOptions = () => {
  let chartColors = {};
  if (document.documentElement.classList.contains('dark')) {
    chartColors = {
      labelColor: '#9CA3AF',
      strokeColor: '#1F2937',
    };
  } else {
    chartColors = {
      labelColor: '#6B7280',
      strokeColor: '#FFFFFF',
    };
  }

  return {
    chart: {
      height: 300,
      type: 'donut',
      fontFamily: 'Inter, sans-serif',
      toolbar: { show: false },
    },
    // 男性10%, 女性90%, その他0%
    labels: ['男性', '女性', 'その他'],
    series: [10, 90, 0],
    colors: ['#1A56DB', '#FDBA8C', '#10B981'],
    stroke: { colors: [chartColors.strokeColor] },
    dataLabels: { enabled: true },
    legend: {
      position: 'bottom',
      fontSize: '14px',
      labels: { colors: [chartColors.labelColor] },
    },
    tooltip: {
      style: { fontSize: '14px', fontFamily: 'Inter, sans-serif' },
      y: {
        formatter(value) {
          return `${value}%`;
        },
      },
    },
  };
};

// ▼ 5) 推定属性チャート (横棒)
const getAttributeChartOptions = () => {
  let chartColors = {};
  if (document.documentElement.classList.contains('dark')) {
    chartColors = {
      borderColor: '#374151',
      labelColor: '#9CA3AF',
    };
  } else {
    chartColors = {
      borderColor: '#F3F4F6',
      labelColor: '#6B7280',
    };
  }

  return {
    chart: {
      height: 300,
      type: 'bar',
      fontFamily: 'Inter, sans-serif',
      foreColor: chartColors.labelColor,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 3,
      },
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: chartColors.borderColor,
      strokeDashArray: 1,
    },
    tooltip: {
      style: { fontSize: '14px', fontFamily: 'Inter, sans-serif' },
      y: {
        formatter(value) {
          return `${value} 人`;
        },
      },
    },
    // 例: オフィスワーカー=250, 学生=50, その他=0
    series: [
      {
        name: '推定人数',
        data: [250, 50, 0],
        color: '#6366F1',
      },
    ],
    xaxis: {
      categories: ['オフィスワーカー', '学生', 'その他'],
      axisBorder: { color: chartColors.borderColor },
      axisTicks: { color: chartColors.borderColor },
    },
    yaxis: {
      labels: { style: { colors: [chartColors.labelColor] } },
    },
  };
};

// ▼ 6) 部分的な占有率チャート (セミ・サークルラディアルバー)
const getOccupancyChartOptions = () => {
  let chartColors = {};
  if (document.documentElement.classList.contains('dark')) {
    chartColors = {
      labelColor: '#9CA3AF',
      trackColor: '#374151',
    };
  } else {
    chartColors = {
      labelColor: '#6B7280',
      trackColor: '#F3F4F6',
    };
  }

  return {
    chart: {
      height: 300,
      type: 'radialBar',
      fontFamily: 'Inter, sans-serif',
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: { size: '50%' },
        track: {
          background: chartColors.trackColor,
          strokeWidth: '100%',
          margin: 10,
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: '14px',
            offsetY: -5,
          },
          value: {
            show: true,
            fontSize: '16px',
            offsetY: 5,
            formatter(val) {
              return `${val}%`;
            },
          },
        },
      },
    },
    series: [75, 40], // 例: シャワー75%, サウナ40%
    labels: ['シャワー', 'サウナ'],
    colors: ['#1A56DB', '#FDBA8C'],
    stroke: {
      lineCap: 'round',
    },
    legend: {
      show: true,
      fontSize: '14px',
      position: 'bottom',
      labels: {
        colors: [chartColors.labelColor],
      },
    },
  };
};

// =============================
// DOMにチャートを描画
// =============================

// 1) メインチャート (今週の入店者数 vs 先週)
if (document.getElementById('main-chart')) {
  const chart = new ApexCharts(document.getElementById('main-chart'), getMainChartOptions());
  chart.render();
  document.addEventListener('dark-mode', () => {
    chart.updateOptions(getMainChartOptions());
  });
}

// 2) 時間帯別混雑率
if (document.getElementById('time-chart')) {
  const chart = new ApexCharts(document.getElementById('time-chart'), getTimeChartOptions());
  chart.render();
  document.addEventListener('dark-mode', () => {
    chart.updateOptions(getTimeChartOptions());
  });
}

// 3) 年齢分布
if (document.getElementById('age-chart')) {
  const chart = new ApexCharts(document.getElementById('age-chart'), getAgeChartOptions());
  chart.render();
  document.addEventListener('dark-mode', () => {
    chart.updateOptions(getAgeChartOptions());
  });
}

// 4) 性別比率
if (document.getElementById('gender-chart')) {
  const chart = new ApexCharts(document.getElementById('gender-chart'), getGenderChartOptions());
  chart.render();
  document.addEventListener('dark-mode', () => {
    chart.updateOptions(getGenderChartOptions());
  });
}

// 5) 推定属性
if (document.getElementById('attribute-chart')) {
  const chart = new ApexCharts(document.getElementById('attribute-chart'), getAttributeChartOptions());
  chart.render();
  document.addEventListener('dark-mode', () => {
    chart.updateOptions(getAttributeChartOptions());
  });
}

// 6) 部分的な占有率 (セミ・サークルラディアルバー)
if (document.getElementById('occupancy-chart')) {
  const chart = new ApexCharts(document.getElementById('occupancy-chart'), getOccupancyChartOptions());
  chart.render();
  document.addEventListener('dark-mode', () => {
    chart.updateOptions(getOccupancyChartOptions());
  });
}