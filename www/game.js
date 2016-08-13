//(function () {
  'use strict';

  var two = new Two({
    fullscreen: true,
    autostart: true
  }).appendTo(document.body);

  var DIM = {
    boxSize: 50
  };

  var COLOR = {
    default: '#888',
    player1: '#f00',
    player2: '#0f0'
  };

  var turn = 'player1';

  function switchTurn () {
    turn = (turn === 'player1') ? 'player2' : 'player1';
  }

  function Box(x, y) {
    this.y = y;
    this.x = x;
    this.width = DIM.boxSize;
    this.height = DIM.boxSize;
    this.color = COLOR.default;
    this.renderedBox = null;
  }
  function boxClick(box) {
    console.log(box)
    box.color = COLOR[turn];
    box.renderedBox.fill = box.color;
    switchTurn();
  };

  function makeGrid(rows, columns) {
    var grid = [];
    var offset = {
      x: 100, y: 100,
    };

    for(var i=0; i<rows; i++) {
      var row = [];
      row.y = DIM.boxSize * i;

      for(var j=0; j<columns; j++) {
        var x = DIM.boxSize * j;
        var box = new Box(x, row.y);
        box.renderedBox = two.makeRectangle(offset.x + box.x, offset.y + box.y,
          box.height ,box.width);

        two.update();

        box.renderedBox.fill = box.color;
        box.renderedBox._renderer.elem.onclick = boxClick.bind({}, box);

        row.push(box);
      }
      grid.push(row);
    }
    return grid;
  }


  var grid = makeGrid(15,31);
  //drawGrid(grid);

  // var rect = two.makeRectangle(100, 25, 50 ,50);
  // two.bind('update', function() {
  //   //rect.rotation += 0.1;
  // });

//})();