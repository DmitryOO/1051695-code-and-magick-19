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
var WHITE_COLOR = '#fff';
var BLACK_COLOR = '#000';
var SHADOW_COLOR = 'rgb(0, 0, 0, 0.7)';
var YOUR_COLOR = 'red';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  if (arr.length !== 0) {
    var maxElement = arr[0];
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }
    return maxElement;
  } else {
    throw Error('Массив пустой');
  }
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, WHITE_COLOR);

  ctx.fillStyle = BLACK_COLOR;
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + FONT_GAP_Y + TEXT_HEIGHT);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + FONT_GAP_Y + TEXT_HEIGHT * 2);

  var maxTime = getMaxElement(times);

  var getPlayerColor = function (names) {
    if (names[i] === 'Вы') {
      return YOUR_COLOR;
    }
    return 'hsl(240, ' + Math.floor(Math.random() * 100).toString(10) + '%, 25%)';
  };

  var getColumn = function (names, results) {
    var playerGap = CLOUD_X + FONT_GAP_X + GAP + (FONT_GAP_X + GAP + TEXT_WIDTH) * i;

    ctx.fillText(names[i], playerGap, CLOUD_HEIGHT - FONT_GAP_X);
    ctx.fillStyle = getPlayerColor(names);
    ctx.fillRect(playerGap, CLOUD_Y + COLUMN_GAP_Y + TEXT_HEIGHT * 3, BAR_WIDTH, BAR_MAX_HEIGHT);
    ctx.fillStyle = WHITE_COLOR;
    ctx.fillRect(playerGap, CLOUD_Y + COLUMN_GAP_Y + TEXT_HEIGHT * 3, BAR_WIDTH, BAR_MAX_HEIGHT - BAR_MAX_HEIGHT * results[i] / maxTime);
    ctx.fillStyle = BLACK_COLOR;
    ctx.fillText(Math.round(results[i]), playerGap, 1.57 * BAR_MAX_HEIGHT - BAR_MAX_HEIGHT * results[i] / maxTime);
  };

  for (var i = 0; i < players.length; i++) {
    getColumn(players, times);
  }
};
