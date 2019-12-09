const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';

export function openModal(modalType, params) {
  return {
    type: OPEN_MODAL,
    params,
    modalType,
  }
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  }
}

export default function modalReducer(state = {}, action) {
  switch (action.type) {
    case OPEN_MODAL: {
      return { ...state, isVisible: true, modalType: action.modalType, params: action.params };
    }
    case CLOSE_MODAL: {
      return { ...state, isVisible: false };
    }
    default:
      return state;
  }
}