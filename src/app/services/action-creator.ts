import { createAction, ActionFunctionAny } from 'redux-actions';

interface IHttpAction {
	call: ActionFunctionAny<any>;
	request: ActionFunctionAny<any>;
	success: ActionFunctionAny<any>;
	error: ActionFunctionAny<any>;
}

export const createHttpAction = (type: string): IHttpAction => {
	const actions: IHttpAction = {
		call: createAction(type),
		request: createAction(`${type}_REQUEST`),
		success: createAction(`${type}_SUCCESS`),
		error: createAction(`${type}_ERROR`)
	};
	
	return actions;
};
