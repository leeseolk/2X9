var sounds = {
  spin: new Audio('https://cdn.rawgit.com/ManzDev/cursos-assets/gh-pages/js/spin.mp3'),
  win: new Audio('https://cdn.rawgit.com/ManzDev/cursos-assets/gh-pages/js/win.mp3')
}

var roulette = document.querySelector('#roulette');
var arrow = document.querySelector('#arrow');
var txt = document.querySelector('#txt');

var offset = 0;
var items = [['우리는 최고의 복식조가 될고양', '🐱', ''],
             ['우승했음 좋겠다', '🏓', ''],
             ['노란선 잘 밟고 있어?', '💛', ''],
             ['1시간밖에 못업어준다', '🏃🏻‍♀️', ''],
             ['', '🐕', ''],
             ['비나이다 비나이다 나옹이 포에버', '🐈', ''],
             ['나도 죽기 싫어', '❌', '']
];

var maxOffset = items.length * 550;

var wheel = {
  speed: 100,
  
  getSpeed: function() {
    this.speed = this.speed - Math.round(Math.random() * 1);
    if (this.speed < 0)
      return 0;
    return this.speed;
  },
  resetSpeed: function() { this.speed = 100 }
}

items.forEach(function(e) {
  var newItem = document.createElement('div');
  var emoji = document.createTextNode(e[0]);
  var label = document.createElement('span');
  label.textContent = e[1];
  newItem.appendChild(emoji);
  newItem.appendChild(label);
  roulette.appendChild(newItem);
});
                        
function spin() {
  sounds.spin.play();
  arrow.classList.remove('shine');
  
  console.log('max: ', maxOffset);
  
  timer = setInterval(function() {
    offset = offset + wheel.getSpeed();
    if ((offset > maxOffset) || (offset < 0)) 
      offset = 0;
    roulette.style.transform = 'translateX(-'+offset+'px)';
  }, 10);
  
  setTimeout(function() {
    clearInterval(timer);
    wheel.resetSpeed();
    sounds.spin.pause();
    sounds.spin.currentTime = 0;
    sounds.win.play();
    arrow.classList.add('shine');
    
    var selected = Math.floor( (150 + offset) / (maxOffset / items.length) );
    txt.textContent = items[selected][1];
    
  }, 2500);
}
