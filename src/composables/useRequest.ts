import axios, {Axios} from "axios";
import type {GenericApiResult} from "@/types/types";

abstract class BaseRequest{
    private axios_instance: Axios;
    protected constructor() {
        this.axios_instance = axios.create({
            baseURL: "http://localhost:5173",
            headers:{

            }
        });
        this.axios_instance.interceptors.request.use((config) => {
            return config;
        });
        this.axios_instance.interceptors.response.use(
            async (response) => {
                return response;
            },
            (error) => {
                console.error("Error fetching data UseRequest");
                return Promise.reject(error);
            },
        );

        console.log("axios Inited");
    }

}
export namespace UseRequest {
    export class Request extends BaseRequest  {
        public constructor() {
            super();
        }
        public async get<T>(url, headers = {}): Promise<GenericApiResult<T>> {
            const res = await this.axios_instance.get(url, headers);
            if (res != undefined) {
                return {
                    success: res.data.status === "OK",
                    code: res.data.status,
                    des: res.data.des,
                    data: res.data.data,
                };
            }
        }
        public async post<T>(url,loading, data, headers = {}): Promise<GenericApiResult<T>> {
            loading.value = true;
            const res = await this.axios_instance.post(url, data, headers);
            loading.value = false;
            return {
                success: res.data.status === "OK",
                code: res.data.status,
                des: res.data.des,
                data: res.data.data,
            };
        }
    }
}

export default UseRequest;
