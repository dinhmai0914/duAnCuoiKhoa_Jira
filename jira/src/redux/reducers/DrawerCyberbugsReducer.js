import React from "react";

const initialState = {
  visible: false,
  ComponentContnetDrawer: <p>default content</p>,
  title: "",
  callBackSubmit: (propsValue) => {
    alert("demo");
  },
};

export const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_DRAWER":
      return { ...state, visible: true };
    case "CLOSE_DRAWER":
      return { ...state, visible: false };
    case "OPEN_FORM_EDIT_PROJECT": {
      state.visible = true;
      state.ComponentContnetDrawer = action.Component;
      state.title = action.title;
      return { ...state };
    }
    case "SET_SUBMIT_EDIT_PROJECT": {
      state.callBackSubmit = action.submitFunction;
      return { ...state };
    }

    default:
      return state;
  }
};
