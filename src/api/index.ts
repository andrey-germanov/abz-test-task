import { IPositions } from "../components/Form";
import { User } from "../components/Users";

export const getPositions = (handler: (data: IPositions[]) => void) => {
  fetch("https://frontend-test-assignment-api.abz.agency/api/v1/positions")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      handler(data.positions);
    })
    .catch(function (error) {
      console.log("some error with getting positions", error);
    });
};

export const getToken = (handler: (token: string) => void) => {
  fetch("https://frontend-test-assignment-api.abz.agency/api/v1/token")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      handler(data.token);
    })
    .catch(function (error) {
      console.log("some error with getting token", error);
    });
};

export const postUser = (
  handler: (success: boolean) => void,
  formData: FormData,
  token: string,
  setErrorByServer: (messageError: string) => void,
) => {
  fetch("https://frontend-test-assignment-api.abz.agency/api/v1/users", {
    method: "POST",
    body: formData,
    headers: { Token: token },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (!response.success) setErrorByServer(response.message);

      handler(response.success);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUsers = (
  setUsersList: (success: User[]) => void,
  setEndUserList: (end: boolean) => void,
  countUsers: number
) => {
  fetch(
    `https://frontend-test-assignment-api.abz.agency/api/v1/users?offset=1&count=${countUsers}`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (!data.links.next_url) setEndUserList(true);
      setUsersList(data.users);
    });
};
