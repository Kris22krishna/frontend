import { useToyJoyLogic } from '../Toy-Joy/useToyJoyLogic';

export const useVNLogic = (dynamicMatchAnswers = {}) => {
    const logic = useToyJoyLogic(dynamicMatchAnswers);
    return {
        ...logic,
        handleOpt: logic.handleMcq,
        getOptClass: logic.getMcqClass,
    };
};
