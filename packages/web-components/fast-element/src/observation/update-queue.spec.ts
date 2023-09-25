import { expect } from "@esm-bundle/chai";
import { Updates } from "./update-queue.js";

const waitMilliseconds = 100;
const maxRecursion = 10;

function watchSetTimeoutForErrors<TError = any>() {
    const errors: TError[] = [];
    const originalSetTimeout = globalThis.setTimeout;

    globalThis.setTimeout = (callback: Function, timeout: number) => {
        return originalSetTimeout(() => {
            try {
                callback();
            } catch(error) {
                errors.push(error);
            }
        }, timeout)
    }

    return () => {
        globalThis.setTimeout = originalSetTimeout;
        return errors;
    };
}

describe("The UpdateQueue", () => {
    context("when updating DOM asynchronously", () => {
        it("calls task in a future turn", done => {
            let called = false;

            Updates.enqueue(() => {
                called = true;
                done();
            });

            expect(called).to.equal(false);
        });

        it("calls task.call method in a future turn", done => {
            let called = false;

            Updates.enqueue({
                call: () => {
                    called = true;
                    done();
                }
            });

            expect(called).to.equal(false);
        });

        it("calls multiple tasks in order", done => {
            const calls:number[] = [];

            Updates.enqueue(() =>  {
                calls.push(0);
            });
            Updates.enqueue(() =>  {
                calls.push(1);
            });
            Updates.enqueue(() =>  {
                calls.push(2);
            });

            expect(calls).to.eql([]);

            setTimeout(() => {
                expect(calls).to.eql([0, 1, 2]);
                done();
            }, waitMilliseconds);
        });

        it("calls tasks in breadth-first order", done => {
            let calls: number[] = [];

            Updates.enqueue(() => {
                calls.push(0);

                Updates.enqueue(() => {
                    calls.push(2);

                    Updates.enqueue(() => {
                        calls.push(5);
                    });

                    Updates.enqueue(() => {
                        calls.push(6);
                    });
                });

                Updates.enqueue(() => {
                    calls.push(3);
                });
            });

            Updates.enqueue(() => {
                calls.push(1);

                Updates.enqueue(() => {
                    calls.push(4);
                });
            });

            expect(calls).to.eql([]);

            setTimeout(() => {
                expect(calls).to.eql([0, 1, 2, 3, 4, 5, 6]);
                done();
            }, waitMilliseconds);
        });

        it("can schedule more than capacity tasks", done => {
            const target = 1060;
            const targetList: number[] = [];

            for (var i=0; i<target; i++) {
                targetList.push(i);
            }

            const newList: number[] = [];
            for (var i=0; i < target; i++) {
                (function(i) {
                    Updates.enqueue(() => {
                        newList.push(i);
                    });
                })(i);
            }

            setTimeout(() => {
                expect(newList).to.eql(targetList);
                done();
            }, waitMilliseconds);
        });

        it("can schedule more than capacity*2 tasks", done => {
            const target = 2060;
            const targetList: number[] = [];

            for (var i=0; i<target; i++) {
                targetList.push(i);
            }

            const newList: number[] = [];
            for (var i=0; i<target; i++) {
                (function(i) {
                    Updates.enqueue(() => {
                        newList.push(i);
                    });
                })(i);
            }

            setTimeout(() => {
                expect(newList).to.eql(targetList);
                done();
            }, waitMilliseconds);
        });

        it("can schedule tasks recursively", done => {
            const steps: number[] = [];

            Updates.enqueue(() => {
                steps.push(0);
                Updates.enqueue(() => {
                    steps.push(2);
                    Updates.enqueue(() => {
                        steps.push(4);
                    });
                    steps.push(3);
                });
                steps.push(1);
            });

            setTimeout(() => {
                expect(steps).to.eql([0, 1, 2, 3, 4]);
                done();
            }, waitMilliseconds);
        });

        it(`can recurse ${maxRecursion} tasks deep`, done => {
            let recurseCount = 0;
            function go() {
                if (++recurseCount < maxRecursion) {
                    Updates.enqueue(go);
                }
            }

            Updates.enqueue(go);

            setTimeout(() => {
                expect(recurseCount).to.equal(maxRecursion);
                done();
            }, waitMilliseconds);
        });

        it("can execute two branches of recursion in parallel", done => {
            let recurseCount1 = 0;
            let recurseCount2 = 0;
            const calls: number[] = [];

            function go1() {
                calls.push(recurseCount1 * 2);
                if (++recurseCount1 < maxRecursion) {
                    Updates.enqueue(go1);
                }
            }

            function go2() {
                calls.push(recurseCount2 * 2 + 1);
                if (++recurseCount2 < maxRecursion) {
                    Updates.enqueue(go2);
                }
            }

            Updates.enqueue(go1);
            Updates.enqueue(go2);

            setTimeout(function () {
                expect(calls.length).to.equal(maxRecursion * 2);
                for (var index = 0; index < maxRecursion * 2; index++) {
                    expect(calls[index]).to.equal(index);
                }
                done();
            }, waitMilliseconds);
        });

        it("throws errors in order without breaking the queue", done => {
            const calls: number[] = [];
            const dispose = watchSetTimeoutForErrors<number>();

            Updates.enqueue(() => {
                calls.push(0);
                throw 0;
            });

            Updates.enqueue(() => {
                calls.push(1);
                throw 1;
            });

            Updates.enqueue(() => {
                calls.push(2);
                throw 2;
            });

            expect(calls).to.be.empty;

            setTimeout(() => {
                const errors = dispose();
                expect(calls).to.eql([0, 1, 2]);
                expect(errors).to.eql([0, 1, 2]);
                done();
            }, waitMilliseconds);
        });

        it("preserves the respective order of errors interleaved among successes", done => {
            const calls: number[] = [];
            const dispose = watchSetTimeoutForErrors<number>();

            Updates.enqueue(() => {
                calls.push(0);
            });
            Updates.enqueue(() => {
                calls.push(1);
                throw 1;
            });
            Updates.enqueue(() => {
                calls.push(2);
            });
            Updates.enqueue(() => {
                calls.push(3);
                throw 3;
            });
            Updates.enqueue(() => {
                calls.push(4);
                throw 4;
            });
            Updates.enqueue(() => {
                calls.push(5);
            });

            expect(calls).to.be.empty;

            setTimeout(() => {
                const errors = dispose();
                expect(calls).to.eql([0, 1, 2, 3, 4, 5]);
                expect(errors).to.eql([1, 3, 4]);
                done();
            }, waitMilliseconds);
        });

        it("executes tasks scheduled by another task that later throws an error", done => {
            const dispose = watchSetTimeoutForErrors<number>();

            Updates.enqueue(() => {
                Updates.enqueue(() => {
                    throw 1;
                });

                throw 0;
            });

            setTimeout(() => {
                const errors = dispose();
                expect(errors).to.eql([0, 1]);
                done();
            }, waitMilliseconds);
        });

        it("executes a tree of tasks in breadth-first order when some tasks throw errors", done => {
            const calls: number[] = [];
            const dispose = watchSetTimeoutForErrors<number>();

            Updates.enqueue(() => {
                calls.push(0);

                Updates.enqueue(() => {
                    calls.push(2);

                    Updates.enqueue(() => {
                        calls.push(5);
                        throw 5;
                    });

                    Updates.enqueue(() => {
                        calls.push(6);
                    });
                });

                Updates.enqueue(() => {
                    calls.push(3);
                });

                throw 0;
            });

            Updates.enqueue(() => {
                calls.push(1);

                Updates.enqueue(() => {
                    calls.push(4);
                    throw 4;
                });
            });

            expect(calls).to.eql([]);

            setTimeout(() => {
                const errors = dispose();
                expect(calls).to.eql([0, 1, 2, 3, 4, 5, 6]);
                expect(errors).to.eql([0, 4, 5]);
                done();
            }, waitMilliseconds);
        });

        it("rethrows task errors and preserves the order of recursive tasks", done => {
            let recursionCount = 0;
            const dispose = watchSetTimeoutForErrors<number>();

            function go() {
                if (++recursionCount < maxRecursion) {
                    Updates.enqueue(go);
                    throw recursionCount - 1;
                }
            }

            Updates.enqueue(go);

            setTimeout(function () {
                const errors = dispose();

                expect(recursionCount).to.equal(maxRecursion);
                expect(errors.length).to.equal(maxRecursion - 1);

                for (let index = 0; index < maxRecursion - 1; index++) {
                    expect(errors[index]).to.equal(index);
                }

                done();
            }, waitMilliseconds);
        });

        it("can execute three parallel deep recursions in order, one of which throwing every task", done => {
            const dispose = watchSetTimeoutForErrors<number>();
            let recurseCount1 = 0;
            let recurseCount2 = 0;
            let recurseCount3 = 0;
            let calls: number[] = [];

            function go1() {
                calls.push(recurseCount1 * 3);
                if (++recurseCount1 < maxRecursion) {
                    Updates.enqueue(go1);
                }
            }

            function go2() {
                calls.push(recurseCount2 * 3 + 1);
                if (++recurseCount2 < maxRecursion) {
                    Updates.enqueue(go2);
                }
            }

            function go3() {
                calls.push(recurseCount3 * 3 + 2);
                if (++recurseCount3 < maxRecursion) {
                    Updates.enqueue(go3);
                    throw recurseCount3 - 1;
                }
            }

            Updates.enqueue(go1);
            Updates.enqueue(go2);
            Updates.enqueue(go3);

            setTimeout(function () {
                const errors = dispose();

                expect(calls.length).to.equal(maxRecursion * 3);
                for (var index = 0; index < maxRecursion * 3; index++) {
                    expect(calls[index]).to.equal(index);
                }

                expect(errors.length).to.equal(maxRecursion - 1);
                for (var index = 0; index < maxRecursion - 1; index++) {
                    expect(errors[index]).to.equal(index);
                }

                done();
            }, waitMilliseconds);
        });
    });

    context("when updating DOM synchronously", () => {
        beforeEach(() => {
            Updates.setMode(false);
        });

        afterEach(() => {
            Updates.setMode(true);
        });

        it("calls task immediately", () => {
            let called = false;

            Updates.enqueue(() => {
                called = true;
            });

            expect(called).to.equal(true);
        });

        it("calls task.call method immediately", () => {
            let called = false;

            Updates.enqueue({
                call: () => {
                    called = true;
                }
            });

            expect(called).to.equal(true);
        });

        it("calls multiple tasks in order", () => {
            const calls:number[] = [];

            Updates.enqueue(() =>  {
                calls.push(0);
            });
            Updates.enqueue(() =>  {
                calls.push(1);
            });
            Updates.enqueue(() =>  {
                calls.push(2);
            });

            expect(calls).to.eql([0, 1, 2]);
        });

        it("can schedule tasks recursively", () => {
            const steps: number[] = [];

            Updates.enqueue(() => {
                steps.push(0);
                Updates.enqueue(() => {
                    steps.push(2);
                    Updates.enqueue(() => {
                        steps.push(4);
                    });
                    steps.push(3);
                });
                steps.push(1);
            });

            expect(steps).to.eql([0, 1, 2, 3, 4]);
        });

        it(`can recurse ${maxRecursion} tasks deep`, () => {
            let recurseCount = 0;
            function go() {
                if (++recurseCount < maxRecursion) {
                    Updates.enqueue(go);
                }
            }

            Updates.enqueue(go);

            expect(recurseCount).to.equal(maxRecursion);
        });

        it("throws errors immediately", () => {
            const calls: number[] = [];
            let caught: any;

            try {
                Updates.enqueue(() => {
                    calls.push(0);
                    throw 0;
                });
            } catch(error) {
                caught = error;
            }

            expect(calls).to.eql([0]);
            expect(caught).to.eql(0);
        });
    });
});
