import { ErrorMessage } from "../models/error.models";

export class Authenticate {
  static url: string = "http://localhost:8080/";

  static login(login: string, password: string): Promise<string> {
    return new Promise(async (res, rej) => {
      try {
        const req = await fetch(Authenticate.url + "auth/login", {
          method: 'POST',
          headers: new Headers({ 'content-type': 'application/json' }),
          body: JSON.stringify({ login, password })
        });

        const responseData = await req.json();

        if(!req.ok) {
          throw responseData;
        }

        Authenticate.setToken(responseData.token, responseData.validity);
        
        return res(responseData?.name || "");
      } catch (error: ErrorMessage | any) {
        return rej(error);
      }
    }) 
  }

  static register(login: string, password: string, name: string): Promise<string> {
    return new Promise(async (res, rej) => {
      try {
        const req = await fetch(Authenticate.url + "auth/register", {
          method: 'POST',
          headers: new Headers({ 'content-type': 'application/json' }),
          body: JSON.stringify({login, password, name})
        });

        const responseData = await req.json();

        if(!req.ok) {
          throw responseData;
        }

        return res(responseData?.name || "");
      } catch (error: ErrorMessage | any) {
        return rej(error);
      }
    }) 
  }

  static forgetPassword(email: string): Promise<void> {
    return new Promise(async (res, rej) => {
      try {
        const req = await fetch(Authenticate.url + "auth/password-reset", {
          method: 'POST',
          headers: new Headers({ 'content-type': 'application/json' }),
          body: JSON.stringify({ email })
        });

        if(!req.ok) { throw await req.json(); }

        return res();
      } catch (error: ErrorMessage | any) {
        return rej(error);
      }
    }) 
  }

  static resetPassword(token: string, password: string): Promise<void> {
    return new Promise(async (res, rej) => {
      try {
        const req = await fetch(Authenticate.url + "auth/new-password-check", {
          method: 'POST',
          headers: new Headers({ 'content-type': 'application/json' }),
          body: JSON.stringify({ token, password })
        });

        if(!req.ok) {
          throw await req.json();;
        }

        return res();
      } catch (error: ErrorMessage | any) {
        return rej(error);
      }
    }) 
  }

  static authState(): Promise<string> {
    return new Promise(async (res, rej) => {
      try {
        const token = Authenticate.getToken();
        if(!token) throw {};
        
        const req = await fetch(Authenticate.url + "auth/state", {
          method: 'POST',
          headers: new Headers({
            'content-type': 'application/json',
            "Authorization": `Bearer ${token}`
          }),
          body: JSON.stringify({})
        });

        const responseData = await req.json();

        if(req.ok != true) throw responseData;

        return res(responseData?.name || "");
      } catch (error: ErrorMessage | any) {
        return rej(error);
      }
    }) 
  }

  static setToken(value: string, dateEnd: number) {
    if(!value || !dateEnd) throw { message: "Erro ao registrar login" };
    
    document.cookie = "authToken=" + value + "; expires=" + (new Date(dateEnd)).toUTCString() + "; path=/";
  }

  static getToken(): string {
    const name = "authToken=";
    const cookies = document.cookie.replace(new RegExp("\\s", "g"), "").split(';');

    for(const cookie of cookies) {
      if(cookie.includes(name)) return cookie.replace(new RegExp(name, "g"), "");
    }
    
    return ""
  }

  static removeToken() {
    document.cookie = "authToken=none; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
}