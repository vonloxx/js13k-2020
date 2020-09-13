import { angleToTarget } from 'kontra';
import Bird from './bird';

export default class Barry extends Bird {
  constructor(props) {
    super(props);

    this.type = 0;
  }

  // update(dt) {
  //   super.update(dt);
  // }

  render() {
    const { hitten, hitFrame } = this;
    if (hitten && hitFrame % 4 >= 0 && hitFrame % 4 < 2) {
      return;
    }
    super.render();
  }
}