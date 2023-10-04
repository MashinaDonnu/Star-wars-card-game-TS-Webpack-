import { EngineScene } from '@engine/scenes/engine-scene';
import { LinkedListQueue } from '@engine/utils/linked-list-queue/linked-list-queue';
import { Engine } from '@engine/Engine';
import { DoublyLink } from '@engine/utils/doubly-linked-list/doubly-link';

export class EngineSceneHistory {
  queue = new LinkedListQueue<EngineScene>();

  constructor(engine: Engine) {}

  push(scene: EngineScene): void {
    this.queue.push(scene);
  }

  pop(): EngineScene {
    return this.queue.pop().value;
  }

  prev(): EngineScene {
    return this.queue.list.getFist()?.next?.value;
  }

  isEmpty(): boolean {
    return this.queue.list.isEmpty();
  }
}
