const game = {

}

class Player {
  name = '';
  constructor(name) {
    this.name = name;
  }
}

const test = new Player();
test.name = 'ollie';
console.log(test.name);