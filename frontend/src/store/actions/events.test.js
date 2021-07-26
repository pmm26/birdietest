import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { initEventFetch, fetchPage, setDate, setOrder, setEventType } from "./events";

const mockStore = configureMockStore([thunk]);

describe("Events Actions", () => {
  let store;

  describe("initEventFetch", () => {

    beforeEach(() => {
      store = mockStore({events: {
        firstLoad: false,
        events: [],
        currentPage: null,
        maxPages: null,
        filters: {
          eventType: null,
          order: null,
          dateFiltering: false,
          dates: [new Date(), new Date()]
        },
        error: null
      }});
    });

    it("dispatches initEventFetch action and returns data on success", async () => {
      mockAxios.request.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: [
              {
                id: "7aed0ca0-311a-48de-ae72-e7e92bf18b2c",
              },
            ],
            max_pages: 3,
            page: 1
          }
        })
      );

      await store.dispatch(initEventFetch());
      const actions = store.getActions();

      expect(actions[0].type).toEqual("INIT");
      expect(actions[0].events.length).toEqual(1);
      expect(actions[0].maxPages).toEqual(3);
    });

    it("dispatches initEventFetch calls error dispatch on failure", async () => {
      mockAxios.request.mockImplementationOnce(() =>
        Promise.reject({
          data: {}
        })
      );

      await store.dispatch(initEventFetch());
      const actions = store.getActions();

      expect(actions[0].type).toEqual("ERROR");
    });
  })

  describe("fetchPage", () => {

    beforeEach(() => {
      store = mockStore({ events: {
        firstLoad: true,
        events: [{
          id: "7aed0ca0-311a-48de-ae72-e7e92bf18b2c",
        },
        {
          id: "7aed0ca0-311a-48de-ae72-e7e92bf18b2c",
        }],
        currentPage: 1,
        maxPages: 3,
        filters: {
          eventType: null,
          order: null,
          dateFiltering: false,
          dates: [new Date(), new Date()]
        },
        error: null
      }});
    });

    it("dispatches fetchPage action and returns data on success", async () => {
      mockAxios.request.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: [
              {
                "id": "7aed0ca0-311a-48de-ae72-e7e92bf18b2c",
              },
            ],
            max_pages: 3,
            page: 2
          }
        })
      );

      await store.dispatch(fetchPage());
      const actions = store.getActions();

      expect(actions[0].type).toEqual("FETCH_PAGE");
      expect(actions[0].events.length).toEqual(1);
      expect(actions[0].maxPages).toEqual(3);
    });

    it("dispatches fetchPage calls error dispatch on failure", async () => {
      mockAxios.request.mockImplementationOnce(() =>
        Promise.reject({
          data: {}
        })
      );

      await store.dispatch(initEventFetch());
      const actions = store.getActions();

      expect(actions[0].type).toEqual("ERROR");
    });
  })

  describe("filters", () => {

    beforeEach(() => {
      store = mockStore({ events: {
        firstLoad: true,
        events: [{
          id: "7aed0ca0-311a-48de-ae72-e7e92bf18b2c",
        },
        {
          id: "7aed0ca0-311a-48de-ae72-e7e92bf18b2c",
        },],
        currentPage: 1,
        maxPages: 3,
        filters: {
          eventType: null,
          order: null,
          dateFiltering: false,
          dates: [new Date(), new Date()]
        },
        error: null
      }});
    });


    it("dispatches setDate action and returns data on success", async () => {
      mockAxios.request.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: [
              {
                "id": "7aed0ca0-311a-48de-ae72-e7e92bf18b2c",
              },
            ],
            max_pages: 3,
            page: 2
          }
        })
      );

      await store.dispatch(setDate([new Date(), new Date()]));
      
      const actions = store.getActions();
      expect(actions[0].type).toEqual("SET_DATE");
      expect(actions[0].dates.length).toEqual(2);

      expect(actions[1].type).toEqual("FETCH_EVENTS");
      expect(actions[1].events.length).toEqual(1);
      expect(actions[1].maxPages).toEqual(3);
    });

    it("dispatches setEventType action and returns data on success", async () => {
      mockAxios.request.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: [
              {
                "id": "7aed0ca0-311a-48de-ae72-e7e92bf18b2c",
              },
            ],
            max_pages: 3,
            page: 2
          }
        })
      );

      await store.dispatch(setEventType({value: 'example', label: "Example"}));
      
      const actions = store.getActions();
      expect(actions[0].type).toEqual("SET_EVENT_TYPE");
      expect(actions[0].eventType).toEqual({value: 'example', label: "Example"});

      expect(actions[1].type).toEqual("FETCH_EVENTS");
      expect(actions[1].events.length).toEqual(1);
      expect(actions[1].maxPages).toEqual(3);
    });

    it("dispatches setOrder action and returns data on success", async () => {
      mockAxios.request.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            data: [
              {
                "id": "7aed0ca0-311a-48de-ae72-e7e92bf18b2c",
              },
            ],
            max_pages: 3,
            page: 2
          }
        })
      );

      await store.dispatch(setOrder({value: 'example', label: "Example"}));
      
      const actions = store.getActions();
      expect(actions[0].type).toEqual("SET_ORDER");
      expect(actions[0].select).toEqual({value: 'example', label: "Example"});

      expect(actions[1].type).toEqual("FETCH_EVENTS");
      expect(actions[1].events.length).toEqual(1);
      expect(actions[1].maxPages).toEqual(3);
    });
  })
})