class MyPromise {
  PENDING = "PENDING";
  SUCCESS = "SUCCESS";
  FAIL = "FAIL";
  constructor(fn) {
    this.state = MyPromise.PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.successCallbacks = [];
    this.failCallbacks = [];
    let resolve = (value) => {
      if (this.state === MyPromise.PENDING) {
        this.state = MyPromise.SUCCESS;
        this.value = value;
        this.successCallbacks.forEach((item) => item());
      }
    };

    let reject = (reason) => {
      if (this.state === MyPromise.PENDING) {
        this.state = MyPromise.FAIL;
        this.reason = reason;
        this.failCallbacks.forEach((item) => item());
      }
    };

    try {
      fn(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(success, fail) {
    if (this.state === MyPromise.PENDING) {
      this.successCallbacks.push(() => success(this.value));
      this.failCallbacks.push(() => fail(this.reason));
    }
  }

  catch(fail) {
    this.then(null, fail);
  }
}

let a = new MyPromise((resolve, reject) => {
  console.log(1111111);
  setTimeout(() => {
    reject(2222222);
  }, 5000);
});

a.then((res) => console.log("res", res));
