export default class Stream<T> {
  constructor(private readonly value: T) {}

  pipe<R>(fn: (arg: T) => R): Stream<R> {
    return new Stream(fn(this.value))
  }

  end(): T {
    return this.value
  }
}
