import {
  FETCH_CONVERSATIONS,
  SET_CURRENT_CONVERSATION,
  REMOVE_CONVERSATION,
  CREATE_CONVERSATION,
} from "../constants/actionTypes.js";
import * as api from "../api/index.js";

export const fetchConversations = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchConversations(id);

    dispatch({ type: FETCH_CONVERSATIONS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createConversation = (Conversation) => async (dispatch) => {
  try {
    const { data } = await api.createConversation(Conversation);

    dispatch({ type: CREATE_CONVERSATION, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const removeConversation = (Conversation) => async (dispatch) => {
  try {
    const { data } = await api.removeConversation(Conversation);

    dispatch({
      type: REMOVE_CONVERSATION,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setConversation = (Conversation) => async (dispatch) => {
  try {
    dispatch({ type: SET_CURRENT_CONVERSATION, payload: Conversation });
  } catch (error) {
    console.log(error);
  }
};
