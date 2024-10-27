import {
  FETCH_MESSAGES,
  SET_MESSAGES,
  DELETE_MESSAGES,
} from "../constants/actionTypes";
import * as api from "../api/index.js";
import socket from "../socketio/socket";

export const fetchMessages = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchMessages(id);

    dispatch({ type: FETCH_MESSAGES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createMessage = (Message, setLoading) => async (dispatch) => {
  try {
    setLoading(true);
    const { data } = await api.createMessage(Message);
    socket.emit("send-msg", {
      to: data.newMessage.recipient,
      msg: data.newMessage,
    });
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};

export const deleteMessages = (id) => async (dispatch) => {
  try {
    await api.deleteMessages(id);
    dispatch({ type: DELETE_MESSAGES });
  } catch (error) {
    console.log(error);
  }
};

export const setMessages = (message) => async (dispatch) => {
  try {
    dispatch({ type: SET_MESSAGES, payload: message });
  } catch (error) {
    console.log(error);
  }
};
