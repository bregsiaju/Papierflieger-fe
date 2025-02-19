import destinasiService from "../../services/destinasiService";
import airportService from "../../services/airportService";
import { GET_DESTINASI, ADD_DESTINASI, PUT_DESTINASI, DELETE_DESTINASI, GET_DESTINASIBYID } from "../types/index";
import SweatAlert from '../../components/UIComponents/sweatAlert';

export const getDestinasi = () =>
  async function (dispatch) {
    dispatch({
      type: GET_DESTINASI,
      payload: {
        loading: true,
        data: false,
        dataAirport: false,
        errorMessage: false,
      },
    });
    try {
      const datAirport = [];
      const AirportName = [];
      const response = await destinasiService.getDestinasi();
      const response2 = await airportService.getAirport();
      const airport = response2.data.airports;
      airport?.forEach((bandara) => {
        datAirport.push({ label: bandara.city, value: bandara.city });
      });
      airport?.forEach((bandara) => {
        AirportName.push({ label: bandara.airportName, value: bandara.id });
      });
      dispatch({
        type: GET_DESTINASI,
        payload: {
          loading: false,
          data: response.data,
          dataAirport: datAirport,
          AirportName,
          errorMessage: false,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_DESTINASI,
        payload: {
          loading: false,
          data: false,
          dataAirport: false,
          errorMessage: error.message,
        },
      });
      SweatAlert(String(error.response.data.message), 'error');
    }
  };
export const getDestinasiById = (id) =>
  async function (dispatch) {
    dispatch({
      type: GET_DESTINASIBYID,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });
    try {
      const response = await destinasiService.getDestinasiById(id);
      dispatch({
        type: GET_DESTINASIBYID,
        payload: {
          loading: false,
          data: response.data,
          errorMessage: false,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_DESTINASIBYID,
        payload: {
          loading: true,
          data: false,
          errorMessage: false,
        },
      });
      SweatAlert(String(error.response.data.message), 'error');
    }
  };
export const addDestinasi = (data, history) =>
  async function (dispatch) {
    try {
      const response = await destinasiService.addDestinasi(data);
      dispatch({ type: ADD_DESTINASI, payload: response.data });
      history("/admin/destination");
      SweatAlert(String(response.data.message), 'success');
    } catch (error) {
      SweatAlert(String(error.response.data.message), 'error');
    }
  };

export const deleteDestinasi = (id) =>
  async function (dispatch) {
    try {
      const response = await destinasiService.deleteDestinasi(id);
      const response2 = await destinasiService.getDestinasi();
      dispatch({ type: DELETE_DESTINASI, payload: { message: response.data.message, data: response2.data } });
      SweatAlert(String(response.data.message), 'success');
    } catch (error) {
      SweatAlert(String(error.response.data.message), 'error');
    }
  };

export const updateDestinasi = (data, id) =>
  async function (dispatch) {
    try {
      const response = await destinasiService.updateDestinasi(data, id);
      const response2 = await destinasiService.getDestinasi();
      dispatch({ type: PUT_DESTINASI, payload: { message: response.data.message, data: response2.data } });
      SweatAlert(String(response.data.message), 'success');
    } catch (error) {
      SweatAlert(String(error.response.data.message), 'error');
    }
  };
