export class SomethingWentWrong extends Error {
  constructor(message = "Something went wrong.") {
    super(message);
    this.name = "SomethingWentWrong";
  }
}
