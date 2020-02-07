'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP_X = 15;
var FONT_GAP_Y = 15;
var COLUMN_GAP_Y = 20;
var TEXT_WIDTH = 80;
var TEXT_HEIGHT = 20;
var BAR_MAX_HEIGHT = 150;
var BAR_WIDTH = 40;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  if (arr.length === 0) {
    return 'Массив пустой';
  }
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + FONT_GAP_Y + TEXT_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + FONT_GAP_Y + TEXT_HEIGHT * 2);

  var maxTime = getMaxElement(times);

  var getRandomBlue = function () {
    return 'hsl(240, ' + Math.floor(Math.random() * 100).toString(10) + '%, 25%)';
  };

  for (var i = 0; i < players.length; i++) {
    ctx.fillText(players[i], CLOUD_X + FONT_GAP_X + GAP + (FONT_GAP_X + GAP + TEXT_WIDTH) * i, CLOUD_HEIGHT - FONT_GAP_X);
    ctx.fillStyle = getRandomBlue();
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'red';
    }
    ctx.fillRect(CLOUD_X + FONT_GAP_X + GAP + (FONT_GAP_X + GAP + TEXT_WIDTH) * i, CLOUD_Y + COLUMN_GAP_Y + TEXT_HEIGHT * 3, BAR_WIDTH, BAR_MAX_HEIGHT);
    ctx.fillStyle = '#fff';
    ctx.fillRect(CLOUD_X + FONT_GAP_X + GAP + (FONT_GAP_X + GAP + TEXT_WIDTH) * i, CLOUD_Y + COLUMN_GAP_Y + TEXT_HEIGHT * 3, BAR_WIDTH, BAR_MAX_HEIGHT - BAR_MAX_HEIGHT * times[i] / maxTime);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + FONT_GAP_X + GAP + (FONT_GAP_X + GAP + TEXT_WIDTH) * i, 1.57 * BAR_MAX_HEIGHT - BAR_MAX_HEIGHT * times[i] / maxTime);
  }
};
