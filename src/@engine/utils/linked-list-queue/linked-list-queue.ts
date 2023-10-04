import { DoublyLinkedList } from '@engine/utils/doubly-linked-list/doubly-linked-list';
import { DoublyLink } from '@engine/utils/doubly-linked-list/doubly-link';

export class LinkedListQueue<T> {
  list: DoublyLinkedList<T>;

  constructor() {
    this.list = new DoublyLinkedList<T>();
  }

  push(data: T): DoublyLink<T> {
    return this.list.insertFirst(data);
  }

  unshift(data: T): DoublyLink<T> {
    return this.list.insertLast(data);
  }

  pop(): DoublyLink<T> {
    try {
      return this.list.deleteFirst();
    } catch (error) {
      throw error;
    }
  }

  shift(): DoublyLink<T> {
    try {
      return this.list.deleteLast();
    } catch (error) {
      throw error;
    }
  }
}
