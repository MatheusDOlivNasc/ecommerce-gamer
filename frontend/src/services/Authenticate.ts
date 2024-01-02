import { ErrorMessage } from "../models/error.models";

export class Authenticate {
  static url: string = "http://localhost:8080/";

  static login(login: string, password: string): Promise<{token: string}> {
    return new Promise(async (res, rej) => {
      try {
        const req = await fetch(Authenticate.url + "auth/login", {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ login, password })
        });

        if(!req.ok) {
          throw await req.json();
        }
        
        const responseData = await req.json();
        
        return res(responseData);
      } catch (error: ErrorMessage | any) {
        return rej(error);
      }
    }) 
  }

  static register(login: string, password: string, name: string): Promise<void> {
    return new Promise(async (res, rej) => {
      try {
        const req = await fetch(Authenticate.url + "auth/register", {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({login, password, name})
        });

        if(req.ok != true) throw await req.json();

        return res();
      } catch (error: ErrorMessage | any) {
        return rej(error);
      }
    }) 
  }
}