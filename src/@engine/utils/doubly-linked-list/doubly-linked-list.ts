import { DoublyLink } from '@engine/utils/doubly-linked-list/doubly-link';

// export class DoublyLink<T>edList<T> {
//   first: DoublyLink<T><T> = null;
//   last: DoublyLink<T><T> = null;
//
//   constructor() {}
//
//   addFirst(value: T): DoublyLink<T><T> {
//     const link = new DoublyLink<T>(value);
//     if (this.isEmpty()) {
//       this.last = link;
//     } else {
//       this.first.prev = link;
//       link.next = this.first;
//     }
//
//     this.first = link;
//     return link;
//   }
//
//   addLast(value: T): DoublyLink<T><T> {
//     const link = new DoublyLink<T>(value);
//     if (this.isEmpty()) {
//       this.first = link;
//     } else {
//       this.last.next = link;
//       link.prev = this.last;
//     }
//
//     this.last = link;
//     return link;
//   }
//
//   removeFirst(): DoublyLink<T><T> {
//     if (this.isEmpty()) {
//       throw new Error('List is empty');
//     }
//     const first = this.first;
//
//     if (this.first.next === null) {
//       this.last = null;
//     } else {
//       this.first.next.prev = null;
//     }
//     this.first = first.next;
//
//     return first;
//   }
//
//   removeLast(): DoublyLink<T><T> {
//     if (this.isEmpty()) {
//       throw new Error('List is empty');
//     }
//
//     const last = this.last;
//
//     if (!last && this.first) {
//       return this.removeFirst();
//     }
//
//     if (this.first.next === null) {
//       this.last = null;
//     } else {
//       this.first.next.prev = null;
//     }
//     this.last = last.prev;
//     return last;
//   }
//
//   insertAfter(value: T, key: keyof T): DoublyLink<T><T> {
//     if (this.isEmpty()) {
//       throw new Error('List is empty');
//     }
//     let current = this.first;
//     while (current.value[key] !== key) {
//       current = current.next;
//       if (!current) {
//         return null;
//       }
//     }
//
//     const link = new DoublyLink<T>(value);
//
//     if (current === this.last) {
//       link.next = null;
//       this.last = link;
//     } else {
//       link.next = current.next;
//       current.next.prev = link;
//     }
//
//     current.next = link;
//     link.prev = current;
//
//     return link;
//   }
//
//   isEmpty(): boolean {
//     return this.first === null;
//   }
//
//   *[Symbol.iterator]() {
//     let current = this.first;
//     while (current) {
//       yield current.value;
//       current = current.next;
//     }
//   }
// }

export class DoublyLinkedList<T> {
  private first: DoublyLink<T> | null;
  private last: DoublyLink<T> | null;

  constructor() {
    this.first = null;
    this.last = null;
  }

  isEmpty(): boolean {
    return this.first === null;
  }

  insertFirst(data: any): DoublyLink<T> {
    const link = new DoublyLink<T>(data);
    if (this.isEmpty()) {
      this.last = link;
    } else {
      link!.next = this!.first;
      this.first!.prev = link;
    }

    this.first = link;

    return link;
  }

  insertLast(data: any): DoublyLink<T> {
    const link = new DoublyLink<T>(data);
    if (this.isEmpty()) {
      this.first = link;
    } else {
      link.prev = this.last;
      this.last!.next = link;
    }

    this.last = link;
    return link;
  }

  deleteFirst(): DoublyLink<T> | null {
    const temp = this.first;
    if (this.first?.next === null) {
      this.last = null;
    } else {
      // @ts-ignore
      this.first?.next?.prev = null;
    }
    this.first = this.first?.next;

    return temp;
  }

  deleteLast(): DoublyLink<T> | null {
    const tmp = this.last;
    if (this.first?.next === null) {
      this.last = null;
    } else {
      this.last!.prev!.next = null;
    }

    this.last = this.last?.prev;

    return tmp;
  }

  displayForward() {
    let current = this.first;
    while (current) {
      current.display();
      current = current!.next;
    }
  }

  displayBackward() {
    let current = this.last;
    while (current) {
      current.display();
      current = current.prev;
    }
  }

  insertAfter(key: any, data: any) {
    let current = this.first;
    while (current?.value !== key) {
      current = current!.next;
      if (!current) {
        return false;
      }
    }

    const link = new DoublyLink<T>(data);

    if (current === this.last) {
      // link.prev = this.last;
      // this.last!.next = link
      link.next = null;
      this.last = link;
    } else {
      link.next = current!.next;

      current!.next!.prev = link;
    }

    link.prev = current;
    current!.next = link;
    return true;
  }

  deleteKey(key: any) {
    let current = this.first;
    while (current!.value !== key) {
      current = current!.next;
      if (!current) {
        return null;
      }
    }

    if (current === this.first) {
      this.first = this.first!.next;
    } else {
      current!.prev!.next = current!.next;
    }

    if (current === this.last) {
      this.last = this.last!.prev;
    } else {
      current!.next!.prev = current!.prev;
    }

    return current;
  }

  getFist(): DoublyLink<T> | null {
    return this.first;
  }

  getLast(): DoublyLink<T> | null {
    return this.last;
  }

  *[Symbol.iterator]() {
    let current = this.first;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  links(): Iterable<DoublyLink<T>> {
    const first = this.last;
    // @ts-ignore
    this[Symbol.iterator] = function* () {
      let current = first;
      while (current) {
        yield current;
        current = current.prev;
      }
    };

    return this as Iterable<DoublyLink<T>>;
  }
}
