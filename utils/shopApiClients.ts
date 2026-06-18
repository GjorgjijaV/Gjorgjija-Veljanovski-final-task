import { APIRequestContext } from "playwright";

interface ProductResponse {
  responseCode: number;
  products: Product[];
}

interface Product {
  id: number;
  name: string;
  price: string;
  brand: string;
  category: {
    usertype: {
      usertype: string;
    };
    category: string;
  };
}

interface Response {
  responseCode: number,
  message: string
}

interface ShopUser{
  name: string,
  email: string, 
  password: string, 
  title: string, 
  birth_date: number, 
  birth_month: number, 
  birth_year: number, 
  firstname: string, 
  lastname: string, 
  company: string, 
  address1: string, 
  address2: string, 
  country: string, 
  zipcode: number, 
  state: string, 
  city: string, 
  mobile_number: number
}

export class ShopAPIClients{
    readonly BASE_URL: string | undefined;

    constructor(private readonly request: APIRequestContext){
      this.BASE_URL = process.env.API_URL;
    }

    async getAllProducts(): Promise<ProductResponse>{
        const response = await this.request.get(`${this.BASE_URL}/productsList`);
        const data = await response.json();

        return data as ProductResponse;
    }

    async searchProduct(product: string): Promise<ProductResponse>{
        const response = await this.request.post(`${this.BASE_URL}/searchProduct`, {
          form: {
            search_product: product
          }
        });
        const data = await response.json();
        return data as ProductResponse;
    }

    async searchProductWithoutProductParameter(): Promise<Response>{
      const response = await this.request.post(`${this.BASE_URL}/searchProduct`);
      const data = await response.json();
      return data as Response
    }

    async deleteUserAccount(email: string, password: string): Promise<Response>{
      const response = await this.request.delete(`${this.BASE_URL}/deleteAccount`, {
        form: {
          email: email,
          password: password
        }
      });

      const data = await response.json();
      return data as Response;
    }

    async createAccount(user: ShopUser): Promise<void>{
      const response = await this.request.post(`${this.BASE_URL}/createAccount`, {
        form: {
          name: user.name,
          email: user.email,
          password: user.password,
          title: user.title,
          birth_date: user.birth_date,
          birth_month: user.birth_month,
          birth_year: user.birth_year,
          firstName: user.firstname,
          lastName: user.lastname,
          company: user.company,
          address1: user.address1,
          address2: user.address2,
          country: user.company,
          zipcode: user.zipcode,
          state: user.state,
          city: user.city,
          mobile_number: user.mobile_number
        }
      });
    }

    async veryfyLogin(email: string, password: string): Promise<boolean>{
      const response = await this.request.post(`${this.BASE_URL}/verifyLogin`, {
        form: {
          email: email,
          password: password
        }
      });
      const data = await response.json();
      if(data.responseCode === 200) return true;
      else return false;
    }
}