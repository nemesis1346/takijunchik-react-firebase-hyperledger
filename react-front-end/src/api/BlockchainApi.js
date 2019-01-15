import axios from 'axios';
import {parseResponse} from '../utils/Utils';
//TODO: Be aware where the port is going to be
//const instance = axios.create({ baseURL: 'http://35.190.131.104:8888' })
//const instance = axios.create({ baseURL: 'http://localhost:8888' }) // this is for blockchain
const instance = axios.create({ baseURL: 'http://localhost:8889' }); // this is for firebase

export default {
    user: {
        login: credentials => instance.post('/login', { credentials })
            .then((res) => {
                console.log('Response in Api Login:');
                let result = parseResponse(res);
                //console.log(result);
                return result;
            }),

        signup: params => instance.post('/createUser', { params })
            .then((res) => {
                console.log('Response in Api Signup');
                let result = parseResponse(res);
                //console.log(result);
                return result;
            })
    },
    vocabulary: {
        translate_kichwa_spanish: word_kichwa => instance.post('/translate_kichwa_spanish', { word_kichwa })
            .then(res => {
                console.log('Response in Api Translate');
                res.data
            }),
        getObject: input => instance.post('/getObjectsByQuery', { input })
            .then(res => {
                console.log('Response in GetObject Login:');
                let result = parseResponse(res);
                //console.log(result);
                return result;
            }),
        uploadMp3: input => instance.post('/uploadMp3',{input})
        .then(res=>{
            console.log('Response in UploadMp3:');
            let result = parseResponse(res);
            return result;
        })  
    },

}
