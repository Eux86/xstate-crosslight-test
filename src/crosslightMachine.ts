import { Machine } from "xstate";

export enum CrosslightStates {
  STOP = 'STOP',
  WARNING = 'WARNING',
  GO = 'GO',
}

type CrosslightStateSchema = {
  states: {
    [key in CrosslightStates]: {}
  };
}

type CrosslightEventSchema =
  | { type: 'SWITCH_TO_GO' }
  | { type: 'SWITCH_TO_WARN' }
  | { type: 'SWITCH_TO_STOP' };

export const crosslightMachine = Machine<{}, CrosslightStateSchema, CrosslightEventSchema>({
  id: 'crosslight',
  initial: CrosslightStates.GO,
  states: {
    GO: {
      on: {
        SWITCH_TO_WARN: {
          target: CrosslightStates.WARNING,
        },
      },
    },
    WARNING: {
      on: {
        SWITCH_TO_STOP: {
          target: CrosslightStates.STOP,
        },
      },
    },
    STOP: {
      on: {
        SWITCH_TO_GO: {
          target: CrosslightStates.GO,
        },
      },
    },
  },
});

