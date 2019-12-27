import { put, call } from 'redux-saga/effects';

export const createSagaWorker = (request: any, action: any) =>
	function* sagaWorker({ payload }: any) {
		try {
			yield put(action.request(payload));
			const result = yield call(request, payload);
			yield put(action.success(result));
		} catch (error) {
			yield put(action.error(error.message));
		}
	};
