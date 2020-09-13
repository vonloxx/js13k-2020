import Bird from './bird';

export default class Follower extends Bird {
  render() {
    const { hitten, hitFrame } = this;

    if (hitten && hitFrame % 4 >= 0 && hitFrame % 4 < 2) {
      return;
    }

    super.render();
  }
}