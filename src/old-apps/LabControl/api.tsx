
export {ReqMaker}

class ReqMaker{
    host: string;
    constructor(host:string){
        this.host = host
    }
    get(){
        return fetch(this.host).then(res=>res.json())
    }
    post(body:object){
        return fetch(this.host, {method:'POST', body:JSON.stringify(body)}).then(res=>res.json())
    }
}