import { createMachine, assign } from 'xstate';
interface Context {retries: number;}
const LBSharedObject = createMachine<Context>({
        id: "LBSharedObject",
        initial: "Init", 
        states: {
            Init: {
                always: [
                { target: [
                    "WaitForAcquire",
                    ]
                }
                ],
            },
            WaitForAcquire: {
                on: {
                    eAcquireLock : { target: [
                        "WaitForRelease",
                        ]
                    },
                    eRead : { target: [
                        ]
                    },
                }
            },
            WaitForRelease: {
                on: {
                    eReleaseLock : { target: [
                        "WaitForAcquire",
                        ]
                    },
                    eRead : { target: [
                        ]
                    },
                }
            }
        }
});
const RWLBSharedObject = createMachine<Context>({
        id: "RWLBSharedObject",
        initial: "Init", 
        states: {
            Init: {
                always: [
                { target: [
                    "ChooseReadOrWriteLock",
                    ]
                }
                ],
            },
            ChooseReadOrWriteLock: {
                on: {
                    eAcqReadLock : { target: [
                        "ReadLockAcquired",
                        ]
                    },
                    eAcqWriteLock : { target: [
                        "WriteLockAcquired",
                        ]
                    },
                }
            },
            ReadLockAcquired: {
                on: {
                    eAcqReadLock : { target: [
                        ]
                    },
                    eReleaseReadLock : { target: [
                        "ChooseReadOrWriteLock",
                        ]
                    },
                    eAcqWriteLock : { target: [
                        ]
                    },
                }
            },
            WriteLockAcquired: {
                on: {
                    eReleaseWriteLock : { target: [
                        "ChooseReadOrWriteLock",
                        ]
                    },
                    eAcqReadLock : { target: [
                        ]
                    },
                    eAcqWriteLock : { target: [
                        ]
                    },
                }
            }
        }
});
const User = createMachine<Context>({
        id: "User",
        initial: "Init", 
        states: {
            Init: {
            }
        }
});
const TestDriver = createMachine<Context>({
        id: "TestDriver",
        initial: "Init", 
        states: {
            Init: {
                on: {
                    doneInc : { target: [
                        ]
                    },
                }
            }
        }
});
const User2 = createMachine<Context>({
        id: "User2",
        initial: "Init", 
        states: {
            Init: {
            }
        }
});
const TestDriver2 = createMachine<Context>({
        id: "TestDriver2",
        initial: "Init", 
        states: {
            Init: {
                on: {
                    doneInc : { target: [
                        ]
                    },
                }
            }
        }
});
